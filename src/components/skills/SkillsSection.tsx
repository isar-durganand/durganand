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
  Check,
  Sparkles,
} from 'lucide-react';
import { skillCategories, credentials } from '../../data/skills';
import type { SkillItem, Credential } from '../../types/portfolio';

type FilterTab = 'all' | 'languages' | 'web' | 'tools' | 'honing' | 'credentials';

export function SkillsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '0px 0px -80px 0px' });

  const [activeTab, setActiveTab] = useState<FilterTab>('all');
  const [selectedSkill, setSelectedSkill] = useState<SkillItem | null>(null);
  const [activeCredential, setActiveCredential] = useState<Credential | null>(null);

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveCredential(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const filterTabs: { id: FilterTab; label: string }[] = [
    { id: 'all', label: 'All Disciplines' },
    { id: 'languages', label: 'Languages' },
    { id: 'web', label: 'Web Technologies' },
    { id: 'tools', label: 'Tools & Platforms' },
    { id: 'honing', label: 'Algorithms & Focus' },
    { id: 'credentials', label: 'Certifications' },
  ];

  const visibleCategories = skillCategories.filter((cat) => {
    if (activeTab === 'all') return true;
    if (activeTab === 'credentials') return false;
    return cat.id === activeTab;
  });

  const showCredentials = activeTab === 'all' || activeTab === 'credentials';

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'code':
        return <Code2 size={18} className="text-carbon-700 dark:text-carbon-300" />;
      case 'globe':
        return <Globe size={18} className="text-carbon-700 dark:text-carbon-300" />;
      case 'terminal':
        return <Terminal size={18} className="text-carbon-700 dark:text-carbon-300" />;
      case 'zap':
        return <Zap size={18} className="text-accent" />;
      default:
        return <Code2 size={18} />;
    }
  };

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="py-20 sm:py-32 px-4 sm:px-6 scroll-mt-24 relative"
    >
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ type: 'spring', stiffness: 240, damping: 28 }}
          className="mb-8 sm:mb-12"
        >
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-accent" />
            <span className="text-xs font-mono text-accent uppercase tracking-widest">
              Technical Stack &amp; Competencies
            </span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6">
            <div>
              <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl tracking-display text-carbon-950 dark:text-carbon-50">
                Tools I ship with.
              </h2>
              <p className="mt-2 sm:mt-3 text-xs sm:text-sm md:text-base text-carbon-600 dark:text-carbon-400 font-body max-w-2xl leading-relaxed">
                Core programming languages, modern web engineering primitives, developer tooling, and active algorithmic discipline in C++.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Filter Navigation Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ type: 'spring', stiffness: 280, damping: 28, delay: 0.08 }}
          className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-3 mb-8 sm:mb-10 no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0"
        >
          {filterTabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <motion.button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  if (selectedSkill && tab.id !== 'all') {
                    const currentCat = skillCategories.find((c) => c.id === tab.id);
                    if (!currentCat?.items.some((item) => item.name === selectedSkill.name)) {
                      setSelectedSkill(null);
                    }
                  }
                }}
                whileTap={{ scale: 0.96 }}
                className={`relative px-4 py-2 rounded-xl text-xs font-mono whitespace-nowrap transition-colors duration-150 cursor-pointer ${
                  isActive
                    ? 'text-carbon-950 dark:text-carbon-50 font-semibold'
                    : 'text-carbon-500 dark:text-carbon-400 hover:text-carbon-800 dark:hover:text-carbon-200'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="active-skills-filter-pill"
                    className="absolute inset-0 rounded-xl bg-carbon-200 dark:bg-carbon-800 border border-carbon-300 dark:border-carbon-700 -z-10 shadow-sm"
                    transition={{ type: 'spring', stiffness: 420, damping: 30 }}
                  />
                )}
                {tab.label}
              </motion.button>
            );
          })}
        </motion.div>

        {/* Categories Grid (2x2 Balanced Layout with Generous Gaps) */}
        <AnimatePresence mode="wait">
          {visibleCategories.length > 0 && (
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ type: 'spring', stiffness: 320, damping: 28 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-7 mb-8"
            >
              {visibleCategories.map((category, catIndex) => {
                const isHoning = category.accent;

                return (
                  <motion.div
                    key={category.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      type: 'spring',
                      stiffness: 300,
                      damping: 28,
                      delay: catIndex * 0.08,
                    }}
                    whileHover={{ y: -4 }}
                    className={`relative flex flex-col justify-between rounded-2xl p-5 sm:p-7 transition-all duration-300 border ${
                      isHoning
                        ? 'bg-carbon-100/50 dark:bg-carbon-900/60 border-accent/40 shadow-sm'
                        : 'bg-carbon-100/50 dark:bg-carbon-900/60 border-carbon-200 dark:border-carbon-800 hover:border-carbon-350 dark:hover:border-carbon-700'
                    }`}
                  >
                    <div>
                      {/* Card Header */}
                      <div className="flex items-center justify-between gap-4 mb-2">
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-9 h-9 rounded-xl flex items-center justify-center border ${
                              isHoning
                                ? 'bg-accent/10 border-accent/30'
                                : 'bg-carbon-200 dark:bg-carbon-800 border-carbon-300 dark:border-carbon-700'
                            }`}
                          >
                            {getCategoryIcon(category.iconName)}
                          </div>
                          <div>
                            <h3 className="font-display font-semibold text-lg text-carbon-950 dark:text-carbon-50 leading-tight">
                              {category.label}
                            </h3>
                          </div>
                        </div>

                        {/* Top Right Status Badge */}
                        {isHoning ? (
                          <span className="inline-flex items-center gap-1.5 text-xs font-mono px-3 py-1 rounded-full bg-accent/10 border border-accent/30 text-accent font-medium">
                            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                            Active Focus
                          </span>
                        ) : (
                          <span className="text-xs font-mono px-3 py-1 rounded-full bg-carbon-200 dark:bg-carbon-800 border border-carbon-250 dark:border-carbon-700 text-carbon-500 dark:text-carbon-400">
                            {category.items.length} tools
                          </span>
                        )}
                      </div>

                      {/* Card Description */}
                      <p className="text-xs font-body text-carbon-500 dark:text-carbon-400 leading-relaxed mb-6 mt-2">
                        {category.description}
                      </p>

                      {/* Hairline Divider */}
                      <div className="border-t border-carbon-200 dark:border-carbon-800 mb-6" />

                      {/* Skill Chips */}
                      <div className="flex flex-wrap gap-2.5">
                        {category.items.map((skill, skillIdx) => {
                          const isSelected = selectedSkill?.name === skill.name;

                          return (
                            <motion.button
                              key={skill.name}
                              onClick={() => {
                                setSelectedSkill(isSelected ? null : skill);
                              }}
                              initial={{ opacity: 0, scale: 0.9, y: 6 }}
                              animate={{ opacity: 1, scale: 1, y: 0 }}
                              transition={{
                                type: 'spring',
                                stiffness: 400,
                                damping: 24,
                                delay: catIndex * 0.05 + skillIdx * 0.03,
                              }}
                              whileHover={{ y: -2, scale: 1.02 }}
                              whileTap={{ scale: 0.96 }}
                              className={`group/chip relative px-3 py-1.5 sm:px-3.5 sm:py-2 text-xs font-mono rounded-lg border transition-all duration-150 cursor-pointer flex items-center gap-2 ${
                                isSelected
                                  ? 'bg-accent text-white border-accent shadow-sm'
                                  : isHoning
                                  ? 'bg-carbon-50 dark:bg-carbon-850 border-accent/30 text-carbon-800 dark:text-carbon-100 hover:border-accent hover:text-accent'
                                  : 'bg-carbon-50 dark:bg-carbon-850 border-carbon-200 dark:border-carbon-750 text-carbon-700 dark:text-carbon-200 hover:border-carbon-400 dark:hover:border-carbon-500 hover:text-carbon-950 dark:hover:text-carbon-50'
                              }`}
                            >
                              <span
                                className={`w-1.5 h-1.5 rounded-full transition-colors ${
                                  isSelected
                                    ? 'bg-white'
                                    : isHoning
                                    ? 'bg-accent'
                                    : 'bg-carbon-400 dark:bg-carbon-500 group-hover/chip:bg-accent'
                                }`}
                              />
                              <span>{skill.name}</span>
                            </motion.button>
                          );
                        })}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Interactive Skill Inspector Panel */}
        <AnimatePresence>
          {selectedSkill && (
            <motion.div
              initial={{ opacity: 0, y: 15, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 350, damping: 28 }}
              className="mb-10 p-6 sm:p-7 rounded-2xl bg-carbon-100 dark:bg-carbon-900 border border-accent/40 shadow-sm relative overflow-hidden"
            >
              {/* Left hairline accent bar */}
              <div className="absolute top-0 left-0 bottom-0 w-1 bg-accent" />

              <div className="flex items-start justify-between gap-6">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Sparkles size={13} className="text-accent" />
                    <span className="text-xs font-mono text-accent uppercase tracking-widest font-semibold">
                      Skill Context & Application
                    </span>
                  </div>

                  <h4 className="font-display font-bold text-2xl text-carbon-950 dark:text-carbon-50">
                    {selectedSkill.name}
                  </h4>

                  <p className="text-sm font-body text-carbon-700 dark:text-carbon-300 max-w-2xl leading-relaxed">
                    {selectedSkill.context}
                  </p>

                  {/* If linked to real project */}
                  {selectedSkill.project && selectedSkill.projectUrl && (
                    <div className="pt-2 flex items-center gap-3">
                      <span className="text-xs font-mono text-carbon-500 dark:text-carbon-400">
                        Shipped in:
                      </span>
                      <motion.a
                        href={selectedSkill.projectUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.03, x: 2 }}
                        whileTap={{ scale: 0.96 }}
                        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-mono bg-accent/10 border border-accent/30 text-accent font-medium hover:bg-accent/20 transition-colors"
                      >
                        {selectedSkill.project}
                        <ArrowUpRight size={13} />
                      </motion.a>
                    </div>
                  )}
                </div>

                {/* Close Button */}
                <motion.button
                  onClick={() => setSelectedSkill(null)}
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-2 rounded-xl text-carbon-400 hover:text-carbon-700 dark:hover:text-carbon-200 hover:bg-carbon-200 dark:hover:bg-carbon-800 transition-colors cursor-pointer flex-shrink-0"
                  aria-label="Close inspector"
                >
                  <X size={18} />
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Credentials Section */}
        {showCredentials && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 280, damping: 28 }}
            className="mt-16 pt-12 border-t border-carbon-150 dark:border-carbon-800"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-7">
              <div>
                <h3 className="text-xs font-mono text-accent uppercase tracking-widest flex items-center gap-2 mb-1">
                  <Award size={14} className="text-accent" />
                  Verified Certifications
                </h3>
                <p className="text-sm font-body text-carbon-600 dark:text-carbon-400">
                  Official Google Career Certificates demonstrating artificial intelligence competencies.
                </p>
              </div>

              <span className="text-xs font-mono text-carbon-600 dark:text-carbon-300 px-3 py-1 rounded-full bg-carbon-100 dark:bg-carbon-850 border border-carbon-200 dark:border-carbon-700 self-start sm:self-auto">
                2 Official Credentials
              </span>
            </div>

            {/* Credential Cards (2-Column Harmonized Grid) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
              {credentials.map((cred, credIdx) => (
                <motion.div
                  key={cred.id}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    type: 'spring',
                    stiffness: 300,
                    damping: 26,
                    delay: credIdx * 0.08,
                  }}
                  whileHover={{ y: -4 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setActiveCredential(cred)}
                  className="group flex flex-col justify-between p-5 sm:p-7 rounded-2xl bg-carbon-100/50 dark:bg-carbon-900/60 border border-carbon-200 dark:border-carbon-800 hover:border-accent/40 dark:hover:border-accent/50 transition-all duration-300 cursor-pointer shadow-sm"
                >
                  <div>
                    <div className="flex items-start justify-between gap-3 mb-4">
                      <div className="flex items-center gap-3.5">
                        <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/30 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                          <Award size={20} className="text-accent" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-mono text-accent font-semibold uppercase">
                              {cred.issuer}
                            </span>
                            <span className="text-carbon-300 dark:text-carbon-600">·</span>
                            <span className="text-xs font-mono text-carbon-500 dark:text-carbon-400">
                              {cred.date}
                            </span>
                          </div>
                          <h4 className="font-display font-semibold text-lg text-carbon-950 dark:text-carbon-50 group-hover:text-accent transition-colors">
                            {cred.title}
                          </h4>
                        </div>
                      </div>

                      <span className="inline-flex items-center gap-1 text-xs font-mono px-2.5 py-0.5 rounded-full bg-carbon-200 dark:bg-carbon-800 text-carbon-600 dark:text-carbon-300 border border-carbon-300 dark:border-carbon-700">
                        <CheckCircle2 size={11} className="text-accent" />
                        Verified
                      </span>
                    </div>

                    <p className="text-xs font-body text-carbon-600 dark:text-carbon-400 leading-relaxed mb-5">
                      {cred.summary}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {cred.topics.slice(0, 3).map((topic) => (
                        <span
                          key={topic}
                          className="text-xs font-mono px-2.5 py-1 rounded-md bg-carbon-50 dark:bg-carbon-850 text-carbon-600 dark:text-carbon-300 border border-carbon-200 dark:border-carbon-750"
                        >
                          {topic}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-carbon-200 dark:border-carbon-800 text-xs font-mono text-carbon-500 dark:text-carbon-400 group-hover:text-accent transition-colors">
                    <span>View syllabus & details</span>
                    <span className="transform group-hover:translate-x-1 transition-transform">
                      →
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Credential Details Modal Sheet */}
        <AnimatePresence>
          {activeCredential && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
              {/* Frosted Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setActiveCredential(null)}
                className="fixed inset-0 bg-carbon-950/75 backdrop-blur-md"
              />

              {/* Modal Card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 25 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 25 }}
                transition={{ type: 'spring', stiffness: 340, damping: 28 }}
                className="relative w-full max-w-lg rounded-3xl bg-carbon-50 dark:bg-carbon-900 border border-carbon-200 dark:border-carbon-750 p-7 sm:p-8 shadow-2xl z-10 overflow-hidden"
              >
                <div className="absolute top-0 left-0 right-0 h-1 bg-accent" />

                {/* Close Button */}
                <motion.button
                  onClick={() => setActiveCredential(null)}
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  className="absolute top-5 right-5 p-2 rounded-xl text-carbon-400 hover:text-carbon-800 dark:hover:text-carbon-200 hover:bg-carbon-200 dark:hover:bg-carbon-800 transition-colors cursor-pointer"
                  aria-label="Close modal"
                >
                  <X size={18} />
                </motion.button>

                {/* Modal Header */}
                <div className="flex items-center gap-3.5 mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-accent/15 border border-accent/30 flex items-center justify-center flex-shrink-0">
                    <Award size={24} className="text-accent" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono text-accent font-semibold uppercase">
                        {activeCredential.issuer}
                      </span>
                      <span className="text-carbon-300 dark:text-carbon-600">·</span>
                      <span className="text-xs font-mono text-carbon-400">
                        {activeCredential.date}
                      </span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-display font-bold text-carbon-950 dark:text-carbon-50">
                      {activeCredential.title}
                    </h3>
                  </div>
                </div>

                {/* Organization Strip */}
                <div className="mb-6 p-3.5 rounded-xl bg-carbon-100 dark:bg-carbon-850 border border-carbon-200 dark:border-carbon-800 flex items-center justify-between text-xs font-mono">
                  <span className="text-carbon-600 dark:text-carbon-300 flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-accent" />
                    Issued by: {activeCredential.organization}
                  </span>
                  <span className="text-accent font-medium">Verified</span>
                </div>

                {/* Summary */}
                <p className="text-sm font-body text-carbon-700 dark:text-carbon-300 leading-relaxed mb-6">
                  {activeCredential.summary}
                </p>

                {/* Topics Covered */}
                <div className="mb-6">
                  <h4 className="text-xs font-mono text-carbon-400 dark:text-carbon-500 uppercase tracking-widest mb-3">
                    Curriculum & Core Competencies:
                  </h4>
                  <div className="space-y-2">
                    {activeCredential.topics.map((topic) => (
                      <div
                        key={topic}
                        className="flex items-start gap-2.5 p-3 rounded-xl bg-carbon-100/60 dark:bg-carbon-850/60 border border-carbon-200/80 dark:border-carbon-800/80 text-xs font-body text-carbon-800 dark:text-carbon-200"
                      >
                        <Check size={14} className="text-accent flex-shrink-0 mt-0.5" />
                        <span>{topic}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action */}
                <div className="flex items-center justify-end pt-4 border-t border-carbon-200 dark:border-carbon-800">
                  <motion.button
                    onClick={() => setActiveCredential(null)}
                    whileTap={{ scale: 0.96 }}
                    className="px-5 py-2.5 rounded-xl text-xs font-mono bg-carbon-200 dark:bg-carbon-800 text-carbon-800 dark:text-carbon-200 hover:bg-carbon-300 dark:hover:bg-carbon-700 transition-colors cursor-pointer"
                  >
                    Close Sheet
                  </motion.button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
