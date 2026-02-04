import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh } from 'three';

const CoffeeSteam = () => {
  const steamParticlesRef = useRef<Mesh[]>([]);

  const steamData = useMemo(() => {
    return Array.from({ length: 5 }).map((_, i) => ({
      offsetX: (Math.random() - 0.5) * 0.03,
      offsetZ: (Math.random() - 0.5) * 0.03,
      speed: 0.3 + Math.random() * 0.2,
      phase: (i / 5) * Math.PI * 2,
    }));
  }, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    steamParticlesRef.current.forEach((mesh, i) => {
      if (mesh) {
        const data = steamData[i];
        const cycleTime = (time * data.speed + data.phase) % 2;
        
        // Rise and fade cycle
        mesh.position.y = 0.08 + cycleTime * 0.15;
        mesh.position.x = data.offsetX + Math.sin(time * 2 + data.phase) * 0.01;
        mesh.position.z = data.offsetZ + Math.cos(time * 2 + data.phase) * 0.01;
        
        // Scale and opacity based on height
        const scale = 0.02 + cycleTime * 0.02;
        mesh.scale.setScalar(scale);
        
        const material = mesh.material as THREE.MeshStandardMaterial;
        material.opacity = Math.max(0, 0.4 - cycleTime * 0.2);
      }
    });
  });

  return (
    <group position={[0.7, 0.68, -0.4]}>
      {steamData.map((_, i) => (
        <mesh
          key={i}
          ref={(el) => { if (el) steamParticlesRef.current[i] = el; }}
          position={[0, 0.08, 0]}
        >
          <sphereGeometry args={[0.02, 6, 6]} />
          <meshStandardMaterial
            color="#ffffff"
            transparent
            opacity={0.3}
            depthWrite={false}
          />
        </mesh>
      ))}
    </group>
  );
};

export default CoffeeSteam;
