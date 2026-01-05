import { Canvas } from "@react-three/fiber";
import { Environment, Float } from "@react-three/drei";
import FloatingCard from "./FloatingCard";
import Lights from "./Lights";

export default function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 45 }}
      className="absolute inset-0"
    >
      <color attach="background" args={["#070b1f"]} />

      <Lights />

      <Float speed={2} rotationIntensity={0.4} floatIntensity={0.6}>
        <FloatingCard />
      </Float>

      <Environment preset="city" />
    </Canvas>
  );
}
