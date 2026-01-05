export default function Lights() {
  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={1.2} />
      <pointLight position={[-3, 2, 3]} intensity={2} color="#22c55e" />
      <pointLight position={[3, -2, 3]} intensity={2} color="#a855f7" />
    </>
  );
}
