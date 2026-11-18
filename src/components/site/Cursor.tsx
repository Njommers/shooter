import { useEffect, useRef, useState } from "react";
import { useFinePointer, useReducedMotion } from "@/hooks/use-motion";

/** Desktop-only cursor: a dot plus a lagging ring that grows (and can show a label) over interactive things. */
export function Cursor() {
  const fine = useFinePointer();
  const reduced = useReducedMotion();
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState("");
  const [active, setActive] = useState(false);
  const enabled = fine && !reduced;

  useEffect(() => {
    if (!enabled) return;
    document.body.classList.add("has-custom-cursor");
    let mx = -100,
      my = -100,
      rx = -100,
      ry = -100,
      raf = 0;
    const move = (e: PointerEvent) => {
      mx = e.clientX;
      my = e.clientY;
      if (dot.current) dot.current.style.transform = `translate3d(${mx}px, ${my}px, 0)`;
      const target = (e.target as HTMLElement | null)?.closest<HTMLElement>(
        "a, button, [role='button'], [data-cursor], input, textarea",
      );
      setActive(!!target);
      setLabel(target?.dataset["cursor"] ?? "");
    };
    const loop = () => {
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      if (ring.current) ring.current.style.transform = `translate3d(${rx}px, ${ry}px, 0)`;
      raf = requestAnimationFrame(loop);
    };
    window.addEventListener("pointermove", move);
    raf = requestAnimationFrame(loop);
    return () => {
      document.body.classList.remove("has-custom-cursor");
      window.removeEventListener("pointermove", move);
      cancelAnimationFrame(raf);
    };
  }, [enabled]);

  if (!enabled) return null;
  return (
    <>
      <div
        ref={ring}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[100] mix-blend-difference"
      >
        <div
          className={`-translate-x-1/2 -translate-y-1/2 rounded-full border border-cream transition-all duration-300 ease-out grid place-items-center ${
            label
              ? "h-24 w-24 bg-lime border-lime"
              : active
                ? "h-14 w-14 bg-cream"
                : "h-9 w-9"
          }`}
        >
          {label && (
            <span className="font-display text-[11px] font-bold tracking-widest text-ink">{label}</span>
          )}
        </div>
      </div>
      <div ref={dot} aria-hidden className="pointer-events-none fixed left-0 top-0 z-[101]">
        <div className="h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange" />
      </div>
    </>
  );
}
