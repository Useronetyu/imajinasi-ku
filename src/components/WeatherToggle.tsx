import { motion } from 'framer-motion';
import { Sun, CloudRain } from 'lucide-react';

interface WeatherToggleProps {
  isRaining: boolean;
  onToggle: () => void;
}

const WeatherToggle = ({ isRaining, onToggle }: WeatherToggleProps) => {
  return (
    <motion.button
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1.7 }}
      onClick={onToggle}
      className="fixed bottom-6 left-20 z-30 p-3 glass-card hover:bg-muted/50 transition-colors"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      title={isRaining ? 'Switch to Starry Night' : 'Switch to Rainy Night'}
    >
      {isRaining ? (
        <CloudRain className="w-5 h-5 text-blue-400 animate-pulse" />
      ) : (
        <Sun className="w-5 h-5 text-yellow-400" />
      )}
    </motion.button>
  );
};

export default WeatherToggle;
