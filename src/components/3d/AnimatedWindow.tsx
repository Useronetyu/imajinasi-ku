import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh } from 'three';

interface AnimatedWindowProps {
  onClick: () => void;
  isHovered: boolean;
  onHover: (hovered: boolean) => void;
  isRaining: boolean;
}

const AnimatedWindow = ({ onClick, isHovered, onHover, isRaining }: AnimatedWindowProps) => {
  const starsRef = useRef<Mesh[]>([]);
  const moonRef = useRef<Mesh>(null);

  const stars = useMemo(() => {
    return Array.from({ length: 20 }).map(() => ({
      x: (Math.random() - 0.5) * 0.8,
      y: (Math.random() - 0.5) * 0.6,
      size: Math.random() * 0.02 + 0.01,
      twinkleSpeed: Math.random() * 2 + 1,
    }));
  }, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    // Twinkling stars
    starsRef.current.forEach((star, i) => {
      if (star) {
        const material = star.material as THREE.MeshStandardMaterial;
        if (isRaining) {
          // Dim stars when raining
          material.emissiveIntensity = 0.1;
        } else {
          material.emissiveIntensity = 0.5 + Math.sin(time * stars[i].twinkleSpeed) * 0.5;
        }
      }
    });

    // Moon glow animation
    if (moonRef.current) {
      const material = moonRef.current.material as THREE.MeshStandardMaterial;
      if (isRaining) {
        material.emissiveIntensity = 0.1;
        material.color.setHex(0x999999);
      } else {
        material.emissiveIntensity = 0.4 + Math.sin(time * 0.5) * 0.1;
        material.color.setHex(0xfef3c7);
      }
    }
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

      {/* Glass Pane - changes color based on weather */}
      <mesh position={[0, 0, 0.03]}>
        <boxGeometry args={[1.0, 0.85, 0.02]} />
        <meshStandardMaterial 
          color={isRaining ? '#1a2a4a' : '#0c1445'}
          transparent
          opacity={isRaining ? 0.95 : 0.9}
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
          visible={!isRaining}
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
      <mesh ref={moonRef} position={[0.3, 0.25, 0.04]}>
        <sphereGeometry args={[0.08, 12, 12]} />
        <meshStandardMaterial 
          color={isRaining ? '#999999' : '#fef3c7'}
          emissive={isRaining ? '#666666' : '#fef3c7'}
          emissiveIntensity={isRaining ? 0.1 : 0.4}
        />
      </mesh>

      {/* Rain clouds (visible when raining) */}
      {isRaining && (
        <>
          <mesh position={[-0.2, 0.3, 0.04]}>
            <sphereGeometry args={[0.08, 8, 8]} />
            <meshStandardMaterial color="#4a5568" transparent opacity={0.8} />
          </mesh>
          <mesh position={[-0.1, 0.32, 0.04]}>
            <sphereGeometry args={[0.06, 8, 8]} />
            <meshStandardMaterial color="#4a5568" transparent opacity={0.8} />
          </mesh>
          <mesh position={[0, 0.28, 0.04]}>
            <sphereGeometry args={[0.07, 8, 8]} />
            <meshStandardMaterial color="#4a5568" transparent opacity={0.8} />
          </mesh>
        </>
      )}
    </group>
  );
};

export default AnimatedWindow;
