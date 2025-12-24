'use client';

import { Header } from './Header';
import { HeroSection } from './HeroSection';
import { AboutSection } from './AboutSection';

export const LandingPage = () => {
  return (
    <div className="w-full flex flex-col">
      <div className="h-screen flex flex-col bg-linear-to-br from-white via-gray-50 to-gray-100">
        <Header />
        <HeroSection />
      </div>
      <AboutSection />
    </div>
  );
};
