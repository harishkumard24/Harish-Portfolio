/* About section rendered as transparent glass panels instead of heavy cards. */
'use client';

import { motion } from "framer-motion";
import { BrainCircuit, BriefcaseBusiness, Database, Rocket, ShieldCheck, Sparkles } from "lucide-react";
import { highlights } from "@/lib/site-data";

const strengths = [
  { label: "Backend Systems", icon: BriefcaseBusiness },
  { label: "AI / ML", icon: BrainCircuit },
  { label: "Data Pipelines", icon: Database },
  { label: "Product Thinking", icon: Rocket },
  { label: "Reliability", icon: ShieldCheck },
  { label: "Technical Writing", icon: Sparkles },
] as const;

export function AboutSection() {
  return (
    <section id="about" className="py-24 sm:py-28">
      <div className="mb-10 space-y-3">
        <p className="text-[11px] uppercase tracking-[0.38em] text-white/45">About</p>
        <h2 className="max-w-4xl bg-gradient-to-r from-sky-400 to-white bg-clip-text font-serif not-italic font-semibold text-4xl  tracking-tight text-transparent sm:text-5xl lg:text-6xl">
          Engineering depth. Product instinct. Calm execution.
        </h2>
        <p className="max-w-3xl text-base leading-8 text-white/65 sm:text-lg">
          I like building systems that look elegant from the outside and stay reliable under pressure.
          My focus is on backend scalability, AI workflows, and user-facing experiences that feel polished.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="rounded-[28px] border border-white/10 bg-white/[0.02] p-6 shadow-[0_24px_80px_rgba(0,0,0,0.36)] backdrop-blur-xl sm:p-8">
          <div className="mb-6 flex items-center justify-between gap-4">
            <div>
              <div className="text-[11px] uppercase tracking-[0.28em] text-sky-300/80">What I bring</div>
              <h3 className="mt-2 text-2xl font-semibold text-white sm:text-3xl">Systems thinking with product taste.</h3>
            </div>
            <div className="rounded-full border border-sky-400/20 bg-sky-400/10 px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-sky-200">
              Builder mindset
            </div>
          </div>

          <p className="max-w-2xl text-sm leading-8 text-white/70 sm:text-base">
            Backend engineering, AI/ML systems, applied research, and a habit of turning ambiguous problems into clear execution plans.
            I care about clean interfaces, measurable outcomes, and work that feels senior in both design and implementation.
          </p>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {highlights.map((item, index) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                viewport={{ once: true }}
                className="rounded-2xl border border-white/10 bg-black/20 px-4 py-4 text-sm text-white/78 backdrop-blur-md"
              >
                {item}
              </motion.div>
            ))}
          </div>
        </div>

        <div className="rounded-[28px] border border-white/10 bg-white/[0.02] p-6 shadow-[0_24px_80px_rgba(0,0,0,0.36)] backdrop-blur-xl sm:p-8">
          <div className="text-[11px] uppercase tracking-[0.28em] text-sky-300/80">Core strengths</div>
          <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {strengths.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.label}
                  className="rounded-2xl border border-white/10 bg-black/18 p-4 transition hover:border-sky-400/30 hover:bg-white/[0.04]"
                >
                  <Icon className="h-5 w-5 text-sky-400" />
                  <div className="mt-3 text-sm font-medium text-white">{item.label}</div>
                </div>
              );
            })}
          </div>

          <div className="mt-6 rounded-2xl border border-white/10 bg-black/18 p-5 text-sm leading-7 text-white/70">
            Recent work includes Flipkart rate-card automation, ContextBridge, RAG chunking evaluation, churn prediction, and vision-based cancer detection.
          </div>
        </div>
      </div>
    </section>
  );
}
