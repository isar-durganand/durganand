import { useState, useRef, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, X } from 'lucide-react';
import { projects } from '../../data/projects';
import type { Project } from '../../types/portfolio';

export function ProjectsSection() {
  const headerRef = useRef(null);
  const isInView = useInView(headerRef, { once: true, margin: '0px 0px -60px 0px' });
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section id="work" className="py-20 sm:py-28 px-4 sm:px-6 scroll-mt-24">
      <div className="max-w-5xl mx-auto">
        {/* Section header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ type: 'spring', stiffness: 220, damping: 28 }}
          className="mb-12 sm:mb-16"
        >
          <span className="text-xs font-mono text-accent uppercase tracking-widest mb-3 block">
            // 01 · Featured Work
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl tracking-display">
            Things I've shipped.
          </h2>
          <p className="text-sm sm:text-base text-carbon-500 dark:text-carbon-400 mt-2 max-w-xl font-body">
            Real products built with real-world users, production architectures, and end-to-end deployment.
          </p>
        </motion.div>

        {/* Project cards */}
        <div className="space-y-14 sm:space-y-20">
          {projects.map((project, i) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={i}
              onSelect={() => setSelectedProject(project)}
            />
          ))}
        </div>
      </div>

      {/* Modal sheet */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}

/* ===== Project Card ===== */
interface ProjectCardProps {
  project: Project;
  index: number;
  onSelect: () => void;
}

