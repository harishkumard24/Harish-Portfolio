/* Auto-rotating featured projects carousel with a transparent premium shell. */
'use client';

import { useEffect, useMemo, useRef, useState } from "react";
import { projects } from "@/lib/site-data";

export function ProjectsSection() {
  const items = useMemo(() => projects, []);
  const [active, setActive] = useState(0);
  const shellRef = useRef<HTMLDivElement>(null);

  // Re-arms every time `active` changes — including from a manual
  // prev/next click — so clicking effectively resets the auto-advance
  // countdown instead of fighting a fixed-schedule interval.
  useEffect(() => {
    const id = window.setTimeout(() => {
      setActive((value) => (value + 1) % items.length);
    }, 4500);

    return () => window.clearTimeout(id);
  }, [active, items.length]);

  const prev = () => setActive((value) => (value - 1 + items.length) % items.length);
  const next = () => setActive((value) => (value + 1) % items.length);

  const normalize = (offset: number) => {
    const half = Math.floor(items.length / 2);
    let value = offset;
    while (value > half) value -= items.length;
    while (value < -half) value += items.length;
    return value;
  };

  return (
    <section id="projects" className="py-24 sm:py-28">
      <div className="mb-10 space-y-3">
        <p className="text-[11px] uppercase tracking-[0.38em] text-white/45">Technical Projects</p>
        <h2 className="max-w-4xl bg-gradient-to-r from-sky-400 to-white bg-clip-text font-serif font-bold not-italic text-4xl tracking-tight text-transparent sm:text-5xl lg:text-6xl">
          Products I’ve built.
        </h2>
        <p className="max-w-3xl text-base leading-8 not-italic text-white/65 sm:text-lg">
          A centered carousel with one active card in front, two readable side cards on each side, and a soft circular frame in the background.
        </p>
      </div>

      <div
        ref={shellRef}
        className="relative overflow-hidden rounded-[34px] border border-white/8 bg-white/[0.015] px-2 py-10 shadow-[0_24px_80px_rgba(0,0,0,0.38)] backdrop-blur-xl sm:px-8 lg:px-12"
        style={{ perspective: "2200px" }}
      >
        <div className="pointer-events-none absolute inset-[10%_14%] rounded-full border border-white/5" />
        <div className="pointer-events-none absolute inset-[18%_22%] rounded-full border border-dashed border-white/5" />

        <button
          type="button"
          onClick={prev}
          className="absolute left-2 top-1/2 z-20 -translate-y-1/2 text-5xl font-light text-white/55 transition hover:text-sky-400 sm:left-3 sm:text-6xl"
          aria-label="Previous project"
        >
          &lt;
        </button>
        <button
          type="button"
          onClick={next}
          className="absolute right-2 top-1/2 z-20 -translate-y-1/2 text-5xl font-light text-white/55 transition hover:text-sky-400 sm:right-3 sm:text-6xl"
          aria-label="Next project"
        >
          &gt;
        </button>

        <div className="relative h-[265px] sm:h-[380px]">
          {items.map((item, index) => {
            const offset = normalize(index - active);
            const abs = Math.abs(offset);
            const isCenter = offset === 0;
            // Now keep three tiers visible per side: center (0), near (1), far (2).
            const isVisible = abs <= 2;

            const shellWidth = Math.max(320, shellRef.current?.getBoundingClientRect().width || 1200);
            const isSmall = shellWidth <= 720;
            const isTablet = shellWidth <= 1120;

            // Near (offset 1) and far (offset 2) get their own x/z steps instead
            // of far reusing one big jump — this is what actually produces two
            // distinct, evenly-spaced side cards per direction.
            const nearOffset = isSmall ? Math.round(shellWidth * 0.34) : isTablet ? Math.round(shellWidth * 0.27) : 260;
            const farOffset = isSmall ? Math.round(shellWidth * 0.58) : isTablet ? Math.round(shellWidth * 0.46) : 460;

            const x = isCenter ? 0 : abs === 1 ? nearOffset * Math.sign(offset) : farOffset * Math.sign(offset);
            const z = isCenter ? (isSmall ? 240 : 280) : abs === 1 ? (isSmall ? 130 : 150) : isSmall ? 40 : 30;
            const scale = isCenter ? 1 : abs === 1 ? 0.86 : 0.72;

            // Center stays fully opaque and dark as-is; near side card is
            // clearly visible; far side card is the new dimmer tier.
            const opacity = isCenter ? 1 : abs === 1 ? 0.75 : 0.32;

            const zIndex = 100 - abs;
            const blur = isCenter ? 0 : abs === 1 ? 0 : 1.5;
            return (
              <article
                key={`${item.title}-${index}`}
                className="absolute left-1/2 top-1/2 w-[min(88vw,340px)] will-change-transform sm:w-[min(92vw,360px)]"
                style={{
                  zIndex,
                  opacity: isVisible ? opacity : 0,
                  filter: `blur(${blur}px)`,
                  transform: `translate(-50%, -50%) translateX(${x}px) translateZ(${z}px) scale(${scale})`,
                  transformStyle: "preserve-3d",
                  backfaceVisibility: "hidden",
                  transition:
                    "transform 920ms cubic-bezier(.2,.85,.2,1), opacity 920ms ease, filter 920ms ease",
                }}
              >
                <div
                  className={
                    isCenter
                      ? "relative overflow-hidden rounded-[28px] border border-sky-400/20 bg-slate-950/95 p-0 shadow-[0_0_0_1px_rgba(96,165,250,0.10),0_28px_80px_rgba(0,0,0,0.42)] backdrop-blur-2xl"
                      : "relative overflow-hidden rounded-[28px] border border-white/8 bg-slate-950/95 p-0 backdrop-blur-2xl"
                  }
                >
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),transparent_34%)] opacity-80" />
                  <div className="relative p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="text-[11px] uppercase tracking-[0.25em] text-sky-300/80">{item.category}</div>
                        <h3 className="mt-3 text-xl font-semibold text-white">{item.title}</h3>
                      </div>
                      {isCenter ? (
                        <div className="rounded-full border border-sky-400/20 bg-sky-400/10 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-sky-200">
                          Featured
                        </div>
                      ) : null}
                    </div>

                    <p className="mt-4 text-sm leading-7 text-white/70">{item.description}</p>

                    <div className="mt-6 flex flex-wrap gap-2">
                      {item.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-white/10 bg-black/18 px-3 py-1 text-[11px] uppercase tracking-[0.14em] text-white/75"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="relative flex items-center justify-between border-t border-white/8 px-6 py-4 text-[11px] uppercase tracking-[0.22em] text-white/45">
                    <span>{item.footerLeft}</span>
                    <span>{item.footerRight}</span>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}