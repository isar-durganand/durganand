import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import {
  Code2,
  Globe,
  Terminal,
  Zap,
  Award,
  CheckCircle2,
  X,
  ArrowUpRight,
  Sparkles,
  Search,
  ExternalLink,
  ShieldCheck,
} from 'lucide-react';
import { skillCategories, credentials } from '../../data/skills';
import type { SkillItem, Credential } from '../../types/portfolio';
import { sound } from '../../utils/audio';
import { SkillLogo } from './SkillLogo';

type FilterTab = 'all' | 'languages' | 'web' | 'tools' | 'honing' | 'credentials';

const SKILL_LABELS: Record<string, string> = {
  'C': 'Systems & Memory',
  'C++': 'STL & Competitive DSA',
  'Python': 'Data & Automation',
  'JavaScript': 'ES6+ & Async Web',
  'TypeScript': 'Strict Typing & Generics',
  'React': 'Hooks & Modern UI',
  'HTML5': 'Semantic Architecture',
  'CSS3': 'Layouts & Animations',
  'Tailwind CSS': 'Utility Tokens',
  'Git': 'Branching & Commits',
  'GitHub': 'Collaboration & CI',
  'Vercel': 'Edge Deployment',
  'Firebase': 'Auth & Cloud DB',
  'Vite': 'Fast Bundling & HMR',
  'Data Structures & Algorithms': 'Core Problem Solving in C++',
  'C++ STL': 'Vectors, Maps, Heaps, Sets',
  'Arrays & Hashing': 'Two Pointers & Sliding Window',
  'Trees & Graphs': 'BFS, DFS & Traversals',
  'Dynamic Programming': 'Memoization & State Optimization',
};

