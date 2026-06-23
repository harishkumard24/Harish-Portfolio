/* Timeline section for work experience and measurable impact. */
'use client';

import { motion } from "framer-motion";
import { experience } from "@/lib/site-data";

export function ExperienceSection() {
  return (
    <section id="experience" className="py-24 sm:py-28">
      <div className="mb-10 space-y-3">
        <p className="text-[11px] uppercase tracking-[0.38em] text-white/45">Experience</p>
        <h2 className="max-w-4xl bg-gradient-to-r from-sky-400 to-white bg-clip-text font-serif not-italic font-bold text-4xl tracking-tight text-transparent sm:text-5xl lg:text-6xl">
          Where I’ve made impact.
        </h2>
        <p className="max-w-3xl text-base leading-8 text-white/65 sm:text-lg">
          Backend engineering, AI systems, and product operations across teams and workflows.
        </p>
      </div>

      <div className="relative">
        <div className="absolute left-3 top-4 bottom-4 w-px bg-gradient-to-b from-transparent via-white/18 to-transparent sm:left-4" />
        <div className="grid gap-5">
          {experience.map((item, index) => (
            <motion.article
              key={item.company}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.099 }}
              viewport={{ once: true }}
              className="relative pl-10 sm:pl-12"
            >
              <span className="absolute left-0 top-6 h-3 w-3 rounded-full bg-sky-400 shadow-[0_0_0_6px_rgba(96,165,250,0.08)] sm:left-0.5" />
              <div className="rounded-[28px] border border-white/10 bg-white/[0.02] p-6 shadow-[0_24px_80px_rgba(0,0,0,0.36)] backdrop-blur-xl sm:p-8">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <div className="flex flex-wrap items-baseline gap-3">
                      <h3 className="text-xl font-semibold text-white">{item.company}</h3>
                      <span className="text-[12px] uppercase tracking-[0.22em] text-slate-400">{item.period}</span>
                    </div>
                    <p className="mt-2 text-sm uppercase tracking-[0.22em] text-blue-300">{item.role}</p>
                  </div>
                  <div className="rounded-full border border-sky-400/20 bg-sky-400/10 px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-sky-200">
                    Selected role
                  </div>
                </div>

                <p className="mt-4 max-w-4xl text-sm leading-8 text-white/72 sm:text-base">
                  {item.summary}
                </p>

                <ul className="mt-5 space-y-3 text-sm leading-7 text-slate-400 sm:text-base">
                  {item.bullets.map((bullet) => (
                    <li key={bullet} className="flex gap-3">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-sky-400" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
