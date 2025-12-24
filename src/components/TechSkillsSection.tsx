'use client';

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';

gsap.registerPlugin(ScrollTrigger);

const TechSkillsSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const mainBoxRef = useRef<HTMLDivElement>(null);
  const imageBoxRef = useRef<HTMLDivElement>(null);
  const lettersRef = useRef<(HTMLDivElement | null)[]>([]);
  const svgPathRef = useRef<SVGPathElement>(null);
  const [showLineAnimation, setShowLineAnimation] = useState(false);

  // Lorem Ipsum sentence
  const sentence = ' Hi I AM MANIKANTA, A FRONTEND DEVELOPER. I LOVE TO BUILD AWESOME WEB APPLICATIONS USING MODERN TECHNOLOGIES.  ';
  const words = sentence.split(' ');
  const allLetters: { char: string; wordIndex: number; letterIndexInWord: number }[] = [];
  
  words.forEach((word, wordIdx) => {
    word.split('').forEach((char, charIdx) => {
      allLetters.push({ char, wordIndex: wordIdx, letterIndexInWord: charIdx });
    });
  });

  useEffect(() => {
    // Auto refresh page on very first load before rendering
    if (typeof window !== 'undefined') {
      const hasRefreshed = sessionStorage.getItem('hasRefreshed');
      if (!hasRefreshed) {
        sessionStorage.setItem('hasRefreshed', 'true');
        window.location.reload();
      }
    }
  }, []);

  useEffect(() => {
    if (!mainBoxRef.current || !imageBoxRef.current || !sectionRef.current) return;

    const imageBox = imageBoxRef.current;
    const letterElements = lettersRef.current.filter(el => el !== null);
    const section = sectionRef.current;

    // Detect mobile
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

    // Configuration based on device
    const config = isMobile
      ? {
          charSpacing: 1.2, // Mobile: increased spacing
          wordGap: 2.5,
          lineHeight: 14, // Mobile: MORE spacing between lines for better readability
          startY: 35, // Position for bottom area - adjusted for more spacing
          maxWidth: 85, // Mobile: narrower to force multiple lines
        }
      : {
          charSpacing: 2.0, // Desktop: wider spacing
          wordGap: 3.5,
          lineHeight: 7, // Desktop: increased spacing between lines
          startY: 80, // Position letters at bottom
          maxWidth: 90,
        };

    // First pass: calculate total width and lines
    const lines: string[][] = [];
    let currentLine: string[] = [];
    let currentLineWidth = 0;

    words.forEach((word, wordIdx) => {
      if (!word || word.trim().length === 0) return;

      const wordWidth = word.length * config.charSpacing;
      const totalWidth = currentLineWidth + (currentLineWidth > 0 ? config.wordGap : 0) + wordWidth;

      if (currentLineWidth > 0 && totalWidth > config.maxWidth) {
        lines.push([...currentLine]);
        currentLine = [word];
        currentLineWidth = wordWidth;
      } else {
        if (currentLineWidth > 0) currentLineWidth += config.wordGap;
        currentLine.push(word);
        currentLineWidth += wordWidth;
      }
    });

    if (currentLine.length > 0) {
      lines.push(currentLine);
    }

    // Second pass: position letters centered at bottom
    const finalPositions: { x: number; y: number }[] = [];
    let letterIndex = 0;
    let y = config.startY;

    lines.forEach((line) => {
      // Calculate line width
      let lineWidth = 0;
      line.forEach((word, wordIdx) => {
        lineWidth += word.length * config.charSpacing;
        if (wordIdx < line.length - 1) lineWidth += config.wordGap;
      });

      // Center the line horizontally
      let x = (100 - lineWidth) / 2;

      // Position letters
      line.forEach((word, wordIdx) => {
        for (let i = 0; i < word.length; i++) {
          finalPositions[letterIndex] = { x, y };
          x += config.charSpacing;
          letterIndex++;
        }

        if (wordIdx < line.length - 1) {
          x += config.wordGap;
        }
      });

      y += config.lineHeight;
    });

    // Store initial random positions
    const initialPositions: { x: number; y: number }[] = [];

    letterElements.forEach((el, idx) => {
      const randomX = Math.random() * 85 + 7.5;
      const randomY = Math.random() * 75 + 10;
      initialPositions[idx] = { x: randomX, y: randomY };

      // Set initial position
      el.style.left = `${randomX}%`;
      el.style.top = `${randomY}%`;
      el.style.opacity = '0.3';
    });

    // Initialize SVG - hide initially
    if (svgPathRef.current) {
      try {
        const pathLength = svgPathRef.current.getTotalLength();
        svgPathRef.current.style.strokeDasharray = `${pathLength}`;
        svgPathRef.current.style.strokeDashoffset = `${pathLength}`;
        svgPathRef.current.style.opacity = '0';
      } catch (e) {
        // Silently handle if getTotalLength fails
      }
    }

    // Update letter positions function
    const updateLetterPositions = (progress: number) => {
      // Show line animation when 80% scrolled
      if (progress >= 0.8) {
        setShowLineAnimation(true);
      }

      // Image bloom - maintain translateX(-50%) while scaling
      imageBox.style.transform = `translateX(-50%) scale(${1 + progress * 0.3})`;

      // Update letter positions directly based on scroll
      letterElements.forEach((el, idx) => {
        if (!finalPositions[idx] || !initialPositions[idx]) return;

        const initial = initialPositions[idx];
        const final = finalPositions[idx];

        const x = initial.x + (final.x - initial.x) * progress;
        const y = initial.y + (final.y - initial.y) * progress;
        const opacity = 0.3 + progress * 0.7;

        el.style.left = `${x}%`;
        el.style.top = `${y}%`;
        el.style.opacity = `${opacity}`;
      });

      // SVG reveal animation - horizontal draw effect
      if (svgPathRef.current) {
        const svgLength = svgPathRef.current.getTotalLength();
        if (progress < 0.5) {
          // Hide SVG in first 50% of scroll
          svgPathRef.current.style.strokeDasharray = `${svgLength}`;
          svgPathRef.current.style.strokeDashoffset = `${svgLength}`;
          svgPathRef.current.style.opacity = '0';
        } else {
          // Reveal SVG from 50% onwards
          const revealProgress = (progress - 0.5) * 2; // 0 to 1 in second half
          svgPathRef.current.style.strokeDasharray = `${svgLength}`;
          svgPathRef.current.style.strokeDashoffset = `${svgLength * (1 - revealProgress)}`;
          svgPathRef.current.style.opacity = String(revealProgress);
        }
      }
    };

    // Create scroll trigger - store reference
    let techSkillsTrigger: any = null;
    const scrollTriggerInstance = ScrollTrigger.create({
      trigger: section,
      start: 'top top',
      end: 'bottom center',
      pin: true,
      pinSpacing: true,
      onUpdate: (self) => {
        updateLetterPositions(self.progress);
      },
    });
    techSkillsTrigger = scrollTriggerInstance;

    // Call update function with progress 0 on initial load
    updateLetterPositions(0);

    // Refresh ScrollTrigger to recalculate on mount
    ScrollTrigger.refresh();

    return () => {
      // Only kill this component's trigger
      if (techSkillsTrigger) techSkillsTrigger.kill();
      setShowLineAnimation(false);
    };
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="relative w-full"
      style={{ 
        height: '100vh',
        minHeight: '100vh',
        background: '#1a1a1a',
        position: 'relative',
      }}
    >
    

      {/* Main Box - Absolute, looks like 100vh */}
      <div
        ref={mainBoxRef}
        className="absolute top-0 left-0 right-0"
        style={{
          width: '100%',
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 20,
        }}
      >
        {/* Inner Container - 60vw on desktop, 100vw on mobile */}
        <div
          style={{
            width: typeof window !== 'undefined' && window.innerWidth < 768 ? '100vw' : '60vw',
            maxWidth: typeof window !== 'undefined' && window.innerWidth < 768 ? '100vw' : '60vw',
            height: '70vh',
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
            backdropFilter: 'blur(8px)',
            border: typeof window !== 'undefined' && window.innerWidth < 768 ? 'none' : '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: typeof window !== 'undefined' && window.innerWidth < 768 ? '0px' : '12px',
            position: 'relative',
            overflow: 'hidden',
          }}
          className="md:w-60vw"
        >
          {/* Letters Container - at bottom */}
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              width: '100%',
              height: '100%',
            }}
          >
            {allLetters.map((item, idx) => (
              <div
                key={idx}
                ref={(el) => {
                  if (el) lettersRef.current[idx] = el;
                }}
                className="absolute text-gray-300 font-bold pointer-events-none"
                style={{
                  userSelect: 'none',
                  lineHeight: '1.2',
                  fontSize: 'clamp(9px, 2vw, 16px)', // Mobile smaller, desktop larger
                  zIndex: 15,
                  willChange: 'left, top, opacity',
                  transition: 'none',
                  left: '0px',
                  top: '0px',
                }}
              >
                {item.char === ' ' ? '\u00A0' : item.char}
              </div>
            ))}
          </div>

          {/* Center Image Box */}
          <div
            ref={imageBoxRef}
            className="absolute top-1/5 left-1/2 z-10 group"
            style={{
              width: typeof window !== 'undefined' && window.innerWidth < 768 ? '120px' : '200px',
              height: typeof window !== 'undefined' && window.innerWidth < 768 ? '150px' : '250px',
              backgroundColor: 'rgba(40, 40, 40, 0.8)',
              border: '2px solid rgba(255, 255, 255, 0.2)',
              backdropFilter: 'blur(12px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transformOrigin: 'center',
              transform: 'translateX(-50%)',
              overflow: 'hidden',
              borderRadius: '16px',
              boxShadow: '0 20px 50px rgba(0, 0, 0, 0.5), 0 0 40px rgba(255, 255, 255, 0.1)',
              transition: 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
              position: 'relative',
              animation: 'float 3s ease-in-out infinite',
            }}
          >
            {/* Animated border glow */}
            <div
              style={{
                position: 'absolute',
                inset: '-2px',
                borderRadius: '16px',
                padding: '2px',
                background: 'linear-gradient(45deg, rgba(255,255,255,0.3), rgba(255,255,255,0), rgba(255,255,255,0.3))',
                WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                WebkitMaskComposite: 'xor',
                maskComposite: 'exclude',
                animation: 'shimmer 3s infinite',
                opacity: 0.7,
                pointerEvents: 'none',
              }}
            />
            
            {/* Gradient overlay */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 100%)',
                pointerEvents: 'none',
                borderRadius: '16px',
              }}
            />
            
            <img
              src="/brother.svg"
              alt="User"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                transition: 'transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)',
              }}
              className="group-hover:brightness-110 group-hover:saturate-150"
            />
            
            <style>{`
              @keyframes float {
                0%, 100% {
                  transform: translateX(-50%) translateY(0px);
                }
                50% {
                  transform: translateX(-50%) translateY(-8px);
                }
              }
              
              @keyframes shimmer {
                0% {
                  background-position: -1000% 0;
                }
                100% {
                  background-position: 1000% 0;
                }
              }
              
              .group:hover {
                box-shadow: 
                  0 20px 60px rgba(0, 0, 0, 0.6),
                  0 0 60px rgba(255, 255, 255, 0.25),
                  inset 0 0 20px rgba(255, 255, 255, 0.1) !important;
              }
            `}</style>
          </div>
        </div>

        {/* SVG Signature - Animated with GSAP scroll trigger */}
        <svg
          className="absolute bottom-6 right-6"
          width="140"
          height="90"
          viewBox="0 0 246 127"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            ref={svgPathRef}
            d="M24.5 22.5C24.5 22.5 16.8436 45.9138 24.5 57C31.2505 66.7745 40.1798 68.8208 52 70C67.0565 71.5021 80.5581 69.8795 88.5 57C95.1617 46.1968 88.5 24.5 88.5 24.5C88.5 24.5 95 105.5 88.5 112C82 118.5 65.7001 124.949 50.5 122.5C34.4543 119.915 24.1537 112.838 16.5 98.5C0.179748 67.9272 117.5 73.5 103.5 81C89.5 88.5 103.5 26.5 103.5 26.5L123 48.5L140.5 26.5C140.5 26.5 137 82.5 140.5 81C144 79.5 153 33.5 156 26.5C159 19.5 164.75 53 164.75 53M173.5 79.5C166.5 90 164.75 53 164.75 53M164.75 53H150M164.75 53H180V77.5C180 77.5 178.5 21.5 180 28.5C181.5 35.5 203 79.5 203 79.5C203 79.5 204.5 -5.49999 203 28.5C201.5 62.5 220 79.5 220 79.5C220 79.5 211 5 220 26.5"
            stroke="#ffffff"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </section>
  );
};

export default TechSkillsSection;
