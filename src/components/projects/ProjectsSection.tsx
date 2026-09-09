import { useState, useRef, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, X } from 'lucide-react';
import { projects } from '../../data/projects';
import type { Project } from '../../types/portfolio';

export function ProjectsSection() {
  const headerRef = useRef(null);
  const isInView = useInView(headerRef, { once: true, margin: '-20%' });
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section id="work" className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Section header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 30, clipPath: 'inset(0 0 100% 0)' }}
          animate={isInView ? { opacity: 1, y: 0, clipPath: 'inset(0 0 0% 0)' } : {}}
          transition={{ type: 'spring', stiffness: 200, damping: 30 }}
          className="mb-16"
        >
          <span className="text-xs font-mono text-accent uppercase tracking-widest mb-3 block">
            Featured Work
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl tracking-display">
            Things I've shipped.
          </h2>
        </motion.div>

        {/* Project cards */}
        <div className="space-y-16">
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
  const isInView = useInView(ref, { once: true, margin: '-15%' });
  const isEven = index % 2 === 0;

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ type: 'spring', stiffness: 150, damping: 25, delay: 0.1 }}
      className={`grid grid-cols-1 lg:grid-cols-12 gap-8 items-center ${
        isEven ? '' : 'lg:direction-rtl'
      }`}
    >
      {/* Screenshot in browser frame */}
      <motion.div
        className={`lg:col-span-7 ${isEven ? '' : 'lg:col-start-6 lg:row-start-1'}`}
        data-cursor="View"
        onClick={onSelect}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        style={{ cursor: 'pointer' }}
      >
        <div className="browser-frame bg-carbon-100 dark:bg-carbon-850 border border-carbon-150 dark:border-carbon-700">
          {/* Browser chrome bar */}
          <div className="browser-frame-bar bg-carbon-100 dark:bg-carbon-800 border-b border-carbon-150 dark:border-carbon-700">
            <div className="flex gap-1.5">
              <div className="browser-dot bg-red-400/60" />
              <div className="browser-dot bg-yellow-400/60" />
              <div className="browser-dot bg-green-400/60" />
            </div>
            <div className="flex-1 mx-4">
              <div className="bg-carbon-200 dark:bg-carbon-700 rounded-md h-6 flex items-center px-3 max-w-xs">
                <span className="text-[10px] font-mono text-carbon-400 truncate">
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
              whileHover={{ scale: 1.04 }}
              transition={{ type: 'spring', stiffness: 200, damping: 25 }}
            />
          </div>
        </div>
      </motion.div>

      {/* Project info */}
      <div className={`lg:col-span-5 space-y-4 ${isEven ? '' : 'lg:col-start-1 lg:row-start-1'}`}>
        <h3 className="font-display font-bold text-2xl sm:text-3xl tracking-tight">
          {project.title}
        </h3>
        <p className="text-sm font-body text-accent font-medium">{project.tagline}</p>
        <p className="text-sm font-body text-carbon-500 dark:text-carbon-300 leading-relaxed">
          {project.description}
        </p>

        {/* Stack tags */}
        <div className="flex flex-wrap gap-2 pt-2">
          {project.stack.map((tech) => (
            <span
              key={tech}
              className="px-3 py-1 text-xs font-mono bg-carbon-100 dark:bg-carbon-800 border border-carbon-150 dark:border-carbon-700 rounded-lg text-carbon-500 dark:text-carbon-300"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className="flex items-center gap-3 pt-4">
          <motion.a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            whileTap={{ scale: 0.96 }}
            whileHover={{ scale: 1.05 }}
            className="group flex items-center gap-2 px-4 py-2 text-sm font-medium font-body border border-carbon-200 dark:border-carbon-700 rounded-lg text-carbon-600 dark:text-carbon-300 hover:border-accent hover:text-accent transition-colors"
          >
            <ExternalLink size={14} />
            <span className="hidden group-hover:inline transition-all">Live</span>
          </motion.a>
          <motion.a
            href={project.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            whileTap={{ scale: 0.96 }}
            whileHover={{ scale: 1.05 }}
            className="group flex items-center gap-2 px-4 py-2 text-sm font-medium font-body border border-carbon-200 dark:border-carbon-700 rounded-lg text-carbon-600 dark:text-carbon-300 hover:border-accent hover:text-accent transition-colors"
          >
            <Github size={14} />
            <span className="hidden group-hover:inline transition-all">Code</span>
          </motion.a>
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
  // Close on Escape
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
        className="fixed inset-0 z-50 bg-carbon-950/60 backdrop-blur-sm"
      />

      {/* Sheet */}
      <motion.div
        initial={{ opacity: 0, y: 100, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 60, scale: 0.97 }}
        transition={{ type: 'spring', stiffness: 250, damping: 30, mass: 0.9 }}
        className="fixed inset-x-4 bottom-4 top-20 sm:inset-x-auto sm:left-1/2 sm:-translate-x-1/2 sm:max-w-2xl sm:w-full z-50 bg-carbon-50 dark:bg-carbon-900 border border-carbon-150 dark:border-carbon-700 rounded-2xl overflow-y-auto"
      >
        {/* Close button */}
        <div className="sticky top-0 flex justify-end p-4 bg-carbon-50/80 dark:bg-carbon-900/80 frosted-surface z-10">
          <motion.button
            onClick={onClose}
            whileTap={{ scale: 0.96 }}
            className="p-2 rounded-lg hover:bg-carbon-100 dark:hover:bg-carbon-800 text-carbon-400 hover:text-carbon-950 dark:hover:text-carbon-50 transition-colors cursor-pointer"
          >
            <X size={20} />
          </motion.button>
        </div>

        <div className="px-6 pb-8 space-y-6">
          {/* Title */}
          <div>
            <h3 className="font-display font-bold text-2xl sm:text-3xl tracking-tight">
              {project.title}
            </h3>
            <p className="text-sm font-body text-accent font-medium mt-1">{project.tagline}</p>
          </div>

          {/* Screenshot */}
          <div className="browser-frame bg-carbon-100 dark:bg-carbon-850 border border-carbon-150 dark:border-carbon-700">
            <div className="browser-frame-bar bg-carbon-100 dark:bg-carbon-800 border-b border-carbon-150 dark:border-carbon-700">
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
          <p className="text-sm font-body text-carbon-500 dark:text-carbon-300 leading-relaxed">
            {project.description}
          </p>

          {/* Highlights */}
          <div>
            <h4 className="font-display font-semibold text-sm mb-3 uppercase tracking-wider text-carbon-400">
              Key highlights
            </h4>
            <ul className="space-y-2">
              {project.highlights.map((h, i) => (
                <li key={i} className="flex items-start gap-2 text-sm font-body text-carbon-600 dark:text-carbon-300">
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
                className="px-3 py-1 text-xs font-mono bg-carbon-100 dark:bg-carbon-800 border border-carbon-150 dark:border-carbon-700 rounded-lg text-carbon-500 dark:text-carbon-300"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Action Links */}
          <div className="flex gap-3 pt-2">
            <motion.a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileTap={{ scale: 0.96 }}
              className="flex-1 flex items-center justify-center gap-2 py-3 bg-accent text-white font-medium text-sm rounded-xl hover:bg-accent-hover transition-colors"
            >
              <ExternalLink size={16} />
              View Live
            </motion.a>
            <motion.a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileTap={{ scale: 0.96 }}
              className="flex-1 flex items-center justify-center gap-2 py-3 border border-carbon-200 dark:border-carbon-700 font-medium text-sm rounded-xl text-carbon-600 dark:text-carbon-300 hover:border-accent hover:text-accent transition-colors"
            >
              <Github size={16} />
              Source Code
            </motion.a>
          </div>
        </div>
      </motion.div>
    </>
  );
}
