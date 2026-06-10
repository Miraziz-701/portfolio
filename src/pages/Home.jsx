import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navigation from '../components/Navigation';
import GrainOverlay from '../components/GrainOverlay';
import HeroSection from '../sections/HeroSection';
import AboutSection from '../sections/AboutSection';
import ProjectConceptualSection from '../sections/ProjectConceptualSection';
import ProjectPortraitSection from '../sections/ProjectPortraitSection';
import ProjectWorkspaceSection from '../sections/ProjectWorkspaceSection';
import SkillsSection from '../sections/SkillsSection';
import ContactSection from '../sections/ContactSection';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const [activeSection, setActiveSection] = useState(0);
  const triggersRef = useRef([]);

  useEffect(() => {
    // Wait for all sections to mount and ScrollTriggers to initialize
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();

      // Set up scroll spy for navigation
      const sections = ['#about', '#projects', '#contact'];
      sections.forEach((id, index) => {
        const el = document.querySelector(id);
        if (el) {
          const trigger = ScrollTrigger.create({
            trigger: el,
            start: 'top center',
            end: 'bottom center',
            onEnter: () => setActiveSection(index + 1),
            onEnterBack: () => setActiveSection(index + 1),
          });
          triggersRef.current.push(trigger);
        }
      });

      // Hero is active when at top
      const heroTrigger = ScrollTrigger.create({
        trigger: 'body',
        start: 'top top',
        end: '30% top',
        onEnter: () => setActiveSection(0),
        onEnterBack: () => setActiveSection(0),
      });
      triggersRef.current.push(heroTrigger);
    }, 500);

    return () => {
      clearTimeout(timer);
      triggersRef.current.forEach((trigger) => trigger.kill());
      triggersRef.current = [];
    };
  }, []);

  return (
    <main className="relative">
      <Navigation activeSection={activeSection} />
      <GrainOverlay />
      <HeroSection />
      <AboutSection />
      <ProjectConceptualSection />
      <ProjectPortraitSection />
      <ProjectWorkspaceSection />
      <SkillsSection />
      <ContactSection />
    </main>
  );
}
