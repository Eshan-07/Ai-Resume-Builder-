import { RoundedBox } from "@react-three/drei";

export default function FloatingCard() {
  return (
    <RoundedBox args={[3.6, 2.2, 0.1]} radius={0.08} smoothness={4}>
      <meshPhysicalMaterial
        transmission={1}
        roughness={0.08}
        thickness={0.8}
        clearcoat={1}
        envMapIntensity={1}
        color="#7c3aed"
      />
    </RoundedBox>
  );
}
