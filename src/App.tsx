import { useState, useEffect } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { useTheme } from './hooks/useTheme';
import { useScrollSpy } from './hooks/useScrollSpy';
import { Navbar } from './components/layout/Navbar';
import { CustomCursor } from './components/layout/CustomCursor';
import { BackgroundCanvas } from './components/layout/BackgroundCanvas';
import { CommandPalette } from './components/layout/CommandPalette';
import { Footer } from './components/layout/Footer';
import { Hero } from './components/hero/Hero';
import { ProjectsSection } from './components/projects/ProjectsSection';
import { AboutSection } from './components/about/AboutSection';
import { SkillsSection } from './components/skills/SkillsSection';
import { ContactSection } from './components/contact/ContactSection';
import { LinkedInSection } from './components/linkedin/LinkedInSection';
import { sound } from './utils/audio';

export default function App() {
  const { theme, toggleTheme } = useTheme();
  const { activeSection } = useScrollSpy();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 240, damping: 30 });

  const [paletteOpen, setPaletteOpen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);

  useEffect(() => {
    setSoundEnabled(sound.enabled);

    const handleKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        sound.playTelemetry(1800);
        setPaletteOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  const handleToggleSound = () => {
    const next = sound.toggle();
    setSoundEnabled(next);
  };

  return (
    <div className="relative min-h-screen bg-[#030508] text-slate-100 selection:bg-[#00F0FF]/35 selection:text-white sci-fi-grid overflow-x-hidden">
      {/* Sci-Fi Ambient Canvas (Radar Sweep & Laser Nodes) */}
      <BackgroundCanvas />

      {/* Sci-Fi Targeting Reticle Custom Cursor */}
      <CustomCursor />

      {/* Laser Top Scroll Progress Indicator */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-[#00F0FF] via-[#00FF9D] to-[#FF5500] origin-left z-[70] shadow-[0_0_12px_#00F0FF]"
        style={{ scaleX }}
      />

      {/* Command Palette (Cmd+K) */}
      <CommandPalette
        isOpen={paletteOpen}
        onClose={() => setPaletteOpen(false)}
        theme={theme}
        onToggleTheme={toggleTheme}
        soundEnabled={soundEnabled}
        onToggleSound={handleToggleSound}
      />

      {/* Floating HUD Navbar */}
      <Navbar
        activeSection={activeSection}
        theme={theme}
        onToggleTheme={toggleTheme}
        soundEnabled={soundEnabled}
        onToggleSound={handleToggleSound}
        onOpenPalette={() => setPaletteOpen(true)}
      />

      {/* Main Hull */}
      <main className="relative z-10 overflow-x-hidden">
        <Hero
          onOpenPalette={() => setPaletteOpen(true)}
          onToggleTheme={toggleTheme}
        />

        {/* Section Divider */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="border-t border-[#00F0FF]/15 relative">
            <span className="absolute -top-1.5 left-1/2 -translate-x-1/2 px-2 py-0.5 text-[8px] font-mono text-[#00F0FF]/50 bg-[#030508]">
              // SECTION BREAK //
            </span>
          </div>
        </div>

        <ProjectsSection />

        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="border-t border-[#00F0FF]/15 relative">
            <span className="absolute -top-1.5 left-1/2 -translate-x-1/2 px-2 py-0.5 text-[8px] font-mono text-[#00F0FF]/50 bg-[#030508]">
              // SECTION BREAK //
            </span>
          </div>
        </div>

        <AboutSection />

        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="border-t border-[#00F0FF]/15 relative">
            <span className="absolute -top-1.5 left-1/2 -translate-x-1/2 px-2 py-0.5 text-[8px] font-mono text-[#00F0FF]/50 bg-[#030508]">
              // SECTION BREAK //
            </span>
          </div>
        </div>

        <SkillsSection />

        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="border-t border-[#00F0FF]/15 relative">
            <span className="absolute -top-1.5 left-1/2 -translate-x-1/2 px-2 py-0.5 text-[8px] font-mono text-[#00F0FF]/50 bg-[#030508]">
              // SECTION BREAK //
            </span>
          </div>
        </div>

        <ContactSection />

        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="border-t border-[#00F0FF]/15 relative">
            <span className="absolute -top-1.5 left-1/2 -translate-x-1/2 px-2 py-0.5 text-[8px] font-mono text-[#00F0FF]/50 bg-[#030508]">
              // SECTION BREAK //
            </span>
          </div>
        </div>

        {/* Embedded LinkedIn Profile Iframe Section at End of Page */}
        <LinkedInSection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
