import { cn } from "@/lib/utils";

export function Marquee({
  items,
  className,
  reverse,
  speed = 30,
}: {
  items: string[];
  className?: string;
  reverse?: boolean;
  speed?: number;
}) {
  const row = items.flatMap((t, i) => [
    <span key={`t${i}`}>{t}</span>,
    <span key={`s${i}`} aria-hidden className="mx-6 inline-block">
      ✺
    </span>,
  ]);
  return (
    <div className={cn("overflow-hidden whitespace-nowrap", className)}>
      <div
        className={cn("inline-flex w-max", reverse ? "animate-marquee-rev" : "animate-marquee")}
        style={{ ["--marquee-speed" as string]: `${speed}s` }}
      >
        <div className="flex items-center px-3">{row}</div>
        <div className="flex items-center px-3" aria-hidden>
          {row}
        </div>
      </div>
    </div>
  );
}

export function MarqueeBand() {
  return (
    <div className="relative z-10 -my-6 overflow-hidden py-6" aria-label="Uyaphi unga dansanga? Style is an attitude. Art is an expression. Culture is the movement.">
      <Marquee
        className="-rotate-2 scale-105 bg-orange py-4 font-display text-2xl font-black tracking-tight text-ink md:text-4xl"
        items={["UYAPHI UNGA DANSANGA?", "STYLE IS AN ATTITUDE", "ART IS AN EXPRESSION", "CULTURE IS THE MOVEMENT"]}
      />
      <Marquee
        reverse
        speed={40}
        className="rotate-1 scale-105 bg-lime py-3 font-serif text-2xl italic text-ink md:text-3xl"
        items={["Shooter Is The Best", "@Shooter_is_the_best", "Style has no boundaries", "Uyaphi unga dansanga?"]}
      />
    </div>
  );
}
