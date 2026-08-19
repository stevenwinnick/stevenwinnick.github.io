"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./GridIntro.module.css";

const HOLD_MS = 150;
const STAGGER_MS = 100;
const RETREAT_MS = 420;
/* The pause between the last row line leaving and the first column line going. */
const PHASE_GAP_MS = 500;

type Line = {
  /** Distance from the top of the screen for a row, from the left for a column. */
  offset: number;
  delayMs: number;
};

type Grid = {
  rowLines: Line[];
  columnLines: Line[];
  durationMs: number;
};

/**
 * Both edges of every module on the screen, in the order they retreat: the rows
 * from the bottom up, then the columns from the right in.
 *
 * The columns are measured rather than computed, since their width is fluid
 * below `cols2`, and `wide` only reaches past `main` once the outer columns
 * appear at `cols4`. The rows have no such element to measure: they are the
 * page's vertical rhythm, one gutter down from the top of the *page* and one
 * gutter between each pair, so that a reload part-way down the page still lands
 * the lines on the grid the content sits on.
 *
 * Returns null if the probes measure zero, which would mean the stylesheet has
 * not been applied and there is no grid to draw.
 */
function measureGrid(probes: {
  gutter: HTMLElement;
  moduleRow: HTMLElement;
  wide: HTMLElement;
  main: HTMLElement;
}): Grid | null {
  const gutter = probes.gutter.getBoundingClientRect().height;
  const rowHeight = probes.moduleRow.getBoundingClientRect().height;
  const period = rowHeight + gutter;
  if (period <= 0) {
    return null;
  }

  const wide = probes.wide.getBoundingClientRect();
  const main = probes.main.getBoundingClientRect();

  const columnCount = main.left - wide.left > 1 ? 4 : 2;
  const columnWidth = (wide.width - (columnCount - 1) * gutter) / columnCount;
  const columnOffsets: number[] = [];
  for (let column = 0; column < columnCount; column += 1) {
    const left = wide.left + column * (columnWidth + gutter);
    columnOffsets.push(left, left + columnWidth);
  }

  const viewportTop = window.scrollY;
  const viewportBottom = viewportTop + window.innerHeight;
  const rowOffsets: number[] = [];
  const firstRow = Math.max(0, Math.floor((viewportTop - gutter) / period));
  for (let row = firstRow; gutter + row * period < viewportBottom; row += 1) {
    const top = gutter + row * period;
    for (const edge of [top, top + rowHeight]) {
      if (edge >= viewportTop && edge < viewportBottom) {
        rowOffsets.push(edge - viewportTop);
      }
    }
  }

  const rowLines = rowOffsets
    .sort((a, b) => b - a)
    .map((offset, index) => ({
      offset,
      delayMs: HOLD_MS + index * STAGGER_MS,
    }));

  const columnsStartMs =
    HOLD_MS + (rowLines.length - 1) * STAGGER_MS + RETREAT_MS + PHASE_GAP_MS;
  const columnLines = columnOffsets
    .sort((a, b) => b - a)
    .map((offset, index) => ({
      offset,
      delayMs: columnsStartMs + index * STAGGER_MS,
    }));

  return {
    rowLines,
    columnLines,
    durationMs:
      columnsStartMs + (columnLines.length - 1) * STAGGER_MS + RETREAT_MS,
  };
}

/**
 * The landing page's opening animation: the grid the page is built on, drawn
 * over the visible area as a plaid of modules and gutters, retreating off the
 * screen a line at a time.
 */
export default function GridIntro() {
  const gutterRef = useRef<HTMLDivElement>(null);
  const moduleRowRef = useRef<HTMLDivElement>(null);
  const wideRef = useRef<HTMLDivElement>(null);
  const mainRef = useRef<HTMLDivElement>(null);
  const [grid, setGrid] = useState<Grid | null>(null);
  const [finished, setFinished] = useState(false);

  /*
   * The measurement waits for a frame so that the probes have been laid out,
   * and so that the grid is drawn in its own paint rather than in the one that
   * hydrates the page.
   */
  useEffect(() => {
    let timer = 0;
    const frame = window.requestAnimationFrame(() => {
      const gutter = gutterRef.current;
      const moduleRow = moduleRowRef.current;
      const wide = wideRef.current;
      const main = mainRef.current;
      if (!gutter || !moduleRow || !wide || !main) {
        return;
      }

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        setFinished(true);
        return;
      }

      const measured = measureGrid({ gutter, moduleRow, wide, main });
      if (!measured) {
        setFinished(true);
        return;
      }

      setGrid(measured);
      timer = window.setTimeout(() => setFinished(true), measured.durationMs);
    });

    return () => {
      window.cancelAnimationFrame(frame);
      window.clearTimeout(timer);
    };
  }, []);

  if (finished) {
    return null;
  }

  return (
    <>
      {/*
       * The rows sit under the header, which is opaque, so they stop at it
       * rather than striping the name and the menu toggle. The columns are drawn
       * over it, as the page's own frame is.
       */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-40 overflow-hidden"
      >
        {/* Measured, never seen: the page grid at the width of the screen. */}
        <div className="page-grid invisible absolute inset-0">
          <div ref={gutterRef} className="lines-1" />
          <div ref={moduleRowRef} className="rows-1" />
          <div ref={wideRef} className="col-wide" />
          <div ref={mainRef} className="col-main" />
        </div>

        {grid?.rowLines.map((line) => (
          <div
            key={`row-${line.offset}`}
            className={styles.rowLine}
            style={{
              top: `${line.offset}px`,
              animationDuration: `${RETREAT_MS}ms`,
              animationDelay: `${line.delayMs}ms`,
            }}
          />
        ))}
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-70 overflow-hidden"
      >
        {grid?.columnLines.map((line) => (
          <div
            key={`column-${line.offset}`}
            className={styles.columnLine}
            style={{
              left: `${line.offset}px`,
              animationDuration: `${RETREAT_MS}ms`,
              animationDelay: `${line.delayMs}ms`,
            }}
          />
        ))}
      </div>
    </>
  );
}
