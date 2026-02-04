import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh } from 'three';

interface GameConsoleProps {
  onClick: () => void;
  isHovered: boolean;
  onHover: (hovered: boolean) => void;
}

const GameConsole = ({ onClick, isHovered, onHover }: GameConsoleProps) => {
  const lightRef = useRef<Mesh>(null);

  useFrame((state) => {
    if (lightRef.current) {
      const material = lightRef.current.material as THREE.MeshStandardMaterial;
      material.emissiveIntensity = 0.5 + Math.sin(state.clock.getElapsedTime() * 3) * 0.3;
    }
  });

  return (
    <group
      position={[1.2, 0.15, 1.2]}
      rotation={[0, -0.3, 0]}
      onClick={onClick}
      onPointerEnter={() => onHover(true)}
      onPointerLeave={() => onHover(false)}
    >
      {/* Console Base */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[0.5, 0.12, 0.35]} />
        <meshStandardMaterial 
          color={isHovered ? '#3a3a4e' : '#1a1a2e'}
          emissive={isHovered ? '#8b5cf6' : '#000000'}
          emissiveIntensity={isHovered ? 0.3 : 0}
        />
      </mesh>

      {/* Power Light */}
      <mesh ref={lightRef} position={[-0.18, 0.07, 0.15]}>
        <sphereGeometry args={[0.02, 8, 8]} />
        <meshStandardMaterial 
          color="#4ade80"
          emissive="#4ade80"
          emissiveIntensity={0.5}
        />
      </mesh>

      {/* Disc Slot */}
      <mesh position={[0.1, 0.07, 0]}>
        <boxGeometry args={[0.2, 0.01, 0.15]} />
        <meshStandardMaterial color="#0a0a1e" />
      </mesh>

      {/* Controller */}
      <group position={[0.4, 0.08, 0.3]} rotation={[0.2, 0.5, 0]}>
        <mesh>
          <boxGeometry args={[0.25, 0.06, 0.15]} />
          <meshStandardMaterial color="#2a2a3e" />
        </mesh>
        {/* Analog sticks */}
        <mesh position={[-0.06, 0.04, -0.02]}>
          <cylinderGeometry args={[0.02, 0.02, 0.03, 8]} />
          <meshStandardMaterial color="#1a1a2e" />
        </mesh>
        <mesh position={[0.06, 0.04, 0.02]}>
          <cylinderGeometry args={[0.02, 0.02, 0.03, 8]} />
          <meshStandardMaterial color="#1a1a2e" />
        </mesh>
      </group>

      {/* Headset */}
      <group position={[-0.4, 0.15, 0.2]} rotation={[0.3, -0.2, 0.1]}>
        {/* Headband */}
        <mesh position={[0, 0.08, 0]}>
          <torusGeometry args={[0.1, 0.02, 8, 16, Math.PI]} />
          <meshStandardMaterial color="#2a2a3e" />
        </mesh>
        {/* Left ear */}
        <mesh position={[-0.1, 0, 0]}>
          <cylinderGeometry args={[0.06, 0.06, 0.04, 8]} />
          <meshStandardMaterial color="#1a1a2e" />
        </mesh>
        {/* Right ear */}
        <mesh position={[0.1, 0, 0]}>
          <cylinderGeometry args={[0.06, 0.06, 0.04, 8]} />
          <meshStandardMaterial color="#1a1a2e" />
        </mesh>
      </group>
    </group>
  );
};

export default GameConsole;
