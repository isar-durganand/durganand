import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Mail } from 'lucide-react';
import { useMagnetic } from '../../hooks/useMagnetic';

const STACK_ITEMS = ['React', 'Python', 'C++', 'Firebase', 'TypeScript'];

const headlineWords = 'Building things at the intersection of code and curiosity.'.split(' ');

export function Hero() {
  const [stackIndex, setStackIndex] = useState(0);
  const magneticPrimary = useMagnetic(0.2);
  const magneticSecondary = useMagnetic(0.15);

  useEffect(() => {
    const interval = setInterval(() => {
      setStackIndex((prev) => (prev + 1) % STACK_ITEMS.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center pt-32 pb-32 px-6">
      <div className="max-w-5xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        {/* Left: Copy (7 cols) */}
        <div className="lg:col-span-7 space-y-8">
          {/* Role tag & Identity */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, type: 'spring', stiffness: 300, damping: 30 }}
            className="space-y-1.5"
          >
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-accent" />
              <span className="text-xs font-mono uppercase tracking-widest text-accent font-semibold">
                Durganand Ishar
              </span>
            </div>
            <p className="text-sm font-mono text-carbon-400 dark:text-carbon-400">
              CSE Student · Full-Stack Builder · Aspiring SWE &amp; AI Engineer
            </p>
          </motion.div>

          {/* Headline — word-by-word stagger */}
          <h1
            aria-label="Durganand Ishar — Building things at the intersection of code and curiosity."
            className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl xl:text-7xl tracking-display leading-[1.1]"
          >
            {headlineWords.map((word, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 40, clipPath: 'inset(0 0 100% 0)' }}
                animate={{ opacity: 1, y: 0, clipPath: 'inset(0 0 0% 0)' }}
                transition={{
                  delay: 0.2 + i * 0.07,
                  type: 'spring',
                  stiffness: 200,
                  damping: 30,
                }}
                className="inline-block mr-[0.3em]"
              >
                {word}
              </motion.span>
            ))}
          </h1>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, type: 'spring', stiffness: 200, damping: 30 }}
            className="text-lg text-carbon-500 dark:text-carbon-300 max-w-lg leading-relaxed font-body"
          >
            First-year CSE student at MRIIRS, shipping full-stack products and exploring AI/ML while learning the fundamentals properly — one data structure at a time.
          </motion.p>

          {/* Stack ticker */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1 }}
            className="flex items-center gap-3"
          >
            <span className="text-xs font-mono text-carbon-400 uppercase tracking-wider">Currently working with</span>
            <div className="overflow-hidden h-6 relative">
              <motion.span
                key={stackIndex}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                className="inline-block text-sm font-mono text-accent font-semibold"
              >
                {STACK_ITEMS[stackIndex]}
              </motion.span>
            </div>
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, type: 'spring', stiffness: 200, damping: 30 }}
            className="flex flex-wrap gap-4 pt-2"
          >
            <motion.a
              ref={magneticPrimary.ref as React.RefObject<HTMLAnchorElement>}
              href="#work"
              style={magneticPrimary.style}
              onMouseMove={magneticPrimary.onMouseMove}
              onMouseLeave={magneticPrimary.onMouseLeave}
              whileTap={{ scale: 0.96 }}
              className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-white font-medium font-body text-sm rounded-xl hover:bg-accent-hover transition-colors cursor-pointer"
            >
              View Work
              <ArrowDown size={16} />
            </motion.a>
            <motion.a
              ref={magneticSecondary.ref as React.RefObject<HTMLAnchorElement>}
              href="#contact"
              style={magneticSecondary.style}
              onMouseMove={magneticSecondary.onMouseMove}
              onMouseLeave={magneticSecondary.onMouseLeave}
              whileTap={{ scale: 0.96 }}
              className="inline-flex items-center gap-2 px-6 py-3 border border-carbon-200 dark:border-carbon-700 text-carbon-600 dark:text-carbon-300 font-medium font-body text-sm rounded-xl hover:border-carbon-400 dark:hover:border-carbon-500 hover:text-carbon-950 dark:hover:text-carbon-50 transition-colors cursor-pointer"
            >
              <Mail size={16} />
              Get in Touch
            </motion.a>
          </motion.div>
        </div>

        {/* Right: Portrait (5 cols) */}
        <div className="lg:col-span-5 flex justify-center lg:justify-end">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            {/* Portrait with chip overlay */}
            <div className="relative w-64 h-80 sm:w-72 sm:h-[22rem] lg:w-80 lg:h-[26rem] rounded-2xl border border-carbon-200 dark:border-carbon-700 overflow-hidden">
              <img
                src="/profile.webp"
                alt="Durganand Ishar — CSE Student and Full-Stack Developer"
                className="w-full h-full object-cover object-top grayscale-[30%] contrast-[1.05]"
                loading="eager"
              />
              {/* Subtle tinted overlay */}
              <div className="absolute inset-0 bg-accent/[0.06] mix-blend-multiply" />

              {/* Floating status chip — inside the portrait */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, type: 'spring', stiffness: 300, damping: 30 }}
                className="absolute bottom-3 left-3 right-3 bg-carbon-950/70 dark:bg-carbon-950/80 frosted-surface border border-carbon-700/50 rounded-xl px-3 py-2 flex items-center gap-2"
              >
                <motion.span
                  className="inline-block w-2 h-2 rounded-full bg-green-500 flex-shrink-0"
                  animate={{ opacity: [1, 0.5, 1], scale: [1, 1.15, 1] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                />
                <span className="text-xs font-mono text-carbon-200">
                  Available for opportunities
                </span>
              </motion.div>
            </div>

            {/* Accent side bar */}
            <div className="absolute top-6 -right-3 w-1 h-16 bg-accent rounded-full" />
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          className="w-5 h-8 border-2 border-carbon-300 dark:border-carbon-600 rounded-full flex justify-center pt-1.5"
        >
          <div className="w-1 h-1.5 bg-carbon-400 rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
}
