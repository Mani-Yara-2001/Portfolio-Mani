'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import AboutIntroduction from './about-sections/AboutIntroduction';
import AboutSkills from './about-sections/AboutSkills';
import AboutJourney from './about-sections/AboutJourney';

// Sound effect functions
let audioCtx: AudioContext | null = null;

const getAudioContext = (): AudioContext | null => {
  if (typeof window === 'undefined') return null;
  
  if (!audioCtx) {
    try {
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      audioCtx = new AudioContext();
      if (audioCtx.state === 'suspended') {
        audioCtx.resume();
      }
    } catch (e) {
      return null;
    }
  }
  return audioCtx;
};

const playBloomSound = () => {
  const ctx = getAudioContext();
  if (!ctx) return;
  
  try {
    const now = ctx.currentTime;
    
    // Rising tone effect for bloom
    for (let i = 0; i < 3; i++) {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.frequency.setValueAtTime(800 + i * 200, now + i * 0.05);
      osc.frequency.exponentialRampToValueAtTime(1500, now + i * 0.05 + 0.1);
      osc.type = 'sine';
      osc.connect(gain);
      gain.connect(ctx.destination);
      gain.gain.setValueAtTime(0.2, now + i * 0.05);
      gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.05 + 0.15);
      osc.start(now + i * 0.05);
      osc.stop(now + i * 0.05 + 0.15);
    }
  } catch (e) {
    console.error('Error playing bloom sound:', e);
  }
};

const playBackSound = () => {
  const ctx = getAudioContext();
  if (!ctx) return;
  
  try {
    const now = ctx.currentTime;
    
    // Descending tone for going back
    for (let i = 0; i < 3; i++) {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.frequency.setValueAtTime(1500 - i * 200, now + i * 0.05);
      osc.frequency.exponentialRampToValueAtTime(800, now + i * 0.05 + 0.1);
      osc.type = 'sine';
      osc.connect(gain);
      gain.connect(ctx.destination);
      gain.gain.setValueAtTime(0.2, now + i * 0.05);
      gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.05 + 0.15);
      osc.start(now + i * 0.05);
      osc.stop(now + i * 0.05 + 0.15);
    }
  } catch (e) {
    console.error('Error playing sound:', e);
  }
};

export default function AboutPage() {
  const router = useRouter();
  const [showBloom, setShowBloom] = useState(true);
  const [scrollX, setScrollX] = useState(0);

  useEffect(() => {
    // Play bloom sound when page loads
    setTimeout(() => {
      playBloomSound();
    }, 100);
    
    // Auto close bloom after 3 seconds and play back sound
    const timer = setTimeout(() => {
      playBackSound(); // Sound effect when closing bloom
      setShowBloom(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      setScrollX(prev => {
        const newScroll = prev + (e.deltaY || e.deltaX) * 0.5;
        // Limit scroll between 0 and 2 full screen widths (for 3 sections)
        return Math.max(0, Math.min(newScroll, window.innerWidth * 2));
      });
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => window.removeEventListener('wheel', handleWheel);
  }, []);

  const handleBackClick = () => {
    setTimeout(() => {
      router.push('/');
    }, 200);
  };

  return (
    <>
      {/* Blooming Modal Animation */}
      <AnimatePresence>
        {showBloom && (
          <motion.div
            className="fixed inset-0 bg-black flex items-center justify-center z-50 overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="bg-black rounded-full relative flex items-center justify-center"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 40, damping: 15, duration: 1.5 }}
              style={{ width: '200vw', height: '200vh' }}
            >
              {/* Text content - plain white text */}
              <motion.div
                className="text-center z-10 relative"
                initial={{ opacity: 0, scale: 0.3 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6, duration: 0.8 }}
              >
                <h1 className="text-6xl md:text-8xl font-bold text-white tracking-wider">
                  About Me
                </h1>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main About Page Content */}
      <motion.div 
        className="w-full h-screen bg-[#1a1a1a] overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div 
          className="flex w-max h-full"
          animate={{ x: -scrollX }}
          transition={{ type: 'spring', stiffness: 100, damping: 30 }}
        >
          {/* Back Button Fixed */}
          <button
            onClick={handleBackClick}
            className="fixed top-8 left-8 text-white hover:text-cyan-400 transition text-lg font-semibold z-40"
          >
            ← Back
          </button>

          {/* Section 1: Introduction */}
          <AboutIntroduction showBloom={showBloom} />

          {/* Section 2: Skills & Expertise */}
          <AboutSkills showBloom={showBloom} />

          {/* Section 3: Journey & Goals */}
          <AboutJourney showBloom={showBloom} />
        </motion.div>
      </motion.div>
    </>
  );
}
