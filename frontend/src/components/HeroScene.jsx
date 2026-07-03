import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Environment, MeshDistortMaterial, Sparkles } from "@react-three/drei";
import { useRef, Suspense } from "react";
import * as THREE from "three";

function RotatingTorus({ position = [0, 0, 0], scale = 1, color = "#D4AF37" }) {
  const ref = useRef();
  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x += delta * 0.15;
      ref.current.rotation.y += delta * 0.25;
    }
  });
  return (
    <Float speed={1.4} rotationIntensity={0.4} floatIntensity={0.8}>
      <mesh ref={ref} position={position} scale={scale}>
        <torusKnotGeometry args={[1, 0.28, 220, 32]} />
        <MeshDistortMaterial
          color={color}
          metalness={1}
          roughness={0.12}
          distort={0.28}
          speed={1.8}
          emissive={color}
          emissiveIntensity={0.15}
        />
      </mesh>
    </Float>
  );
}

function ChromeSphere({ position, scale, color = "#ffffff" }) {
  const ref = useRef();
  useFrame((state, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.1;
  });
  return (
    <Float speed={0.8} rotationIntensity={0.2} floatIntensity={1.2}>
      <mesh ref={ref} position={position} scale={scale}>
        <icosahedronGeometry args={[1, 3]} />
        <meshStandardMaterial
          color={color}
          metalness={1}
          roughness={0.05}
          envMapIntensity={1.4}
        />
      </mesh>
    </Float>
  );
}

export default function HeroScene() {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 pointer-events-none"
    >
      <Canvas
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        camera={{ position: [0, 0, 6], fov: 45 }}
        onCreated={({ gl }) => {
          gl.toneMapping = THREE.ACESFilmicToneMapping;
          gl.toneMappingExposure = 1.1;
        }}
      >
        <fog attach="fog" args={["#050505", 8, 22]} />

        <ambientLight intensity={0.35} />
        <directionalLight position={[5, 5, 5]} intensity={1.2} color="#ffe6a3" />
        <directionalLight position={[-5, -3, -5]} intensity={0.6} color="#4a6ea9" />
        <pointLight position={[0, 0, 5]} intensity={0.8} color="#D4AF37" />

        <Suspense fallback={null}>
          <Environment preset="city" background={false} />
          <RotatingTorus position={[5, -1.6, -2]} scale={0.9} color="#D4AF37" />
          <ChromeSphere position={[-5.5, 2.4, -3]} scale={0.55} color="#e8e8e8" />
          <ChromeSphere position={[4.6, 2.6, -1]} scale={0.32} color="#c0c0c0" />
          <Sparkles
            count={70}
            scale={[16, 9, 6]}
            size={2.2}
            speed={0.35}
            opacity={0.55}
            color="#D4AF37"
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
