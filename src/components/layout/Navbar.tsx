import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, Sun, Moon, Menu, X } from 'lucide-react';
import type { SectionId } from '../../hooks/useScrollSpy';

interface NavbarProps {
  activeSection: SectionId;
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
}

const NAV_ITEMS: { id: SectionId; label: string }[] = [
  { id: 'work', label: 'Work' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'contact', label: 'Contact' },
];

export function Navbar({ activeSection, theme, onToggleTheme }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
      if (window.scrollY > 150) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30, delay: 0 }}
      className={`fixed top-3 sm:top-4 left-3 right-3 sm:left-4 sm:right-4 z-50 mx-auto max-w-5xl rounded-2xl transition-all duration-300 ${
        scrolled || mobileMenuOpen
          ? 'frosted-surface border border-carbon-200 dark:border-carbon-800 bg-carbon-50/85 dark:bg-carbon-950/85 shadow-lg'
          : 'bg-transparent sm:bg-transparent'
      }`}
    >
      <div className="flex items-center justify-between px-4 sm:px-6 py-2.5 sm:py-3">
        {/* Logo / Monogram */}
        <motion.button
          onClick={() => {
            setMobileMenuOpen(false);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          whileTap={{ scale: 0.94 }}
          className="flex items-center gap-2 cursor-pointer"
          aria-label="Back to top"
        >
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="32" height="32" rx="8" className="fill-carbon-950 dark:fill-carbon-50" />
            <text x="4" y="23" fontFamily="'Bricolage Grotesque', system-ui" fontWeight="700" fontSize="18" className="fill-accent dark:fill-accent">DI</text>
          </svg>
        </motion.button>

        {/* Desktop Nav Links with sliding pill */}
        <div className="hidden md:flex items-center gap-1 relative">
          {NAV_ITEMS.map((item) => (
            <motion.button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              whileTap={{ scale: 0.96 }}
              className={`relative px-4 py-2 text-sm font-medium font-body transition-colors cursor-pointer rounded-lg ${
                activeSection === item.id
                  ? 'text-carbon-950 dark:text-carbon-50'
                  : 'text-carbon-500 dark:text-carbon-400 hover:text-carbon-900 dark:hover:text-carbon-200'
              }`}
            >
              {activeSection === item.id && (
                <motion.div
                  layoutId="nav-pill"
                  className="absolute inset-0 bg-carbon-200/80 dark:bg-carbon-800 rounded-lg"
                  transition={{ type: 'spring', stiffness: 420, damping: 30 }}
                  style={{ zIndex: -1 }}
                />
              )}
              {item.label}
            </motion.button>
          ))}
        </div>

        {/* Right Actions: Theme + Resume (Desktop) + Mobile Toggle */}
        <div className="flex items-center gap-2 sm:gap-3">
          <motion.button
            onClick={onToggleTheme}
            whileTap={{ scale: 0.94 }}
            className="p-2 rounded-xl text-carbon-500 dark:text-carbon-400 hover:text-carbon-950 dark:hover:text-carbon-50 hover:bg-carbon-200/60 dark:hover:bg-carbon-800 transition-colors cursor-pointer"
            aria-label="Toggle theme"
          >
            <AnimatePresence mode="wait" initial={false}>
              {theme === 'dark' ? (
                <motion.div
                  key="sun"
                  initial={{ scale: 0.5, rotate: -90, opacity: 0 }}
                  animate={{ scale: 1, rotate: 0, opacity: 1 }}
                  exit={{ scale: 0.5, rotate: 90, opacity: 0 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                >
                  <Sun size={18} />
                </motion.div>
              ) : (
                <motion.div
                  key="moon"
                  initial={{ scale: 0.5, rotate: -90, opacity: 0 }}
                  animate={{ scale: 1, rotate: 0, opacity: 1 }}
                  exit={{ scale: 0.5, rotate: 90, opacity: 0 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                >
                  <Moon size={18} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>

          {/* Desktop Resume Button */}
          <motion.a
            href="#contact"
            whileTap={{ scale: 0.96 }}
            className="hidden sm:flex items-center gap-2 px-3.5 py-1.5 text-xs font-mono border border-carbon-200 dark:border-carbon-750 rounded-xl text-carbon-700 dark:text-carbon-300 hover:text-carbon-950 dark:hover:text-carbon-50 hover:border-carbon-400 dark:hover:border-carbon-500 transition-colors cursor-pointer"
          >
            <Download size={13} />
            Resume
          </motion.a>

          {/* Mobile Hamburger Toggle Button */}
          <motion.button
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            whileTap={{ scale: 0.92 }}
            className="md:hidden p-2 rounded-xl text-carbon-700 dark:text-carbon-300 hover:bg-carbon-200/60 dark:hover:bg-carbon-800 transition-colors cursor-pointer"
            aria-label={mobileMenuOpen ? 'Close navigation' : 'Open navigation'}
          >
            <AnimatePresence mode="wait" initial={false}>
              {mobileMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <X size={20} />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <Menu size={20} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </div>

      {/* Expandable Mobile Navigation Drawer with Spring Physics */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 350, damping: 30 }}
            className="md:hidden overflow-hidden border-t border-carbon-200 dark:border-carbon-800 px-4 py-4 space-y-1.5"
          >
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <motion.button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  whileTap={{ scale: 0.97 }}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-body font-medium transition-colors cursor-pointer ${
                    isActive
                      ? 'bg-carbon-200 dark:bg-carbon-800 text-carbon-950 dark:text-carbon-50 font-semibold'
                      : 'text-carbon-600 dark:text-carbon-400 hover:bg-carbon-100 dark:hover:bg-carbon-850'
                  }`}
                >
                  <span>{item.label}</span>
                  {isActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                  )}
                </motion.button>
              );
            })}

            {/* Mobile Resume Link */}
            <motion.a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              whileTap={{ scale: 0.97 }}
              className="w-full flex items-center justify-center gap-2 mt-2 pt-2 px-3.5 py-2.5 text-xs font-mono text-accent border border-accent/30 rounded-xl bg-accent/10 transition-colors cursor-pointer"
            >
              <Download size={13} />
              View Resume / Contact
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
