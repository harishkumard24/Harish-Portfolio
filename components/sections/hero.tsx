/* Hero section with the robot scene floating freely on the right. */
'use client';

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Code2, Github, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Spotlight } from "@/components/ui/spotlight";
import { SplineScene } from "@/components/ui/splite";

const roles = ["Software Engineer"] as const;

export function HeroSection() {
  const [roleIndex, setRoleIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  

  useEffect(() => {
    const handlePointerMove = (event: PointerEvent) => {
      const x = event.clientX / window.innerWidth - 0.5;
      const y = event.clientY / window.innerHeight - 0.5;

      document.documentElement.style.setProperty("--hero-mx", x.toFixed(4));
      document.documentElement.style.setProperty("--hero-my", y.toFixed(4));
    };

    const resetPointer = () => {
      document.documentElement.style.setProperty("--hero-mx", "0");
      document.documentElement.style.setProperty("--hero-my", "0");
    };

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerleave", resetPointer);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerleave", resetPointer);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative isolate min-h-[calc(100vh-5rem)] overflow-hidden pt-10 sm:pt-12 lg:pt-16"
    >
      <Spotlight className="-top-40 left-0 opacity-40 md:left-28 md:-top-24 lg:left-56" fill="#60a5fa" />

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_16%_18%,rgba(96,165,250,0.12),transparent_24%),radial-gradient(circle_at_84%_18%,rgba(255,255,255,0.05),transparent_18%),linear-gradient(180deg,rgba(0,0,0,0.06),rgba(0,0,0,0.34)_35%,rgba(0,0,0,0.82)_100%)]" />

      <div className="mx-auto grid min-h-[calc(100vh-7rem)] w-full max-w-[1440px] grid-cols-1 items-center gap-10 px-4 sm:px-6 lg:grid-cols-[1.03fr_0.97fr] lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative z-10 max-w-3xl"
        >
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-[11px] uppercase tracking-[0.34em] text-white/65 backdrop-blur-lg">
            <Code2 className="h-3.5 w-3.5 text-sky-400" />
            Software Engineer · AI Systems Builder · Researcher · Backend Developer
          </div>

          <p className="text-[11px] uppercase tracking-[0.38em] text-sky-300/80 sm:text-xs">
            Backend Developer
          </p>

          {/* <h1 className="mt-5 text-5xl font-semibold tracking-tight text-white sm:text-6xl lg:text-[5.35rem] lg:leading-[0.92]">
            Hi,
            <br />
            <span className="bg-gradient-to-r from-sky-300 via-sky-400 to-white bg-clip-text text-transparent">
              Harish Kumar D,
            </span>
            <br />
            <span className="font-serif text-white">{roles[roleIndex]}</span>
          </h1> */}

            <h1 className="mt-5 text-5xl font-serif font-bold tracking-tight text-white sm:text-6xl lg:text-[4.2rem] xl:text-[5.35rem] lg:leading-[1.05]">
            <span className="whitespace-nowrap bg-gradient-to-r from-sky-300 via-sky-400 to-white bg-clip-text text-transparent">
              Harish Kumar D,
            </span>
            <br />
            <span className="font-serif font-semibold not-italic text-white">{roles[roleIndex]}</span>
          </h1>


          <p className="mt-6 max-w-2xl text-base leading-8 text-white/68 sm:text-lg">
            I build reliable software, AI systems, and production workflows that make measurable business impact.
            My work spans backend engineering at Flipkart, AI/ML systems, and applied research.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild>
              <a href="#projects" className="group">
                View projects
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </a>
            </Button>

            <Button variant="secondary" asChild>
              <a href="#experience">See experience</a>
            </Button>

            <Button variant="ghost" size="sm" asChild>
              <a href="https://linkedin.com/in/harishkumard12" target="_blank" rel="noreferrer">
                <Linkedin className="h-4 w-4" />
                LinkedIn
              </a>
            </Button>

            <Button variant="ghost" size="sm" asChild>
              <a href="https://github.com/harishkumard24" target="_blank" rel="noreferrer">
                <Github className="h-4 w-4" />
                GitHub
              </a>
            </Button>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            {["Fast backend systems", "AI workflows", "Production reliability", "Clear execution"].map((item) => (
              <span
                key={item}
                className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-[11px] uppercase tracking-[0.2em] text-white/65 backdrop-blur-lg"
              >
                {item}
              </span>
            ))}
          </div>
        </motion.div>

        <div className="relative min-h-[640px] lg:min-h-[calc(100vh-8rem)]">
          <div className="pointer-events-none absolute inset-y-[8%] right-[-2%] left-[8%] rounded-full bg-[radial-gradient(circle_at_50%_40%,rgba(96,165,250,0.24),transparent_45%),radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.08),transparent_55%)] blur-3xl" />
          <div
            className="hero-robot absolute inset-0"
            style={{
              transform:
                "translate3d(calc(var(--hero-mx, 0) * 24px), calc(var(--hero-my, 0) * 16px), 0) rotateY(calc(var(--hero-mx, 0) * 10deg)) rotateX(calc(var(--hero-my, 0) * -8deg))",
            }}
          >
            <div className="absolute inset-0 flex items-center justify-center lg:justify-end">
              <div className="relative h-[78vh] min-h-[580px] w-full max-w-[760px] overflow-visible">
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_48%,rgba(96,165,250,0.16),transparent_45%),linear-gradient(180deg,transparent,rgba(0,0,0,0.35))]" />
                <SplineScene
                  scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
                  className="h-full w-full overflow-visible"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}