'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const TechSkillsSectionMobile: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const mainBoxRef = useRef<HTMLDivElement>(null);
  const imageBoxRef = useRef<HTMLDivElement>(null);
  const lettersRef = useRef<(HTMLDivElement | null)[]>([]);
  const svgPathRef = useRef<SVGPathElement>(null);

  // Lorem Ipsum sentence
  const sentence = ' Hi I AM MANI, A FRONTEND  DEVELOPER. I LOVE TO BUILD AWESOME WEB APPLICATIONS USING MODERN TECHNOLOGIES.  ';
  const words = sentence.split(' ');
  const allLetters: { char: string; wordIndex: number; letterIndexInWord: number }[] = [];
  
  words.forEach((word, wordIdx) => {
    word.split('').forEach((char, charIdx) => {
      allLetters.push({ char, wordIndex: wordIdx, letterIndexInWord: charIdx });
    });
  });

  useEffect(() => {
    if (!mainBoxRef.current || !imageBoxRef.current || !sectionRef.current) return;

    const imageBox = imageBoxRef.current;
    const letterElements = lettersRef.current.filter(el => el !== null);
    const section = sectionRef.current;

    // Configuration for mobile with more spacing
    const config = {
      charSpacing: 2.2, // More spacing between characters (px wise)
      wordGap: 3.5, // More spacing between words
      lineHeight: 6, // Further decreased line height
      startY: 80, // Position letters at bottom of box
      maxWidth: 100, // Full width, no padding
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

    // Second pass: position letters with centered lines
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

      // Center the line
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

    // Create scroll trigger - store reference
    let techSkillsMobileTrigger: any = null;
    const scrollTriggerInstance = ScrollTrigger.create({
      trigger: section,
      start: 'top top',
      end: 'bottom center',
      pin: true,
      pinSpacing: true,
      onUpdate: (self) => {
        const progress = self.progress;

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
          try {
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
          } catch (e) {
            // Silently handle if getTotalLength fails
          }
        }
      },
    });
    techSkillsMobileTrigger = scrollTriggerInstance;

    // Refresh ScrollTrigger after a short delay to ensure proper calculation
    const refreshTimeout = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 50);

    return () => {
      clearTimeout(refreshTimeout);
      // Only kill this component's trigger
      if (techSkillsMobileTrigger) techSkillsMobileTrigger.kill();
    };
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="relative w-full"
      style={{ 
        height: '90vh',
        minHeight: '90vh',
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
          height: '80vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 20,
        }}
      >
        {/* Inner Container - 90vw on mobile */}
        <div
          style={{
            width: '90vw',
            maxWidth: '90vw',
            height: '60vh',
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
            backdropFilter: 'blur(8px)',
            border: 'none',
            borderRadius: '0px',
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
                  fontSize: 'clamp(10px, 2.5vw, 18px)', // Slightly larger for mobile
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
            className="absolute top-1/4 left-1/2 z-10"
            style={{
              width: '150px',
              height: '200px',
              backgroundColor: 'rgba(60, 60, 60, 0.6)',
              border: '2px solid rgba(255, 255, 255, 0.15)',
              backdropFilter: 'blur(10px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transformOrigin: 'center',
              transform: 'translateX(-50%)',
            }}
          >
            <div
              style={{
                width: '100%',
                height: '100%',
                backgroundColor: 'rgba(80, 80, 80, 0.5)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '12px',
                color: 'rgba(255, 255, 255, 0.4)',
              }}
            >
              User Image
            </div>
          </div>
        </div>

        {/* SVG Signature - Animated with GSAP scroll trigger */}
        <svg
          className="absolute bottom-4 right-4"
          width="100"
          height="65"
          viewBox="0 0 246 127"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            ref={svgPathRef}
            d="M24.5 22.5C24.5 22.5 16.8436 45.9138 24.5 57C31.2505 66.7745 40.1798 68.8208 52 70C67.0565 71.5021 80.5581 69.8795 88.5 57C95.1617 46.1968 88.5 24.5 88.5 24.5C88.5 24.5 95 105.5 88.5 112C82 118.5 65.7001 124.949 50.5 122.5C34.4543 119.915 24.1537 112.838 16.5 98.5C0.179748 67.9272 117.5 73.5 103.5 81C89.5 88.5 103.5 26.5 103.5 26.5L123 48.5L140.5 26.5C140.5 26.5 137 82.5 140.5 81C144 79.5 153 33.5 156 26.5C159 19.5 164.75 53 164.75 53M173.5 79.5C166.5 90 164.75 53 164.75 53M164.75 53H150M164.75 53H180V77.5C180 77.5 178.5 21.5 180 28.5C181.5 35.5 203 79.5 203 79.5C203 79.5 204.5 -5.49999 203 28.5C201.5 62.5 220 79.5 220 79.5C220 79.5 211 5 220 26.5"
            stroke="#ffffff"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </section>
  );
};

export default TechSkillsSectionMobile;
