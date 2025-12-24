'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { Mail, Phone, Send } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const ContactSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const descriptionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const socialsRef = useRef<(HTMLDivElement | null)[]>([]);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    // Title animation - slide in from left
    if (titleRef.current) {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, x: -60 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }

    // Description animation - fade in
    if (descriptionRef.current) {
      gsap.fromTo(
        descriptionRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 0.2,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }

    // Contact cards staggered animation
    cardsRef.current.forEach((card, idx) => {
      if (card) {
        gsap.fromTo(
          card,
          { opacity: 0, y: 40, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            delay: 0.3 + idx * 0.1,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    });

    // Social icons staggered animation
    socialsRef.current.forEach((social, idx) => {
      if (social) {
        gsap.fromTo(
          social,
          { opacity: 0, scale: 0.5, rotation: -180 },
          {
            opacity: 1,
            scale: 1,
            rotation: 0,
            duration: 0.6,
            delay: 0.5 + idx * 0.1,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    });

    // Button animation - slide up with fade
    if (buttonRef.current) {
      gsap.fromTo(
        buttonRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          delay: 0.7,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section 
      ref={sectionRef}
      style={{ backgroundColor: '#1a1a1a' }}
      className="w-full -mt-95 pt-80 lg:pt-8 md:mt-60 lg:mt-100 min-h-screen flex items-center justify-center px-4 md:px-8 py-20"
    >
      <div className="max-w-5xl w-full">
        {/* Modern Header */}
        <div ref={titleRef} className="mb-16 text-center">
          <span className="inline-block px-4 py-2 text-gray-300 text-xs font-semibold mb-6" style={{ fontFamily: "'Poppins', 'Inter', sans-serif" }}>━━━ Let's Connect ━━━</span>
          <h2 className="text-3xl md:text-4xl font-black text-white mb-6 leading-tight" style={{ fontFamily: "'Poppins', 'Inter', sans-serif", letterSpacing: '-1px' }}>
            Let's Craft Your Vision Into Reality
          </h2>
          <p className="text-sm text-gray-400 max-w-2xl mx-auto leading-relaxed font-light" style={{ fontFamily: "'Poppins', 'Inter', sans-serif" }}>
            Transform ideas into excellence. Let's collaborate and build something extraordinary.
          </p>
        </div>

        {/* Unique Contact Layout */}
        <div className="space-y-8">
          {/* Direct Contact Options */}
          <div className="flex flex-col md:flex-row gap-6 justify-center items-center md:items-stretch">
            {/* Email Option */}
            <div
              ref={(el: any) => {
                if (el) cardsRef.current[0] = el;
              }}
              onClick={() => window.open('mailto:manisaiyara@gmail.com', '_blank')}
              className="flex-1 md:max-w-xs p-6 cursor-pointer"
            >
              <div className="flex flex-col items-center gap-3 text-center">
                <div className="p-4 bg-white/10 transition-colors" style={{ borderRadius: '16px' }}>
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider mb-1" style={{ fontFamily: "'Poppins', 'Inter', sans-serif" }}>Email</p>
                  <p className="text-sm font-semibold text-white" style={{ fontFamily: "'Poppins', 'Inter', sans-serif" }}>
                    manisaiyara@gmail.com
                  </p>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="hidden md:block w-px h-16 bg-linear-to-b from-transparent via-gray-600 to-transparent"></div>

            {/* Phone Option */}
            <div
              ref={(el: any) => {
                if (el) cardsRef.current[1] = el;
              }}
              onClick={() => window.open('https://wa.me/6304035329', '_blank')}
              className="flex-1 md:max-w-xs p-6 cursor-pointer"
            >
              <div className="flex flex-col items-center gap-3 text-center">
                <div className="p-4 bg-white/10 transition-colors" style={{ borderRadius: '16px' }}>
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider mb-1" style={{ fontFamily: "'Poppins', 'Inter', sans-serif" }}>WhatsApp</p>
                  <p className="text-sm font-semibold text-white" style={{ fontFamily: "'Poppins', 'Inter', sans-serif" }}>
                    630-403-5329
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Divider Line */}
          <div className="flex items-center gap-4 my-8">
            <div className="flex-1 h-px bg-linear-to-r from-transparent via-gray-600 to-transparent"></div>
            <span className="text-xs text-gray-500" style={{ fontFamily: "'Poppins', 'Inter', sans-serif" }}>or</span>
            <div className="flex-1 h-px bg-linear-to-r from-transparent via-gray-600 to-transparent"></div>
          </div>

          {/* Message Form - Unique Inline Style */}
          <div ref={descriptionRef} className="max-w-2xl mx-auto w-full">
            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Name Input */}
                <input
                  type="text"
                  placeholder="Full Name"
                  className="px-4 py-3 bg-transparent text-white placeholder-gray-500 focus:outline-none border-b-2 border-gray-600 hover:border-gray-400 focus:border-white transition-colors"
                  style={{ fontFamily: "'Poppins', 'Inter', sans-serif" }}
                />

                {/* Email Input */}
                <input
                  type="email"
                  placeholder="Email Address"
                  className="px-4 py-3 bg-transparent text-white placeholder-gray-500 focus:outline-none border-b-2 border-gray-600 hover:border-gray-400 focus:border-white transition-colors"
                  style={{ fontFamily: "'Poppins', 'Inter', sans-serif" }}
                />
              </div>

              {/* Subject Input */}
              <input
                type="text"
                placeholder="Subject"
                className="w-full px-4 py-3 bg-transparent text-white placeholder-gray-500 focus:outline-none border-b-2 border-gray-600 hover:border-gray-400 focus:border-white transition-colors"
                style={{ fontFamily: "'Poppins', 'Inter', sans-serif" }}
              />

              {/* Message Input */}
              <textarea
                rows={4}
                placeholder="Your Message..."
                className="w-full px-4 py-3 bg-transparent text-white placeholder-gray-500 focus:outline-none border-b-2 border-gray-600 hover:border-gray-400 focus:border-white transition-colors resize-none"
                style={{ fontFamily: "'Poppins', 'Inter', sans-serif" }}
              ></textarea>

              {/* Submit Button */}
              <div className="flex justify-end pt-4">
                <button
                  ref={buttonRef}
                  type="submit"
                  className="group px-8 py-3 bg-white hover:bg-gray-100 text-gray-900 font-bold transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-xl"
                  style={{ borderRadius: '50px', fontFamily: "'Poppins', 'Inter', sans-serif" }}
                >
                  <span>Send</span>
                  <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
