import { motion } from 'framer-motion';
import { Mail } from 'lucide-react';

const ContactButton = () => {
  return (
    <motion.a
      href="mochamadilhamhansyilalfauzi@gmail.com"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.8 }}
      className="fixed bottom-6 right-6 z-30 px-4 sm:px-6 py-2.5 sm:py-3 glass-card flex items-center gap-2 sm:gap-3 hover:bg-muted/50 transition-all group"
      whileHover={{ scale: 1.05, boxShadow: '0 0 30px hsla(45, 100%, 60%, 0.3)' }}
      whileTap={{ scale: 0.95 }}
    >
      <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-primary group-hover:animate-pulse" />
      <span className="font-mono text-xs sm:text-sm text-foreground hidden sm:inline">Hubungi Saya</span>
    </motion.a>
  );
};

export default ContactButton;
