"use client";

/**
 * HomeSection.jsx — orchestrates all home-page sections in order.
 * Footer is rendered by layout.jsx — do NOT add it here.
 */

import HeroSection      from "./HeroSection";
import AboutNovaTress   from "./AboutNovaTress";
import ServicesSlider   from "./ServicesSlider";
import OurProfessionals from "./OurProfessionals";
import ExpertSection    from "./ExpertSection";

export default function HomeSection() {
  return (
    <>
      {/* 1. Full-screen hero + animated stats */}
      <HeroSection />

      {/* 2. About NovaTress — two-column image + copy */}
      <AboutNovaTress />

      {/* 3. Infinite auto-scroll services marquee */}
      <ServicesSlider />

      {/* 4. Meet Our Beauty Experts */}
      <OurProfessionals />

      {/* 5. We Are Expert In — 6-card grid */}
      <ExpertSection />
    </>
  );
}
