import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh } from 'three';

interface WindowProps {
  onClick: () => void;
  isHovered: boolean;
  onHover: (hovered: boolean) => void;
}

const Window = ({ onClick, isHovered, onHover }: WindowProps) => {
  const starsRef = useRef<Mesh[]>([]);

  const stars = useMemo(() => {
    return Array.from({ length: 20 }).map(() => ({
      x: (Math.random() - 0.5) * 0.8,
      y: (Math.random() - 0.5) * 0.6,
      size: Math.random() * 0.02 + 0.01,
      twinkleSpeed: Math.random() * 2 + 1,
    }));
  }, []);

  useFrame((state) => {
    starsRef.current.forEach((star, i) => {
      if (star) {
        const material = star.material as THREE.MeshStandardMaterial;
        material.emissiveIntensity = 0.5 + Math.sin(state.clock.getElapsedTime() * stars[i].twinkleSpeed) * 0.5;
      }
    });
  });

  return (
    <group
      position={[1.9, 1.3, 0]}
      rotation={[0, -Math.PI / 2, 0]}
      onClick={onClick}
      onPointerEnter={() => onHover(true)}
      onPointerLeave={() => onHover(false)}
    >
      {/* Window Frame */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[1.2, 1, 0.1]} />
        <meshStandardMaterial 
          color="#4a3728"
          emissive={isHovered ? '#f59e0b' : '#000000'}
          emissiveIntensity={isHovered ? 0.2 : 0}
        />
      </mesh>

      {/* Glass Pane */}
      <mesh position={[0, 0, 0.03]}>
        <boxGeometry args={[1.0, 0.85, 0.02]} />
        <meshStandardMaterial 
          color="#0c1445"
          transparent
          opacity={0.9}
        />
      </mesh>

      {/* Window Cross */}
      <mesh position={[0, 0, 0.05]}>
        <boxGeometry args={[1.0, 0.04, 0.02]} />
        <meshStandardMaterial color="#4a3728" />
      </mesh>
      <mesh position={[0, 0, 0.05]}>
        <boxGeometry args={[0.04, 0.85, 0.02]} />
        <meshStandardMaterial color="#4a3728" />
      </mesh>

      {/* Stars */}
      {stars.map((star, i) => (
        <mesh
          key={i}
          ref={(el) => { if (el) starsRef.current[i] = el; }}
          position={[star.x, star.y, 0.04]}
        >
          <sphereGeometry args={[star.size, 6, 6]} />
          <meshStandardMaterial 
            color="#fffbeb"
            emissive="#fffbeb"
            emissiveIntensity={0.5}
          />
        </mesh>
      ))}

      {/* Moon */}
      <mesh position={[0.3, 0.25, 0.04]}>
        <sphereGeometry args={[0.08, 12, 12]} />
        <meshStandardMaterial 
          color="#fef3c7"
          emissive="#fef3c7"
          emissiveIntensity={0.4}
        />
      </mesh>
    </group>
  );
};

export default Window;
