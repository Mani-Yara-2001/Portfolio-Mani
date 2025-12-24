'use client';

import { motion, useMotionValue, useSpring } from 'framer-motion';
// Removed ScrollReveal import
import { useState, useEffect, useRef } from 'react';
// Custom hook for intersection observer
function useRevealOnScroll<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);
  return [ref, visible] as const;
}

interface AboutSkillsProps {
  showBloom: boolean;
}

interface SkillItem {
  key: number;
  url: string;
  label: string;
}

const skillsData: SkillItem[] = [
  {
    key: 1,
    url: '/reactjs.webp',
    label: 'React'
  },
  {
    key: 2,
    url: '/nextjs.webp',
    label: 'Next.js'
  },
  {
    key: 3,
    url: '/types.webp',
    label: 'TypeScript'
  },
  {
    key: 4,
    url: '/tailwind.webp',
    label: 'Tailwind CSS'
  },
  {
    key: 5,
    url: '/framerm.webp',
    label: 'Framer Motion'
  }
];


export default function AboutSkills({ showBloom }: AboutSkillsProps) {
  const [focusedItem, setFocusedItem] = useState<SkillItem | null>(null);
  // Only true for xl screens and above
  const [isXlScreen, setIsXlScreen] = useState(true);

  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const smoothX = useSpring(cursorX, { stiffness: 300, damping: 40 });
  const smoothY = useSpring(cursorY, { stiffness: 300, damping: 40 });

  useEffect(() => {
    const updateScreen = () => {
      setIsXlScreen(window.innerWidth >= 1280);
    };
    updateScreen();
    window.addEventListener('resize', updateScreen);
    return () => window.removeEventListener('resize', updateScreen);
  }, []);

  const onMouseTrack = (e: React.MouseEvent) => {
    cursorX.set(e.clientX);
    cursorY.set(e.clientY);
  };

  const onHoverActivate = (item: SkillItem) => {
    setFocusedItem(item);
  };

  const onHoverDeactivate = () => {
    setFocusedItem(null);
  };

  // Title reveal
  const [titleRef, titleVisible] = useRevealOnScroll<HTMLDivElement>();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: showBloom ? 3.6 : 0.2 }}
      className="w-screen h-screen flex items-center justify-center px-8 md:px-16 py-20 flex-shrink-0 bg-black relative"
      onMouseMove={isXlScreen ? onMouseTrack : undefined}
      onMouseLeave={isXlScreen ? onHoverDeactivate : undefined}
    >
      <div className="w-full max-w-6xl space-y-10 relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: showBloom ? 3.6 : 0.2 }}
          className="mb-4"
        >
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: '60px' }}
            transition={{ duration: 0.8, delay: showBloom ? 3.7 : 0.3 }}
            className="h-1 bg-white mb-6"
          />
          <div
            ref={titleRef}
            className={`font-light my-0 transition-opacity duration-700 ${titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} text-2xl md:text-3xl text-white`}
          >
            Skills & Expertise
          </div>
        </motion.div>

        {/* Skills List - ImageReveal only on xl and above, text only otherwise */}
        <div>
          {skillsData.map((item) => (
            <div
              key={item.key}
              className="p-6 md:p-8 cursor-pointer relative group sm:flex items-center justify-between"
              onMouseEnter={isXlScreen ? () => onHoverActivate(item) : undefined}
              onMouseLeave={isXlScreen ? onHoverDeactivate : undefined}
            >
              {/* Only show image on xl and above as floating reveal, not inline */}
              <h2
                className={`uppercase md:text-2xl sm:text-2xl text-xl font-semibold sm:py-6 py-2 leading-[100%] relative transition-colors duration-300 ${
                  focusedItem?.key === item.key && isXlScreen
                    ? 'mix-blend-difference z-20 text-gray-300'
                    : 'text-white'
                }`}
              >
                {item.label}
              </h2>
              <button
                className={`sm:block hidden p-4 rounded-full transition-all duration-300 ease-out ${
                  focusedItem?.key === item.key && isXlScreen
                    ? 'mix-blend-difference z-20 bg-white text-black'
                    : ''
                }`}
              >
                ↗
              </button>
              <div
                className={`h-[2px] bg-white absolute bottom-0 left-0 transition-all duration-300 ease-linear ${
                  focusedItem?.key === item.key && isXlScreen ? 'w-full' : 'w-0'
                }`}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Floating Image on Hover - Only on xl and above */}
      {isXlScreen && focusedItem && (
        <motion.img
          src={focusedItem.url}
          alt={focusedItem.label}
          className="fixed object-fill ml-[100vw] w-[350px] h-[400px] rounded-lg pointer-events-none shadow-2xl"
          style={{
            left: smoothX,
            top: smoothY,
            x: '-50%',
            y: '-50%',
            zIndex: 9999,
          }}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        />
      )}
    </motion.div>
  );
}
