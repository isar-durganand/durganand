import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, Menu, X, Command, Volume2, VolumeX } from 'lucide-react';
import type { SectionId } from '../../hooks/useScrollSpy';
import { sound } from '../../utils/audio';

interface NavbarProps {
  activeSection: SectionId;
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  onOpenPalette: () => void;
}

const NAV_ITEMS: { id: SectionId; code: string; label: string }[] = [
  { id: 'work', code: '01', label: 'PROJECTS' },
  { id: 'about', code: '02', label: 'ABOUT' },
  { id: 'skills', code: '03', label: 'SKILLS' },
  { id: 'contact', code: '04', label: 'CONTACT' },
  { id: 'linkedin', code: '05', label: 'LINKEDIN' },
];

export function Navbar({
  activeSection,
  soundEnabled,
  onToggleSound,
  onOpenPalette,
}: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
      if (window.scrollY > 150) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    sound.playClick();
    setMobileMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.nav
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 350, damping: 28 }}
      className={`fixed top-3 sm:top-4 left-3 right-3 sm:left-6 sm:right-6 z-50 mx-auto max-w-6xl transition-all duration-300 ${
        scrolled || mobileMenuOpen
          ? 'bg-[#060A14]/90 backdrop-blur-xl border border-[#00F0FF]/30 shadow-[0_0_25px_rgba(0,240,255,0.15)]'
          : 'bg-[#040711]/70 backdrop-blur-md border border-[#00F0FF]/15'
      } rounded-xl`}
      style={{
        clipPath: 'polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))',
      }}
    >
      {/* Corner HUD Ticks */}
      <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-[#00F0FF]" />
      <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-[#00F0FF]" />
      <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-[#00F0FF]" />
      <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-[#00F0FF]" />

      <div className="flex items-center justify-between px-4 sm:px-6 py-2.5">
        {/* Monogram / Name Identifier */}
        <motion.button
          onClick={() => {
            sound.playTelemetry(1400);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          whileTap={{ scale: 0.94 }}
          className="flex items-center gap-2.5 cursor-pointer group"
          aria-label="Scroll to top"
        >
          <div className="w-8 h-8 rounded bg-[#03060E] border border-[#00F0FF]/40 flex items-center justify-center text-[#00F0FF] shadow-[0_0_10px_rgba(0,240,255,0.3)] group-hover:border-[#00F0FF] transition-colors">
            <span className="font-mono font-black text-xs tracking-tighter">DI</span>
          </div>
          <div className="text-left hidden sm:block">
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00FF9D] animate-ping" />
              <span className="font-mono font-bold text-xs text-white tracking-wider">
                DURGANAND
              </span>
            </div>
            <p className="text-[9px] font-mono text-[#00F0FF]/60 uppercase tracking-widest">
              Full-Stack &amp; AI Developer
            </p>
          </div>
        </motion.button>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-1.5 px-3 py-1 bg-[#03060F]/80 border border-[#00F0FF]/15 rounded-lg">
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`relative px-3.5 py-1.5 text-xs font-mono tracking-wider transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'text-[#00F0FF] font-bold text-shadow'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="sci-fi-nav-pill"
                    className="absolute inset-0 bg-[#00F0FF]/10 border border-[#00F0FF]/50 rounded shadow-[0_0_12px_rgba(0,240,255,0.25)] -z-10"
                    transition={{ type: 'spring', stiffness: 500, damping: 32 }}
                  />
                )}
                <span className="text-[#00F0FF]/40 mr-1 text-[10px]">{item.code}</span>
                {item.label}
              </button>
            );
          })}
        </div>

        {/* Right Controls: Audio FX + Command Menu + Contact */}
        <div className="flex items-center gap-2">
          {/* Audio FX Toggle */}
          <button
            onClick={() => onToggleSound()}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded border text-xs font-mono transition-all cursor-pointer ${
              soundEnabled
                ? 'bg-[#00FF9D]/10 border-[#00FF9D]/50 text-[#00FF9D] shadow-[0_0_10px_rgba(0,255,157,0.2)]'
                : 'bg-black/40 border-slate-700 text-slate-500 hover:text-slate-300'
            }`}
            title="Toggle Synthesizer Sound FX"
          >
            {soundEnabled ? <Volume2 size={13} /> : <VolumeX size={13} />}
            <span className="hidden sm:inline text-[10px] font-bold">
              {soundEnabled ? 'AUDIO: ON' : 'AUDIO: OFF'}
            </span>
          </button>

          {/* Command Palette Button */}
          <button
            onClick={() => {
              sound.playTelemetry(1600);
              onOpenPalette();
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#00F0FF]/10 border border-[#00F0FF]/40 text-[#00F0FF] hover:bg-[#00F0FF]/20 text-xs font-mono transition-all shadow-[0_0_12px_rgba(0,240,255,0.15)] cursor-pointer"
            title="Open Command Palette (Cmd+K)"
          >
            <Command size={13} />
            <span className="hidden sm:inline text-[10px] font-bold tracking-wider">[ ⌘K ]</span>
          </button>

          {/* Direct Contact Button */}
          <a
            href="#contact"
            onClick={() => sound.playClick()}
            className="hidden sm:inline-flex items-center gap-1 px-3 py-1.5 text-xs font-mono bg-[#FF5500] hover:bg-[#FF6A00] text-white font-bold rounded shadow-[0_0_15px_rgba(255,85,0,0.4)] transition-all cursor-pointer"
            style={{
              clipPath: 'polygon(6px 0, 100% 0, calc(100% - 6px) 100%, 0 100%)',
            }}
          >
            <Download size={12} />
            <span>RESUME</span>
          </a>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => {
              sound.playClick();
              setMobileMenuOpen((prev) => !prev);
            }}
            className="md:hidden p-2 rounded bg-slate-900 border border-slate-700 text-cyan-400 cursor-pointer"
            aria-label="Navigation Menu"
          >
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile Terminal Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-[#00F0FF]/20 p-4 space-y-2 bg-[#040711]/98 backdrop-blur-2xl"
          >
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded font-mono text-xs cursor-pointer ${
                  activeSection === item.id
                    ? 'bg-[#00F0FF]/15 border border-[#00F0FF]/40 text-[#00F0FF] font-bold'
                    : 'text-slate-300 hover:bg-slate-800'
                }`}
              >
                <span>// {item.code} {item.label}</span>
                <span className="text-[#00F0FF]">&gt;&gt;</span>
              </button>
            ))}

            <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenPalette();
                }}
                className="flex items-center gap-1.5 text-xs font-mono text-[#00F0FF]"
              >
                <Command size={13} />
                <span>COMMAND PALETTE</span>
              </button>

              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-1 bg-[#FF5500] text-white font-mono text-xs rounded"
              >
                RESUME
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
