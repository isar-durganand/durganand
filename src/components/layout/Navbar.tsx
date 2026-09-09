import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, Sun, Moon } from 'lucide-react';
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

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30, delay: 0 }}
      className={`fixed top-4 left-4 right-4 z-50 mx-auto max-w-5xl rounded-2xl px-6 py-3 transition-all duration-300 ${
        scrolled
          ? 'frosted-surface border border-carbon-700 dark:border-carbon-700 bg-carbon-50/72 dark:bg-carbon-950/72 shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <div className="flex items-center justify-between">
        {/* Logo / Monogram */}
        <motion.button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          whileTap={{ scale: 0.96 }}
          className="flex items-center gap-2 cursor-pointer"
        >
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="32" height="32" rx="8" className="fill-carbon-950 dark:fill-carbon-50" />
            <text x="4" y="23" fontFamily="'Bricolage Grotesque', system-ui" fontWeight="700" fontSize="18" className="fill-accent dark:fill-accent">DI</text>
          </svg>
        </motion.button>

        {/* Nav Links with sliding pill */}
        <div className="hidden md:flex items-center gap-1 relative">
          {NAV_ITEMS.map((item) => (
            <motion.button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              whileTap={{ scale: 0.96 }}
              className={`relative px-4 py-2 text-sm font-medium font-body transition-colors cursor-pointer rounded-lg ${
                activeSection === item.id
                  ? 'text-carbon-950 dark:text-carbon-50'
                  : 'text-carbon-400 dark:text-carbon-400 hover:text-carbon-600 dark:hover:text-carbon-200'
              }`}
            >
              {activeSection === item.id && (
                <motion.div
                  layoutId="nav-pill"
                  className="absolute inset-0 bg-carbon-150 dark:bg-carbon-800 rounded-lg"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  style={{ zIndex: -1 }}
                />
              )}
              {item.label}
            </motion.button>
          ))}
        </div>

        {/* Right: Theme + Resume */}
        <div className="flex items-center gap-3">
          <motion.button
            onClick={onToggleTheme}
            whileTap={{ scale: 0.96 }}
            className="p-2 rounded-lg text-carbon-400 hover:text-carbon-950 dark:hover:text-carbon-50 hover:bg-carbon-100 dark:hover:bg-carbon-800 transition-colors cursor-pointer"
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
                  initial={{ scale: 0.5, rotate: 90, opacity: 0 }}
                  animate={{ scale: 1, rotate: 0, opacity: 1 }}
                  exit={{ scale: 0.5, rotate: -90, opacity: 0 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                >
                  <Moon size={18} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>

          <motion.a
            href="#contact"
            whileTap={{ scale: 0.96 }}
            className="hidden sm:flex items-center gap-2 px-4 py-2 text-sm font-medium font-body border border-carbon-200 dark:border-carbon-700 rounded-lg text-carbon-600 dark:text-carbon-300 hover:text-carbon-950 dark:hover:text-carbon-50 hover:border-carbon-400 dark:hover:border-carbon-500 transition-colors cursor-pointer"
          >
            <Download size={14} />
            Resume
          </motion.a>
        </div>
      </div>

      {/* Mobile nav */}
      <div className="md:hidden flex items-center gap-1 mt-3 pt-3 border-t border-carbon-150 dark:border-carbon-700">
        {NAV_ITEMS.map((item) => (
          <motion.button
            key={item.id}
            onClick={() => scrollTo(item.id)}
            whileTap={{ scale: 0.96 }}
            className={`flex-1 text-center py-2 text-xs font-medium font-body rounded-lg transition-colors cursor-pointer ${
              activeSection === item.id
                ? 'text-carbon-950 dark:text-carbon-50 bg-carbon-150 dark:bg-carbon-800'
                : 'text-carbon-400'
            }`}
          >
            {item.label}
          </motion.button>
        ))}
      </div>
    </motion.nav>
  );
}
