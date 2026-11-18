import { Share2 } from "lucide-react";
import { toast } from "sonner";
import { photos, photoById, site } from "@/lib/site";
import { InstagramIcon } from "./icons";
import { Magnetic, Reveal } from "./motion";

const avatar = photoById("flatcap");
const grid = ["alley", "checker", "red-car", "braam", "red-sandals", "caravan", "flatcap"].map(photoById);

async function shareSite() {
  const data = {
    title: "Shooter Mbatha — Uyaphi unga dansanga?",
    text: "Step into the world of Shooter Mbatha, South African creative stylist.",
    url: window.location.origin + window.location.pathname,
  };
  try {
    if (navigator.share) {
      await navigator.share(data);
      return;
    }
    await navigator.clipboard.writeText(data.url);
    toast.success("Link copied — share the vibe!");
  } catch (e) {
    if ((e as Error)?.name !== "AbortError") toast.error("Couldn't share right now. Copy the link from your browser.");
  }
}

export function Social() {
  return (
    <section id="social" className="relative overflow-hidden bg-lime py-24 text-ink md:py-32">
      <div className="mx-auto grid max-w-[1440px] gap-14 px-5 md:px-10 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <Reveal as="p" className="mb-6 flex items-center gap-3 font-display text-[10px] font-bold tracking-[0.3em] md:text-xs">
            <span className="h-px w-10 bg-ink" /> 04 — ON THE GRAM
          </Reveal>
          <h2 className="font-display text-[clamp(2.6rem,7vw,6rem)] font-black leading-[0.88] tracking-[-0.04em]">
            <Reveal as="span" className="block">FOLLOW</Reveal>
            <Reveal as="span" className="block" delay={100}>
              THE <span className="font-serif font-normal italic tracking-normal text-purple">movement.</span>
            </Reveal>
          </h2>

          <Reveal delay={200} className="mt-10 rounded-[2rem] bg-ink p-6 text-cream shadow-pop md:p-8">
            <div className="flex items-center gap-4">
              <span className="rounded-full bg-sunset p-[3px]">
                <img
                  src={avatar.src}
                  alt="Shooter Mbatha profile photo"
                  loading="lazy"
                  className="h-16 w-16 rounded-full border-2 border-ink object-cover"
                  style={{ objectPosition: "60% 22%" }}
                />
              </span>
              <div>
                <p className="font-display text-sm font-bold md:text-base">{site.instagramHandle.toLowerCase()}</p>
                <p className="text-sm text-cream/70">{site.alias} · Creative stylist</p>
              </div>
            </div>
            <p className="mt-5 text-sm leading-relaxed text-cream/80">
              Outfits, moments and movement — the freshest looks land on Instagram first.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Magnetic>
                <a
                  href={site.instagramUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-sunset px-6 py-3.5 font-display text-[11px] font-bold tracking-[0.18em] text-ink transition-transform hover:scale-105"
                >
                  <InstagramIcon className="h-4 w-4" /> FOLLOW ON INSTAGRAM
                </a>
              </Magnetic>
              <button
                type="button"
                onClick={shareSite}
                className="inline-flex items-center gap-2 rounded-full border border-cream/30 px-6 py-3.5 font-display text-[11px] font-bold tracking-[0.18em] transition-colors hover:bg-cream hover:text-ink"
              >
                <Share2 className="h-4 w-4" /> SHARE THIS SITE
              </button>
            </div>
          </Reveal>
        </div>

        <div className="lg:col-span-7">
          <div className="grid grid-cols-3 gap-1.5 overflow-hidden rounded-[1.5rem] md:gap-2">
            {grid.map((p, i) => (
              <Reveal key={p.id} delay={i * 60} className="relative aspect-square">
                <a
                  href={site.instagramUrl}
                  target="_blank"
                  rel="noreferrer"
                  data-cursor="OPEN"
                  aria-label={`${p.title} — see more on Instagram`}
                  className="group block h-full w-full overflow-hidden"
                >
                  <img
                    src={p.src}
                    alt={p.alt}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    style={{ objectPosition: p.focus }}
                  />
                  <span className="absolute inset-0 grid place-items-center bg-ink/60 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <InstagramIcon className="h-8 w-8 text-cream" />
                  </span>
                </a>
              </Reveal>
            ))}
            <Reveal delay={photos.length * 60} className="relative aspect-square">
              <div className="flex h-full w-full items-center justify-center bg-pink p-3 text-center">
                <span className="font-serif text-lg italic leading-tight text-ink md:text-3xl">“{site.slogan}”</span>
              </div>
            </Reveal>
            <Reveal delay={(photos.length + 1) * 60} className="relative aspect-square">
              <a
                href={site.instagramUrl}
                target="_blank"
                rel="noreferrer"
                className="group flex h-full w-full flex-col items-center justify-center gap-2 bg-ink p-3 text-center text-cream transition-colors hover:bg-purple"
              >
                <InstagramIcon className="h-7 w-7 text-lime transition-transform group-hover:scale-125" />
                <span className="font-display text-[9px] font-bold tracking-[0.2em] md:text-[11px]">SEE MORE</span>
              </a>
            </Reveal>
          </div>
          <p className="mt-4 text-xs text-ink/70">
            A selection of favourite frames — not a live feed. The full, always-fresh grid lives on Instagram.
          </p>
        </div>
      </div>
    </section>
  );
}
