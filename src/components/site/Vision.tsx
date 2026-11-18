import { site } from "@/lib/site";
import { patternDataUri } from "./icons";
import { PopLetters, Reveal } from "./motion";
import { SceneSlot } from "./SceneSlot";

function PatternBand({ reverse }: { reverse?: boolean }) {
  return (
    <div
      aria-hidden
      className="h-16 w-full md:h-20"
      style={{
        backgroundImage: patternDataUri(),
        backgroundSize: "auto 100%",
        animation: `pattern-slide 12s linear infinite${reverse ? " reverse" : ""}`,
      }}
    />
  );
}

export function Vision() {
  return (
    <section id="vision" className="relative overflow-hidden bg-ink">
      <PatternBand />

      <div className="relative">
        {/* rhythmic colour stripes */}
        <div aria-hidden className="absolute inset-0 opacity-[0.07] [background:repeating-linear-gradient(90deg,var(--cream)_0_2px,transparent_2px_80px)]" />
        <div aria-hidden className="absolute left-1/2 top-1/3 h-[50vmax] w-[50vmax] -translate-x-1/2 rounded-full bg-sunset opacity-30 blur-[140px]" />

        <div className="relative mx-auto max-w-[1440px] px-5 pb-10 pt-20 text-center md:px-10 md:pt-32">
          <Reveal as="p" className="mb-8 inline-flex items-center gap-3 font-display text-[10px] font-bold tracking-[0.3em] text-orange md:text-xs">
            <span className="h-px w-10 bg-orange" /> 03 — THE VISION <span className="h-px w-10 bg-orange" />
          </Reveal>

          <Reveal as="h2" className="font-display font-black leading-[0.85] tracking-[-0.05em]" aria-label={site.slogan}>
            <PopLetters text="UYAPHI" className="block whitespace-nowrap text-[clamp(3.6rem,17vw,16rem)] text-cream" />
            <PopLetters
              text="UNGA"
              start={300}
              className="block font-serif text-[clamp(3.5rem,14vw,12rem)] font-normal italic tracking-normal text-lime"
            />
            <PopLetters text="DANSANGA?" start={520} step={55} className="block whitespace-nowrap text-[clamp(2.4rem,10.4vw,11.5rem)] text-pink" />
          </Reveal>

          <Reveal delay={600} className="mx-auto mt-10 max-w-2xl">
            <p className="font-serif text-2xl italic text-cream/90 md:text-4xl">
              Loosely: “{site.sloganTranslation}”
            </p>
            <p className="mt-5 text-base leading-relaxed text-cream/70 md:text-lg">
              It&apos;s a question and a dare. Move. Feel it. Show up as yourself — in what you wear, how you walk and
              how you take up space. Style is rhythm, and nobody leaves without dancing.
            </p>
          </Reveal>
        </div>

        {/* 3D signature scene */}
        <div className="relative h-[70vh] min-h-[460px] md:h-[90vh]">
          <SceneSlot scene="vision" className="absolute inset-0" />
          <div className="pointer-events-none absolute inset-x-0 bottom-8 flex flex-wrap justify-center gap-3 px-5">
            {["MOVEMENT", "CULTURE", "RHYTHM", "FREEDOM"].map((w, i) => (
              <span
                key={w}
                className={`rounded-full px-4 py-2 font-display text-[10px] font-bold tracking-[0.25em] text-ink md:text-xs ${
                  ["bg-orange", "bg-lime", "bg-pink", "bg-cream"][i]
                }`}
              >
                {w}
              </span>
            ))}
          </div>
        </div>
      </div>

      <PatternBand reverse />
    </section>
  );
}
