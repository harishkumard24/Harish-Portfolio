/* Skill rails: continuous requestAnimationFrame-driven marquee per row
 * (not CSS keyframes), so each row can be independently paused, dragged,
 * nudged with arrows, and auto-resumes after a few seconds of inactivity.
 *
 * Seamless-loop fix: render THREE copies of each row's items instead of
 * two. With only two copies, once the visible window scrolls past the
 * end of copy 2 there is nothing buffered yet for copy 3, so on rows
 * wider than one full set of chips you'd briefly see empty space before
 * the wrap reset kicks in. A third copy guarantees there's always a
 * full buffered set ahead of the visible window, so the wrap from
 * `cycleWidth` back to `0` lands on pixel-identical content and reads
 * as one continuous, gapless loop. */
'use client';

import { useEffect, useMemo, useRef, useState } from "react";
import { skills } from "@/lib/site-data";

const AUTO_RESUME_MS = 3000;

type RowState = {
  offset: number;
  cycleWidth: number;
  direction: 1 | -1;
  speed: number;
  paused: boolean;
  dragging: boolean;
  pointerId: number | null;
  pointerStartX: number;
  pointerStartOffset: number;
  lastFrameTs: number | null;
};

function wrapOffset(value: number, cycleWidth: number) {
  if (!Number.isFinite(cycleWidth) || cycleWidth <= 0) return 0;
  const wrapped = value % cycleWidth;
  return wrapped < 0 ? wrapped + cycleWidth : wrapped;
}

