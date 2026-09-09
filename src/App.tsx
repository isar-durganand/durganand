import { motion, useScroll, useSpring } from 'framer-motion';
import { useTheme } from './hooks/useTheme';
import { useScrollSpy } from './hooks/useScrollSpy';
import { Navbar } from './components/layout/Navbar';
import { CustomCursor } from './components/layout/CustomCursor';
import { Footer } from './components/layout/Footer';
import { Hero } from './components/hero/Hero';
import { ProjectsSection } from './components/projects/ProjectsSection';
import { AboutSection } from './components/about/AboutSection';
import { SkillsSection } from './components/skills/SkillsSection';
import { ContactSection } from './components/contact/ContactSection';

export default function App() {
  const { theme, toggleTheme } = useTheme();
  const { activeSection } = useScrollSpy();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30 });

  return (
    <>
      <CustomCursor />

      {/* Scroll progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] bg-accent origin-left z-[60]"
        style={{ scaleX }}
      />

      <Navbar
        activeSection={activeSection}
        theme={theme}
        onToggleTheme={toggleTheme}
      />

      <main className="overflow-x-hidden">
        <Hero />

        {/* Subtle section divider */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="border-t border-carbon-150 dark:border-carbon-800" />
        </div>

        <ProjectsSection />

        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="border-t border-carbon-150 dark:border-carbon-800" />
        </div>

        <AboutSection />

        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="border-t border-carbon-150 dark:border-carbon-800" />
        </div>

        <SkillsSection />

        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="border-t border-carbon-150 dark:border-carbon-800" />
        </div>

        <ContactSection />
      </main>

      <Footer />
    </>
  );
}
