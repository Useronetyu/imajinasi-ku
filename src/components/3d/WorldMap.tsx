interface WorldMapProps {
  onClick: () => void;
  isHovered: boolean;
  onHover: (hovered: boolean) => void;
}

const WorldMap = ({ onClick, isHovered, onHover }: WorldMapProps) => {
  // Pin positions for Singapore, China, and Japan (relative to map)
  const pins = [
    { name: 'Singapore', position: [0.15, -0.1, 0.03] as [number, number, number] },
    { name: 'China', position: [0.1, 0.1, 0.03] as [number, number, number] },
    { name: 'Japan', position: [0.25, 0.12, 0.03] as [number, number, number] },
  ];

  return (
    <group
      position={[-1.9, 1.2, 0]}
      rotation={[0, Math.PI / 2, 0]}
      onClick={onClick}
      onPointerEnter={() => onHover(true)}
      onPointerLeave={() => onHover(false)}
    >
      {/* Map Frame */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[1.2, 0.8, 0.05]} />
        <meshStandardMaterial 
          color={isHovered ? '#3d5a80' : '#2d4a70'}
          emissive={isHovered ? '#60a5fa' : '#000000'}
          emissiveIntensity={isHovered ? 0.3 : 0}
        />
      </mesh>

      {/* Map Surface (lighter for contrast) */}
      <mesh position={[0, 0, 0.03]}>
        <boxGeometry args={[1.1, 0.7, 0.01]} />
        <meshStandardMaterial color="#e8d5b7" />
      </mesh>

      {/* Continents (simplified shapes) */}
      {/* Asia */}
      <mesh position={[0.1, 0.05, 0.04]}>
        <boxGeometry args={[0.5, 0.35, 0.01]} />
        <meshStandardMaterial color="#4ade80" />
      </mesh>

      {/* Red Pins */}
      {pins.map((pin, i) => (
        <group key={i} position={pin.position}>
          {/* Pin head */}
          <mesh position={[0, 0.03, 0]}>
            <sphereGeometry args={[0.04, 8, 8]} />
            <meshStandardMaterial 
              color="#ef4444"
              emissive="#ef4444"
              emissiveIntensity={0.5}
            />
          </mesh>
          {/* Pin body */}
          <mesh position={[0, 0, 0]}>
            <cylinderGeometry args={[0.01, 0.01, 0.06, 8]} />
            <meshStandardMaterial color="#991b1b" />
          </mesh>
        </group>
      ))}

      {/* Frame Border */}
      <mesh position={[0, 0, -0.01]}>
        <boxGeometry args={[1.25, 0.85, 0.02]} />
        <meshStandardMaterial color="#8b4513" />
      </mesh>
    </group>
  );
};

export default WorldMap;
