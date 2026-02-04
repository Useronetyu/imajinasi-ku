import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh, InstancedMesh, Object3D, MeshStandardMaterial } from 'three';

interface RainEffectProps {
  isRaining: boolean;
  isMobile?: boolean;
}

const RainEffect = ({ isRaining, isMobile = false }: RainEffectProps) => {
  const rainRef = useRef<InstancedMesh>(null);
  const dummy = useMemo(() => new Object3D(), []);
  
  // Reduce particle count on mobile for performance
  const rainCount = isMobile ? 50 : 100;
  
  const raindrops = useMemo(() => {
    return Array.from({ length: rainCount }).map(() => ({
      x: (Math.random() - 0.5) * 1.0,
      y: Math.random() * 0.8,
      z: 0.05 + Math.random() * 0.02,
      speed: 0.8 + Math.random() * 0.5,
    }));
  }, [rainCount]);

  useFrame((state) => {
    if (!rainRef.current || !isRaining) return;
    
    const time = state.clock.getElapsedTime();
    
    raindrops.forEach((drop, i) => {
      const y = ((drop.y - time * drop.speed) % 0.8 + 0.8) % 0.8 - 0.4;
      
      dummy.position.set(drop.x, y, drop.z);
      dummy.scale.set(0.002, 0.02, 0.002);
      dummy.updateMatrix();
      rainRef.current!.setMatrixAt(i, dummy.matrix);
    });
    
    rainRef.current.instanceMatrix.needsUpdate = true;
  });

  if (!isRaining) return null;

  return (
    <group position={[1.9, 1.3, 0]} rotation={[0, -Math.PI / 2, 0]}>
      <instancedMesh ref={rainRef} args={[undefined, undefined, rainCount]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial
          color="#a0c4ff"
          transparent
          opacity={0.6}
          emissive="#a0c4ff"
          emissiveIntensity={0.3}
        />
      </instancedMesh>
    </group>
  );
};

export default RainEffect;
