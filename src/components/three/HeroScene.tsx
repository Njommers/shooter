import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, Lightformer, MeshDistortMaterial } from "@react-three/drei";
import { useEffect, useRef } from "react";
import type { Group } from "three";

const ORANGE = "#f26a21";
const PINK = "#e8337e";
const LIME = "#c8f43a";
const PURPLE = "#5b2baf";
const CREAM = "#f3ebdd";

type Pointer = { x: number; y: number };

function Shapes({ pointer, compact }: { pointer: React.MutableRefObject<Pointer>; compact: boolean }) {
  const group = useRef<Group>(null);
  useFrame((state, delta) => {
    const g = group.current;
    if (!g) return;
    const dt = Math.min(delta, 0.05);
    const k = 1 - Math.exp(-3 * dt);
    g.rotation.y += (pointer.current.x * 0.35 - g.rotation.y) * k;
    g.rotation.x += (-pointer.current.y * 0.25 - g.rotation.x) * k;
    g.position.y = -window.scrollY * 0.002;
  });
  const s = compact ? 0.7 : 1;
  return (
    <group ref={group}>
      <Float speed={1.4} rotationIntensity={1.2} floatIntensity={1.6}>
        <mesh position={[-5.8 * s, 2.9, -3]}>
          <torusKnotGeometry args={[0.7 * s, 0.24 * s, 160, 24]} />
          <meshStandardMaterial color={ORANGE} metalness={0.55} roughness={0.2} />
        </mesh>
      </Float>
      <Float speed={2} rotationIntensity={2} floatIntensity={1.2}>
        <mesh position={[4.8 * s, -2.1, -0.5]}>
          <icosahedronGeometry args={[0.85 * s, 0]} />
          <meshStandardMaterial color={LIME} flatShading metalness={0.15} roughness={0.35} />
        </mesh>
      </Float>
      <Float speed={1.2} rotationIntensity={1.5} floatIntensity={2}>
        <mesh position={[3.6 * s, 2.7, -2.5]} rotation={[1, 0.4, 0]}>
          <torusGeometry args={[0.8 * s, 0.22 * s, 32, 96]} />
          <meshStandardMaterial color={PINK} metalness={0.4} roughness={0.25} />
        </mesh>
      </Float>
      <Float speed={1} rotationIntensity={0.6} floatIntensity={1.4}>
        <mesh position={[-6 * s, -3.4, -3.5]}>
          <sphereGeometry args={[0.95 * s, 64, 64]} />
          <MeshDistortMaterial color={PURPLE} distort={0.45} speed={2} roughness={0.15} metalness={0.3} />
        </mesh>
      </Float>
      {!compact && (
        <>
          <Float speed={2.4} rotationIntensity={3} floatIntensity={1}>
            <mesh position={[0.6, 3.3, -3.5]}>
              <octahedronGeometry args={[0.4, 0]} />
              <meshStandardMaterial color={CREAM} metalness={0.6} roughness={0.2} />
            </mesh>
          </Float>
          <Float speed={1.8} rotationIntensity={2} floatIntensity={1.5}>
            <mesh position={[-1.2, -3.3, -3]} rotation={[0.5, 0.5, 0]}>
              <coneGeometry args={[0.45, 0.9, 3]} />
              <meshStandardMaterial color={ORANGE} flatShading roughness={0.4} />
            </mesh>
          </Float>
          <Float speed={1.6} rotationIntensity={1} floatIntensity={2}>
            <mesh position={[6.2, 0.6, -3]}>
              <boxGeometry args={[0.6, 0.6, 0.6]} />
              <meshStandardMaterial color={PINK} roughness={0.3} metalness={0.2} />
            </mesh>
          </Float>
        </>
      )}
    </group>
  );
}

export default function HeroScene({ active, reduced }: { active: boolean; reduced: boolean }) {
  const pointer = useRef<Pointer>({ x: 0, y: 0 });
  const compact = typeof window !== "undefined" && window.innerWidth < 768;
  useEffect(() => {
    const move = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, []);
  return (
    <div className="pointer-events-none absolute inset-0">
      <Canvas
        dpr={[1, compact ? 1.25 : 1.6]}
        camera={{ position: [0, 0, 8], fov: 45 }}
        frameloop={active && !reduced ? "always" : "demand"}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        onCreated={({ gl }) => gl.domElement.closest("[data-scene]")?.setAttribute("data-scene-ready", "true")}
      >
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 6, 4]} intensity={2.2} color={CREAM} />
        <pointLight position={[-6, -2, 3]} intensity={30} color={PINK} />
        <pointLight position={[6, 3, 2]} intensity={25} color={LIME} />
        <Environment resolution={128}>
          <Lightformer intensity={2} position={[0, 5, 0]} scale={[10, 10, 1]} color={CREAM} />
          <Lightformer intensity={1.5} color={ORANGE} position={[-5, 1, -1]} rotation-y={Math.PI / 2} scale={[20, 1, 1]} />
          <Lightformer intensity={1.5} color={PURPLE} position={[5, -1, -1]} rotation-y={-Math.PI / 2} scale={[20, 1, 1]} />
        </Environment>
        <Shapes pointer={pointer} compact={compact} />
      </Canvas>
    </div>
  );
}