function ProjectCard({ project, index, onSelect }: ProjectCardProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '0px 0px -60px 0px' });
  const isEven = index % 2 === 0;

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ type: 'spring', stiffness: 180, damping: 26, delay: 0.1 }}
      className={`grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center ${
        isEven ? '' : 'lg:direction-rtl'
      }`}
    >
      {/* Screenshot in browser frame */}
      <motion.div
        className={`lg:col-span-7 ${isEven ? '' : 'lg:col-start-6 lg:row-start-1'}`}
        data-cursor="View"
        onClick={onSelect}
        whileHover={{ scale: 1.015 }}
        whileTap={{ scale: 0.98 }}
        style={{ cursor: 'pointer' }}
      >
        <div className="browser-frame bg-carbon-100 dark:bg-carbon-850 border border-carbon-200 dark:border-carbon-750 shadow-md">
          {/* Browser chrome bar */}
          <div className="browser-frame-bar bg-carbon-100 dark:bg-carbon-800 border-b border-carbon-200 dark:border-carbon-750">
            <div className="flex gap-1.5">
              <div className="browser-dot bg-red-400/60" />
              <div className="browser-dot bg-yellow-400/60" />
              <div className="browser-dot bg-green-400/60" />
            </div>
            <div className="flex-1 mx-3 sm:mx-4">
              <div className="bg-carbon-200 dark:bg-carbon-700 rounded-md h-5 sm:h-6 flex items-center px-2.5 max-w-[160px] sm:max-w-xs">
                <span className="text-[10px] font-mono text-carbon-500 dark:text-carbon-400 truncate">
                  {project.liveUrl.replace('https://', '').replace('http://', '')}
                </span>
              </div>
            </div>
          </div>
          {/* Screenshot */}
          <div className="overflow-hidden">
            <motion.img
              src={project.screenshot}
              alt={`${project.title} — Live application screenshot`}
              className="w-full object-cover object-top"
              style={{ aspectRatio: '16/10' }}
              loading="lazy"
              whileHover={{ scale: 1.03 }}
              transition={{ type: 'spring', stiffness: 200, damping: 25 }}
            />
          </div>
        </div>
      </motion.div>

      {/* Project info */}
      <div className={`lg:col-span-5 space-y-3 sm:space-y-4 ${isEven ? '' : 'lg:col-start-1 lg:row-start-1'}`}>
        <h3 className="font-display font-bold text-2xl sm:text-3xl tracking-tight">
          {project.title}
        </h3>
        <p className="text-xs sm:text-sm font-body text-accent font-medium">{project.tagline}</p>
        <p className="text-xs sm:text-sm font-body text-carbon-600 dark:text-carbon-300 leading-relaxed">
          {project.description}
        </p>

        {/* Stack tags */}
        <div className="flex flex-wrap gap-1.5 sm:gap-2 pt-1 sm:pt-2">
          {project.stack.map((tech) => (
            <span
              key={tech}
              className="px-2.5 py-1 text-xs font-mono bg-carbon-100 dark:bg-carbon-800 border border-carbon-200 dark:border-carbon-750 rounded-lg text-carbon-600 dark:text-carbon-300"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className="flex flex-wrap items-center gap-3 pt-3 sm:pt-4">
          <motion.a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            whileTap={{ scale: 0.96 }}
            whileHover={{ scale: 1.03 }}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-medium font-body border border-accent bg-accent/10 text-accent rounded-xl hover:bg-accent hover:text-white transition-colors cursor-pointer"
          >
            <ExternalLink size={14} />
            <span>Live Site</span>
          </motion.a>
          <motion.a
            href={project.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            whileTap={{ scale: 0.96 }}
            whileHover={{ scale: 1.03 }}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-medium font-body border border-carbon-200 dark:border-carbon-750 rounded-xl text-carbon-600 dark:text-carbon-300 hover:border-accent hover:text-accent transition-colors cursor-pointer"
          >
            <Github size={14} />
            <span>Source Code</span>
          </motion.a>
          <motion.button
            onClick={onSelect}
            whileTap={{ scale: 0.96 }}
            className="text-xs font-mono text-carbon-400 hover:text-carbon-700 dark:hover:text-carbon-200 transition-colors cursor-pointer ml-auto sm:ml-0"
          >
            Details →
          </motion.button>
        </div>
      </div>
    </motion.article>
  );
}

/* ===== Project Modal (iOS Sheet Style) ===== */
interface ProjectModalProps {
  project: Project;
  onClose: () => void;
}

function ProjectModal({ project, onClose }: ProjectModalProps) {
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
    <>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-carbon-950/75 backdrop-blur-md z-50"
      />

      {/* Sheet */}
      <motion.div
        initial={{ opacity: 0, y: 60, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 40, scale: 0.96 }}
        transition={{ type: 'spring', stiffness: 300, damping: 28 }}
        className="fixed inset-x-3 bottom-3 top-16 sm:inset-x-auto sm:left-1/2 sm:-translate-x-1/2 sm:max-w-2xl sm:w-full z-50 bg-carbon-50 dark:bg-carbon-900 border border-carbon-200 dark:border-carbon-750 rounded-2xl sm:rounded-3xl overflow-y-auto max-h-[88vh] shadow-2xl"
      >
        {/* Close button */}
        <div className="sticky top-0 flex justify-end p-3 sm:p-4 bg-carbon-50/90 dark:bg-carbon-900/90 frosted-surface z-10 border-b border-carbon-200/50 dark:border-carbon-800/50">
          <motion.button
            onClick={onClose}
            whileTap={{ scale: 0.92 }}
            className="p-2 rounded-xl hover:bg-carbon-200 dark:hover:bg-carbon-800 text-carbon-400 hover:text-carbon-950 dark:hover:text-carbon-50 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X size={20} />
          </motion.button>
        </div>

        <div className="px-4 sm:px-8 pb-8 space-y-5 sm:space-y-6">
          {/* Title */}
          <div>
            <h3 className="font-display font-bold text-2xl sm:text-3xl tracking-tight">
              {project.title}
            </h3>
            <p className="text-xs sm:text-sm font-body text-accent font-medium mt-1">{project.tagline}</p>
          </div>

          {/* Screenshot */}
          <div className="browser-frame bg-carbon-100 dark:bg-carbon-850 border border-carbon-200 dark:border-carbon-750 rounded-xl overflow-hidden">
            <div className="browser-frame-bar bg-carbon-100 dark:bg-carbon-800 border-b border-carbon-200 dark:border-carbon-750">
              <div className="flex gap-1.5">
                <div className="browser-dot bg-red-400/60" />
                <div className="browser-dot bg-yellow-400/60" />
                <div className="browser-dot bg-green-400/60" />
              </div>
            </div>
            <img
              src={project.screenshot}
              alt={`${project.title} screenshot`}
              className="w-full"
            />
          </div>

          {/* Description */}
          <p className="text-xs sm:text-sm font-body text-carbon-600 dark:text-carbon-300 leading-relaxed">
            {project.description}
          </p>

          {/* Highlights */}
          <div>
            <h4 className="font-mono font-semibold text-xs mb-3 uppercase tracking-wider text-carbon-400">
              Key highlights
            </h4>
            <ul className="space-y-2">
              {project.highlights.map((h, i) => (
                <li key={i} className="flex items-start gap-2 text-xs sm:text-sm font-body text-carbon-700 dark:text-carbon-200">
                  <span className="text-accent mt-0.5">→</span>
                  {h}
                </li>
              ))}
            </ul>
          </div>

          {/* Stack */}
          <div className="flex flex-wrap gap-2">
            {project.stack.map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-1 text-xs font-mono bg-carbon-100 dark:bg-carbon-800 border border-carbon-200 dark:border-carbon-750 rounded-lg text-carbon-600 dark:text-carbon-300"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Action Links */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <motion.a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileTap={{ scale: 0.96 }}
              className="flex-1 flex items-center justify-center gap-2 py-3 bg-accent text-white font-medium text-sm rounded-xl hover:bg-accent-hover transition-colors text-center"
            >
              <ExternalLink size={16} />
              View Live Application
            </motion.a>
            <motion.a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileTap={{ scale: 0.96 }}
              className="flex-1 flex items-center justify-center gap-2 py-3 border border-carbon-200 dark:border-carbon-700 font-medium text-sm rounded-xl text-carbon-600 dark:text-carbon-300 hover:border-accent hover:text-accent transition-colors text-center"
            >
              <Github size={16} />
              GitHub Repository
            </motion.a>
          </div>
        </div>
      </motion.div>
    </>
  );
}
