import React from 'react';
import HeroSection from '../sections/HeroSection';
import PartnersSection from '../sections/PartnersSection';
import ServicesSection from '../sections/ServicesSection';
import HowItWorksSection from '../sections/HowItWorksSection';
import WhyChooseUsSection from '../sections/WhyChooseUsSection';

export default function Home() {
  return (
    <main>
      <HeroSection />
      <PartnersSection />
      <ServicesSection />
      <HowItWorksSection />
      <WhyChooseUsSection />
    </main>
  );
}
