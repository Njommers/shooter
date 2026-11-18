import { lazy, Suspense, useEffect, useState } from "react";
import { useInView, useReducedMotion } from "@/hooks/use-motion";
import { SilentBoundary } from "./motion";

const HeroScene = lazy(() => import("@/components/three/HeroScene"));
const VisionScene = lazy(() => import("@/components/three/VisionScene"));

function hasWebGL() {
  try {
    const c = document.createElement("canvas");
    return !!(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    return false;
  }
}

/** Mounts a 3D scene only in the browser, only with WebGL, and pauses it when off-screen. */
export function SceneSlot({ scene, className }: { scene: "hero" | "vision"; className?: string }) {
  const { ref, inView } = useInView<HTMLDivElement>("200px");
  const reduced = useReducedMotion();
  const [ok, setOk] = useState(false);
  useEffect(() => setOk(hasWebGL()), []);
  const Scene = scene === "hero" ? HeroScene : VisionScene;
  return (
    <div ref={ref} data-scene={scene} className={className} aria-hidden>
      {ok && (
        <SilentBoundary>
          <Suspense fallback={null}>
            <Scene active={inView} reduced={reduced} />
          </Suspense>
        </SilentBoundary>
      )}
    </div>
  );
}
