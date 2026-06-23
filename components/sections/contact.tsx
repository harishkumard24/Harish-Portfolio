/* Final contact strip to close the page with a transparent premium panel. */
'use client';

import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { contactLinks } from "@/lib/site-data";

export function ContactSection() {
  return (
    <section id="contact" className="py-24 sm:py-28">
      <div className="rounded-[32px] border border-white/10 bg-white/[0.02] p-6 text-center shadow-[0_24px_80px_rgba(0,0,0,0.34)] backdrop-blur-xl sm:p-8 lg:p-10">
        <div className="mx-auto max-w-3xl">
          <p className="text-[11px] uppercase tracking-[0.38em] text-white/45">Contact</p>
          <h2 className="mt-3 bg-gradient-to-r from-sky-400 to-white bg-clip-text text-4xl font-serif italic tracking-tight text-transparent sm:text-5xl">
            Let’s build something clean, fast, and credible.
          </h2>
          <p className="mt-4 text-base leading-8 text-white/65 sm:text-lg">
            Open to product-focused engineering roles, AI systems work, and backend-heavy teams that care about quality and execution.
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-3">
            {contactLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Button key={link.label} variant="secondary" asChild>
                  <a href={link.href} target={link.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer">
                    <Icon className="h-4 w-4" />
                    {link.label}
                    <ArrowUpRight className="h-4 w-4" />
                  </a>
                </Button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}