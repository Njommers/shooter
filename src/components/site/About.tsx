import { photoById, site } from "@/lib/site";
import { Reveal, SpinBadge, TiltCard } from "./motion";

const big = photoById("braam");
const small = photoById("red-sandals");

const pillars = [
  { n: "01", t: "Fashion", d: "Silhouette, proportion and the confidence of the fit.", c: "bg-orange" },
  { n: "02", t: "Culture", d: "South African street life, sound and language, worn out loud.", c: "bg-pink" },
  { n: "03", t: "Individuality", d: "No uniforms. Every look starts with being yourself.", c: "bg-lime" },
  { n: "04", t: "Expression", d: "Colour, attitude and movement as a creative language.", c: "bg-purple text-cream" },
];

export function About() {
  return (
    <section id="about" className="relative overflow-hidden bg-cream pb-24 pt-32 text-ink md:pb-36 md:pt-44">
      {/* giant background word */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-10 top-10 select-none font-display text-[28vw] font-black leading-none text-outline-ink opacity-[0.12]"
      >
        IDENTITY
      </div>

      <div className="relative mx-auto grid max-w-[1440px] gap-16 px-5 md:px-10 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-12">
          <Reveal as="p" className="mb-6 flex items-center gap-3 font-display text-[10px] font-bold tracking-[0.3em] text-purple md:text-xs">
            <span className="h-px w-10 bg-purple" /> 01 — ABOUT SHOOTER
          </Reveal>
          <h2 className="font-display text-[clamp(2.6rem,8vw,7.5rem)] font-black leading-[0.9] tracking-[-0.04em]">
            <Reveal as="span" className="block">MORE THAN STYLE.</Reveal>
            <Reveal as="span" className="block" delay={120}>
              IT&apos;S AN{" "}
              <span className="font-serif text-[1.15em] font-normal italic tracking-normal text-pink">identity.</span>
            </Reveal>
          </h2>
        </div>

        {/* Photos */}
        <div className="relative h-[560px] md:h-[680px] lg:col-span-6">
          <Reveal variant="clip" className="absolute left-0 top-0 h-[85%] w-[72%]">
            <TiltCard className="group h-full overflow-hidden rounded-[2rem]" max={8}>
              <img
                src={big.src}
                alt={big.alt}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-[1.2s] group-hover:scale-105"
                style={{ objectPosition: big.focus }}
              />
            </TiltCard>
          </Reveal>
          <Reveal variant="clip" delay={250} className="absolute bottom-0 right-0 h-[58%] w-[48%]">
            <TiltCard className="group h-full overflow-hidden rounded-[2rem] border-[6px] border-cream shadow-pop" max={10}>
              <img
                src={small.src}
                alt={small.alt}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-[1.2s] group-hover:scale-105"
                style={{ objectPosition: small.focus }}
              />
            </TiltCard>
          </Reveal>
          <SpinBadge
            text="SHOOTER IS THE BEST • SHOOTER IS THE BEST • "
            className="absolute right-[8%] top-[6%] h-28 w-28 text-ink md:h-36 md:w-36"
            center={<span className="grid h-12 w-12 place-items-center rounded-full bg-orange font-display text-sm font-black">SM</span>}
          />
          <span className="absolute bottom-[8%] left-[4%] -rotate-6 rounded-full bg-ink px-4 py-2 font-serif text-xl italic text-lime">
            “{site.slogan}”
          </span>
        </div>

        {/* Bio */}
        <div className="flex flex-col justify-center lg:col-span-5 lg:col-start-8">
          {site.bio.map((p, i) => (
            <Reveal
              as="p"
              key={i}
              delay={i * 120}
              className={
                i === 0
                  ? "text-xl font-medium leading-snug md:text-2xl"
                  : "mt-6 text-base leading-relaxed text-ink/75 md:text-lg"
              }
            >
              {p}
            </Reveal>
          ))}
          <ul className="mt-10 grid gap-3 sm:grid-cols-2">
            {pillars.map((p, i) => (
              <Reveal
                as="li"
                key={p.n}
                delay={i * 90}
                className="group rounded-2xl border-2 border-ink p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-pop"
              >
                <div className="flex items-center justify-between">
                  <span className={`rounded-full px-3 py-1 font-display text-[10px] font-bold tracking-[0.2em] ${p.c}`}>
                    {p.n}
                  </span>
                  <span className="text-lg transition-transform duration-500 group-hover:rotate-180">✺</span>
                </div>
                <h3 className="mt-4 font-display text-lg font-black uppercase tracking-tight">{p.t}</h3>
                <p className="mt-1 text-sm leading-relaxed text-ink/70">{p.d}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
