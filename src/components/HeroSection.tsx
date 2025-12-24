'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaLinkedinIn, FaGithub, FaInstagram, FaWhatsapp } from 'react-icons/fa';
import { SpinningText } from '@/components/ui/spinning-text';
import { Meteors } from '@/components/ui/meteors';
import { CometCard } from '@/components/ui/comet-card';


// Global audio context
let audioCtx: AudioContext | null = null;
let isAudioInitialized = false;

const initAudioContext = () => {
  if (typeof window === 'undefined' || isAudioInitialized) return;
  
  try {
    const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
    audioCtx = new AudioContext();
    isAudioInitialized = true;
    
    // Try to resume immediately
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
  } catch (e) {
    console.error('AudioContext initialization failed:', e);
  }
};

const getAudioContext = (): AudioContext | null => {
  if (!audioCtx && !isAudioInitialized) {
    initAudioContext();
  }
  
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume().catch(() => {});
  }
  
  return audioCtx;
};

// Tik tik sound effect
const playTikSound = () => {
  const ctx = getAudioContext();
  if (!ctx) return;
  
  try {
    const now = ctx.currentTime;
    
    // First tone - high pitch (tik)
    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    osc1.frequency.value = 1200;
    osc1.type = 'sine';
    osc1.connect(gain1);
    gain1.connect(ctx.destination);
    gain1.gain.setValueAtTime(0.3, now);
    gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
    osc1.start(now);
    osc1.stop(now + 0.04);
    
    // Second tone - lower pitch (tik)
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.frequency.value = 900;
    osc2.type = 'sine';
    osc2.connect(gain2);
    gain2.connect(ctx.destination);
    gain2.gain.setValueAtTime(0.2, now + 0.05);
    gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.09);
    osc2.start(now + 0.05);
    osc2.stop(now + 0.09);
  } catch (e) {
    console.error('Error playing sound:', e);
  }
};

const SocialLink = ({ Icon, href, label }: { Icon: any; href: string; label: string }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleHover = () => {
    playTikSound();
    setIsHovered(true);
  };

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={handleHover}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.35, rotate: 8 }}
      whileTap={{ scale: 0.85 }}
      transition={{ type: 'spring', stiffness: 400, damping: 12 }}
      className={`text-2xl p-3 rounded-lg transition-all ${
        isHovered ? 'text-white bg-gray-800 shadow-lg' : 'text-gray-700 bg-gray-100 hover:bg-gray-200'
      }`}
      title={label}
    >
      <Icon />
    </motion.a>
  );
};

