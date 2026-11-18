import { createFileRoute } from "@tanstack/react-router";
import { About } from "@/components/site/About";
import { Contact } from "@/components/site/Contact";
import { Cursor } from "@/components/site/Cursor";
import { Footer } from "@/components/site/Footer";
import { Hero } from "@/components/site/Hero";
import { MarqueeBand } from "@/components/site/Marquee";
import { Nav } from "@/components/site/Nav";
import { Portfolio } from "@/components/site/Portfolio";
import { Social } from "@/components/site/Social";
import { Vision } from "@/components/site/Vision";

const title = "Shooter Mbatha — Creative Stylist | Uyaphi unga dansanga?";
const description =
  "The world of Shooter Mbatha (Shooter Is The Best): South African creative stylist. Fashion, street culture and editorial looks — style is an attitude.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "profile" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-full focus:bg-lime focus:px-4 focus:py-2 focus:text-ink"
      >
        Skip to content
      </a>
      <Cursor />
      <Nav />
      <main id="main">
        <Hero />
        <MarqueeBand />
        <About />
        <Portfolio />
        <Vision />
        <Social />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
