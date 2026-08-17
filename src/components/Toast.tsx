import React from 'react';
import { useStore } from '../context/StoreContext';
import { CheckCircle2, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const Toast: React.FC = () => {
  const { toastMessage } = useStore();

  return (
    <AnimatePresence>
      {toastMessage && (
        <motion.div
          id="toast-notification"
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-[#2C221E] text-[#FDFBF7] px-5 py-3.5 rounded-xl shadow-2xl border border-[#5B6B54]/40 max-w-md"
        >
          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#5B6B54]/30 flex items-center justify-center text-[#9EB395]">
            <CheckCircle2 className="w-5 h-5 text-[#A2B899]" />
          </div>
          <p className="text-sm font-medium tracking-wide leading-snug">{toastMessage}</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
