import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Maximize2, X } from "lucide-react";
import { categories, filterPhotos, photoById, photos, type Category, type Photo } from "@/lib/site";
import { cn } from "@/lib/utils";
import { Reveal, TiltCard } from "./motion";

const featured = photoById("caravan");
const accentByIndex = ["bg-orange", "bg-lime", "bg-pink", "bg-cream"];

export function Portfolio() {
  const [filter, setFilter] = useState<Category | "All">("All");
  const [viewer, setViewer] = useState<{ list: Photo[]; index: number } | null>(null);
  const visible = filterPhotos(photos, filter);

  return (
    <section id="portfolio" className="grain relative overflow-hidden bg-purple-deep py-24 md:py-36">
      <div aria-hidden className="absolute -right-40 top-40 h-[40rem] w-[40rem] rounded-full bg-pink/25 blur-[140px]" />
      <div aria-hidden className="absolute -left-40 bottom-20 h-[36rem] w-[36rem] rounded-full bg-orange/20 blur-[140px]" />

      <div className="relative mx-auto max-w-[1440px] px-5 md:px-10">
        {/* Header */}
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <Reveal as="p" className="mb-6 flex items-center gap-3 font-display text-[10px] font-bold tracking-[0.3em] text-lime md:text-xs">
              <span className="h-px w-10 bg-lime" /> 02 — THE PORTFOLIO
            </Reveal>
            <h2 className="font-display text-[clamp(3rem,10vw,9rem)] font-black leading-[0.85] tracking-[-0.05em]">
              <Reveal as="span" className="block">THE</Reveal>
              <Reveal as="span" className="block text-outline" delay={100}>WORK.</Reveal>
            </h2>
          </div>
          <Reveal as="p" delay={200} className="max-w-sm font-serif text-2xl italic leading-tight text-cream/85 md:text-3xl">
            A fashion magazine you can walk through — an exhibition of looks, places and moods.
          </Reveal>
        </div>

        {/* Featured editorial spread */}
        <div className="mt-16 grid items-center gap-8 md:mt-24 lg:grid-cols-12">
          <Reveal variant="clip" className="relative lg:col-span-7">
            <button
              type="button"
              onClick={() => setViewer({ list: photos, index: photos.indexOf(featured) })}
              className="group relative block w-full overflow-hidden rounded-[2rem]"
              data-cursor="VIEW"
              aria-label={`Open ${featured.title} full screen`}
            >
              <img
                src={featured.src}
                alt={featured.alt}
                loading="lazy"
                className="aspect-[4/5] w-full object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-105 md:aspect-[16/12]"
                style={{ objectPosition: "45% 35%" }}
              />
              <span className="absolute bottom-5 left-5 rounded-full bg-lime px-4 py-2 font-display text-[10px] font-bold tracking-[0.2em] text-ink">
                FEATURED LOOK
              </span>
            </button>
            <span
              aria-hidden
              className="pointer-events-none absolute -top-14 right-4 font-display text-[9rem] font-black leading-none text-orange md:-right-10 md:text-[14rem]"
            >
              01
            </span>
          </Reveal>
          <div className="lg:col-span-4 lg:col-start-9">
            <Reveal as="p" className="font-display text-[10px] font-bold tracking-[0.3em] text-pink md:text-xs">
              {featured.categories.join(" / ").toUpperCase()}
            </Reveal>
            <Reveal as="h3" delay={100} className="mt-4 font-display text-5xl font-black uppercase leading-[0.9] tracking-tight md:text-6xl">
              {featured.title}
            </Reveal>
            <Reveal as="p" delay={200} className="mt-6 text-lg leading-relaxed text-cream/80">
              {featured.caption} Monochrome tailoring lets a single colour do all the talking — the kind of quiet
              confidence that turns a caravan step into a front row.
            </Reveal>
            <Reveal delay={300} className="mt-8 flex gap-3">
              {featured.categories.map((c) => (
                <span key={c} className="rounded-full border border-cream/30 px-4 py-2 text-xs">
                  {c}
                </span>
              ))}
            </Reveal>
          </div>
        </div>

        {/* Filters */}
        <div className="mt-24 flex flex-wrap gap-2" role="group" aria-label="Filter portfolio by category">
          {(["All", ...categories] as const).map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setFilter(c)}
              aria-pressed={filter === c}
              className={cn(
                "rounded-full border px-4 py-2.5 font-display text-[10px] font-semibold tracking-[0.15em] transition-all duration-300 md:text-[11px]",
                filter === c
                  ? "border-lime bg-lime text-ink"
                  : "border-cream/25 text-cream/80 hover:border-cream hover:text-cream",
              )}
            >
              {c.toUpperCase()}
              <span className="ml-2 opacity-60">{filterPhotos(photos, c).length}</span>
            </button>
          ))}
        </div>

        {/* Masonry */}
        <div key={filter} className="mt-10 columns-1 gap-5 sm:columns-2 lg:columns-3">
          {visible.map((p, i) => (
            <GalleryCard key={p.id} photo={p} index={i} onOpen={() => setViewer({ list: visible, index: i })} />
          ))}
        </div>
      </div>

      {viewer && (
        <Lightbox
          index={viewer.index}
          list={viewer.list}
          onClose={() => setViewer(null)}
          onChange={(index) => setViewer((v) => (v ? { ...v, index } : v))}
        />
      )}
    </section>
  );
}

