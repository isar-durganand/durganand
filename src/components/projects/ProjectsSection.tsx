import { useState, useRef, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, X, Sparkles, Layers, ShieldCheck, ArrowUpRight, CheckCircle2, Terminal, Cpu } from 'lucide-react';
import { projects } from '../../data/projects';
import type { Project } from '../../types/portfolio';
import { sound } from '../../utils/audio';

export function ProjectsSection() {
  const headerRef = useRef(null);
  const isInView = useInView(headerRef, { once: true, margin: '0px 0px -60px 0px' });
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [filter, setFilter] = useState<'all' | 'react' | 'python'>('all');

  const filteredProjects = projects.filter((p) => {
    if (filter === 'all') return true;
    if (filter === 'react') return p.stack.includes('React');
    if (filter === 'python') return p.stack.includes('Python');
    return true;
  });

  return (
    <section id="work" className="py-24 sm:py-32 px-4 sm:px-6 scroll-mt-24 relative">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <motion.div
            ref={headerRef}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ type: 'spring', stiffness: 220, damping: 28 }}
            className="space-y-3"
          >
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#00F0FF] shadow-[0_0_8px_#00F0FF]" />
              <span className="text-xs font-mono text-[#00F0FF] uppercase tracking-widest font-bold">
                // 01 &middot; Featured Projects
              </span>
            </div>
            <h2 className="font-display font-black text-3xl sm:text-5xl lg:text-6xl tracking-tight-display text-white">
              Things I've Built.
            </h2>
            <p className="text-xs sm:text-sm md:text-base text-slate-300 max-w-xl font-body leading-relaxed">
              Real-world products used by students and developers, built with client-side privacy architectures and large-scale data processing.
            </p>
          </motion.div>

          {/* Filter Controls */}
          <div className="flex items-center gap-1.5 p-1 rounded-lg bg-[#050A16] border border-[#00F0FF]/25 text-xs font-mono">
            {[
              { id: 'all', label: 'All Projects' },
              { id: 'react', label: 'React & TS' },
              { id: 'python', label: 'Python & Data' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  sound.playTelemetry(1800);
                  setFilter(tab.id as 'all' | 'react' | 'python');
                }}
                className={`px-3 py-1.5 rounded transition-all cursor-pointer ${
                  filter === tab.id
                    ? 'bg-[#00F0FF]/20 text-[#00F0FF] font-bold border border-[#00F0FF]/40 shadow-[0_0_10px_rgba(0,240,255,0.2)]'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Cards List */}
        <div className="space-y-16 sm:space-y-20">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, i) => (
              <SciFiProjectCard
                key={project.id}
                project={project}
                index={i}
                onSelect={() => {
                  sound.playPowerUp();
                  setSelectedProject(project);
                }}
              />
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Blueprint Architecture Modal */}
      <AnimatePresence>
        {selectedProject && (
          <SciFiBlueprintModal
            project={selectedProject}
            onClose={() => {
              sound.playClick();
              setSelectedProject(null);
            }}
          />
        )}
      </AnimatePresence>
    </section>
  );
}

/* ===== Sci-Fi Project Card ===== */
interface CardProps {
  project: Project;
  index: number;
  onSelect: () => void;
}

function SciFiProjectCard({ project, index, onSelect }: CardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '0px 0px -80px 0px' });
  const isEven = index % 2 === 0;
  const isPrintify = project.id === 'printify-notes';

  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    setRotateX(((y - centerY) / centerY) * -4);
    setRotateY(((x - centerX) / centerX) * 4);
  };

  return (
    <motion.article
      ref={ref}
      layout
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 180, damping: 26, delay: 0.1 }}
      className={`grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 items-center ${
        isEven ? '' : 'lg:grid-flow-dense'
      }`}
    >
      {/* Visual / Screenshot Chassis (7 cols) */}
      <motion.div
        className={`lg:col-span-7 ${isEven ? '' : 'lg:col-start-6'}`}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false);
          setRotateX(0);
          setRotateY(0);
        }}
        onClick={onSelect}
        style={{
          perspective: 1000,
          transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
          transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.5s ease-out',
          cursor: 'pointer',
        }}
        whileTap={{ scale: 0.985 }}
        data-cursor="VIEW"
      >
        <div className={`relative p-1 ${isPrintify ? 'cyber-card-orange' : 'cyber-card'} group shadow-2xl`}>
          <div className="hud-bracket-tl" />
          <div className="hud-bracket-tr" />
          <div className="hud-bracket-bl" />
          <div className="hud-bracket-br" />

          {/* Top Chassis Bar */}
          <div className="flex items-center justify-between px-4 py-2.5 bg-[#02050B] border-b border-[#00F0FF]/20 text-[11px] font-mono">
            <div className="flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full ${isPrintify ? 'bg-[#FF5500] shadow-[0_0_8px_#FF5500]' : 'bg-[#00F0FF] shadow-[0_0_8px_#00F0FF]'}`} />
              <span className="text-white font-bold tracking-wider uppercase">
                {project.title}
              </span>
            </div>

            <div className="flex items-center gap-1 text-[#00FF9D]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00FF9D] animate-pulse" />
              <span className="text-[10px] font-bold">LIVE IN PRODUCTION</span>
            </div>
          </div>

          {/* Screenshot Display */}
          <div className="relative overflow-hidden aspect-[16/10] bg-[#010307] scanlines">
            <img
              src={project.screenshot}
              alt={project.title}
              className="w-full h-full object-cover object-top filter contrast-[1.05] group-hover:scale-105 transition-transform duration-700"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-[#00F0FF]/5 pointer-events-none" />

            <div className="absolute bottom-3 right-3 px-3 py-1.5 rounded bg-black/80 backdrop-blur-md border border-[#00F0FF]/40 text-[#00F0FF] text-[10px] font-mono uppercase tracking-widest flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <span>View Details</span>
              <ArrowUpRight size={12} />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Metadata & Narrative (5 cols) */}
      <div className={`lg:col-span-5 space-y-4 ${isEven ? '' : 'lg:col-start-1 lg:row-start-1'}`}>
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 text-[10px] font-mono text-[#00F0FF] uppercase tracking-widest font-bold">
            <Cpu size={12} />
            <span>PROJECT {index + 1 < 10 ? `0${index + 1}` : index + 1}</span>
          </div>
          <h3 className="font-display font-black text-2xl sm:text-3xl lg:text-4xl text-white tracking-tight">
            {project.title}
          </h3>
          <p className="text-xs sm:text-sm font-mono text-[#FF5500] font-semibold">{project.tagline}</p>
        </div>

        <p className="text-xs sm:text-sm font-body text-slate-300 leading-relaxed">
          {project.description}
        </p>

        {/* Feature Highlights */}
        <div className="space-y-2 py-1">
          {project.highlights.map((h, idx) => (
            <div key={idx} className="flex items-start gap-2 text-xs font-mono text-slate-200">
              <span className="text-[#00F0FF] mt-0.5">&gt;&gt;</span>
              <span>{h}</span>
            </div>
          ))}
        </div>

        {/* Tech Stack Badges */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {project.stack.map((t) => (
            <span
              key={t}
              className="px-2.5 py-1 text-[11px] font-mono rounded bg-[#060D1A] text-[#00F0FF] border border-[#00F0FF]/30"
            >
              {t}
            </span>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-3 pt-2">
          <motion.a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => {
              e.stopPropagation();
              sound.playTelemetry(2000);
            }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.96 }}
            className="cyber-btn inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-mono font-bold bg-[#00F0FF] text-black shadow-[0_0_15px_rgba(0,240,255,0.4)] cursor-pointer"
          >
            <span>LIVE WEBSITE</span>
            <ExternalLink size={13} />
          </motion.a>

          <motion.a
            href={project.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => {
              e.stopPropagation();
              sound.playClick();
            }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.96 }}
            className="cyber-btn inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-mono font-bold bg-[#071120] hover:bg-[#0C1A30] border border-[#00F0FF]/30 text-slate-200 hover:text-[#00F0FF] cursor-pointer"
          >
            <Github size={13} />
            <span>SOURCE CODE</span>
          </motion.a>

          <button
            onClick={onSelect}
            className="text-xs font-mono text-slate-400 hover:text-[#00F0FF] transition-colors ml-auto sm:ml-0 cursor-pointer"
          >
            [ Details &gt;&gt; ]
          </button>
        </div>
      </div>
    </motion.article>
  );
}

/* ===== Project Details Modal ===== */
interface ModalProps {
  project: Project;
  onClose: () => void;
}

function SciFiBlueprintModal({ project, onClose }: ModalProps) {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[95] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/85 backdrop-blur-md"
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: 30 }}
        transition={{ type: 'spring', stiffness: 350, damping: 28 }}
        className="relative w-full max-w-3xl rounded-xl bg-[#050A16] border border-[#00F0FF]/40 shadow-[0_0_50px_rgba(0,240,255,0.25)] overflow-hidden z-10 max-h-[90vh] flex flex-col"
      >
        <div className="hud-bracket-tl" />
        <div className="hud-bracket-tr" />
        <div className="hud-bracket-bl" />
        <div className="hud-bracket-br" />

        <div className="flex items-center justify-between px-6 py-3.5 border-b border-[#00F0FF]/25 bg-[#03060E]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#00F0FF] animate-ping" />
            <span className="text-xs font-mono text-[#00F0FF] font-bold uppercase tracking-widest">
              [ PROJECT ARCHITECTURE &amp; DETAILS ]
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 scanlines">
          <div>
            <h3 className="font-display font-black text-2xl sm:text-3xl text-white">
              {project.title}
            </h3>
            <p className="text-xs font-mono text-[#FF5500] font-bold mt-1">{project.tagline}</p>
          </div>

          <div className="rounded border border-[#00F0FF]/30 overflow-hidden bg-black shadow-xl">
            <img
              src={project.screenshot}
              alt={project.title}
              className="w-full object-cover object-top max-h-72"
            />
          </div>

          <div className="space-y-2">
            <h4 className="text-[11px] font-mono uppercase tracking-widest text-[#00F0FF]">
              // Overview
            </h4>
            <p className="text-xs sm:text-sm font-body text-slate-300 leading-relaxed">
              {project.description}
            </p>
          </div>

          <div className="space-y-2">
            <h4 className="text-[11px] font-mono uppercase tracking-widest text-[#00F0FF]">
              // Key Engineering Decisions
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {project.highlights.map((item, i) => (
                <div key={i} className="p-3 rounded bg-[#071120] border border-[#00F0FF]/20 flex items-start gap-2 font-mono text-xs text-slate-200">
                  <ShieldCheck size={14} className="text-[#00FF9D] flex-shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-[#00F0FF]/20">
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 py-3 bg-[#00F0FF] text-black font-mono font-bold text-xs uppercase tracking-wider transition-all text-center"
            >
              <ExternalLink size={14} />
              <span>Open Live Website</span>
            </a>
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 py-3 bg-[#071120] border border-[#00F0FF]/40 text-[#00F0FF] font-mono font-bold text-xs uppercase tracking-wider transition-all text-center"
            >
              <Github size={14} />
              <span>View Source Code</span>
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
