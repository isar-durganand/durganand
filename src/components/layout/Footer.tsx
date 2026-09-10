import { useState, useEffect } from 'react';
import { Github, Linkedin, ArrowUp, Radio } from 'lucide-react';
import { motion } from 'framer-motion';
import { sound } from '../../utils/audio';

export function Footer() {
  const [time, setTime] = useState('');

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString('en-IN', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          timeZone: 'Asia/Kolkata',
          hour12: false,
        })
      );
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    sound.playTelemetry(2200);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative border-t border-[#00F0FF]/25 bg-[#02040A] py-12 px-6 overflow-hidden">
      {/* Laser Top Accent Line */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#00F0FF] to-transparent shadow-[0_0_10px_#00F0FF]" />

      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 font-mono">
        {/* Left Branding */}
        <div className="space-y-1 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2 text-white">
            <span className="font-mono font-black text-sm text-[#00F0FF]">[DI]</span>
            <span className="font-mono font-bold text-sm tracking-wider">
              DURGANAND ISHAR // PORTFOLIO_CORE
            </span>
          </div>
          <p className="text-[11px] text-slate-500">
            &copy; {new Date().getFullYear()} &middot; ARCHITECTED WITH REACT 18 &middot; TYPESCRIPT &middot; TAILWIND &middot; FRAMER MOTION
          </p>
        </div>

        {/* Center: Live Station Clock */}
        <div className="flex items-center gap-2 px-3.5 py-1.5 rounded bg-[#040813] border border-[#00F0FF]/30 text-xs text-[#00FF9D]">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00FF9D] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00FF9D]"></span>
          </span>
          <span className="font-bold tracking-wider">STATION: FARIDABAD (IST) // {time || '18:00:00'}</span>
        </div>

        {/* Right: Relays & Ascent */}
        <div className="flex items-center gap-3">
          <motion.a
            href="https://github.com/isar-durganand"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => sound.playTelemetry(1600)}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.94 }}
            className="p-2.5 rounded bg-[#040813] text-slate-400 hover:text-[#00F0FF] border border-[#00F0FF]/25 hover:border-[#00F0FF] transition-all"
            aria-label="GitHub Profile"
          >
            <Github size={15} />
          </motion.a>

          <motion.a
            href="https://www.linkedin.com/in/durganandishar/"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => sound.playTelemetry(1600)}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.94 }}
            className="p-2.5 rounded bg-[#040813] text-slate-400 hover:text-[#00F0FF] border border-[#00F0FF]/25 hover:border-[#00F0FF] transition-all"
            aria-label="LinkedIn Profile"
          >
            <Linkedin size={15} />
          </motion.a>

          <motion.button
            onClick={scrollToTop}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.94 }}
            className="p-2.5 rounded bg-[#FF5500] hover:bg-[#FF6A00] text-white shadow-[0_0_15px_rgba(255,85,0,0.5)] transition-all cursor-pointer"
            aria-label="Ascent to top"
            title="Ascent to top"
          >
            <ArrowUp size={15} />
          </motion.button>
        </div>
      </div>
    </footer>
  );
}
