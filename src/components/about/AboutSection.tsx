import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { MapPin, BookOpen, Zap } from 'lucide-react';
import { timeline } from '../../data/timeline';

export function AboutSection() {
  const headerRef = useRef(null);
  const isInView = useInView(headerRef, { once: true, margin: '0px 0px -60px 0px' });

  return (
    <section id="about" className="py-20 sm:py-28 px-4 sm:px-6 scroll-mt-24">
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
            // 02 · Background &amp; Focus
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl tracking-display">
            A bit about me.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
          {/* Bio */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '0px 0px -60px 0px' }}
            transition={{ type: 'spring', stiffness: 200, damping: 30 }}
            className="lg:col-span-7 space-y-4 sm:space-y-5"
          >
            <p className="text-sm sm:text-base font-body text-carbon-600 dark:text-carbon-300 leading-relaxed">
              I'm a first-year BTech Computer Science student at Manav Rachna International Institute of Research and Studies (MRIIRS) in Faridabad. I build and ship real products — not just tutorials — using React, TypeScript, Python, and Firebase.
            </p>
            <p className="text-sm sm:text-base font-body text-carbon-600 dark:text-carbon-300 leading-relaxed">
              Even though I already know my way around full-stack web development, I'm going back to fundamentals. Right now that means learning C/C++ and Data Structures &amp; Algorithms from the ground up. I believe skipping foundations is how people hit walls later, so I'd rather build properly from first principles.
            </p>
            <p className="text-sm sm:text-base font-body text-carbon-600 dark:text-carbon-300 leading-relaxed">
              I work with Git, GitHub, Vercel, and modern developer tooling daily. My long-term goal is a software engineering or AI role at a company where the engineering bar is high, competing in hackathons and shipping impactful software along the way.
            </p>

            {/* Currently strip */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', stiffness: 300, damping: 30, delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-3 pt-3"
            >
              <div className="flex-1 flex items-center gap-3 px-4 py-3 bg-carbon-100/70 dark:bg-carbon-850 border border-carbon-200 dark:border-carbon-750 rounded-xl">
                <BookOpen size={16} className="text-accent flex-shrink-0" />
                <div>
                  <p className="text-[10px] font-mono text-carbon-400 uppercase tracking-wider">Currently learning</p>
                  <p className="text-xs sm:text-sm font-body font-medium text-carbon-800 dark:text-carbon-200">DSA in C++ — structured study</p>
                </div>
              </div>
              <div className="flex-1 flex items-center gap-3 px-4 py-3 bg-carbon-100/70 dark:bg-carbon-850 border border-carbon-200 dark:border-carbon-750 rounded-xl">
                <MapPin size={16} className="text-accent flex-shrink-0" />
                <div>
                  <p className="text-[10px] font-mono text-carbon-400 uppercase tracking-wider">Based in</p>
                  <p className="text-xs sm:text-sm font-body font-medium text-carbon-800 dark:text-carbon-200">Faridabad, India</p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Timeline */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '0px 0px -60px 0px' }}
            transition={{ type: 'spring', stiffness: 200, damping: 30, delay: 0.15 }}
            className="lg:col-span-5 pt-4 lg:pt-0"
          >
            <h3 className="text-xs font-mono text-carbon-400 uppercase tracking-widest mb-6 flex items-center gap-2">
              <Zap size={13} className="text-accent" />
              Journey so far
            </h3>

            <div className="relative pl-6 sm:pl-7 border-l border-carbon-200 dark:border-carbon-750 space-y-7 ml-2 sm:ml-0">
              {timeline.map((entry, i) => (
                <motion.div
                  key={entry.year}
                  initial={{ opacity: 0, x: -15 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    type: 'spring',
                    stiffness: 300,
                    damping: 30,
                    delay: 0.08 * i,
                  }}
                  className="relative"
                >
                  {/* Dot on the line */}
                  <div className={`absolute -left-[31px] sm:-left-[35px] top-1 w-3.5 h-3.5 rounded-full border-2 ${
                    i === timeline.length - 1
                      ? 'border-accent bg-accent/20'
                      : 'border-carbon-300 dark:border-carbon-600 bg-carbon-50 dark:bg-carbon-900'
                  }`} />

                  <span className="text-xs font-mono text-accent font-semibold">
                    {entry.year}
                  </span>
                  <h4 className="font-display font-semibold text-sm sm:text-base mt-0.5 text-carbon-950 dark:text-carbon-50">
                    {entry.label}
                  </h4>
                  <p className="text-xs sm:text-sm font-body text-carbon-500 dark:text-carbon-400 mt-0.5 leading-relaxed">
                    {entry.detail}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
