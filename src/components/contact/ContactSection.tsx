import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Copy, Check, Github, Linkedin, Send } from 'lucide-react';

const EMAIL = 'durganandishar@gmail.com';

export function ContactSection() {
  const headerRef = useRef(null);
  const isInView = useInView(headerRef, { once: true, margin: '0px 0px -60px 0px' });
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // Fallback
      const el = document.createElement('textarea');
      el.value = EMAIL;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }
  };

  return (
    <section id="contact" className="py-20 sm:py-28 px-4 sm:px-6 scroll-mt-24">
      <div className="max-w-5xl mx-auto">
        {/* Section header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ type: 'spring', stiffness: 220, damping: 28 }}
          className="mb-12 sm:mb-16 text-center"
        >
          <span className="text-xs font-mono text-accent uppercase tracking-widest mb-3 block">
            // 04 · Contact &amp; Collaboration
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-5xl lg:text-6xl tracking-display">
            Let's build something.
          </h2>
          <p className="text-sm sm:text-base font-body text-carbon-500 dark:text-carbon-400 mt-3 max-w-md mx-auto leading-relaxed">
            Got a project idea, want to collaborate, or just want to say hi? Reach out.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-start">
          {/* Left: Direct contact */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '0px 0px -60px 0px' }}
            transition={{ type: 'spring', stiffness: 200, damping: 30 }}
            className="space-y-6"
          >
            {/* Email with copy */}
            <div className="space-y-2">
              <p className="text-xs font-mono text-carbon-400 uppercase tracking-widest">Email</p>
              <motion.button
                onClick={copyEmail}
                whileTap={{ scale: 0.97 }}
                className="group flex items-center gap-3 px-4 py-3 bg-carbon-100 dark:bg-carbon-850 border border-carbon-200 dark:border-carbon-750 rounded-xl hover:border-accent transition-colors cursor-pointer w-full text-left"
              >
                <span className="text-xs sm:text-sm font-mono text-carbon-700 dark:text-carbon-200 flex-1 truncate">
                  {EMAIL}
                </span>
                <AnimatePresence mode="wait" initial={false}>
                  {copied ? (
                    <motion.div
                      key="check"
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.5, opacity: 0 }}
                      transition={{ type: 'spring', stiffness: 500, damping: 25 }}
                    >
                      <Check size={16} className="text-green-500" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="copy"
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.5, opacity: 0 }}
                      transition={{ type: 'spring', stiffness: 500, damping: 25 }}
                    >
                      <Copy size={16} className="text-carbon-400 group-hover:text-accent transition-colors" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>

            {/* Social links */}
            <div className="space-y-2">
              <p className="text-xs font-mono text-carbon-400 uppercase tracking-widest">Elsewhere</p>
              <div className="flex flex-col sm:flex-row gap-3">
                <motion.a
                  href="https://www.linkedin.com/in/durganandishar/"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileTap={{ scale: 0.97 }}
                  whileHover={{ scale: 1.02 }}
                  className="flex items-center justify-center sm:justify-start gap-2 px-4 py-3 bg-carbon-100 dark:bg-carbon-850 border border-carbon-200 dark:border-carbon-750 rounded-xl hover:border-accent text-carbon-700 dark:text-carbon-200 hover:text-accent transition-colors flex-1"
                >
                  <Linkedin size={16} />
                  <span className="text-sm font-body font-medium">LinkedIn</span>
                </motion.a>
                <motion.a
                  href="https://github.com/isar-durganand"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileTap={{ scale: 0.97 }}
                  whileHover={{ scale: 1.02 }}
                  className="flex items-center justify-center sm:justify-start gap-2 px-4 py-3 bg-carbon-100 dark:bg-carbon-850 border border-carbon-200 dark:border-carbon-750 rounded-xl hover:border-accent text-carbon-700 dark:text-carbon-200 hover:text-accent transition-colors flex-1"
                >
                  <Github size={16} />
                  <span className="text-sm font-body font-medium">GitHub</span>
                </motion.a>
              </div>
            </div>
          </motion.div>

          {/* Right: Contact form */}
          <motion.form
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '0px 0px -60px 0px' }}
            transition={{ type: 'spring', stiffness: 200, damping: 30, delay: 0.1 }}
            onSubmit={(e) => e.preventDefault()}
            className="space-y-4 sm:space-y-5"
          >
            <FloatingInput id="contact-name" label="Name" type="text" />
            <FloatingInput id="contact-email" label="Email" type="email" />
            <FloatingTextarea id="contact-message" label="Message" />

            <motion.button
              type="submit"
              whileTap={{ scale: 0.97 }}
              className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-accent text-white font-medium font-body text-sm rounded-xl hover:bg-accent-hover transition-colors cursor-pointer"
            >
              <Send size={16} />
              Send Message
            </motion.button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}

/* ===== Floating Label Input ===== */
interface FloatingInputProps {
  id: string;
  label: string;
  type: string;
}

function FloatingInput({ id, label, type }: FloatingInputProps) {
  return (
    <div className="relative">
      <input
        id={id}
        type={type}
        placeholder=" "
        className="peer w-full px-4 pt-5 pb-2 bg-carbon-100 dark:bg-carbon-850 border border-carbon-200 dark:border-carbon-750 rounded-xl text-sm font-body text-carbon-950 dark:text-carbon-50 outline-none focus:border-accent transition-colors placeholder-transparent min-h-[50px]"
      />
      <label
        htmlFor={id}
        className="absolute left-4 top-2 text-[10px] font-mono text-carbon-400 uppercase tracking-wider transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-sm peer-placeholder-shown:font-body peer-placeholder-shown:normal-case peer-placeholder-shown:tracking-normal peer-focus:top-2 peer-focus:text-[10px] peer-focus:font-mono peer-focus:uppercase peer-focus:tracking-wider peer-focus:text-accent"
      >
        {label}
      </label>
    </div>
  );
}

/* ===== Floating Label Textarea ===== */
interface FloatingTextareaProps {
  id: string;
  label: string;
}

function FloatingTextarea({ id, label }: FloatingTextareaProps) {
  return (
    <div className="relative">
      <textarea
        id={id}
        rows={4}
        placeholder=" "
        className="peer w-full px-4 pt-6 pb-2 bg-carbon-100 dark:bg-carbon-850 border border-carbon-200 dark:border-carbon-750 rounded-xl text-sm font-body text-carbon-950 dark:text-carbon-50 outline-none focus:border-accent transition-colors placeholder-transparent resize-none"
      />
      <label
        htmlFor={id}
        className="absolute left-4 top-2.5 text-[10px] font-mono text-carbon-400 uppercase tracking-wider transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-placeholder-shown:font-body peer-placeholder-shown:normal-case peer-placeholder-shown:tracking-normal peer-focus:top-2.5 peer-focus:text-[10px] peer-focus:font-mono peer-focus:uppercase peer-focus:tracking-wider peer-focus:text-accent"
      >
        {label}
      </label>
    </div>
  );
}
