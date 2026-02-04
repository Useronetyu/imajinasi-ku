import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { useIsMobile } from '@/hooks/use-mobile';

interface DustParticlesProps {
  reducedMotion?: boolean;
}

const DustParticles = ({ reducedMotion = false }: DustParticlesProps) => {
  const isMobile = useIsMobile();
  
  // Reduce particle count on mobile for performance
  const particleCount = isMobile ? 15 : 30;
  
  const particles = useMemo(() => {
    return Array.from({ length: particleCount }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2,
      delay: Math.random() * 5,
      duration: 8 + Math.random() * 4,
    }));
  }, [particleCount]);

  if (reducedMotion) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
            background: 'radial-gradient(circle, hsla(45, 80%, 80%, 0.6) 0%, transparent 70%)',
          }}
          animate={{
            y: [0, -30, -10, -40, 0],
            x: [0, 10, -5, 15, 0],
            opacity: [0.2, 0.6, 0.3, 0.7, 0.2],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
};

export default DustParticles;
