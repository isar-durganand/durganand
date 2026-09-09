import { useState, useEffect } from 'react';
import { Github, Linkedin } from 'lucide-react';
import { motion } from 'framer-motion';

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

  return (
    <footer className="border-t border-carbon-150 dark:border-carbon-700 py-8 px-6">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Left: credit */}
        <p className="text-xs font-mono text-carbon-400">
          &copy; {new Date().getFullYear()} Durganand Ishar
        </p>

        {/* Center: status */}
        <div className="flex items-center gap-2 text-xs font-mono text-carbon-400">
          <motion.span
            className="inline-block w-2 h-2 rounded-full bg-green-500"
            animate={{ opacity: [1, 0.5, 1], scale: [1, 1.15, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />
          Active &amp; Building · {time} IST
        </div>

        {/* Right: social links */}
        <div className="flex items-center gap-3">
          <motion.a
            href="https://github.com/isar-durganand"
            target="_blank"
            rel="noopener noreferrer"
            whileTap={{ scale: 0.96 }}
            whileHover={{ scale: 1.05 }}
            className="p-2 text-carbon-400 hover:text-carbon-950 dark:hover:text-carbon-50 transition-colors"
            aria-label="GitHub"
          >
            <Github size={16} />
          </motion.a>
          <motion.a
            href="https://www.linkedin.com/in/durganandishar/"
            target="_blank"
            rel="noopener noreferrer"
            whileTap={{ scale: 0.96 }}
            whileHover={{ scale: 1.05 }}
            className="p-2 text-carbon-400 hover:text-carbon-950 dark:hover:text-carbon-50 transition-colors"
            aria-label="LinkedIn"
          >
            <Linkedin size={16} />
          </motion.a>
        </div>
      </div>
    </footer>
  );
}
