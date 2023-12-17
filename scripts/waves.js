// Set up audio
const audioCtx = new (window.AudioContext || window.webkitAudioContext)
const dynamicsCompressor = audioCtx.createDynamicsCompressor();
dynamicsCompressor.connect(audioCtx.destination);
const globalGain = audioCtx.createGain();
globalGain.connect(dynamicsCompressor);
globalGain.gain.value = 1;
const BUFFER_COUNT = 5;
let curBuffer = 0;
const buffers = Array(BUFFER_COUNT);
const bufferSources = Array(BUFFER_COUNT);
const gainNodes = Array(BUFFER_COUNT);
for (let i = 0; i < BUFFER_COUNT; i++) {
    gainNodes[i] = audioCtx.createGain();
    gainNodes[i].connect(globalGain);
    gainNodes[i].gain.value = 0;
}
const DECAY_TIME = 5

// Set up canvas
const canvasContainer = document.getElementById('canvasContainer');
const canvas = document.getElementById("mainCanvas");
canvas.width = canvasContainer.clientWidth;
canvas.height = canvasContainer.clientHeight;
const ctx = canvas.getContext("2d");
let mouseDown = false;
let path = [];
let prevX = 0;
let prevY = 0;
let prevR = 0;
let prevG = 0;
let prevB = 256;
const TAIL_LENGTH = 50;
const DRAW_SPEED = 3;
const TEXT_COLOR = '#FFFDE9'
const BACKGROUND_COLOR = '#181818';
const canvasText = 'DRAW SOUND WAVES';
ctx.font = '8vw soehne-dreiviertelfett';
const textWidth = ctx.measureText(canvasText).width;
const centerX = (canvas.width - textWidth) / 2;
const centerY = canvas.height / 2;
ctx.fillStyle = TEXT_COLOR;
ctx.fillText(canvasText, centerX, centerY);

// Track mouse clicks
window.onpointerdown = (event) => {
    mouseDown = true;
    prevX = event.offsetX;
    prevY = event.offsetY;
    resetPath();
};
window.onpointerup = (event) => {
    handlePath([...path]); // use spread syntax so that function has path after clear
    mouseDown = false
    curBuffer = (curBuffer + 1) % BUFFER_COUNT;
};

// Track mouse movement
window.onmousemove = (event) => {
    if (mouseDown) {
        plot(event.offsetX, event.offsetY);
        draw(event.offsetX, event.offsetY);
    }
};

function resetPath() {
    path = [];
}

function plot(x, y) {
    path.push([x, y]);
}

function draw(newX, newY) {
    drawLine(prevX, prevY, newX, newY);
    prevX = newX;
    prevY = newY;
}

// Draw a line between two points
function drawLine(startX, startY, endX, endY) {
    ctx.beginPath();
    ctx.strokeStyle = nextColor();
    ctx.lineWidth = 8;
    ctx.lineCap = "round";
    ctx.moveTo(startX, startY);
    ctx.lineTo(endX, endY);
    ctx.stroke();
    ctx.closePath();
  }

// Cycle through the colors
function nextColor() {
    const CYCLE_SPEED = 3;
    if (prevR >= 256) {
        if (prevB > 0) {
            prevB = prevB - CYCLE_SPEED;
        } else if (prevG >= 256) {
            prevR = prevR - CYCLE_SPEED;
        }
        else {
            prevG = prevG + CYCLE_SPEED;
        }
    } else if (prevG >= 256) {
        if (prevR > 0) {
            prevR = prevR - CYCLE_SPEED;
        } else if (prevB >= 256) {
            prevG = prevG - CYCLE_SPEED;
        }
        else {
            prevB = prevB + CYCLE_SPEED;
        }
    } else if (prevB >= 256) {
        if (prevG > 0) {
            prevG = prevG - CYCLE_SPEED;
        } else if (prevR >= 256) {
            prevB = prevB - CYCLE_SPEED;
        }
        else {
            prevR = prevR + CYCLE_SPEED;
        }
    }
    return `rgb(${prevR}, ${prevG}, ${prevB})`;
}

// Compute the sound wave, start playing it, animate the path, then stop the sound
async function handlePath(path) {
    const rotatedTranslatedPath = rotateTranslate(path);
    const unscaledWave = everyXOnce(rotatedTranslatedPath);
    const scaledWave = scaleWave(unscaledWave);
    const bufferIdx = getCurrentBuffer();
    startPlayingWave(scaledWave, bufferIdx);
    await animatePath(path, unscaledWave);
    stopPlayingWave(bufferIdx);
}