export function SkillsSection() {
  const rows = useMemo(() => skills, []);

  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);
  const trackRefs = useRef<(HTMLDivElement | null)[]>([]);
  const firstCopyRefs = useRef<(HTMLDivElement | null)[]>([]);
  const secondCopyRefs = useRef<(HTMLDivElement | null)[]>([]);

  const statesRef = useRef<RowState[]>(
    rows.map((row) => ({
      offset: 0,
      cycleWidth: 0,
      direction: row.direction === "right" ? -1 : 1,
      speed: row.speed,
      paused: false,
      dragging: false,
      pointerId: null,
      pointerStartX: 0,
      pointerStartOffset: 0,
      lastFrameTs: null,
    }))
  );

  const [activeRow, setActiveRow] = useState<number | null>(null);
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);
  const resumeTimer = useRef<number | null>(null);
  const rafRef = useRef<number | null>(null);

  const applyTransform = (index: number) => {
    const track = trackRefs.current[index];
    const state = statesRef.current[index];
    if (track && state) {
      track.style.transform = `translate3d(${-state.offset}px, 0, 0)`;
    }
  };

  // cycleWidth = the distance from the start of copy 1 to the start of
  // copy 2. Since copy 2 (and copy 3) are exact duplicates of copy 1,
  // scrolling exactly this distance and wrapping back to 0 is visually
  // seamless — the pixels at offset `cycleWidth` are identical to the
  // pixels at offset `0`.
  const measureRow = (index: number) => {
    const firstCopy = firstCopyRefs.current[index];
    const secondCopy = secondCopyRefs.current[index];
    const state = statesRef.current[index];
    if (!firstCopy || !secondCopy || !state) return;

    const cycle = secondCopy.getBoundingClientRect().left - firstCopy.getBoundingClientRect().left;
    if (Number.isFinite(cycle) && cycle > 1) {
      state.cycleWidth = cycle;
      state.offset = wrapOffset(state.offset, state.cycleWidth);
      applyTransform(index);
    }
  };

  const measureAll = () => {
    statesRef.current.forEach((_, index) => measureRow(index));
  };

  useEffect(() => {
    const observers: ResizeObserver[] = [];

    rows.forEach((_, index) => {
      const node = rowRefs.current[index];
      if (!node) return;
      const observer = new ResizeObserver(() => measureRow(index));
      observer.observe(node);
      observers.push(observer);
    });

    // Re-measure once after fonts/layout settle, in case the first
    // measurement happened before chip widths were final.
    const settleTimer = window.setTimeout(measureAll, 250);

    return () => {
      observers.forEach((observer) => observer.disconnect());
      window.clearTimeout(settleTimer);
    };
  }, [rows]);

  useEffect(() => {
    function tick(now: number) {
      statesRef.current.forEach((state, index) => {
        if (state.lastFrameTs === null) state.lastFrameTs = now;
        const elapsed = (now - state.lastFrameTs) / 1000;
        state.lastFrameTs = now;

        if (state.paused || state.dragging || !state.cycleWidth || state.cycleWidth <= 1) return;
        state.offset = wrapOffset(state.offset + state.direction * state.speed * elapsed, state.cycleWidth);
        applyTransform(index);
      });
      rafRef.current = window.requestAnimationFrame(tick);
    }

    rafRef.current = window.requestAnimationFrame(tick);

    return () => {
      if (rafRef.current) window.cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const clearResumeTimer = () => {
    if (resumeTimer.current) {
      window.clearTimeout(resumeTimer.current);
      resumeTimer.current = null;
    }
  };

  const resumeActiveRow = () => {
    clearResumeTimer();
    if (activeRow === null) return;
    const state = statesRef.current[activeRow];
    if (state) {
      state.paused = false;
      state.dragging = false;
      state.pointerId = null;
    }
    setActiveRow(null);
    setSelectedSkill(null);
  };

  const scheduleResume = () => {
    clearResumeTimer();
    resumeTimer.current = window.setTimeout(resumeActiveRow, AUTO_RESUME_MS);
  };

  const activateRow = (index: number, skill: string | null) => {
    if (activeRow !== null && activeRow !== index) {
      const previous = statesRef.current[activeRow];
      if (previous) {
        previous.paused = false;
        previous.dragging = false;
        previous.pointerId = null;
      }
    }

    const state = statesRef.current[index];
    if (state) state.paused = true;

    setActiveRow(index);
    if (skill) setSelectedSkill(skill);
    scheduleResume();
  };

  const nudgeRow = (index: number) => (direction: 1 | -1) => {
    const state = statesRef.current[index];
    const row = rowRefs.current[index];
    if (!state || !row || !state.cycleWidth) return;

    const step = Math.max(120, Math.min(220, row.clientWidth * 0.18));
    state.offset = wrapOffset(state.offset + direction * step, state.cycleWidth);
    applyTransform(index);

    if (activeRow === index) scheduleResume();
  };

  const handlePointerDown = (index: number) => (event: React.PointerEvent<HTMLDivElement>) => {
    const target = event.target as HTMLElement;
    if (target.closest("[data-skill-arrow]")) return;

    const chip = target.closest("[data-skill-chip]") as HTMLElement | null;
    activateRow(index, chip?.textContent ?? rows[index].items[0]);

    const state = statesRef.current[index];
    if (!state) return;
    state.dragging = true;
    state.pointerId = event.pointerId;
    state.pointerStartX = event.clientX;
    state.pointerStartOffset = state.offset;

    const row = rowRefs.current[index];
    try {
      row?.setPointerCapture(event.pointerId);
    } catch {
      // Pointer capture is optional.
    }
  };

  const handlePointerMove = (index: number) => (event: React.PointerEvent<HTMLDivElement>) => {
    const state = statesRef.current[index];
    if (!state || !state.dragging || state.pointerId !== event.pointerId) return;

    const deltaX = event.clientX - state.pointerStartX;
    if (Math.abs(deltaX) > 2) {
      state.offset = wrapOffset(state.pointerStartOffset - deltaX, state.cycleWidth);
      applyTransform(index);
      scheduleResume();
    }
  };

  const endPointerInteraction = (index: number) => (event: React.PointerEvent<HTMLDivElement>) => {
    const state = statesRef.current[index];
    if (!state || state.pointerId !== event.pointerId) return;

    state.dragging = false;
    state.pointerId = null;

    const row = rowRefs.current[index];
    try {
      row?.releasePointerCapture(event.pointerId);
    } catch {
      // Pointer capture is optional.
    }

    if (activeRow === index) scheduleResume();
  };

  useEffect(() => {
    return () => clearResumeTimer();
  }, []);

  return (
    <section id="skills" className="py-24 sm:py-28">
      <div className="mb-10 space-y-3">
        <p className="text-[11px] uppercase tracking-[0.38em] text-white/45">Skills</p>
        <h2 className="max-w-4xl bg-gradient-to-r from-sky-400 to-white bg-clip-text font-serif font-bold not-italic text-4xl tracking-tight text-transparent sm:text-5xl lg:text-6xl">
          Technical Toolkit.
        </h2>
        <p className="max-w-3xl text-base leading-8 text-white/65 sm:text-lg">
          Technologies I use to build, ship, debug, and scale products — based on the strength of your resume.
        </p>
      </div>

      <div className="overflow-hidden rounded-[28px] border border-white/8 bg-white/[0.02] px-4 py-5 shadow-[0_24px_80px_rgba(0,0,0,0.28)] backdrop-blur-xl sm:px-6">
        {rows.map((row, rowIndex) => {
          const isActive = activeRow === rowIndex;

          return (
            <div key={row.category} className={rowIndex > 0 ? "mt-6" : ""}>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 z-[2] w-20 bg-gradient-to-r from-black via-black/70 to-transparent" />
                <div className="pointer-events-none absolute inset-y-0 right-0 z-[2] w-20 bg-gradient-to-l from-black via-black/70 to-transparent" />

                {isActive ? (
                  <div className="pointer-events-none absolute inset-0 z-[3] flex items-center justify-between px-1">
                    <button
                      type="button"
                      data-skill-arrow
                      onClick={(event) => {
                        event.stopPropagation();
                        activateRow(rowIndex, selectedSkill ?? row.items[0]);
                        nudgeRow(rowIndex)(-1);
                      }}
                      className="pointer-events-auto text-4xl font-light leading-none text-white/75 transition hover:scale-110 hover:text-sky-400"
                      aria-label={`Move ${row.category} left`}
                    >
                      &lt;
                    </button>
                    <button
                      type="button"
                      data-skill-arrow
                      onClick={(event) => {
                        event.stopPropagation();
                        activateRow(rowIndex, selectedSkill ?? row.items[0]);
                        nudgeRow(rowIndex)(1);
                      }}
                      className="pointer-events-auto text-4xl font-light leading-none text-white/75 transition hover:scale-110 hover:text-sky-400"
                      aria-label={`Move ${row.category} right`}
                    >
                      &gt;
                    </button>
                  </div>
                ) : null}

                <div
                  ref={(node) => {
                    rowRefs.current[rowIndex] = node;
                  }}
                  className={`overflow-hidden touch-pan-y ${isActive ? "cursor-grab active:cursor-grabbing" : ""}`}
                  onPointerDown={handlePointerDown(rowIndex)}
                  onPointerMove={handlePointerMove(rowIndex)}
                  onPointerUp={endPointerInteraction(rowIndex)}
                  onPointerCancel={endPointerInteraction(rowIndex)}
                >
                  <div
                    ref={(node) => {
                      trackRefs.current[rowIndex] = node;
                    }}
                    className="flex w-max gap-3 will-change-transform"
                  >
                    {[0, 1, 2].map((copyIndex) => (
                      <div
                        key={copyIndex}
                        ref={(node) => {
                          if (copyIndex === 0) firstCopyRefs.current[rowIndex] = node;
                          if (copyIndex === 1) secondCopyRefs.current[rowIndex] = node;
                        }}
                        className="flex gap-3"
                      >
                        {row.items.map((item, index) => {
                          const selected = isActive && selectedSkill === item;
                          return (
                            <button
                              key={`copy${copyIndex}-${item}-${index}`}
                              type="button"
                              data-skill-chip
                              onClick={(event) => {
                                event.stopPropagation();
                                activateRow(rowIndex, item);
                              }}
                              className={`whitespace-nowrap rounded-full border px-4 py-2.5 text-sm transition-all ${
                                selected
                                  ? "scale-110 border-sky-400/30 bg-sky-400/15 text-sky-100 shadow-[0_0_0_1px_rgba(96,165,250,0.25)]"
                                  : "border-white/10 bg-white/[0.03] text-white/75 hover:bg-white/[0.07]"
                              }`}
                            >
                              {item}
                            </button>
                          );
                        })}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}