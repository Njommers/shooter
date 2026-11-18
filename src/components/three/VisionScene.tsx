import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Center, Environment, Lightformer, Text3D, useTexture } from "@react-three/drei";
import { Suspense, useEffect, useMemo, useRef } from "react";
import { DoubleSide, FrontSide, SRGBColorSpace, type Group, type Texture } from "three";
import fontJson from "@/assets/unbounded-black.typeface.json";
import { photos } from "@/lib/site";

const ORANGE = "#f26a21";
const PINK = "#e8337e";
const LIME = "#c8f43a";
const PURPLE = "#5b2baf";
const CREAM = "#f3ebdd";

type Pointer = { x: number; y: number };

function Word({ pointer }: { pointer: React.MutableRefObject<Pointer> }) {
  const ref = useRef<Group>(null);
  const { viewport } = useThree();
  const scale = Math.min(1, viewport.width / 8.5);
  useFrame((state, delta) => {
    const g = ref.current;
    if (!g) return;
    const k = 1 - Math.exp(-4 * Math.min(delta, 0.05));
    const t = state.clock.elapsedTime;
    g.rotation.y += (pointer.current.x * 0.5 + Math.sin(t * 0.6) * 0.12 - g.rotation.y) * k;
    g.rotation.x += (pointer.current.y * 0.3 - g.rotation.x) * k;
    g.position.y = 0.25 + Math.sin(t * 1.4) * 0.08;
  });
  return (
    <group ref={ref} scale={scale}>
      <Center>
        <Text3D
          font={fontJson as unknown as string}
          size={1.05}
          height={0.42}
          curveSegments={6}
          bevelEnabled
          bevelThickness={0.05}
          bevelSize={0.03}
          bevelSegments={3}
          castShadow
        >
          UYAPHI?
          <meshStandardMaterial color={ORANGE} metalness={0.35} roughness={0.22} />
        </Text3D>
      </Center>
    </group>
  );
}

function PhotoRing({
  pointer,
  scroll,
}: {
  pointer: React.MutableRefObject<Pointer>;
  scroll: React.MutableRefObject<number>;
}) {
  const ring = useRef<Group>(null);
  const textures = useTexture(photos.map((p) => p.src)) as Texture[];
  const { viewport } = useThree();
  useMemo(() => textures.forEach((t) => (t.colorSpace = SRGBColorSpace)), [textures]);
  const radius = Math.min(4.6, viewport.width * 0.55);
  const cardH = Math.min(2.3, viewport.width * 0.32);
  useFrame((state, delta) => {
    const g = ring.current;
    if (!g) return;
    const dt = Math.min(delta, 0.05);
    g.rotation.y += dt * 0.18 + pointer.current.x * dt * 0.6;
    const targetTilt = -0.12 + scroll.current * 0.25;
    g.rotation.x += (targetTilt - g.rotation.x) * (1 - Math.exp(-3 * dt));
  });
  return (
    <group ref={ring} position={[0, 0.1, 0]}>
      {photos.map((p, i) => {
        const a = (i / photos.length) * Math.PI * 2;
        const w = cardH * (p.width / p.height);
        return (
          <group key={p.id} position={[Math.sin(a) * radius, Math.sin(i * 1.7) * 0.35, Math.cos(a) * radius]} rotation={[0, a, 0]}>
            <mesh position={[0.06, -0.06, -0.02]}>
              <planeGeometry args={[w, cardH]} />
              <meshBasicMaterial color={[LIME, PINK, ORANGE, PURPLE][i % 4] ?? LIME} side={FrontSide} />
            </mesh>
            <mesh castShadow>
              <planeGeometry args={[w, cardH]} />
              <meshStandardMaterial map={textures[i] ?? null} side={DoubleSide} roughness={0.6} />
            </mesh>
          </group>
        );
      })}
    </group>
  );
}

export default function VisionScene({ active, reduced }: { active: boolean; reduced: boolean }) {
  const pointer = useRef<Pointer>({ x: 0, y: 0 });
  const scroll = useRef(0);
  const wrap = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const move = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    const onScroll = () => {
      const el = wrap.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      scroll.current = Math.max(-1, Math.min(1, (r.top + r.height / 2 - window.innerHeight / 2) / window.innerHeight));
    };
    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);
  return (
    <div ref={wrap} className="pointer-events-none absolute inset-0">
      <Canvas
        shadows
        dpr={[1, 1.5]}
        camera={{ position: [0, 1.2, 9.5], fov: 42 }}
        frameloop={active && !reduced ? "always" : "demand"}
        gl={{ antialias: true, alpha: true }}
        onCreated={({ gl }) => gl.domElement.closest("[data-scene]")?.setAttribute("data-scene-ready", "true")}
      >
        <ambientLight intensity={0.35} />
        <spotLight
          position={[0, 8, 4]}
          angle={0.5}
          penumbra={0.8}
          intensity={120}
          color={CREAM}
          castShadow
          shadow-mapSize={[1024, 1024]}
        />
        <pointLight position={[-5, 1, 3]} intensity={40} color={PINK} />
        <pointLight position={[5, -1, 3]} intensity={35} color={LIME} />
        <Environment resolution={128}>
          <Lightformer intensity={2} position={[0, 5, 0]} scale={[10, 10, 1]} color={CREAM} />
          <Lightformer intensity={2} color={PINK} position={[-5, 1, -1]} rotation-y={Math.PI / 2} scale={[20, 1, 1]} />
          <Lightformer intensity={2} color={LIME} position={[5, 1, -1]} rotation-y={-Math.PI / 2} scale={[20, 1, 1]} />
        </Environment>
        <Word pointer={pointer} />
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.6, 0]} receiveShadow>
          <planeGeometry args={[40, 40]} />
          <shadowMaterial opacity={0.45} />
        </mesh>
        <Suspense fallback={null}>
          <PhotoRing pointer={pointer} scroll={scroll} />
        </Suspense>
      </Canvas>
    </div>
  );
}
