'use client';

import { motion } from 'framer-motion';

import { useRef, useEffect, useState } from 'react';

interface AboutJourneyProps {
  showBloom: boolean;
}

export default function AboutJourney({ showBloom }: AboutJourneyProps) {
  const journeyItems = [
    {
      number: '01',
      title: 'What I Do',
      description: 'Transform ideas into engaging digital solutions with a focus on user experience and modern web technologies.'
    },
    {
      number: '02',
      title: 'My Passion',
      description: 'Create beautiful interfaces that are not just visually appealing but also intuitive and accessible for everyone.'
    },
    {
      number: '03',
      title: "Let's Build Together",
      description: 'Always open to exciting projects and collaborations. Let\'s create something amazing together!'
    }
  ];

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

  // Title reveal
  const [titleRef, titleVisible] = useRevealOnScroll<HTMLDivElement>();
  // CTA reveal
  const [ctaRef, ctaVisible] = useRevealOnScroll<HTMLDivElement>();
  // Description reveal for each item
  const descRefs = journeyItems.map(() => useRevealOnScroll<HTMLDivElement>());

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: showBloom ? 4.2 : 0.2 }}
      className="w-screen h-screen  flex items-center justify-center px-8 md:px-16  flex-shrink-0 bg-black"
    >
      <div className="w-full h-[90vh] max-w-6xl flex flex-col items-center justify-center">
      

        <div className="space-y-5 md:space-y-10 ">
          {journeyItems.map((item, index) => {
            const [descRef, descVisible] = descRefs[index];
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: showBloom ? 4.2 + index * 0.15 : 0.2 + index * 0.15 }}
                whileHover={{ x: 10 }}
                className="group cursor-pointer"
              >
                <div className="relative">
                  {/* Number */}
                  <div className="flex items-start gap-8 md:gap-12">
                    <motion.div
                      className="text-3xl md:text-8xl font-bold text-gray-800 group-hover:text-gray-700 transition-colors duration-300 flex-shrink-0"
                      whileHover={{ scale: 1.1 }}
                    >
                      {item.number}
                    </motion.div>

                    <div className="flex-1">
                      <h3 className="text-2xl md:text-4xl font-semibold text-white mb-4">
                        {item.title}
                      </h3>
                      <div
                        ref={descRef}
                        className={`text-gray-400 font-light max-w-2xl my-0 transition-opacity duration-700 ${descVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                      >
                        {item.description}
                      </div>
                      {/* Animated underline */}
                      <motion.div
                        initial={{ width: 0 }}
                        whileHover={{ width: '100%' }}
                        transition={{ duration: 0.3 }}
                        className="h-0.5 bg-white mt-6"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: showBloom ? 4.7 : 0.7 }}
          className="  pt-9  border-t border-gray-800"
        >
         
          <span className="text-gray-400 text-xl md:text-2xl font-light flex flex-col items-center gap-2">
            Ready to collaborate on your next project?
            <a
              href="tel:+916304035329"
              className="text-gray-200 font-semibold  hover:text-white transition-colors duration-200 select-all"
              style={{ textDecoration: 'none' }}
            >
              <span role="img" aria-label="phone" className="mr-1">📞</span>+91 63040 35329
            </a>
          </span>
        </motion.div>
        {/* Phone number below CTA - improved UI */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: showBloom ? 4.8 : 0.8 }}
          className="mt-8 flex items-center justify-center"
        >
        </motion.div>
      </div>
    </motion.div>
  );
}