// Rotate and translate the path so that the first point is at the origin and 
// the last point has y = 0 and x > 0
function rotateTranslate(path) {
    const startX = path[0][0];
    const startY = path[0][1];
    let angle = Math.atan2(path[path.length - 1][1] - startY, path[path.length - 1][0] - startX);
    if (angle < 0) {
        angle += 2 * Math.PI;
    }
    const cosAngle = Math.cos(-angle);
    const sinAngle = Math.sin(-angle);
    let rotatedTranslatedPath = path.map((point) => {
        const newX = cosAngle * (point[0] - startX) - sinAngle * (point[1] - startY);
        const newY = sinAngle * (point[0] - startX) + cosAngle * (point[1] - startY);

        return [newX, newY];
    })
    return rotatedTranslatedPath;
}

// Convert the path to a wave with indices as x-values
function everyXOnce(path) {
    const length = path[path.length - 1][0] + 1;
    const wave = new Float32Array(length);
    wave[0] = 0;
    let waveIdx = 1;
    let prevX = prevY = 0;
    let highestX = 0;
    for (let i = 1; i < path.length; i++) {
        if (path[i][0] > highestX) {
            highestX = Math.floor(path[i][0]);
            const xDiff = highestX - prevX;
            const yDiff = path[i][1] - prevY;
            let xDone = 0;
            while (xDone < xDiff && waveIdx < wave.length) {
                wave[waveIdx] = wave[waveIdx - 1] + (yDiff / xDiff);
                waveIdx++;
                xDone++;
            }
        }
        prevX = highestX;
        prevY = wave[waveIdx - 1];
    }
    return wave;
}

// Scale the wave so that the highest value is 1 or -1
function scaleWave(wave) {
    const scale = 1 / Math.max(...wave, Math.abs(Math.min(...wave)))
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

function startPlayingWave(wave, bufferIdx) {
    initBufferSource(bufferIdx);
    buffers[bufferIdx] = audioCtx.createBuffer(1, wave.length, audioCtx.sampleRate);
    buffers[bufferIdx].copyToChannel(wave, 0);
    bufferSources[bufferIdx].buffer = buffers[bufferIdx];
    bufferSources[bufferIdx].start();
    gainNodes[bufferIdx].gain.setTargetAtTime(1, audioCtx.currentTime, 0.01)
}

function initBufferSource(bufferIdx) {
    if (bufferSources[bufferIdx]) {
        bufferSources[bufferIdx].stop();
        bufferSources[bufferIdx].disconnect(gainNodes[bufferIdx]);
    }
    bufferSources[bufferIdx] = audioCtx.createBufferSource();
    bufferSources[bufferIdx].connect(gainNodes[bufferIdx]);
    bufferSources[bufferIdx].loop = true;
}

async function animatePath(oldPath, newWave) {
    await erasePath(oldPath);
    await drawAndErase(path[path.length - 1][0], path[path.length - 1][1], newWave);
}

async function erasePath(path) {
    for (let i = 0; i < path.length - 1; i++) {
        eraseLine(path[i][0], path[i][1], path[i + 1][0], path[i + 1][1]);
        await sleep(1);
    }
}

function eraseLine(startX, startY, endX, endY) {
    ctx.beginPath();
    ctx.lineWidth = 12;
    ctx.lineCap = "round";
    ctx.strokeStyle = BACKGROUND_COLOR;
    ctx.moveTo(startX, startY);
    ctx.lineTo(endX, endY);
    ctx.stroke();
    ctx.closePath();
}

// Draw the sound wave eminating from the old path
async function drawAndErase(startX, startY, newWave) {
    const repetitionX = newWave.length - 1;
    let repetitions = 0;
    let prevX = 0;
    let prevY = 0;
    let prevQueue = [[startX, startY]];
    while (startX + prevX + (repetitions * repetitionX) < canvas.width + TAIL_LENGTH + 1) {
        const newX = prevX + 1;
        const newY = newWave[newX];
        prevQueue.push([startX + (repetitions * repetitionX) + newX, startY + newY]);
        drawLine(startX + (repetitions * repetitionX) + prevX, startY + prevY, 
                 startX + (repetitions * repetitionX) + newX, startY + newY);
        if (prevQueue.length > TAIL_LENGTH) {
            eraseLine(prevQueue[0][0], prevQueue[0][1], prevQueue[1][0], prevQueue[1][1]);
            prevQueue.shift();
        }
        prevX = newX;
        prevY = newY;
        if (newX == newWave.length - 1) {
            prevX = 0;
            repetitions++;
        }
        if (prevX % DRAW_SPEED == 0) {
            await sleep(1);
        }
    }
    return;
}

function stopPlayingWave(bufferIdx) {
    gainNodes[bufferIdx].gain.setTargetAtTime(0, audioCtx.currentTime, 0.2)
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}