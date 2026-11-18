import type { SVGProps } from "react";

export function InstagramIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} aria-hidden {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.5" cy="6.5" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function WhatsAppIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.74 1.21h.01c5.46 0 9.91-4.45 9.91-9.91A9.85 9.85 0 0 0 12.04 2Zm5.8 14.05c-.24.68-1.42 1.31-1.95 1.36-.5.05-.97.24-3.27-.68-2.76-1.09-4.5-3.91-4.64-4.09-.13-.18-1.1-1.47-1.1-2.8 0-1.33.7-1.99.95-2.26.24-.27.53-.34.71-.34h.51c.16 0 .38-.06.6.46.23.54.77 1.87.84 2 .07.14.11.3.02.48-.09.18-.13.29-.27.45-.13.16-.28.36-.4.48-.13.13-.27.28-.12.55.16.27.7 1.15 1.5 1.86 1.03.92 1.9 1.2 2.17 1.34.27.13.43.11.58-.07.16-.18.67-.78.85-1.05.18-.27.36-.22.6-.13.25.09 1.57.74 1.84.88.27.13.45.2.51.31.07.11.07.66-.17 1.34Z" />
    </svg>
  );
}

/** Ndebele-inspired geometric band, drawn as a repeating SVG background. */
export function patternDataUri() {
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='240' height='80' viewBox='0 0 240 80'>
<rect width='240' height='80' fill='%23F3EBDD'/>
<rect y='0' width='240' height='8' fill='%2318121D'/>
<rect y='72' width='240' height='8' fill='%2318121D'/>
<polygon points='0,8 40,8 20,40' fill='%23F26A21'/>
<polygon points='0,72 40,72 20,40' fill='%23F26A21'/>
<rect x='40' y='8' width='40' height='64' fill='%2318121D'/>
<rect x='48' y='16' width='24' height='48' fill='%23C8F43A'/>
<rect x='56' y='24' width='8' height='32' fill='%2318121D'/>
<polygon points='80,8 120,40 80,72' fill='%23E8337E'/>
<polygon points='120,40 160,8 160,72' fill='%235B2BAF'/>
<rect x='160' y='8' width='40' height='64' fill='%23F3EBDD' stroke='%2318121D' stroke-width='6'/>
<polygon points='180,20 192,40 180,60 168,40' fill='%23F26A21'/>
<polygon points='200,8 240,8 240,40 200,40' fill='%23C8F43A'/>
<polygon points='200,40 240,40 240,72 200,72' fill='%23E8337E'/>
<rect x='212' y='30' width='16' height='20' fill='%2318121D'/>
</svg>`;
  return `url("data:image/svg+xml;utf8,${svg.replace(/\n/g, "").replace(/#/g, "%23")}")`;
}
