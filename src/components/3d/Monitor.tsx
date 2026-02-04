import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh } from 'three';

interface MonitorProps {
  onClick: () => void;
  isHovered: boolean;
  onHover: (hovered: boolean) => void;
}

const Monitor = ({ onClick, isHovered, onHover }: MonitorProps) => {
  const screenRef = useRef<Mesh>(null);

  useFrame((state) => {
    if (screenRef.current) {
      const material = screenRef.current.material as THREE.MeshStandardMaterial;
      material.emissiveIntensity = 0.8 + Math.sin(state.clock.getElapsedTime() * 2) * 0.2;
    }
  });

  return (
    <group
      position={[0, 1.1, -0.8]}
      onClick={onClick}
      onPointerEnter={() => onHover(true)}
      onPointerLeave={() => onHover(false)}
    >
      {/* Monitor Frame */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[1.2, 0.8, 0.08]} />
        <meshStandardMaterial 
          color={isHovered ? '#4a4a6e' : '#2a2a3e'}
          emissive={isHovered ? '#6366f1' : '#000000'}
          emissiveIntensity={isHovered ? 0.2 : 0}
        />
      </mesh>

      {/* Screen */}
      <mesh ref={screenRef} position={[0, 0, 0.05]}>
        <boxGeometry args={[1.0, 0.65, 0.02]} />
        <meshStandardMaterial 
          color="#1a1a2e"
          emissive="#4ade80"
          emissiveIntensity={0.8}
        />
      </mesh>

      {/* Code lines on screen */}
      {[-0.2, -0.1, 0, 0.1, 0.2].map((y, i) => (
        <mesh key={i} position={[-0.2 + (i % 3) * 0.05, y, 0.07]}>
          <boxGeometry args={[0.3 + (i % 2) * 0.2, 0.03, 0.01]} />
          <meshStandardMaterial 
            color="#4ade80"
            emissive="#4ade80"
            emissiveIntensity={0.5}
          />
        </mesh>
      ))}

      {/* Stand */}
      <mesh position={[0, -0.5, 0]}>
        <boxGeometry args={[0.15, 0.2, 0.1]} />
        <meshStandardMaterial color="#2a2a3e" />
      </mesh>

      {/* Base */}
      <mesh position={[0, -0.62, 0.1]}>
        <boxGeometry args={[0.4, 0.04, 0.25]} />
        <meshStandardMaterial color="#2a2a3e" />
      </mesh>
    </group>
  );
};

export default Monitor;
