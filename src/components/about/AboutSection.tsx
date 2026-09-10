import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  MapPin,
  BookOpen,
  Zap,
  GraduationCap,
  Clock,
  Terminal,
  Cpu,
  ShieldCheck,
} from 'lucide-react';
import { timeline } from '../../data/timeline';

export function AboutSection() {
  const headerRef = useRef(null);
  const isInView = useInView(headerRef, { once: true, margin: '0px 0px -60px 0px' });
  const [localTime, setLocalTime] = useState('');

  // Live IST Clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      };
      setLocalTime(new Intl.DateTimeFormat('en-US', options).format(now));
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="about" className="py-24 sm:py-32 px-4 sm:px-6 scroll-mt-24 relative">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ type: 'spring', stiffness: 220, damping: 28 }}
          className="mb-12 sm:mb-16"
        >
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-[#00FF9D] shadow-[0_0_8px_#00FF9D]" />
            <span className="text-xs font-mono text-[#00FF9D] uppercase tracking-widest font-bold">
              // 02 &middot; Background &amp; Mindset
            </span>
          </div>
          <h2 className="font-display font-black text-3xl sm:text-5xl lg:text-6xl tracking-tight-display text-white">
            A Bit About Me.
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-slate-300 mt-2 max-w-xl font-body leading-relaxed">
            Grounded in first-principles software engineering, combining practical full-stack shipping with deep C++ computational foundations.
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Bento 1: Deep Narrative (7 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '0px 0px -60px 0px' }}
            transition={{ type: 'spring', stiffness: 200, damping: 28 }}
            className="md:col-span-7 cyber-card p-6 sm:p-8 flex flex-col justify-between space-y-6"
          >
            <div className="hud-bracket-tl" />
            <div className="hud-bracket-tr" />
            <div className="hud-bracket-bl" />
            <div className="hud-bracket-br" />

            <div className="space-y-4">
              <div className="flex items-center gap-2 text-[#00F0FF]">
                <Cpu size={20} />
                <h3 className="font-mono font-bold text-lg sm:text-xl text-white tracking-wider">
                  // How I Build &amp; Learn
                </h3>
              </div>

              <p className="text-xs sm:text-sm font-body text-slate-300 leading-relaxed">
                I am a first-year Computer Science &amp; Engineering undergraduate at <strong className="text-white">Manav Rachna International Institute of Research and Studies (MRIIRS)</strong> in Faridabad. I believe building meaningful software requires understanding how every abstraction works under the hood.
              </p>

              <p className="text-xs sm:text-sm font-body text-slate-300 leading-relaxed">
                Beyond shipping reactive web software in TypeScript and React, I treat <span className="text-[#00F0FF] font-semibold">C and C++</span> as essential foundational disciplines. Daily practice in pointers, memory models, and Data Structures &amp; Algorithms provides enduring engineering clarity when designing complex applications and client-side engines.
              </p>

              <p className="text-xs sm:text-sm font-body text-slate-300 leading-relaxed">
                I work with Git, GitHub, Vercel, and modern developer tooling daily. My goal is a software engineering or AI role at a company with a high engineering bar, competing in hackathons and shipping impactful software along the way.
              </p>
            </div>

            {/* Micro Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="p-3 rounded bg-[#040813] border border-[#00F0FF]/25 flex items-start gap-2.5">
                <BookOpen size={16} className="text-[#00F0FF] flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Active Study</p>
                  <p className="text-xs font-mono font-bold text-slate-100">C++ STL &amp; Dynamic Programming</p>
                </div>
              </div>

              <div className="p-3 rounded bg-[#040813] border border-[#FF5500]/25 flex items-start gap-2.5">
                <Zap size={16} className="text-[#FF5500] flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Focus Target</p>
                  <p className="text-xs font-mono font-bold text-slate-100">High-Performance Web &amp; AI Tools</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Bento 2: Academic Milestones & Timeline (5 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '0px 0px -60px 0px' }}
            transition={{ type: 'spring', stiffness: 200, damping: 28, delay: 0.1 }}
            className="md:col-span-5 cyber-card p-6 sm:p-8 flex flex-col justify-between"
          >
            <div className="hud-bracket-tl" />
            <div className="hud-bracket-tr" />
            <div className="hud-bracket-bl" />
            <div className="hud-bracket-br" />

            <div>
              <div className="flex items-center gap-2 mb-6 text-[#00FF9D]">
                <GraduationCap size={20} />
                <h3 className="font-mono font-bold text-lg sm:text-xl text-white tracking-wider">
                  // Education &amp; Milestones
                </h3>
              </div>

              <div className="relative pl-6 border-l-2 border-[#00F0FF]/30 space-y-7 ml-2">
                {timeline.map((entry, i) => {
                  const isLatest = i === timeline.length - 1;
                  return (
                    <div key={entry.year} className="relative">
                      <div
                        className={`absolute -left-[31px] top-0.5 w-3.5 h-3.5 rounded-full border-2 ${
                          isLatest
                            ? 'border-[#00FF9D] bg-[#00FF9D] shadow-[0_0_10px_#00FF9D] animate-pulse'
                            : 'border-[#00F0FF] bg-[#03060E]'
                        }`}
                      />

                      <span className="text-xs font-mono font-bold text-[#00F0FF]">
                        {entry.year}
                      </span>
                      <h4 className="font-mono font-bold text-sm sm:text-base text-white mt-0.5">
                        {entry.label}
                      </h4>
                      <p className="text-xs font-body text-slate-400 mt-0.5">
                        {entry.detail}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-[#00F0FF]/20 flex items-center justify-between text-xs font-mono text-slate-400">
              <span>Department</span>
              <span className="text-[#00F0FF] font-bold">CSE &middot; MRIIRS</span>
            </div>
          </motion.div>

          {/* Bento 3: Live Coordinates & Time (4 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '0px 0px -60px 0px' }}
            transition={{ type: 'spring', stiffness: 200, damping: 28, delay: 0.15 }}
            className="md:col-span-4 cyber-card p-6 flex flex-col justify-between"
          >
            <div className="hud-bracket-tl" />
            <div className="hud-bracket-tr" />
            <div className="hud-bracket-bl" />
            <div className="hud-bracket-br" />

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-[#FF5500]">
                  <MapPin size={16} />
                  <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400">Location</span>
                </div>
                <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-[#00FF9D]/10 text-[#00FF9D] text-[9px] font-mono font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00FF9D] animate-ping" />
                  <span>ONLINE &amp; CODING</span>
                </div>
              </div>

              <div>
                <h4 className="font-mono font-bold text-base text-white">Faridabad, India</h4>
                <p className="text-[11px] font-mono text-[#00F0FF] mt-0.5">India Standard Time (IST)</p>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-[#00F0FF]/20 flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-slate-400">
                <Clock size={14} />
                <span className="text-[11px] font-mono">Local Time</span>
              </div>
              <span className="text-xs font-mono font-black text-[#00FF9D] tracking-widest">
                {localTime || '18:00:00'} IST
              </span>
            </div>
          </motion.div>

          {/* Bento 4: Core Engineering Values (4 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '0px 0px -60px 0px' }}
            transition={{ type: 'spring', stiffness: 200, damping: 28, delay: 0.2 }}
            className="md:col-span-4 cyber-card p-6 flex flex-col justify-between"
          >
            <div className="hud-bracket-tl" />
            <div className="hud-bracket-tr" />
            <div className="hud-bracket-bl" />
            <div className="hud-bracket-br" />

            <div className="space-y-3">
              <div className="flex items-center gap-2 text-[#00F0FF]">
                <ShieldCheck size={16} />
                <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400">Core Values</span>
              </div>
              <h4 className="font-mono font-bold text-base text-white">Engineering Tenets</h4>
              <ul className="space-y-2 text-xs font-mono text-slate-300">
                <li className="flex items-center gap-2">
                  <span className="text-[#00F0FF] font-bold">1.</span> Never skip computational fundamentals.
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#00FF9D] font-bold">2.</span> Keep user data on their own devices.
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#FF5500] font-bold">3.</span> Ship functional code over speculative features.
                </li>
              </ul>
            </div>

            <div className="mt-6 pt-4 border-t border-[#00F0FF]/20 text-[10px] font-mono text-slate-400">
              // Client-Side Privacy &middot; Type Safety
            </div>
          </motion.div>

          {/* Bento 5: Daily Development Tooling (4 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '0px 0px -60px 0px' }}
            transition={{ type: 'spring', stiffness: 200, damping: 28, delay: 0.25 }}
            className="md:col-span-4 cyber-card p-6 flex flex-col justify-between"
          >
            <div className="hud-bracket-tl" />
            <div className="hud-bracket-tr" />
            <div className="hud-bracket-bl" />
            <div className="hud-bracket-br" />

            <div className="space-y-3">
              <div className="flex items-center gap-2 text-amber-400">
                <Terminal size={16} />
                <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400">Development Tools</span>
              </div>
              <h4 className="font-mono font-bold text-base text-white">Daily Environment</h4>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {['Git', 'GitHub', 'VS Code', 'Vercel', 'Vite', 'PowerShell', 'Linux Bash', 'C++ G++'].map((item) => (
                  <span key={item} className="px-2 py-0.5 text-[10px] font-mono rounded bg-[#03060E] text-[#00F0FF] border border-[#00F0FF]/30">
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-[#00F0FF]/20 flex items-center justify-between text-[11px] font-mono text-slate-400">
              <span>Workflow</span>
              <span className="text-[#00FF9D] font-bold">Active Daily</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
