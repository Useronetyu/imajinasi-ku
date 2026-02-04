import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh, Group } from 'three';

interface AvatarProps {
  onClick: () => void;
  isHovered: boolean;
  onHover: (hovered: boolean) => void;
}

const Avatar = ({ onClick, isHovered, onHover }: AvatarProps) => {
  const groupRef = useRef<Group>(null);
  const leftHandRef = useRef<Mesh>(null);
  const rightHandRef = useRef<Mesh>(null);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    // Typing animation for hands
    if (leftHandRef.current) {
      leftHandRef.current.position.y = 0.1 + Math.sin(time * 8) * 0.02;
    }
    if (rightHandRef.current) {
      rightHandRef.current.position.y = 0.1 + Math.sin(time * 8 + 1) * 0.02;
    }

    // Subtle breathing animation
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(time * 2) * 0.02;
    }
  });

  return (
    <group
      ref={groupRef}
      position={[0, 0.5, 0.3]}
      onClick={onClick}
      onPointerEnter={() => onHover(true)}
      onPointerLeave={() => onHover(false)}
    >
      {/* Body */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[0.4, 0.5, 0.25]} />
        <meshStandardMaterial 
          color={isHovered ? '#8b5cf6' : '#6366f1'} 
          emissive={isHovered ? '#6366f1' : '#000000'}
          emissiveIntensity={isHovered ? 0.3 : 0}
        />
      </mesh>

      {/* Head */}
      <mesh position={[0, 0.4, 0]}>
        <boxGeometry args={[0.3, 0.3, 0.25]} />
        <meshStandardMaterial 
          color="#fcd9b6"
          emissive={isHovered ? '#fcd9b6' : '#000000'}
          emissiveIntensity={isHovered ? 0.2 : 0}
        />
      </mesh>

      {/* Hair */}
      <mesh position={[0, 0.52, 0]}>
        <boxGeometry args={[0.32, 0.12, 0.27]} />
        <meshStandardMaterial color="#1a1a2e" />
      </mesh>

      {/* Left Arm */}
      <mesh position={[-0.28, 0.05, 0.15]}>
        <boxGeometry args={[0.12, 0.3, 0.12]} />
        <meshStandardMaterial color="#6366f1" />
      </mesh>

      {/* Right Arm */}
      <mesh position={[0.28, 0.05, 0.15]}>
        <boxGeometry args={[0.12, 0.3, 0.12]} />
        <meshStandardMaterial color="#6366f1" />
      </mesh>

      {/* Left Hand */}
      <mesh ref={leftHandRef} position={[-0.28, -0.1, 0.25]}>
        <boxGeometry args={[0.1, 0.1, 0.1]} />
        <meshStandardMaterial color="#fcd9b6" />
      </mesh>

      {/* Right Hand */}
      <mesh ref={rightHandRef} position={[0.28, -0.1, 0.25]}>
        <boxGeometry args={[0.1, 0.1, 0.1]} />
        <meshStandardMaterial color="#fcd9b6" />
      </mesh>

      {/* Chair */}
      <mesh position={[0, -0.15, -0.1]}>
        <boxGeometry args={[0.5, 0.1, 0.45]} />
        <meshStandardMaterial color="#4a4a5e" />
      </mesh>
      <mesh position={[0, 0.1, -0.3]}>
        <boxGeometry args={[0.5, 0.6, 0.1]} />
        <meshStandardMaterial color="#4a4a5e" />
      </mesh>
    </group>
  );
};

export default Avatar;
