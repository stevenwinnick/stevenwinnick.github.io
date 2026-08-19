"use client";

import { useEffect, useRef } from "react";
import styles from "./WavesCanvas.module.css";

/**
 * Sonic Canvas: draw a shape and hear it played back as a looping sound wave.
 *
 * It runs inside an effect so it can touch browser-only APIs (canvas, Web
 * Audio) and clean up its listeners and audio graph on unmount.
 */
export default function WavesCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Audio graph: a compressor feeds the destination, a global gain feeds the
    // compressor, and a pool of buffer/gain nodes lets multiple sounds overlap.
    const audioCtx = new (
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext })
        .webkitAudioContext
    )();
    const dynamicsCompressor = audioCtx.createDynamicsCompressor();
    dynamicsCompressor.connect(audioCtx.destination);
    const globalGain = audioCtx.createGain();
    globalGain.connect(dynamicsCompressor);
    globalGain.gain.value = 1;

    const BUFFER_COUNT = 5;
    let curBuffer = 0;
    const buffers: AudioBuffer[] = new Array(BUFFER_COUNT);
    const bufferSources: AudioBufferSourceNode[] = new Array(BUFFER_COUNT);
    const gainNodes: GainNode[] = new Array(BUFFER_COUNT);
    for (let i = 0; i < BUFFER_COUNT; i++) {
      gainNodes[i] = audioCtx.createGain();
      gainNodes[i].connect(globalGain);
      gainNodes[i].gain.value = 0;
    }

    // Canvas setup. The canvas cannot use CSS, so it reads the palette and the
    // display face off the document instead of repeating them.
    const rootStyle = getComputedStyle(document.documentElement);
    const token = (name: string) => rootStyle.getPropertyValue(name).trim();
    const FOREGROUND_COLOR = token("--color-blue");
    const BACKGROUND_COLOR = token("--color-white");
    canvas.width = container.clientWidth;
    canvas.height = container.clientHeight;
    let mouseDown = false;
    let path: number[][] = [];
    let prevX = 0;
    let prevY = 0;
    let red = 0;
    let green = 0;
    let blue = 256;
    const TAIL_LENGTH = 50;
    const DRAW_SPEED = 3;
    const canvasText = "DRAW SOUND WAVES";
    // Measure at a reference size, then scale so the prompt fills 80% of the
    // canvas, which is narrower than the screen a viewport unit would measure.
    const headerFont = token("--font-header");
    ctx.font = `100px ${headerFont}`;
    const promptSize = (80 * canvas.width) / ctx.measureText(canvasText).width;
    ctx.font = `${promptSize}px ${headerFont}`;
    const textWidth = ctx.measureText(canvasText).width;
    const centerX = (canvas.width - textWidth) / 2;
    const centerY = canvas.height / 2;
    ctx.fillStyle = FOREGROUND_COLOR;
    ctx.fillText(canvasText, centerX, centerY);

    function resetPath() {
      path = [];
    }

    function plot(x: number, y: number) {
      path.push([x, y]);
    }

    function draw(newX: number, newY: number) {
      drawLine(prevX, prevY, newX, newY);
      prevX = newX;
      prevY = newY;
    }

    // Walks the edges of the RGB cube, so consecutive strokes shade into each
    // other and the drawn wave runs through the whole spectrum.
    function nextColor() {
      const CYCLE_SPEED = 3;
      if (red >= 256) {
        if (blue > 0) {
          blue -= CYCLE_SPEED;
        } else if (green >= 256) {
          red -= CYCLE_SPEED;
        } else {
          green += CYCLE_SPEED;
        }
      } else if (green >= 256) {
        if (red > 0) {
          red -= CYCLE_SPEED;
        } else if (blue >= 256) {
          green -= CYCLE_SPEED;
        } else {
          blue += CYCLE_SPEED;
        }
      } else if (blue >= 256) {
        if (green > 0) {
          green -= CYCLE_SPEED;
        } else if (red >= 256) {
          blue -= CYCLE_SPEED;
        } else {
          red += CYCLE_SPEED;
        }
      }
      return `rgb(${red}, ${green}, ${blue})`;
    }

    // Draw a line between two points
    function drawLine(
      startX: number,
      startY: number,
      endX: number,
      endY: number,
    ) {
      if (!ctx) return;
      ctx.beginPath();
      ctx.strokeStyle = nextColor();
      ctx.lineWidth = 8;
      ctx.lineCap = "round";
      ctx.moveTo(startX, startY);
      ctx.lineTo(endX, endY);
      ctx.stroke();
      ctx.closePath();
    }

    // Compute the sound wave, start playing it, animate the path, then stop it
    async function handlePath(drawnPath: number[][]) {
      const rotatedTranslatedPath = rotateTranslate(drawnPath);
      const unscaledWave = everyXOnce(rotatedTranslatedPath);
      const scaledWave = scaleWave(unscaledWave);
      const bufferIdx = getCurrentBuffer();
      startPlayingWave(scaledWave, bufferIdx);
      await animatePath(drawnPath, unscaledWave);
      stopPlayingWave(bufferIdx);
    }

    // Rotate and translate the path so the first point is at the origin and the
    // last point has y = 0 and x > 0
    function rotateTranslate(drawnPath: number[][]) {
      const startX = drawnPath[0][0];
      const startY = drawnPath[0][1];
      let angle = Math.atan2(
        drawnPath[drawnPath.length - 1][1] - startY,
        drawnPath[drawnPath.length - 1][0] - startX,
      );
      if (angle < 0) {
        angle += 2 * Math.PI;
      }
      const cosAngle = Math.cos(-angle);
      const sinAngle = Math.sin(-angle);
      return drawnPath.map((point) => {
        const newX =
          cosAngle * (point[0] - startX) - sinAngle * (point[1] - startY);
        const newY =
          sinAngle * (point[0] - startX) + cosAngle * (point[1] - startY);
        return [newX, newY];
      });
    }

    // Convert the path to a wave with indices as x-values
    function everyXOnce(drawnPath: number[][]) {
      const length = drawnPath[drawnPath.length - 1][0] + 1;
      const wave = new Float32Array(length);
      wave[0] = 0;
      let waveIdx = 1;
      let localPrevX = 0;
      let localPrevY = 0;
      let highestX = 0;
      for (let i = 1; i < drawnPath.length; i++) {
        if (drawnPath[i][0] > highestX) {
          highestX = Math.floor(drawnPath[i][0]);
          const xDiff = highestX - localPrevX;
          const yDiff = drawnPath[i][1] - localPrevY;
          let xDone = 0;
          while (xDone < xDiff && waveIdx < wave.length) {
            wave[waveIdx] = wave[waveIdx - 1] + yDiff / xDiff;
            waveIdx++;
            xDone++;
          }
        }
        localPrevX = highestX;
        localPrevY = wave[waveIdx - 1];
      }
      return wave;
    }

    // Scale the wave so that the highest value is 1 or -1
    function scaleWave(wave: Float32Array) {
      const scale = 1 / Math.max(...wave, Math.abs(Math.min(...wave)));
      const scaledWave = new Float32Array(wave.length);
      for (let i = 0; i < wave.length; i++) {
        scaledWave[i] = wave[i] * scale;
      }
      return scaledWave;
    }

    function getCurrentBuffer() {
      curBuffer = (curBuffer + 1) % BUFFER_COUNT;
      return curBuffer;
    }

    function startPlayingWave(
      wave: Float32Array<ArrayBuffer>,
      bufferIdx: number,
    ) {
      initBufferSource(bufferIdx);
      buffers[bufferIdx] = audioCtx.createBuffer(
        1,
        wave.length,
        audioCtx.sampleRate,
      );
      buffers[bufferIdx].copyToChannel(wave, 0);
      bufferSources[bufferIdx].buffer = buffers[bufferIdx];
      bufferSources[bufferIdx].start();
      gainNodes[bufferIdx].gain.setTargetAtTime(1, audioCtx.currentTime, 0.01);
    }

    function initBufferSource(bufferIdx: number) {
      if (bufferSources[bufferIdx]) {
        bufferSources[bufferIdx].stop();
        bufferSources[bufferIdx].disconnect(gainNodes[bufferIdx]);
      }
      bufferSources[bufferIdx] = audioCtx.createBufferSource();
      bufferSources[bufferIdx].connect(gainNodes[bufferIdx]);
      bufferSources[bufferIdx].loop = true;
    }

    async function animatePath(oldPath: number[][], newWave: Float32Array) {
      await erasePath(oldPath);
      await drawAndErase(
        path[path.length - 1][0],
        path[path.length - 1][1],
        newWave,
      );
    }

    async function erasePath(drawnPath: number[][]) {
      for (let i = 0; i < drawnPath.length - 1; i++) {
        eraseLine(
          drawnPath[i][0],
          drawnPath[i][1],
          drawnPath[i + 1][0],
          drawnPath[i + 1][1],
        );
        await sleep(1);
      }
    }

    function eraseLine(
      startX: number,
      startY: number,
      endX: number,
      endY: number,
    ) {
      if (!ctx) return;
      ctx.beginPath();
      ctx.lineWidth = 12;
      ctx.lineCap = "round";
      ctx.strokeStyle = BACKGROUND_COLOR;
      ctx.moveTo(startX, startY);
      ctx.lineTo(endX, endY);
      ctx.stroke();
      ctx.closePath();
    }

    // Draw the sound wave emanating from the old path
    async function drawAndErase(
      startX: number,
      startY: number,
      newWave: Float32Array,
    ) {
      const repetitionX = newWave.length - 1;
      let repetitions = 0;
      let localPrevX = 0;
      let localPrevY = 0;
      const prevQueue: number[][] = [[startX, startY]];
      while (
        startX + localPrevX + repetitions * repetitionX <
        canvas!.width + TAIL_LENGTH + 1
      ) {
        const newX = localPrevX + 1;
        const newY = newWave[newX];
        prevQueue.push([
          startX + repetitions * repetitionX + newX,
          startY + newY,
        ]);
        drawLine(
          startX + repetitions * repetitionX + localPrevX,
          startY + localPrevY,
          startX + repetitions * repetitionX + newX,
          startY + newY,
        );
        if (prevQueue.length > TAIL_LENGTH) {
          eraseLine(
            prevQueue[0][0],
            prevQueue[0][1],
            prevQueue[1][0],
            prevQueue[1][1],
          );
          prevQueue.shift();
        }
        localPrevX = newX;
        localPrevY = newY;
        if (newX == newWave.length - 1) {
          localPrevX = 0;
          repetitions++;
        }
        if (localPrevX % DRAW_SPEED == 0) {
          await sleep(1);
        }
      }
    }

    function stopPlayingWave(bufferIdx: number) {
      gainNodes[bufferIdx].gain.setTargetAtTime(0, audioCtx.currentTime, 0.2);
    }

    function sleep(ms: number) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    }

    const onPointerDown = (event: PointerEvent) => {
      // Browsers start the audio context suspended until a user gesture.
      if (audioCtx.state === "suspended") {
        void audioCtx.resume();
      }
      mouseDown = true;
      prevX = event.offsetX;
      prevY = event.offsetY;
      resetPath();
    };

    const onPointerUp = () => {
      if (path.length > 1) {
        handlePath([...path]); // spread so the animation keeps its own copy
      }
      mouseDown = false;
      curBuffer = (curBuffer + 1) % BUFFER_COUNT;
    };

    const onMouseMove = (event: MouseEvent) => {
      if (mouseDown) {
        plot(event.offsetX, event.offsetY);
        draw(event.offsetX, event.offsetY);
      }
    };

    canvas.addEventListener("pointerdown", onPointerDown);
    canvas.addEventListener("mousemove", onMouseMove);
    window.addEventListener("pointerup", onPointerUp);

    return () => {
      canvas.removeEventListener("pointerdown", onPointerDown);
      canvas.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("pointerup", onPointerUp);
      void audioCtx.close();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`${styles.canvasFrame} col-wide w-full overflow-hidden`}
    >
      <canvas ref={canvasRef} className="block touch-none">
        Draw on this canvas to hear your sound waves!
      </canvas>
    </div>
  );
}
