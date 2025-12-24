'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { ComicText } from '@/components/ui/comic-text';
import { InteractiveHoverButton } from '@/components/ui/interactive-hover-button';

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

const playButtonSound = () => {
  const ctx = getAudioContext();
  if (!ctx) return;
  
  try {
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.frequency.value = 600;
    osc.type = 'sine';
    osc.connect(gain);
    gain.connect(ctx.destination);
    gain.gain.setValueAtTime(0.3, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
    osc.start(now);
    osc.stop(now + 0.1);
  } catch (e) {
    console.error('Error playing sound:', e);
  }
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

export const AboutSection = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const sectionTop = sectionRef.current.offsetTop;
      const sectionHeight = sectionRef.current.offsetHeight;
      const scrollY = window.scrollY;

      const scrollProgress = (scrollY - sectionTop) / sectionHeight;
      const clampedProgress = Math.max(0, Math.min(1, scrollProgress));
      
      setScrollProgress(clampedProgress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleAboutMeClick = () => {
    playButtonSound();
    router.push('/about');
  };

  const curveDepth = -40 - (120 * scrollProgress);

  return (
    <>
      {/* Main Section */}
      <div ref={sectionRef} className="relative w-full h-[80vh] bg-[#1a1a1a] overflow-hidden">
        {/* Light section at top */}
        <div className="absolute top-0 left-0 w-full h-full bg-white" />

        {/* SVG with smooth curve transition */}
        <svg
          className="absolute top-0 left-0 w-full"
          viewBox="0 0 1000 250"
          preserveAspectRatio="none"
          style={{ height: '200px' }}
        >
          <motion.path
            d={`M 0,${120 + curveDepth} Q 500,${curveDepth} 1000,${120 + curveDepth} L 1000,250 L 0,250 Z`}
            fill="#1a1a1a"
            animate={{ d: `M 0,${120 + curveDepth} Q 500,${curveDepth} 1000,${120 + curveDepth} L 1000,250 L 0,250 Z` }}
            transition={{ type: 'tween', duration: 0.1 }}
          />
        </svg>

        {/* Dark content area */}
        <div className="w-full h-full flex  items-center mt-20 bg-[#1a1a1a] justify-center px-8 relative z-10 flex-col gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl text-center"
          >
            <h2 className="text-2xl md:text-5xl font-light text-white leading-tight">
              I'm 
              <ComicText>Mani</ComicText> – a Developer shaping fast, intuitive, and immersive digital experiences through thoughtful engineering.
            </h2>
          </motion.div>

          {/* About Me Button with Interactive Hover Effect */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <InteractiveHoverButton
              onClick={handleAboutMeClick}
              className="text-black   font-bold text-lg"
            >
              About Me
            </InteractiveHoverButton>
          </motion.div>
        </div>
      </div>

    </>
  );
};

