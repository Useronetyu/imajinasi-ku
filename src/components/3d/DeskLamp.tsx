import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh } from 'three';

const DeskLamp = () => {
  const lightRef = useRef<Mesh>(null);

  useFrame((state) => {
    if (lightRef.current) {
      const material = lightRef.current.material as THREE.MeshStandardMaterial;
      material.emissiveIntensity = 0.8 + Math.sin(state.clock.getElapsedTime() * 0.5) * 0.1;
    }
  });

  return (
    <group position={[-0.7, 0.65, -0.5]}>
      {/* Base */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.08, 0.1, 0.03, 12]} />
        <meshStandardMaterial color="#2a2a3e" />
      </mesh>

      {/* Arm */}
      <mesh position={[0, 0.2, 0]} rotation={[0, 0, 0.2]}>
        <cylinderGeometry args={[0.015, 0.015, 0.35, 8]} />
        <meshStandardMaterial color="#4a4a5e" />
      </mesh>

      {/* Lamp Head */}
      <mesh position={[0.08, 0.38, 0]} rotation={[0, 0, 0.5]}>
        <coneGeometry args={[0.1, 0.12, 12, 1, true]} />
        <meshStandardMaterial color="#2a2a3e" side={2} />
      </mesh>

      {/* Light Bulb */}
      <mesh ref={lightRef} position={[0.08, 0.34, 0]}>
        <sphereGeometry args={[0.04, 12, 12]} />
        <meshStandardMaterial 
          color="#fef08a"
          emissive="#fef08a"
          emissiveIntensity={0.8}
        />
      </mesh>
    </group>
  );
};

export default DeskLamp;
