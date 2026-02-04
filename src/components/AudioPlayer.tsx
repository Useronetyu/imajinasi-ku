import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Volume2, VolumeX } from 'lucide-react';

interface AudioPlayerProps {
  isRaining?: boolean;
}

const AudioPlayer = ({ isRaining = false }: AudioPlayerProps) => {
  const [isMuted, setIsMuted] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const rainAudioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Lo-fi ambient track
    audioRef.current = new Audio('https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=lofi-study-112191.mp3');
    audioRef.current.loop = true;
    audioRef.current.volume = 0.3;

    // Rain ambient track
    rainAudioRef.current = new Audio('https://cdn.pixabay.com/download/audio/2022/03/10/audio_d49966ba63.mp3?filename=rain-and-thunder-16705.mp3');
    rainAudioRef.current.loop = true;
    rainAudioRef.current.volume = 0.4;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      if (rainAudioRef.current) {
        rainAudioRef.current.pause();
        rainAudioRef.current = null;
      }
    };
  }, []);

  // Handle weather change
  useEffect(() => {
    if (isMuted) return;

    const fadeOut = (audio: HTMLAudioElement, duration: number = 500) => {
      const startVolume = audio.volume;
      const steps = 20;
      const stepTime = duration / steps;
      let step = 0;
      
      const fade = setInterval(() => {
        step++;
        audio.volume = Math.max(0, startVolume * (1 - step / steps));
        if (step >= steps) {
          clearInterval(fade);
          audio.pause();
          audio.volume = startVolume;
        }
      }, stepTime);
    };

    const fadeIn = async (audio: HTMLAudioElement, targetVolume: number, duration: number = 500) => {
      audio.volume = 0;
      try {
        await audio.play();
        const steps = 20;
        const stepTime = duration / steps;
        let step = 0;
        
        const fade = setInterval(() => {
          step++;
          audio.volume = Math.min(targetVolume, targetVolume * (step / steps));
          if (step >= steps) {
            clearInterval(fade);
          }
        }, stepTime);
      } catch (error) {
        console.log('Audio playback failed:', error);
      }
    };

    if (isRaining) {
      if (audioRef.current && !audioRef.current.paused) {
        fadeOut(audioRef.current);
      }
      if (rainAudioRef.current) {
        fadeIn(rainAudioRef.current, 0.4);
      }
    } else {
      if (rainAudioRef.current && !rainAudioRef.current.paused) {
        fadeOut(rainAudioRef.current);
      }
      if (audioRef.current) {
        fadeIn(audioRef.current, 0.3);
      }
    }
  }, [isRaining, isMuted]);

  const toggleMute = async () => {
    const currentAudio = isRaining ? rainAudioRef.current : audioRef.current;
    const otherAudio = isRaining ? audioRef.current : rainAudioRef.current;
    
    if (currentAudio) {
      try {
        if (isMuted) {
          otherAudio?.pause();
          currentAudio.volume = isRaining ? 0.4 : 0.3;
          await currentAudio.play();
        } else {
          currentAudio.pause();
        }
        setIsMuted(!isMuted);
      } catch (error) {
        console.log('Audio playback failed:', error);
      }
    }
  };

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1.5 }}
      onClick={toggleMute}
      className="fixed bottom-6 left-6 z-30 p-2.5 sm:p-3 glass-card hover:bg-muted/50 transition-colors"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      {isMuted ? (
        <VolumeX className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground" />
      ) : (
        <Volume2 className="w-4 h-4 sm:w-5 sm:h-5 text-primary animate-pulse" />
      )}
    </motion.button>
  );
};

export default AudioPlayer;
