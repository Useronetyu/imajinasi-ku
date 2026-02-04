const Room = () => {
  return (
    <group>
      {/* Floor */}
      <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[4, 4]} />
        <meshStandardMaterial color="#2d2d3a" />
      </mesh>

      {/* Floor Pattern (wooden planks effect) */}
      {Array.from({ length: 8 }).map((_, i) => (
        <mesh key={i} position={[-1.75 + i * 0.5, 0.001, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[0.48, 4]} />
          <meshStandardMaterial color={i % 2 === 0 ? '#3a3a4a' : '#323242'} />
        </mesh>
      ))}

      {/* Walls */}
      {/* Back Wall */}
      <mesh position={[0, 1.25, -2]}>
        <planeGeometry args={[4, 2.5]} />
        <meshStandardMaterial color="#1e1e2e" />
      </mesh>

      {/* Left Wall */}
      <mesh position={[-2, 1.25, 0]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[4, 2.5]} />
        <meshStandardMaterial color="#252535" />
      </mesh>

      {/* Right Wall */}
      <mesh position={[2, 1.25, 0]} rotation={[0, -Math.PI / 2, 0]}>
        <planeGeometry args={[4, 2.5]} />
        <meshStandardMaterial color="#252535" />
      </mesh>

      {/* Desk */}
      <mesh position={[0, 0.6, -0.6]}>
        <boxGeometry args={[1.8, 0.08, 0.9]} />
        <meshStandardMaterial color="#5c4033" />
      </mesh>

      {/* Desk Legs */}
      {[[-0.8, 0.28, -0.95], [0.8, 0.28, -0.95], [-0.8, 0.28, -0.25], [0.8, 0.28, -0.25]].map((pos, i) => (
        <mesh key={i} position={pos as [number, number, number]}>
          <boxGeometry args={[0.08, 0.56, 0.08]} />
          <meshStandardMaterial color="#4a3728" />
        </mesh>
      ))}

      {/* Rug */}
      <mesh position={[0.5, 0.01, 0.8]} rotation={[-Math.PI / 2, 0, 0.2]}>
        <planeGeometry args={[1.5, 1]} />
        <meshStandardMaterial color="#6366f1" />
      </mesh>
      <mesh position={[0.5, 0.012, 0.8]} rotation={[-Math.PI / 2, 0, 0.2]}>
        <planeGeometry args={[1.3, 0.8]} />
        <meshStandardMaterial color="#8b5cf6" />
      </mesh>

      {/* Keyboard on desk */}
      <mesh position={[0, 0.67, -0.3]}>
        <boxGeometry args={[0.5, 0.02, 0.18]} />
        <meshStandardMaterial color="#1a1a2e" />
      </mesh>

      {/* Mouse */}
      <mesh position={[0.4, 0.66, -0.3]}>
        <boxGeometry args={[0.06, 0.02, 0.1]} />
        <meshStandardMaterial color="#1a1a2e" />
      </mesh>

      {/* Coffee Cup */}
      <mesh position={[0.7, 0.68, -0.4]}>
        <cylinderGeometry args={[0.04, 0.035, 0.08, 12]} />
        <meshStandardMaterial color="#fef3c7" />
      </mesh>
      {/* Coffee */}
      <mesh position={[0.7, 0.71, -0.4]}>
        <cylinderGeometry args={[0.035, 0.035, 0.02, 12]} />
        <meshStandardMaterial color="#78350f" />
      </mesh>

      {/* Poster on back wall */}
      <mesh position={[0.8, 1.5, -1.98]}>
        <boxGeometry args={[0.5, 0.7, 0.02]} />
        <meshStandardMaterial color="#ec4899" />
      </mesh>
      <mesh position={[0.8, 1.5, -1.97]}>
        <boxGeometry args={[0.45, 0.65, 0.01]} />
        <meshStandardMaterial color="#1a1a2e" />
      </mesh>
    </group>
  );
};

export default Room;
