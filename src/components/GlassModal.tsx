import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import TypewriterText from './TypewriterText';

interface GlassModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  content: string | React.ReactNode;
  icon?: React.ReactNode;
}

const GlassModal = ({ isOpen, onClose, title, content, icon }: GlassModalProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 pointer-events-none"
          >
            <div className="glass-card max-w-lg w-full max-h-[85vh] overflow-y-auto p-6 sm:p-8 pointer-events-auto relative">
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-3 right-3 sm:top-4 sm:right-4 p-2 rounded-full bg-muted/50 hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
              >
                <X size={18} className="sm:w-5 sm:h-5" />
              </button>

              {/* Content */}
              <div className="flex flex-col justify-center items-center text-center">
                {/* Icon */}
                {icon && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: 'spring' }}
                    className="mb-4 sm:mb-6 p-3 sm:p-4 rounded-full bg-primary/20 text-primary"
                  >
                    {icon}
                  </motion.div>
                )}

                {/* Title */}
                <h3 className="text-xl sm:text-2xl font-mono font-bold text-primary mb-4 sm:mb-6 glow-text">
                  {title}
                </h3>

                {/* Content */}
                <div className="text-foreground/90 text-base sm:text-lg leading-relaxed">
                  {typeof content === 'string' ? (
                    <TypewriterText text={content} speed={30} />
                  ) : (
                    content
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default GlassModal;
