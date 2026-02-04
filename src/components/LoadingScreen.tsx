import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

const LoadingScreen = ({ onLoadingComplete }: LoadingScreenProps) => {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsExiting(true);
            setTimeout(onLoadingComplete, 800);
          }, 500);
          return 100;
        }
        return prev + Math.random() * 15 + 5;
      });
    }, 200);

    return () => clearInterval(interval);
  }, [onLoadingComplete]);

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background"
          style={{
            background: 'linear-gradient(180deg, hsl(230 40% 4%) 0%, hsl(260 35% 8%) 50%, hsl(230 35% 6%) 100%)',
          }}
        >
          {/* Wireframe Cube */}
          <div className="relative w-32 h-32 mb-12" style={{ perspective: '500px' }}>
            <motion.div
              className="w-full h-full relative"
              animate={{ rotateX: 360, rotateY: 360 }}
              transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Cube faces */}
              {[
                { rotateY: 0, translateZ: 64 },
                { rotateY: 180, translateZ: 64 },
                { rotateY: 90, translateZ: 64 },
                { rotateY: -90, translateZ: 64 },
                { rotateX: 90, translateZ: 64 },
                { rotateX: -90, translateZ: 64 },
              ].map((face, i) => (
                <div
                  key={i}
                  className="absolute inset-0 border-2 border-primary/40"
                  style={{
                    transform: `rotateY(${face.rotateY || 0}deg) rotateX(${face.rotateX || 0}deg) translateZ(${face.translateZ}px)`,
                    background: 'transparent',
                  }}
                />
              ))}
            </motion.div>
          </div>

          {/* Loading Text */}
          <motion.h2
            className="text-2xl font-mono text-primary mb-8 glow-text"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Loading Ilham's World...
          </motion.h2>

          {/* Progress Bar */}
          <div className="w-64 h-2 bg-muted rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-primary rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${Math.min(progress, 100)}%` }}
              transition={{ duration: 0.3 }}
              style={{
                boxShadow: '0 0 20px hsl(45 100% 60% / 0.5)',
              }}
            />
          </div>

          {/* Progress Percentage */}
          <motion.p
            className="mt-4 text-sm font-mono text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {Math.min(Math.round(progress), 100)}%
          </motion.p>

          {/* Floating Dust Particles */}
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-dust/50"
              initial={{
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                opacity: 0,
              }}
              animate={{
                y: [null, Math.random() * -100 - 50],
                opacity: [0, 0.6, 0],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
