import { navLinks, site } from "@/lib/site";
import { InstagramIcon } from "./icons";
import { Marquee } from "./Marquee";

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-ink pt-20">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-6">
            <p className="font-serif text-4xl italic text-lime md:text-6xl">“{site.slogan}”</p>
            <p className="mt-4 font-display text-sm font-bold tracking-[0.2em] text-cream/80">
              {site.footerLine.toUpperCase()}
            </p>
          </div>
          <nav aria-label="Footer" className="md:col-span-3">
            <ul className="space-y-3">
              {navLinks.map((l) => (
                <li key={l.id}>
                  <a
                    href={`#${l.id}`}
                    className="font-display text-sm font-semibold tracking-[0.15em] text-cream/80 transition-colors hover:text-orange"
                  >
                    {l.label.toUpperCase()}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="md:col-span-3">
            <a
              href={site.instagramUrl}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-3 rounded-full border border-border px-5 py-3 transition-colors hover:bg-pink hover:text-ink"
            >
              <InstagramIcon className="h-5 w-5" />
              <span className="font-display text-xs font-bold tracking-[0.15em]">{site.instagramHandle}</span>
            </a>
          </div>
        </div>
      </div>

      <h2 className="mt-16 select-none text-center font-display text-[15.5vw] font-black leading-[0.8] tracking-[-0.06em] text-cream">
        SHOOTER <span className="text-outline">MBATHA</span>
      </h2>

      <Marquee
        className="mt-10 border-t border-border py-4 font-display text-[11px] font-semibold tracking-[0.3em] text-cream/60"
        speed={45}
        items={[`© ${new Date().getFullYear()} SHOOTER MBATHA`, "UYAPHI UNGA DANSANGA?", "STYLE HAS NO BOUNDARIES", "SOUTH AFRICA"]}
      />
    </footer>
  );
}
