'use client';

import { Header } from './Header';
import { HeroSection } from './HeroSection';
import { AboutSection } from './AboutSection';
import CareerTimeline from './CareerTimeline';
import TechSkillsSection from './TechSkillsSection';
import TechSkillsSectionMobile from './TechSkillsSectionMobile';
import ContactSection from './ContactSection';



export const LandingPage = () => {
  return (
    <div className="w-full flex flex-col">
     
      <div className="h-screen flex flex-col bg-linear-to-br from-white via-gray-50 to-gray-100">
        <Header />
        <HeroSection />
      </div>
   
       
     
      
   
     <CareerTimeline />
        <AboutSection />
      <div className="hidden h-screen md:block">
        <TechSkillsSection />
      </div>
      <div className="block md:hidden">
        <TechSkillsSectionMobile />
          
      </div>

      <ContactSection />
    </div>
  );
};