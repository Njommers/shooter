import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { navLinks, site } from "@/lib/site";
import { cn } from "@/lib/utils";
import { InstagramIcon } from "./icons";

const useIsoLayout = typeof window === "undefined" ? useEffect : useLayoutEffect;

export function Nav() {
  const [active, setActive] = useState<string>("home");
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const linkRefs = useRef<Record<string, HTMLAnchorElement | null>>({});
  const [pill, setPill] = useState({ left: 0, width: 0 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    const ids = [...navLinks.map((l) => l.id), "social"];
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const id = e.target.id === "social" ? "vision" : e.target.id;
            setActive(id);
          }
        });
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => {
      window.removeEventListener("scroll", onScroll);
      io.disconnect();
    };
  }, []);

  useIsoLayout(() => {
    const el = linkRefs.current[active];
    if (el) setPill({ left: el.offsetLeft, width: el.offsetWidth });
  }, [active]);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-3 pt-3 md:pt-5">
        <nav
          aria-label="Main"
          className={cn(
            "flex w-full max-w-5xl items-center justify-between gap-4 rounded-full border px-3 py-2 backdrop-blur-xl transition-all duration-500 md:px-4",
            scrolled ? "border-border bg-ink/75 shadow-2xl" : "border-transparent bg-ink/30",
          )}
        >
          <a href="#home" className="group flex items-center gap-2 pl-2" aria-label="Shooter Mbatha — home">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-orange font-display text-xs font-black text-ink transition-transform duration-500 group-hover:rotate-[360deg]">
              SM
            </span>
            <span className="hidden font-display text-xs font-bold tracking-[0.2em] sm:inline">
              SHOOTER<span className="text-lime">.</span>
            </span>
          </a>

          <div className="relative hidden items-center md:flex">
            <span
              aria-hidden
              className="absolute top-1/2 h-9 -translate-y-1/2 rounded-full bg-lime transition-all duration-500 ease-[cubic-bezier(0.7,0,0.2,1)]"
              style={{ left: pill.left, width: pill.width }}
            />
            {navLinks.map((l) => (
              <a
                key={l.id}
                ref={(el) => {
                  linkRefs.current[l.id] = el;
                }}
                href={`#${l.id}`}
                aria-current={active === l.id ? "true" : undefined}
                className={cn(
                  "relative z-10 rounded-full px-4 py-2 font-display text-[11px] font-semibold tracking-[0.18em] transition-colors duration-300",
                  active === l.id ? "text-ink" : "text-cream/80 hover:text-cream",
                )}
              >
                {l.label.toUpperCase()}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <a
              href={site.instagramUrl}
              target="_blank"
              rel="noreferrer"
              aria-label="Shooter on Instagram"
              className="grid h-10 w-10 place-items-center rounded-full border border-border transition-colors hover:bg-pink hover:text-ink"
            >
              <InstagramIcon className="h-4 w-4" />
            </a>
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="grid h-10 w-10 place-items-center rounded-full bg-cream text-ink md:hidden"
              aria-label="Open menu"
              aria-expanded={open}
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile menu */}
      <div
        className={cn(
          "fixed inset-0 z-[60] flex flex-col bg-sunset px-6 pb-10 pt-6 transition-[clip-path] duration-700 ease-[cubic-bezier(0.7,0,0.2,1)] md:hidden",
          open ? "[clip-path:circle(150%_at_100%_0%)]" : "pointer-events-none [clip-path:circle(0%_at_100%_0%)]",
        )}
        aria-hidden={!open}
      >
        <div className="flex items-center justify-between">
          <span className="font-display text-sm font-black tracking-[0.2em] text-ink">SHOOTER MBATHA</span>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="grid h-11 w-11 place-items-center rounded-full bg-ink text-cream"
            aria-label="Close menu"
            tabIndex={open ? 0 : -1}
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <ul className="mt-14 flex flex-1 flex-col gap-2">
          {navLinks.map((l, i) => (
            <li
              key={l.id}
              className={cn(
                "overflow-hidden transition-all duration-700",
                open ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0",
              )}
              style={{ transitionDelay: open ? `${200 + i * 70}ms` : "0ms" }}
            >
              <a
                href={`#${l.id}`}
                onClick={() => setOpen(false)}
                tabIndex={open ? 0 : -1}
                className={cn(
                  "flex items-baseline gap-4 font-display text-5xl font-black uppercase leading-[1.05] text-ink",
                  active === l.id && "italic",
                )}
              >
                <span className="font-sans text-sm font-medium">0{i + 1}</span>
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <p className="font-serif text-3xl italic text-ink">“{site.slogan}”</p>
      </div>
    </>
  );
}
