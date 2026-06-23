/* Research section rendered as transparent cards with concise technical framing. */
'use client';

import { motion } from "framer-motion";
import { research } from "@/lib/site-data";

export function ResearchSection() {
  return (
    <section id="research" className="py-24 sm:py-28">
      <div className="mb-10 space-y-3">
        <p className="text-[11px] uppercase tracking-[0.38em] text-white/45">Research</p>
       <h2 className="max-w-4xl bg-gradient-to-r from-sky-400 to-white bg-clip-text font-serif font-bold not-italic text-4xl tracking-tight text-transparent sm:text-5xl lg:text-6xl">
          Academic work with measurable outcomes.
        </h2>
        <p className="max-w-3xl text-base leading-8 text-white/65 sm:text-lg">
          Applied ML and systems work with reproducible evaluation, not just flashy demos.
        </p>
      </div>

      <div className="grid gap-5 lg:grid-cols-3">
        {research.map((paper, index) => (
          <motion.article
            key={paper.title}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.06 }}
            viewport={{ once: true }}
            className="rounded-[28px] border border-white/10 bg-white/[0.02] p-6 shadow-[0_24px_80px_rgba(0,0,0,0.30)] backdrop-blur-xl"
          >
            <div className="text-[11px] uppercase tracking-[0.28em] text-blue-300">
              {index === 2 ? "Published" : "Under Review"}
            </div>
            <h3 className="mt-3 text-xl font-semibold leading-8 text-white">{paper.title}</h3>
            <p className="mt-3 text-sm leading-7 text-slate-400">{paper.summary}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {paper.metrics.map((metric) => (
                <span
                  key={metric}
                  className="rounded-full border border-white/10 bg-black/18 px-3 py-1 text-[11px] uppercase tracking-[0.14em] text-white"
                >
                  {metric}
                </span>
              ))}
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
