/* Hero section with the robot scene floating freely on the right. */
"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Code2, Github, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Spotlight } from "@/components/ui/spotlight";
import { SplineScene } from "@/components/ui/splite";

const roles = ["Software Engineer", "Backend Engineer", "GenAI Engineer"] as const;

export function HeroSection() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [viewport, setViewport] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateDeviceState = () => {
      const coarsePointer = window.matchMedia("(pointer: coarse)").matches;
      const noHover = window.matchMedia("(hover: none)").matches;
      setIsTouchDevice(coarsePointer || noHover);
      setViewport({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    updateDeviceState();
    window.addEventListener("resize", updateDeviceState);

    return () => {
      window.removeEventListener("resize", updateDeviceState);
    };
  }, []);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 2000);

    return () => window.clearInterval(interval);
  }, []);

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

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerleave", resetPointer);
    window.addEventListener("pointerup", resetPointer);
    window.addEventListener("pointercancel", resetPointer);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerleave", resetPointer);
      window.removeEventListener("pointerup", resetPointer);
      window.removeEventListener("pointercancel", resetPointer);
    };
  }, []);

  const isSmallScreen = viewport.width > 0 && viewport.width < 640;
  const isTablet = viewport.width >= 640 && viewport.width < 1024;

  const robotScale = isSmallScreen ? 0.84 : isTablet ? 0.92 : 1;
  const robotDrop = isSmallScreen ? 18 : isTablet ? 10 : 0;
  const robotShiftX = isSmallScreen ? 0 : 14;

  const robotTransform = isTouchDevice
    ? `translate3d(calc(var(--hero-mx, 0) * 10px + ${robotShiftX}px), calc(var(--hero-my, 0) * 8px + ${robotDrop}px), 0) rotateY(calc(var(--hero-mx, 0) * 4deg)) rotateX(calc(var(--hero-my, 0) * -2deg)) scale(${robotScale})`
    : `translate3d(calc(var(--hero-mx, 0) * 24px + ${robotShiftX}px), calc(var(--hero-my, 0) * 16px + ${robotDrop}px), 0) rotateY(calc(var(--hero-mx, 0) * 10deg)) rotateX(calc(var(--hero-my, 0) * -8deg)) scale(${robotScale})`;

  return (
    <section
      id="home"
      className="relative isolate min-h-[calc(100vh-5rem)] overflow-visible pt-8 sm:pt-12 lg:pt-16"
    >
      <Spotlight className="-top-40 left-0 opacity-40 md:-top-24 md:left-28 lg:left-56" fill="#60a5fa" />

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_16%_18%,rgba(96,165,250,0.12),transparent_24%),radial-gradient(circle_at_84%_18%,rgba(255,255,255,0.05),transparent_18%),linear-gradient(180deg,rgba(0,0,0,0.06),rgba(0,0,0,0.34)_35%,rgba(0,0,0,0.82)_100%)]" />

      <div className="mx-auto grid min-h-[calc(100vh-7rem)] w-full max-w-[1440px] grid-cols-1 items-center gap-8 px-4 sm:px-6 lg:grid-cols-[1.03fr_0.97fr] lg:gap-10 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative z-10 mx-auto w-full max-w-3xl text-center lg:mx-0 lg:text-left"
        >
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-[10px] uppercase tracking-[0.28em] text-white/65 backdrop-blur-lg sm:text-[11px] sm:tracking-[0.34em]">
            <Code2 className="h-3.5 w-3.5 text-sky-400" />
            Software Engineer · AI Systems Builder · Researcher · Backend Developer
          </div>

          <p className="text-[10px] uppercase tracking-[0.3em] text-sky-300/80 sm:text-[11px] sm:tracking-[0.38em]">
            Backend Developer
          </p>

          <h1 className="mt-5 text-[2.5rem] font-serif font-bold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-[4.2rem] xl:text-[5.35rem] leading-tight lg:leading-[1.05]">
            <span className="block break-words bg-gradient-to-r from-sky-300 via-sky-400 to-white bg-clip-text text-transparent">
              Harish Kumar D,
            </span>
            <span className="mt-2 block font-serif font-semibold not-italic text-white">
              {roles[roleIndex]}
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-white/68 sm:text-base sm:leading-8 lg:mx-0 lg:text-lg">
            I build reliable software, AI systems, and production workflows that make measurable business impact.
            My work spans backend engineering at Flipkart, AI/ML systems, and applied research.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row lg:justify-start">
            <Button asChild className="w-full sm:w-auto">
              <a href="#projects" className="group">
                View projects
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </a>
            </Button>

            <Button variant="secondary" asChild className="w-full sm:w-auto">
              <a href="#experience">See experience</a>
            </Button>

            <Button variant="ghost" size="sm" asChild className="w-full sm:w-auto">
              <a href="https://linkedin.com/in/harishkumard12" target="_blank" rel="noreferrer">
                <Linkedin className="h-4 w-4" />
                LinkedIn
              </a>
            </Button>

            <Button variant="ghost" size="sm" asChild className="w-full sm:w-auto">
              <a href="https://github.com/harishkumard24" target="_blank" rel="noreferrer">
                <Github className="h-4 w-4" />
                GitHub
              </a>
            </Button>
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-3 lg:justify-start">
            {["Fast backend systems", "AI workflows", "Production reliability", "Clear execution"].map((item) => (
              <span
                key={item}
                className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-[10px] uppercase tracking-[0.18em] text-white/65 backdrop-blur-lg sm:text-[11px] sm:tracking-[0.2em]"
              >
                {item}
              </span>
            ))}
          </div>
        </motion.div>

        <div className="relative min-h-[320px] sm:min-h-[440px] lg:min-h-[calc(100vh-8rem)] overflow-visible">
          <div className="pointer-events-none absolute inset-y-[12%] right-[-2%] left-[8%] rounded-full bg-[radial-gradient(circle_at_50%_40%,rgba(96,165,250,0.24),transparent_45%),radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.08),transparent_55%)] blur-3xl" />

          <div
            className="hero-robot absolute inset-0 z-20 flex items-center justify-center lg:justify-end"
            style={{
              transform: robotTransform,
              transformOrigin: "center center",
              transition: "transform 180ms ease-out",
              touchAction: "pan-y",
            }}
          >
            <div className="relative h-[clamp(320px,64vw,520px)] w-full max-w-[760px] overflow-visible sm:h-[clamp(400px,56vw,620px)] lg:h-[78vh]">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_48%,rgba(96,165,250,0.05),transparent_45%),linear-gradient(180deg,transparent,rgba(0,0,0,0.08))]" />
              <SplineScene
                scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
                className="h-full w-full overflow-visible scale-[0.94] sm:scale-100 lg:scale-[1.02]"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}