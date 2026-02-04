import { useState } from 'react';
import LoadingScreen from '../components/LoadingScreen';
import Scene3D from '../components/Scene3D';
import DustParticles from '../components/DustParticles';
import AudioPlayer from '../components/AudioPlayer';
import ContactButton from '../components/ContactButton';
import WeatherToggle from '../components/WeatherToggle';
import { motion, AnimatePresence } from 'framer-motion';

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isRaining, setIsRaining] = useState(false);

  return (
    <div className="w-full h-screen overflow-hidden relative">
      {/* Loading Screen */}
      <AnimatePresence>
        {isLoading && (
          <LoadingScreen onLoadingComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      {/* Main Content */}
      <AnimatePresence>
        {!isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="w-full h-full"
          >
            {/* Header */}
            <motion.header
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="fixed top-0 left-0 right-0 z-20 p-4 sm:p-6"
            >
              <div className="flex items-center justify-between max-w-7xl mx-auto">
                <h1 className="text-lg sm:text-2xl font-mono font-bold text-primary glow-text">
                  Ilham's Imagination Room
                </h1>
                <nav className="hidden md:flex items-center gap-6">
                  <span className="text-sm text-muted-foreground font-mono">
                    Portfolio 2026
                  </span>
                </nav>
              </div>
            </motion.header>

            {/* 3D Scene */}
            <Scene3D isRaining={isRaining} />

            {/* Dust Particles Overlay - reduce when raining */}
            <DustParticles reducedMotion={isRaining} />

            {/* Audio Player */}
            <AudioPlayer isRaining={isRaining} />

            {/* Weather Toggle */}
            <WeatherToggle 
              isRaining={isRaining} 
              onToggle={() => setIsRaining(!isRaining)} 
            />

            {/* Contact Button */}
            <ContactButton />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Index;