export function SkillsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '0px 0px -80px 0px' });

  const [activeTab, setActiveTab] = useState<FilterTab>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSkill, setSelectedSkill] = useState<SkillItem | null>(null);
  const [activeCredential, setActiveCredential] = useState<Credential | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveCredential(null);
        setSelectedSkill(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const filterTabs: { id: FilterTab; label: string }[] = [
    { id: 'all', label: 'All Skills' },
    { id: 'languages', label: 'Languages' },
    { id: 'web', label: 'Web Technologies' },
    { id: 'tools', label: 'Tools & Platforms' },
    { id: 'honing', label: 'C++ & Algorithms' },
    { id: 'credentials', label: 'Google AI Certifications' },
  ];

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'code':
        return <Code2 size={18} className="text-[#00F0FF]" />;
      case 'globe':
        return <Globe size={18} className="text-[#00FF9D]" />;
      case 'terminal':
        return <Terminal size={18} className="text-amber-400" />;
      case 'zap':
        return <Zap size={18} className="text-[#FF5500]" />;
      default:
        return <Code2 size={18} className="text-[#00F0FF]" />;
    }
  };

  const filteredCategories = skillCategories
    .map((cat) => {
      if (activeTab !== 'all' && activeTab !== cat.id) return null;

      const filteredItems = cat.items.filter((item) => {
        if (!searchQuery) return true;
        const q = searchQuery.toLowerCase().trim();
        return (
          item.name.toLowerCase().includes(q) ||
          item.context.toLowerCase().includes(q) ||
          (item.project && item.project.toLowerCase().includes(q))
        );
      });

      if (filteredItems.length === 0 && searchQuery) return null;

      return {
        ...cat,
        items: filteredItems,
      };
    })
    .filter(Boolean) as typeof skillCategories;

  const showCredentials =
    (activeTab === 'all' || activeTab === 'credentials') &&
    (!searchQuery || 'google ai machine learning fundamentals cert'.includes(searchQuery.toLowerCase()));

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="py-20 sm:py-32 px-4 sm:px-6 scroll-mt-24 relative"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ type: 'spring', stiffness: 240, damping: 28 }}
          className="mb-8 sm:mb-12"
        >
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-[#00F0FF] shadow-[0_0_8px_#00F0FF]" />
            <span className="text-xs font-mono text-[#00F0FF] uppercase tracking-widest font-bold">
              // 03 &middot; Skills &amp; Capabilities
            </span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6">
            <div>
              <h2 className="font-display font-black text-3xl sm:text-5xl lg:text-6xl tracking-tight-display text-white">
                Technical Stack.
              </h2>
              <p className="mt-2 text-xs sm:text-sm md:text-base text-slate-300 font-body max-w-2xl leading-relaxed">
                Official tools, languages, and technologies with verified brand logos and engineering contexts.
              </p>
            </div>

            {/* Real-time Search Input */}
            <div className="relative w-full md:w-80">
              <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#00F0FF]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  sound.playTelemetry(2200);
                }}
                placeholder="Search skills (e.g. C++, React, Python)..."
                className="w-full pl-9 pr-4 py-2.5 rounded bg-[#03060E] border border-[#00F0FF]/30 text-xs font-mono text-[#00F0FF] placeholder-slate-600 focus:outline-none focus:border-[#00F0FF] focus:shadow-[0_0_15px_rgba(0,240,255,0.3)] transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white cursor-pointer"
                >
                  <X size={14} />
                </button>
              )}
            </div>
          </div>
        </motion.div>

        {/* Filter Navigation Tabs (Mobile touch-friendly horizontal scroll) */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ type: 'spring', stiffness: 280, damping: 28, delay: 0.08 }}
          className="flex items-center gap-2 overflow-x-auto pb-3 mb-8 sm:mb-10 no-scrollbar touch-pan-x -mx-4 px-4 sm:mx-0 sm:px-0"
        >
          {filterTabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  sound.playTelemetry(1900);
                  setActiveTab(tab.id);
                }}
                className={`relative px-3.5 sm:px-4 py-2 rounded-xl font-mono text-xs whitespace-nowrap transition-all duration-150 cursor-pointer flex-shrink-0 ${
                  isActive
                    ? 'bg-[#00F0FF]/20 text-[#00F0FF] font-bold border border-[#00F0FF]/50 shadow-[0_0_12px_rgba(0,240,255,0.25)]'
                    : 'bg-[#050A16] border border-[#00F0FF]/15 text-slate-400 hover:text-white hover:border-[#00F0FF]/30'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </motion.div>

        {/* Skills Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-8 mb-12 sm:mb-14">
          {filteredCategories.map((cat) => (
            <motion.div
              key={cat.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="cyber-card p-5 sm:p-7 flex flex-col justify-between"
            >
              <div className="hud-bracket-tl" />
              <div className="hud-bracket-tr" />
              <div className="hud-bracket-bl" />
              <div className="hud-bracket-br" />

              <div>
                {/* Category Header */}
                <div className="flex items-center justify-between mb-4 sm:mb-5 pb-3 border-b border-[#00F0FF]/20">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded bg-[#03060E] border border-[#00F0FF]/30 flex-shrink-0">
                      {getCategoryIcon(cat.iconName)}
                    </div>
                    <div>
                      <h3 className="font-mono font-bold text-sm sm:text-base text-white tracking-wider">
                        // {cat.label}
                      </h3>
                      <p className="text-[11px] font-body text-slate-400">
                        {cat.description}
                      </p>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono text-[#00F0FF] px-2 py-0.5 rounded bg-[#00F0FF]/10 border border-[#00F0FF]/30 flex-shrink-0">
                    {cat.items.length} skills
                  </span>
                </div>

                {/* Enhanced Skill Cards without Percentage Bars */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  {cat.items.map((skill) => {
                    const label = SKILL_LABELS[skill.name] || 'Engineering Stack';
                    const isSelected = selectedSkill?.name === skill.name;

                    return (
                      <div
                        key={skill.name}
                        onClick={() => {
                          sound.playClick();
                          setSelectedSkill(isSelected ? null : skill);
                        }}
                        className={`p-3 sm:p-3.5 rounded-xl border transition-all duration-200 cursor-pointer flex flex-col justify-between group ${
                          isSelected
                            ? 'bg-[#00F0FF]/15 border-[#00F0FF] shadow-[0_0_15px_rgba(0,240,255,0.3)]'
                            : 'bg-[#040813] border-[#00F0FF]/15 hover:border-[#00F0FF]/50 hover:bg-[#071122]'
                        }`}
                      >
                        <div>
                          {/* Logo + Name + Status */}
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2.5 min-w-0">
                              {/* Real Logo Container */}
                              <div className="w-8 h-8 rounded-lg bg-[#02050B] border border-white/10 flex items-center justify-center p-1.5 flex-shrink-0 shadow-inner group-hover:border-[#00F0FF]/40 transition-colors">
                                <SkillLogo name={skill.name} className="w-5 h-5" />
                              </div>

                              <div className="min-w-0">
                                <span className="font-mono text-xs font-bold text-white block truncate">
                                  {skill.name}
                                </span>
                                <span className="text-[10px] font-mono text-slate-400 block truncate">
                                  {label}
                                </span>
                              </div>
                            </div>

                            {skill.highlight && (
                              <span className="text-[9px] font-mono uppercase px-1.5 py-0.5 rounded bg-[#FF5500]/20 text-[#FF5500] font-bold border border-[#FF5500]/40 flex-shrink-0 ml-1">
                                Core
                              </span>
                            )}
                          </div>

                          <p className="text-[11px] font-body text-slate-300 line-clamp-2 leading-relaxed mt-1">
                            {skill.context}
                          </p>
                        </div>

                        {/* Project Badge */}
                        {skill.project && (
                          <div className="flex items-center justify-between pt-2 mt-2.5 border-t border-slate-800/60 text-[10px] font-mono">
                            <span className="text-slate-500">Applied in:</span>
                            <span className="text-[#00F0FF] font-semibold flex items-center gap-0.5 truncate max-w-[140px]">
                              {skill.project}
                              <ArrowUpRight size={10} className="flex-shrink-0" />
                            </span>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Google Cloud AI Certifications */}
        {showCredentials && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 220, damping: 28 }}
            className="space-y-6 pt-2"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#02050B] border border-white/10 flex items-center justify-center p-1.5 shadow-inner flex-shrink-0">
                <SkillLogo name="Google" className="w-5 h-5" />
              </div>
              <h3 className="font-mono font-bold text-lg sm:text-2xl text-white tracking-wider">
                // Google Cloud AI Certifications
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
              {credentials.map((cert) => (
                <div
                  key={cert.id}
                  onClick={() => {
                    sound.playPowerUp();
                    setActiveCredential(cert);
                  }}
                  className="holo-card p-5 sm:p-7 cyber-card cursor-pointer hover:border-[#00FF9D] transition-all duration-300 group"
                >
                  <div className="hud-bracket-tl" />
                  <div className="hud-bracket-tr" />
                  <div className="hud-bracket-bl" />
                  <div className="hud-bracket-br" />

                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-[#03060E] border border-[#00FF9D]/40 flex items-center justify-center p-2 shadow-[0_0_12px_rgba(0,255,157,0.25)] flex-shrink-0">
                      <SkillLogo name="Google" className="w-6 h-6" />
                    </div>
                    <div className="flex items-center gap-1 px-2.5 py-0.5 rounded bg-[#00FF9D]/10 border border-[#00FF9D]/30 text-[#00FF9D] text-[10px] font-mono font-bold">
                      <ShieldCheck size={12} />
                      <span>Verified Google Certificate</span>
                    </div>
                  </div>

                  <h4 className="font-mono font-bold text-base sm:text-lg text-white group-hover:text-[#00FF9D] transition-colors">
                    {cert.title}
                  </h4>
                  <p className="text-[11px] font-mono text-[#00F0FF] mt-0.5">
                    {cert.organization} &middot; Issued {cert.date}
                  </p>

                  <p className="text-xs font-body text-slate-300 mt-2.5 leading-relaxed">
                    {cert.summary}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mt-4 pt-3 border-t border-[#00F0FF]/15">
                    {cert.topics.slice(0, 2).map((t, idx) => (
                      <span key={idx} className="px-2 py-0.5 text-[10px] font-mono rounded bg-[#03060E] text-[#00F0FF] border border-[#00F0FF]/25">
                        {t}
                      </span>
                    ))}
                    {cert.topics.length > 2 && (
                      <span className="px-2 py-0.5 text-[10px] font-mono text-[#FF5500]">
                        +{cert.topics.length - 2} more topics
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>

      {/* Credential Details Modal */}
      <AnimatePresence>
        {activeCredential && (
          <div className="fixed inset-0 z-[95] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveCredential(null)}
              className="fixed inset-0 bg-black/85 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', stiffness: 350, damping: 28 }}
              className="relative w-full max-w-lg cyber-card p-5 sm:p-8 z-10 space-y-4 sm:space-y-5 max-h-[90vh] overflow-y-auto"
            >
              <div className="hud-bracket-tl" />
              <div className="hud-bracket-tr" />
              <div className="hud-bracket-bl" />
              <div className="hud-bracket-br" />

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded bg-[#02050B] border border-white/10 flex items-center justify-center p-1 flex-shrink-0">
                    <SkillLogo name="Google" className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-mono text-[#00FF9D] uppercase tracking-wider font-bold">
                    // {activeCredential.badge}
                  </span>
                </div>
                <button
                  onClick={() => setActiveCredential(null)}
                  className="p-1 rounded text-slate-400 hover:text-white cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>

              <div>
                <h3 className="font-mono font-bold text-lg sm:text-xl text-white">
                  {activeCredential.title}
                </h3>
                <p className="text-xs font-mono text-[#00F0FF] mt-1">
                  Issued by {activeCredential.organization} &middot; {activeCredential.date}
                </p>
              </div>

              <p className="text-xs sm:text-sm font-body text-slate-300 leading-relaxed">
                {activeCredential.summary}
              </p>

              <div>
                <h4 className="text-[11px] font-mono uppercase tracking-widest text-[#00F0FF] mb-2">
                  // Key Curriculum Areas Covered
                </h4>
                <ul className="space-y-2">
                  {activeCredential.topics.map((topic, i) => (
                    <li key={i} className="flex items-center gap-2 text-xs font-mono text-slate-200">
                      <CheckCircle2 size={13} className="text-[#00FF9D] flex-shrink-0" />
                      <span>{topic}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-3 border-t border-[#00F0FF]/20 flex justify-end">
                <button
                  onClick={() => setActiveCredential(null)}
                  className="cyber-btn px-4 py-2 bg-[#00F0FF] text-black font-mono font-bold text-xs uppercase cursor-pointer"
                >
                  Close Details
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
