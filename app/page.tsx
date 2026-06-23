/* Main page composed from premium sections and the full-screen flow-field background. */
import NeuralBackground from "@/components/ui/flow-field-background";
import { HeroSection } from "@/components/sections/hero";
import { AboutSection } from "@/components/sections/about";
import { ExperienceSection } from "@/components/sections/experience";
import { ProjectsSection } from "@/components/sections/projects";
import { SkillsSection } from "@/components/sections/skills";
import { ResearchSection } from "@/components/sections/research";
import { ContactSection } from "@/components/sections/contact";
import { navItems } from "@/lib/site-data";

export default function Page() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-black text-white">
      <div className="pointer-events-none fixed inset-0 z-0 opacity-40 sm:opacity-50 lg:opacity-60">
        <NeuralBackground color="#60a5fa" trailOpacity={0.12} particleCount={520} speed={0.85} />
      </div>

      <div className="pointer-events-none fixed inset-0 z-[1] bg-[radial-gradient(circle_at_20%_10%,rgba(96,165,250,0.12),transparent_22%),radial-gradient(circle_at_80%_18%,rgba(255,255,255,0.05),transparent_18%),linear-gradient(180deg,rgba(0,0,0,0.08),rgba(0,0,0,0.32)_30%,rgba(0,0,0,0.76)_100%)]" />

      <div className="relative z-10">
        <header className="sticky top-0 z-50 border-b border-white/8 bg-black/50 backdrop-blur-xl">
          <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-4 px-4 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
            <div className="flex w-full items-center justify-between gap-3 lg:w-auto lg:justify-start">
              <div className="text-sm font-semibold uppercase tracking-[0.22em] text-white sm:text-base">
                HKD <span className="text-white/45">://</span>
              </div>

              <a
                href="#contact"
                className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-[11px] uppercase tracking-[0.24em] text-white transition hover:border-sky-400/40 hover:bg-sky-400/10 lg:hidden"
              >
                Get in touch
              </a>
            </div>

            <nav className="flex w-full flex-wrap items-center justify-start gap-x-4 gap-y-2 text-[10px] uppercase tracking-[0.2em] text-white/55 sm:text-[11px] sm:tracking-[0.24em] lg:w-auto lg:justify-center">
              {navItems.map((item) => (
                <a key={item.label} href={item.href} className="transition hover:text-white">
                  {item.label}
                </a>
              ))}
            </nav>

            <a
              href="#contact"
              className="hidden items-center justify-center rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-[11px] uppercase tracking-[0.24em] text-white transition hover:border-sky-400/40 hover:bg-sky-400/10 lg:inline-flex"
            >
              Get in touch
            </a>
          </div>
        </header>

        <HeroSection />

        <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-8">
          <AboutSection />
          <ExperienceSection />
          <ProjectsSection />
          <SkillsSection />
          <ResearchSection />
          <ContactSection />

          <footer className="mt-6 flex flex-col gap-2 border-t border-white/8 px-0 py-6 text-[10px] uppercase tracking-[0.18em] text-white/40 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:gap-3 sm:text-[11px] sm:tracking-[0.22em]">
            <span>Harish Kumar D · harishkumard12@gmail.com</span>
            <span>M.E. CSE · MAHE Manipal</span>
            <span className="text-sky-300/80">Built with precision.</span>
          </footer>
        </div>
      </div>
    </main>
  );
}