function GalleryCard({ photo, index, onOpen }: { photo: Photo; index: number; onOpen: () => void }) {
  return (
    <div
      className="mb-5 break-inside-avoid animate-fade-up"
      style={{ animationDelay: `${index * 90}ms` }}
    >
      <TiltCard className="group rounded-[1.5rem]" max={7}>
        <button
          type="button"
          onClick={onOpen}
          data-cursor="VIEW"
          aria-label={`Open ${photo.title} full screen`}
          className="relative block w-full overflow-hidden rounded-[1.5rem] text-left"
        >
          <img
            src={photo.src}
            alt={photo.alt}
            loading="lazy"
            width={photo.width}
            height={photo.height}
            className="w-full object-cover transition-all duration-[1.1s] ease-out group-hover:scale-110 group-hover:saturate-150"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/10 to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-95" />
          <div
            className={cn(
              "absolute left-4 top-4 h-3 w-3 rounded-full transition-transform duration-500 group-hover:scale-[2.5]",
              accentByIndex[index % accentByIndex.length],
            )}
          />
          <Maximize2 className="absolute right-4 top-4 h-5 w-5 -translate-y-2 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100" />
          <div className="absolute inset-x-0 bottom-0 p-5">
            <p className="translate-y-6 font-display text-[10px] font-semibold tracking-[0.2em] text-lime opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
              {photo.categories.join(" · ").toUpperCase()}
            </p>
            <h3 className="mt-1 font-display text-2xl font-black uppercase tracking-tight">{photo.title}</h3>
            <p className="max-h-0 overflow-hidden text-sm text-cream/80 transition-all duration-500 group-hover:mt-2 group-hover:max-h-20">
              {photo.caption}
            </p>
          </div>
        </button>
      </TiltCard>
    </div>
  );
}

function Lightbox({
  index,
  list,
  onClose,
  onChange,
}: {
  index: number;
  list: Photo[];
  onClose: () => void;
  onChange: (i: number) => void;
}) {
  const photo = list[index] ?? list[0]!;
  const closeRef = useRef<HTMLButtonElement>(null);
  const touchX = useRef<number | null>(null);
  const go = useCallback(
    (d: number) => onChange((index + d + list.length) % list.length),
    [index, list.length, onChange],
  );

  useEffect(() => {
    const prev = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = "";
      prev?.focus();
    };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go, onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${photo.title} — full screen`}
      className="fixed inset-0 z-[80] flex flex-col bg-ink/95 backdrop-blur-xl animate-in fade-in duration-300"
      onTouchStart={(e) => (touchX.current = e.touches[0]?.clientX ?? null)}
      onTouchEnd={(e) => {
        if (touchX.current === null) return;
        const dx = (e.changedTouches[0]?.clientX ?? touchX.current) - touchX.current;
        if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
        touchX.current = null;
      }}
    >
      <div className="flex items-center justify-between px-5 py-4 md:px-10">
        <span className="font-display text-xs font-bold tracking-[0.3em] text-lime">
          {String(index + 1).padStart(2, "0")} / {String(list.length).padStart(2, "0")}
        </span>
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          className="grid h-12 w-12 place-items-center rounded-full bg-cream text-ink transition-transform hover:rotate-90"
          aria-label="Close full screen view"
        >
          <X className="h-5 w-5" />
        </button>
      </div>
      <div className="relative flex min-h-0 flex-1 items-center justify-center px-4 md:px-24">
        <img
          key={photo.id}
          src={photo.src}
          alt={photo.alt}
          className="max-h-full max-w-full rounded-2xl object-contain shadow-glow-pink animate-in zoom-in-95 fade-in duration-500"
        />
        <button
          type="button"
          onClick={() => go(-1)}
          className="absolute left-3 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full border border-cream/30 bg-ink/60 transition-colors hover:bg-orange hover:text-ink md:left-8 md:h-14 md:w-14"
          aria-label="Previous photo"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <button
          type="button"
          onClick={() => go(1)}
          className="absolute right-3 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full border border-cream/30 bg-ink/60 transition-colors hover:bg-orange hover:text-ink md:right-8 md:h-14 md:w-14"
          aria-label="Next photo"
        >
          <ArrowRight className="h-5 w-5" />
        </button>
      </div>
      <div className="px-5 pb-6 pt-4 text-center md:px-10">
        <h3 className="font-display text-2xl font-black uppercase tracking-tight md:text-3xl">{photo.title}</h3>
        <p className="mt-1 text-sm text-cream/75">{photo.caption}</p>
      </div>
    </div>
  );
}