export const HeroSection = () => {
  useEffect(() => {
    // Initialize audio context on first user interaction
    const handleUserInteraction = () => {
      initAudioContext();
      // Remove listeners after first interaction
      document.removeEventListener('click', handleUserInteraction);
      document.removeEventListener('touchstart', handleUserInteraction);
    };
    
    document.addEventListener('click', handleUserInteraction);
    document.addEventListener('touchstart', handleUserInteraction);
    
    return () => {
      document.removeEventListener('click', handleUserInteraction);
      document.removeEventListener('touchstart', handleUserInteraction);
    };
  }, []);

  return (
    <div className="w-full h-[100%] flex flex-col border-0 md:flex-row relative bg-white overflow-hidden gap-2 px-2 pt-4 md:px-2 md:py-4">
      {/* Background gradient effect */}
      <div className="absolute bg-white" />
      
      {/* Left Sidebar - 10% on desktop, hidden on mobile */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="hidden md:flex w-[5%] flex-col items-center justify-between py-4 relative h-full"
      >
        {/* Top Section - Vertical Line with Dots (Full Height) */}
        <div className="flex flex-col items-center h-full justify-between flex-1">
          {/* Top Dot */}
          <motion.div
            animate={{ scale: [1, 1.2, 1], boxShadow: ['0 0 0px rgba(0,0,0,0.5)', '0 0 12px rgba(0,0,0,0.3)', '0 0 0px rgba(0,0,0,0.5)'] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1.5 h-1.5 bg-black rounded-full relative shrink-0"
          />
          {/* Animated Vertical Line - Full Height */}
          <svg className="w-0.5 flex-1 my-1" viewBox="0 0 4 100" preserveAspectRatio="none" style={{ minHeight: '200px' }}>
            <motion.line
              x1="2"
              y1="0"
              x2="2"
              y2="100"
              stroke="#000000"
              strokeWidth="2.5"
              animate={{ opacity: [0.5, 0.7, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </svg>
          {/* Bottom Dot */}
          <motion.div
            animate={{ scale: [1, 1.2, 1], boxShadow: ['0 0 0px rgba(0,0,0,0.5)', '0 0 12px rgba(0,0,0,0.3)', '0 0 0px rgba(0,0,0,0.5)'] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
            className="w-1.5 h-1.5 bg-black rounded-full shrink-0"
          />
        </div>
        {/* Bottom Half - Social Links */}
        <div className="flex flex-col gap-4 items-center h-auto py-4">
          <SocialLink Icon={FaLinkedinIn} href="https://www.linkedin.com/in/manikanta-yara-887945255/" label="LinkedIn" />
          <SocialLink Icon={FaGithub} href="https://github.com/Mani-Yara-2001" label="GitHub" />
          <SocialLink Icon={FaInstagram} href="https://www.instagram.com/manikanta.y_/?next=%2F" label="Instagram" />
          <SocialLink Icon={FaWhatsapp} href="https://wa.me/6304035329" label="WhatsApp: 6304035329" />
        </div>
      </motion.div>

      {/* Center Section - 85% on desktop, full width on mobile */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="w-full md:w-[85%] bg-white relative overflow-hidden rounded-2xl flex flex-col md:flex-row"
      >
        {/* Meteors effect */}
        <Meteors />
  
     
     

        {/* Left Section - Text Content (45% on desktop, full width on mobile) */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="w-full md:w-[50%] flex flex-col justify-center px-6 md:px-12 py-8 relative z-10"
        >
          {/* Animated accent line */}
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="h-1.5 w-12 bg-black rounded-full mb-8 origin-left"
          />

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-5xl  lg:text-7xl font-black tracking-tight mb-4 text-black leading-tight"
            style={{ fontFamily: '"Inter", "Poppins", sans-serif', fontWeight: 900, letterSpacing: '-0.04em' }}
          >
            Creative <br /> Developer
          </motion.h1>

          {/* Animated underline */}
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className=" hidden cl:block h-0.5 w-24 bg-black mb-8 origin-left"
          />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-base md:text-lg text-gray-600 leading-relaxed lg:mb-8 font-regular max-w-md"
            style={{ fontFamily: '"Poppins", sans-serif', fontWeight: 400, lineHeight: '1.7' }}
          >
            Transforming ideas into stunning, scalable solutions that merge creativity with precision engineering.
          </motion.p>

          {/* Skills with interactive animation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className=" gap-3  hidden cl:flex sm:flex flex-wrap"
          >
            {['Next Js', 'Creative', 'Fast'].map((tag, idx) => (
              <motion.div
                key={idx}
                whileHover={{ 
                  scale: 1.12, 
                  y: -3,
                  boxShadow: '0 8px 16px rgba(0,0,0,0.12)'
                }}
                transition={{ duration: 0.2 }}
                className="px-4 py-2 rounded-full text-sm font-semibold text-white bg-black hover:bg-gray-800 cursor-pointer transition-colors duration-300 shadow-md"
              >
                {tag}
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Right Section - Visual (50% on desktop, full width on mobile) */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="w-full lg:w-[60%] flex items-center justify-center relative z-10 p-4 md:p-8 hero-visual md:h-auto"
        >
            {/* Single Large Card */}
            <CometCard className="w-full md:w-[30vw] h-full md:h-[40vh] lg:h-[60vh]">
              <div className="w-full max-400:h-[35vh] h-[40vh] lg:h-[60vh] bg-gradient-to-br from-gray-700 to-gray-900 rounded-2xl flex items-center justify-center  cursor-pointer group relative overflow-hidden p-8">
                {/* Gradient overlay on hover */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-gray-600 to-gray-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                />
                
                {/* Card Content */}
                <motion.div
                  className="relative z-10 flex flex-col items-center justify-center h-full gap-6 text-center"
                >
                  <motion.img
                    src="/profile.png"
                    alt="Profile"
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-64 max-400:h-[10vh] h-64 md:w-80 md:h-80 object-cover rounded-2xl shadow-lg"
                  />
                </motion.div>
              </div>
            </CometCard>
        </motion.div>
      </motion.div>

      {/* Right Sidebar - 10% on desktop, hidden on mobile */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="hidden md:flex w-[10%] items-end justify-end relative pb-4 pr-2"
      >
        <div className="w-40 h-40 flex items-center justify-center">
          <SpinningText 
            duration={8}
            radius={6}
            className="text-sm font-bold text-black"
          >
            YARA MANIKANTA
          </SpinningText>
        </div>
      </motion.div>
    </div>
  );
};
