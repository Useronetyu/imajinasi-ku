interface BookshelfProps {
  onClick: () => void;
  isHovered: boolean;
  onHover: (hovered: boolean) => void;
}

const Bookshelf = ({ onClick, isHovered, onHover }: BookshelfProps) => {
  const bookColors = ['#ef4444', '#3b82f6', '#22c55e', '#f59e0b', '#8b5cf6', '#ec4899'];

  return (
    <group
      position={[-1.9, 0.8, -0.8]}
      rotation={[0, Math.PI / 2, 0]}
      onClick={onClick}
      onPointerEnter={() => onHover(true)}
      onPointerLeave={() => onHover(false)}
    >
      {/* Shelf Frame */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[0.8, 1.2, 0.25]} />
        <meshStandardMaterial 
          color={isHovered ? '#5c4033' : '#4a3728'}
          emissive={isHovered ? '#f59e0b' : '#000000'}
          emissiveIntensity={isHovered ? 0.2 : 0}
        />
      </mesh>

      {/* Shelves */}
      {[-0.35, 0, 0.35].map((y, i) => (
        <mesh key={i} position={[0, y, 0.02]}>
          <boxGeometry args={[0.7, 0.03, 0.22]} />
          <meshStandardMaterial color="#3d2b1f" />
        </mesh>
      ))}

      {/* Books - Top Shelf */}
      {[-0.25, -0.15, -0.05, 0.05, 0.15].map((x, i) => (
        <mesh key={`top-${i}`} position={[x, 0.47, 0.02]}>
          <boxGeometry args={[0.08, 0.2, 0.15]} />
          <meshStandardMaterial color={bookColors[i % bookColors.length]} />
        </mesh>
      ))}

      {/* Books - Middle Shelf */}
      {[-0.2, -0.05, 0.1, 0.22].map((x, i) => (
        <mesh key={`mid-${i}`} position={[x, 0.13, 0.02]}>
          <boxGeometry args={[0.1, 0.22, 0.15]} />
          <meshStandardMaterial color={bookColors[(i + 2) % bookColors.length]} />
        </mesh>
      ))}

      {/* Books - Bottom Shelf */}
      {[-0.22, -0.08, 0.08, 0.2].map((x, i) => (
        <mesh key={`bot-${i}`} position={[x, -0.22, 0.02]}>
          <boxGeometry args={[0.09, 0.18, 0.15]} />
          <meshStandardMaterial color={bookColors[(i + 4) % bookColors.length]} />
        </mesh>
      ))}

      {/* Small plant pot */}
      <mesh position={[0.28, 0.5, 0.02]}>
        <cylinderGeometry args={[0.04, 0.03, 0.06, 8]} />
        <meshStandardMaterial color="#cd853f" />
      </mesh>
      <mesh position={[0.28, 0.58, 0.02]}>
        <sphereGeometry args={[0.05, 8, 8]} />
        <meshStandardMaterial color="#22c55e" />
      </mesh>
    </group>
  );
};

export default Bookshelf;
