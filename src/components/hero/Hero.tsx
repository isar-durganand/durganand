import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowDown, Mail, Terminal, User, Sparkles, Command, Cpu } from 'lucide-react';
import { useMagnetic } from '../../hooks/useMagnetic';
import { InteractiveTerminal } from './InteractiveTerminal';
import { sound } from '../../utils/audio';

interface HeroProps {
  onOpenPalette?: () => void;
  onToggleTheme?: () => void;
}

const STACK_ITEMS = [
  'REACT 18 & TYPESCRIPT',
  'C++ DATA STRUCTURES & STL',
  'PYTHON DATA PIPELINES',
  'TAILWIND CSS & MODERN UI',
  'EDGE DEPLOYMENT & VERCEL',
];

const headlineWords = 'Building high-performance web products and modern software engineering solutions.'.split(' ');

export function Hero({ onOpenPalette, onToggleTheme }: HeroProps) {
  const [stackIndex, setStackIndex] = useState(0);
  const [rightView, setRightView] = useState<'portrait' | 'terminal'>('portrait');
  const magneticPrimary = useMagnetic(0.2);
  const magneticSecondary = useMagnetic(0.15);

  useEffect(() => {
    const interval = setInterval(() => {
      setStackIndex((prev) => (prev + 1) % STACK_ITEMS.length);
    }, 2400);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-[100svh] flex flex-col justify-center pt-28 sm:pt-36 pb-20 sm:pb-28 px-4 sm:px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
        {/* Left Column: Narrative & Actions (7 cols) */}
        <div className="lg:col-span-7 space-y-6 sm:space-y-7">
          {/* Identity & Status Tag */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1, type: 'spring', stiffness: 300, damping: 28 }}
            className="flex flex-wrap items-center gap-2"
          >
            {/* Status Beacon */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#00FF9D]/10 border border-[#00FF9D]/40 text-[#00FF9D] text-xs font-mono">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00FF9D] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00FF9D]"></span>
              </span>
              <span className="font-bold tracking-wider">AVAILABLE FOR INTERNSHIPS &amp; HACKATHONS</span>
            </div>

            <div className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#070D1C] border border-[#00F0FF]/25 text-[#00F0FF] text-[11px] font-mono">
              <Cpu size={12} />
              <span>BTech CSE @ MRIIRS (2026–30)</span>
            </div>
          </motion.div>

          {/* Headline */}
          <h1
            aria-label="Durganand Ishar — Building high-performance web products and modern software engineering solutions."
            className="font-display font-black text-3xl sm:text-5xl lg:text-6xl tracking-tight-display leading-[1.08] text-white"
          >
            {headlineWords.map((word, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.12 + i * 0.04,
                  type: 'spring',
                  stiffness: 240,
                  damping: 26,
                }}
                className={`inline-block mr-[0.24em] ${
                  word.toLowerCase().includes('software') || word.toLowerCase().includes('products')
                    ? 'text-[#00F0FF] drop-shadow-[0_0_15px_rgba(0,240,255,0.6)]'
                    : word.toLowerCase().includes('solutions') || word.toLowerCase().includes('high-performance')
                    ? 'text-[#FF5500] drop-shadow-[0_0_15px_rgba(255,85,0,0.6)]'
                    : 'text-slate-100'
                }`}
              >
                {word}
              </motion.span>
            ))}
          </h1>

          {/* Narrative Subtext with Natural Language */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65, type: 'spring', stiffness: 200, damping: 28 }}
            className="text-xs sm:text-sm md:text-base text-slate-300 max-w-xl font-body leading-relaxed"
          >
            First-year CSE student at <span className="text-white font-semibold">MRIIRS, Faridabad</span>. Creator of <a href="https://www.printifynotes.in/" target="_blank" rel="noreferrer" className="text-[#00F0FF] underline font-semibold">Printify Notes</a> (a 100% private, client-side PDF inverter) and <a href="https://josaacollegepredictor.vercel.app/" target="_blank" rel="noreferrer" className="text-[#00FF9D] underline font-semibold">JoSAA College Predictor</a> (analyzing 72,000+ official admission cutoffs), with a dedicated focus on C++ Data Structures &amp; Algorithms.
          </motion.p>

          {/* Active Skills Ticker */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="flex items-center gap-2 text-xs"
          >
            <span className="text-[11px] font-mono text-slate-500 uppercase tracking-widest">
              CURRENT FOCUS:
            </span>
            <div className="overflow-hidden h-6 relative inline-flex items-center">
              <AnimatePresence mode="wait">
                <motion.span
                  key={stackIndex}
                  initial={{ y: 14, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -14, opacity: 0 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 28 }}
                  className="font-mono text-[#00F0FF] font-bold px-2.5 py-0.5 rounded bg-[#00F0FF]/10 border border-[#00F0FF]/30 shadow-[0_0_8px_rgba(0,240,255,0.25)]"
                >
                  [ {STACK_ITEMS[stackIndex]} ]
                </motion.span>
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, type: 'spring', stiffness: 220, damping: 28 }}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2"
          >
            <motion.a
              ref={magneticPrimary.ref as React.RefObject<HTMLAnchorElement>}
              href="#work"
              style={magneticPrimary.style}
              onMouseMove={magneticPrimary.onMouseMove}
              onMouseLeave={magneticPrimary.onMouseLeave}
              onClick={() => sound.playTelemetry(1800)}
              whileTap={{ scale: 0.96 }}
              className="cyber-btn inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#FF5500] hover:bg-[#FF6A00] text-white font-mono font-bold text-xs uppercase tracking-wider shadow-[0_0_25px_rgba(255,85,0,0.45)] cursor-pointer text-center"
            >
              <span>VIEW PROJECTS</span>
              <ArrowDown size={14} className="animate-bounce" />
            </motion.a>

            <motion.a
              ref={magneticSecondary.ref as React.RefObject<HTMLAnchorElement>}
              href="#contact"
              style={magneticSecondary.style}
              onMouseMove={magneticSecondary.onMouseMove}
              onMouseLeave={magneticSecondary.onMouseLeave}
              onClick={() => sound.playClick()}
              whileTap={{ scale: 0.96 }}
              className="cyber-btn inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#071122] hover:bg-[#0A1830] border border-[#00F0FF]/40 text-[#00F0FF] font-mono font-bold text-xs uppercase tracking-wider shadow-[0_0_15px_rgba(0,240,255,0.2)] cursor-pointer text-center"
            >
              <Mail size={14} />
              <span>GET IN TOUCH</span>
            </motion.a>

            <button
              onClick={() => {
                sound.playPowerUp();
                setRightView((prev) => (prev === 'portrait' ? 'terminal' : 'portrait'));
              }}
              className="inline-flex items-center justify-center gap-2 px-4 py-3.5 text-xs font-mono text-slate-400 hover:text-[#00F0FF] rounded border border-dashed border-slate-700 hover:border-[#00F0FF]/50 transition-colors cursor-pointer"
            >
              {rightView === 'portrait' ? (
                <>
                  <Terminal size={14} className="text-[#00F0FF]" />
                  <span>OPEN TERMINAL CLI</span>
                </>
              ) : (
                <>
                  <User size={14} className="text-[#FF5500]" />
                  <span>VIEW PHOTO</span>
                </>
              )}
            </button>
          </motion.div>

          {/* Quick Metrics Bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.05 }}
            className="pt-4 grid grid-cols-2 sm:grid-cols-4 gap-3 border-t border-[#00F0FF]/15 max-w-xl"
          >
            <div className="p-2.5 rounded bg-[#050A16] border border-[#00F0FF]/20">
              <p className="text-xl sm:text-2xl font-mono font-black text-[#FF5500] drop-shadow-[0_0_8px_#FF5500]">72K+</p>
              <p className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">Cutoffs Analyzed</p>
            </div>
            <div className="p-2.5 rounded bg-[#050A16] border border-[#00F0FF]/20">
              <p className="text-xl sm:text-2xl font-mono font-black text-[#00F0FF] drop-shadow-[0_0_8px_#00F0FF]">60%</p>
              <p className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">Printing Ink Saved</p>
            </div>
            <div className="p-2.5 rounded bg-[#050A16] border border-[#00F0FF]/20">
              <p className="text-xl sm:text-2xl font-mono font-black text-[#00FF9D] drop-shadow-[0_0_8px_#00FF9D]">100%</p>
              <p className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">In-Browser Privacy</p>
            </div>
            <div className="p-2.5 rounded bg-[#050A16] border border-[#00F0FF]/20">
              <p className="text-xl sm:text-2xl font-mono font-black text-amber-400 drop-shadow-[0_0_8px_#f59e0b]">250+</p>
              <p className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">DSA Problems</p>
            </div>
          </motion.div>
        </div>

        {/* Right Column: Portrait Photo Frame / Interactive Terminal (5 cols) */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.35, duration: 0.7 }}
            className="w-full max-w-md relative"
          >
            {/* View Mode Bar */}
            <div className="flex items-center justify-between mb-3 px-1">
              <div className="flex items-center gap-1.5 p-1 rounded bg-[#050A16] border border-[#00F0FF]/25 text-xs font-mono">
                <button
                  onClick={() => {
                    sound.playClick();
                    setRightView('portrait');
                  }}
                  className={`px-3 py-1 rounded transition-colors cursor-pointer ${
                    rightView === 'portrait'
                      ? 'bg-[#00F0FF]/20 text-[#00F0FF] font-bold border border-[#00F0FF]/40'
                      : 'text-slate-500 hover:text-slate-300'
                  }`}
                >
                  // PHOTO
                </button>
                <button
                  onClick={() => {
                    sound.playClick();
                    setRightView('terminal');
                  }}
                  className={`px-3 py-1 rounded transition-colors cursor-pointer flex items-center gap-1 ${
                    rightView === 'terminal'
                      ? 'bg-[#00F0FF]/20 text-[#00F0FF] font-bold border border-[#00F0FF]/40'
                      : 'text-slate-500 hover:text-slate-300'
                  }`}
                >
                  <span>// TERMINAL</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00FF9D] animate-pulse" />
                </button>
              </div>

              <span className="text-[10px] font-mono text-slate-500 tracking-wider">
                Faridabad, India
              </span>
            </div>

            {/* View Render */}
            <AnimatePresence mode="wait">
              {rightView === 'portrait' ? (
                <motion.div
                  key="portrait-view"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="relative group cyber-card p-1"
                >
                  <div className="hud-bracket-tl" />
                  <div className="hud-bracket-tr" />
                  <div className="hud-bracket-bl" />
                  <div className="hud-bracket-br" />

                  <div className="absolute -inset-1 bg-gradient-to-r from-[#00F0FF]/20 via-[#FF5500]/15 to-[#00FF9D]/20 rounded-xl blur-xl opacity-70 group-hover:opacity-100 transition duration-700 -z-10" />

                  <div className="relative rounded-lg overflow-hidden bg-[#02050B] aspect-[4/5] max-h-[460px] scanlines">
                    <img
                      src="/profile.webp"
                      alt="Durganand Ishar — Full-Stack Developer and CSE Student"
                      className="w-full h-full object-cover object-top filter contrast-[1.05] brightness-95 group-hover:brightness-100 transition-all duration-700"
                      loading="eager"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-[#030508] via-transparent to-transparent pointer-events-none" />

                    <div className="absolute top-3 left-3 px-2.5 py-1 rounded bg-black/70 backdrop-blur-md border border-[#00F0FF]/40 text-[#00F0FF] text-[10px] font-mono uppercase tracking-widest flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#00FF9D] animate-ping" />
                      <span>Full-Stack Developer</span>
                    </div>

                    <div className="absolute bottom-3 left-3 right-3 p-3 rounded bg-[#03060E]/90 backdrop-blur-md border border-[#00F0FF]/30 flex items-center justify-between">
                      <div>
                        <p className="text-xs font-mono font-bold text-white tracking-wider">
                          DURGANAND ISHAR
                        </p>
                        <p className="text-[10px] font-mono text-[#00F0FF]">
                          BTech CSE &middot; MRIIRS 2026–2030
                        </p>
                      </div>
                      <div className="flex items-center gap-1 px-2 py-0.5 rounded bg-[#FF5500]/20 border border-[#FF5500]/40 text-[#FF5500] text-[10px] font-mono font-bold">
                        <Sparkles size={11} />
                        <span>BUILDER</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="terminal-view"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <InteractiveTerminal onToggleTheme={onToggleTheme} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
