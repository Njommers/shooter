import { ArrowDownRight } from "lucide-react";
import { photoById, site } from "@/lib/site";
import { Magnetic, SpinBadge, TiltCard } from "./motion";
import { SceneSlot } from "./SceneSlot";

const hero = photoById("flatcap");
const side1 = photoById("red-car");
const side2 = photoById("checker");

function Line({ text, delay, className }: { text: string; delay: number; className?: string }) {
  return (
    <span className="block w-max overflow-hidden pb-[0.08em]">
      <span className={`block animate-rise ${className ?? ""}`} style={{ animationDelay: `${delay}ms` }}>
        {text}
      </span>
    </span>
  );
}

export function Hero() {
  return (
    <section id="home" className="grain relative isolate min-h-[100svh] overflow-hidden bg-ink">
      {/* Animated colour fields */}
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="absolute -left-[15%] top-[10%] h-[55vmax] w-[55vmax] animate-blob rounded-full bg-purple opacity-60 blur-[110px]" />
        <div
          className="absolute -right-[10%] -top-[15%] h-[45vmax] w-[45vmax] animate-blob rounded-full bg-orange opacity-40 blur-[120px]"
          style={{ animationDelay: "-5s" }}
        />
        <div
          className="absolute bottom-[-20%] right-[20%] h-[40vmax] w-[40vmax] animate-blob rounded-full bg-pink opacity-35 blur-[120px]"
          style={{ animationDelay: "-10s" }}
        />
      </div>

      {/* Mobile: full-bleed photo */}
      <div className="absolute inset-0 -z-10 lg:hidden">
        <img
          src={hero.src}
          alt={hero.alt}
          className="h-full w-full object-cover opacity-80"
          style={{ objectPosition: "60% 20%" }}
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/55 to-ink/20" />
      </div>

      <SceneSlot scene="hero" className="absolute inset-0 z-0" />

      <div className="relative z-10 mx-auto grid min-h-[100svh] max-w-[1440px] grid-cols-1 items-end px-5 pb-24 pt-28 md:px-10 lg:grid-cols-12 lg:items-center lg:gap-6 lg:pb-16">
        {/* Type */}
        <div className="relative z-20 lg:col-span-7">
          <p className="mb-5 flex animate-fade-up items-center gap-3 font-display text-[10px] font-semibold tracking-[0.3em] text-lime md:text-xs">
            <span className="h-px w-10 bg-lime" /> CREATIVE STYLIST · SOUTH AFRICA
          </p>
          <h1 className="font-display text-[clamp(3.2rem,15vw,7rem)] lg:text-[clamp(5rem,9.2vw,10.5rem)] font-black leading-[0.86] tracking-[-0.04em] lg:mix-blend-difference">
            <Line text="SHOOTER" delay={150} />
            <span className="block w-max overflow-hidden pb-[0.08em]">
              <span className="block animate-rise" style={{ animationDelay: "300ms" }}>
                MBATHA<span className="text-orange">.</span>
              </span>
            </span>
          </h1>
          <p
            className="mt-6 animate-fade-up font-serif text-[clamp(2rem,5.4vw,4.4rem)] italic leading-[0.95] text-cream"
            style={{ animationDelay: "650ms" }}
          >
            “Uyaphi unga{" "}
            <span className="relative inline-block text-ink">
              <span aria-hidden className="absolute inset-x-[-0.1em] inset-y-[0.12em] -z-10 -rotate-2 rounded-md bg-lime" />
              dansanga?
            </span>
            ”
          </p>
          <p
            className="mt-6 max-w-md animate-fade-up text-sm leading-relaxed text-cream/80 md:text-base"
            style={{ animationDelay: "850ms" }}
          >
            {site.tagline}
          </p>
          <div className="mt-8 flex animate-fade-up flex-wrap items-center gap-4" style={{ animationDelay: "1000ms" }}>
            <Magnetic>
              <a
                href="#portfolio"
                className="group inline-flex items-center gap-3 rounded-full bg-orange px-6 py-4 font-display text-[11px] font-bold tracking-[0.18em] text-ink shadow-glow-pink transition-colors duration-300 hover:bg-lime md:px-8 md:text-xs"
              >
                EXPLORE THE WORLD OF SHOOTER
                <ArrowDownRight className="h-4 w-4 transition-transform duration-300 group-hover:rotate-[-45deg]" />
              </a>
            </Magnetic>
            <a
              href={site.instagramUrl}
              target="_blank"
              rel="noreferrer"
              className="font-display text-[11px] font-semibold tracking-[0.18em] text-cream/80 underline decoration-pink decoration-2 underline-offset-8 transition-colors hover:text-pink"
            >
              {site.instagramHandle.toUpperCase()}
            </a>
          </div>
        </div>

        {/* Desktop photo composition */}
        <div className="relative hidden h-[80vh] lg:col-span-5 lg:block">
          <div className="absolute inset-y-0 right-0 w-[82%] animate-fade-up" style={{ animationDelay: "400ms" }}>
            <TiltCard className="group h-full rounded-[2rem]">
              <div className="absolute -inset-3 -z-10 translate-x-4 translate-y-4 rounded-[2.2rem] bg-lime" />
              <img
                src={hero.src}
                alt={hero.alt}
                className="h-full w-full rounded-[2rem] object-cover"
                style={{ objectPosition: hero.focus }}
                fetchPriority="high"
                data-cursor="SHOOTER"
              />
              <span className="absolute left-5 top-5 rounded-full bg-ink/80 px-3 py-1 font-display text-[10px] tracking-[0.2em] text-cream backdrop-blur">
                LOOK — {hero.title.toUpperCase()}
              </span>
            </TiltCard>
          </div>
          <div
            className="absolute -left-10 bottom-[6%] w-[38%] animate-float"
            style={{ ["--r" as string]: "-8deg", animationDelay: "-2s" }}
          >
            <TiltCard className="group overflow-hidden rounded-2xl border-4 border-cream shadow-2xl">
              <img src={side1.src} alt={side1.alt} className="aspect-[3/4] w-full object-cover" style={{ objectPosition: side1.focus }} />
            </TiltCard>
          </div>
          <div
            className="absolute -right-6 -top-4 w-[30%] animate-float"
            style={{ ["--r" as string]: "9deg" }}
          >
            <TiltCard className="group overflow-hidden rounded-2xl border-4 border-pink shadow-2xl">
              <img src={side2.src} alt={side2.alt} className="aspect-[3/4] w-full object-cover" style={{ objectPosition: side2.focus }} />
            </TiltCard>
          </div>
          <SpinBadge
            text="UYAPHI UNGA DANSANGA? • UYAPHI UNGA DANSANGA? • "
            className="absolute -bottom-8 left-[42%] h-32 w-32 text-cream"
            center={<span className="grid h-12 w-12 place-items-center rounded-full bg-pink font-display text-lg font-black text-ink">✺</span>}
          />
        </div>
      </div>

      {/* Scroll indicator */}
      <a
        href="#about"
        aria-label="Scroll to About"
        className="absolute bottom-6 right-5 z-20 flex flex-col items-center gap-3 lg:left-10 lg:right-auto"
      >
        <span className="font-display text-[9px] font-semibold tracking-[0.4em] text-cream/70 [writing-mode:vertical-rl]">
          SCROLL
        </span>
        <span className="relative block h-14 w-px overflow-hidden bg-cream/20">
          <span className="absolute inset-0 animate-scroll-line bg-lime" />
        </span>
      </a>
    </section>
  );
}
