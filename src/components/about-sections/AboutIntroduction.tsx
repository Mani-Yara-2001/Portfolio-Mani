"use client";

import { motion } from "framer-motion";
import { TiltCard } from "@/components/ui/tilt-card";
import { useRef, useEffect, useState } from "react";
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

interface AboutIntroductionProps {
  showBloom: boolean;
}

export default function AboutIntroduction({ showBloom }: AboutIntroductionProps) {
  // Description reveal
  const [descRef, descVisible] = useRevealOnScroll<HTMLDivElement>();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: showBloom ? 3 : 0 }}
      className="w-screen h-screen flex items-center justify-center px-8 md:px-16 py-20 flex-shrink-0 bg-black relative overflow-hidden"
    >


      {/* Content Container */}
      <div className="w-full max-w-5xl relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
          {/* User Card Section using TiltCard */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: showBloom ? 3.1 : 0.1 }}
            className="flex justify-center"
          >
            <TiltCard depth={120} range={40}>
              <img
                src="/profilea.png"
                alt="Mani standing in a cream t-shirt and black pants"
                className="w-full h-auto object-fill bg-gray-800 shadow-lg"
                style={{ maxWidth: '340px', margin: '0 auto' }}
              />
            </TiltCard>
          </motion.div>

          {/* Text Section */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: showBloom ? 3.2 : 0.2 }}
            className="flex flex-col justify-center space-y-6"
          >
            {/* Animated line */}
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '60px' }}
              transition={{ duration: 0.8, delay: showBloom ? 3.3 : 0.3 }}
              className="h-1 bg-white"
            />

            {/* Heading */}
            <div>
              <h1 className="text-xl flex gap-2 md:text-7xl font-bold text-white mb-2 leading-tight">
                Hi, I'm <br />
                <span className="font-light text-gray-300">Mani</span>
              </h1>
            </div>

            {/* Description with scroll reveal animation */}
            <div
              ref={descRef}
              className={`text-gray-400 font-light my-0 transition-opacity duration-700 ${descVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            >
              A passionate frontend developer dedicated to creating beautiful, functional, and user-friendly web experiences. I combine creativity with technical expertise to build digital solutions that make an impact.
            </div>

            {/* Tags */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: showBloom ? 3.5 : 0.5 }}
              className="flex gap-4 pt-4"
            >
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-white" />
                <span className="text-gray-400 text-sm">NextJs Developer</span>
              </div>
              
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
