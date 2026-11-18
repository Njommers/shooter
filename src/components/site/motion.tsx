import {
  Component,
  useEffect,
  useRef,
  type CSSProperties,
  type ElementType,
  type ReactNode,
} from "react";
import { cn } from "@/lib/utils";
import { useFinePointer, useReducedMotion } from "@/hooks/use-motion";

/** Adds data-visible when the element scrolls into view; CSS in styles.css animates it. */
export function Reveal({
  children,
  as: Tag = "div",
  className,
  delay = 0,
  variant = "up",
  style,
  ...rest
}: {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  delay?: number;
  variant?: "up" | "clip";
  style?: CSSProperties;
  [key: string]: unknown;
}) {
  const ref = useRef<HTMLElement | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e?.isIntersecting) {
          el.dataset["visible"] = "true";
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <Tag
      ref={ref}
      data-reveal={variant}
      className={className}
      style={{ ...style, ["--delay" as string]: `${delay}ms` }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

/** Letters that pop in one by one once their parent Reveal (or data-visible ancestor) is visible. */
export function PopLetters({
  text,
  className,
  start = 0,
  step = 45,
}: {
  text: string;
  className?: string;
  start?: number;
  step?: number;
}) {
  return (
    <span className={className} aria-label={text} role="text">
      {Array.from(text).map((ch, i) => (
        <span
          key={i}
          aria-hidden
          className="letter-pop"
          style={
            {
              "--ld": `${start + i * step}ms`,
              "--lr": `${i % 2 ? -10 : 10}deg`,
            } as CSSProperties
          }
        >
          {ch === " " ? "\u00A0" : ch}
        </span>
      ))}
    </span>
  );
}

/** Pulls its child toward the pointer on desktop. */
export function Magnetic({
  children,
  strength = 0.35,
  className,
}: {
  children: ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const fine = useFinePointer();
  const reduced = useReducedMotion();
  useEffect(() => {
    const el = ref.current;
    if (!el || !fine || reduced) return;
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const x = e.clientX - (r.left + r.width / 2);
      const y = e.clientY - (r.top + r.height / 2);
      el.style.transform = `translate3d(${x * strength}px, ${y * strength}px, 0)`;
    };
    const leave = () => {
      el.style.transform = "translate3d(0,0,0)";
    };
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerleave", leave);
    return () => {
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", leave);
    };
  }, [fine, reduced, strength]);
  return (
    <div
      ref={ref}
      className={cn("inline-block transition-transform duration-300 ease-out will-change-transform", className)}
    >
      {children}
    </div>
  );
}

/** A card that tilts in 3D toward the pointer. */
export function TiltCard({
  children,
  className,
  max = 12,
  style,
}: {
  children: ReactNode;
  className?: string;
  max?: number;
  style?: CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const fine = useFinePointer();
  const reduced = useReducedMotion();
  useEffect(() => {
    const el = ref.current;
    if (!el || !fine || reduced) return;
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      el.style.transform = `perspective(900px) rotateY(${px * max}deg) rotateX(${-py * max}deg) scale(1.02)`;
      el.style.setProperty("--gx", `${(px + 0.5) * 100}%`);
      el.style.setProperty("--gy", `${(py + 0.5) * 100}%`);
    };
    const leave = () => {
      el.style.transform = "perspective(900px) rotateY(0) rotateX(0) scale(1)";
    };
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerleave", leave);
    return () => {
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", leave);
    };
  }, [fine, reduced, max]);
  return (
    <div
      ref={ref}
      style={style}
      className={cn(
        "relative transition-transform duration-500 ease-out [transform-style:preserve-3d] will-change-transform",
        className,
      )}
    >
      {children}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 mix-blend-overlay transition-opacity duration-300 [background:radial-gradient(circle_at_var(--gx,50%)_var(--gy,50%),var(--cream),transparent_55%)] group-hover:opacity-60"
      />
    </div>
  );
}

/** Renders nothing if its children throw (e.g. WebGL unavailable). */
export class SilentBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  override state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  override componentDidCatch(error: unknown) {
    console.warn("3D scene disabled:", error);
  }
  override render() {
    return this.state.failed ? null : this.props.children;
  }
}

/** Circular rotating text badge. */
export function SpinBadge({
  text,
  className,
  center,
}: {
  text: string;
  className?: string;
  center?: ReactNode;
}) {
  return (
    <div className={cn("relative grid place-items-center", className)}>
      <svg viewBox="0 0 200 200" className="absolute inset-0 h-full w-full animate-spin-slow" aria-hidden>
        <defs>
          <path id="badge-circle" d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0" />
        </defs>
        <text className="fill-current font-display text-[15px] font-bold uppercase tracking-[0.22em]">
          <textPath href="#badge-circle">{text}</textPath>
        </text>
      </svg>
      <div className="relative">{center}</div>
    </div>
  );
}
