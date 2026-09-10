import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  ExternalLink,
  Code2,
  User,
  Zap,
  Mail,
  Volume2,
  VolumeX,
  Copy,
  Check,
  ArrowRight,
  Sparkles,
  Linkedin,
} from 'lucide-react';
import { sound } from '../../utils/audio';

interface CommandItem {
  id: string;
  category: 'Navigation' | 'Projects' | 'Actions' | 'Social';
  title: string;
  subtitle?: string;
  icon: React.ReactNode;
  action: () => void;
}

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
}

export function CommandPalette({
  isOpen,
  onClose,
  soundEnabled,
  onToggleSound,
}: CommandPaletteProps) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const scrollTo = (id: string) => {
    onClose();
    sound.playTelemetry(1600);
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText('isardurganand@gmail.com');
      setCopiedEmail(true);
      sound.playSuccess();
      setTimeout(() => {
        setCopiedEmail(false);
        onClose();
      }, 1200);
    } catch {
      onClose();
    }
  };

  const commands: CommandItem[] = [
    {
      id: 'nav-work',
      category: 'Navigation',
      title: 'Projects & Work',
      subtitle: 'Browse featured full-stack projects',
      icon: <Code2 size={15} className="text-[#00F0FF]" />,
      action: () => scrollTo('work'),
    },
    {
      id: 'nav-about',
      category: 'Navigation',
      title: 'About Durganand',
      subtitle: 'Engineering journey, education & principles',
      icon: <User size={15} className="text-[#00FF9D]" />,
      action: () => scrollTo('about'),
    },
    {
      id: 'nav-skills',
      category: 'Navigation',
      title: 'Skills & Certifications',
      subtitle: 'Tech stack, frameworks & Google AI credentials',
      icon: <Zap size={15} className="text-amber-400" />,
      action: () => scrollTo('skills'),
    },
    {
      id: 'nav-contact',
      category: 'Navigation',
      title: 'Contact & Messages',
      subtitle: 'Send a message or reach out directly',
      icon: <Mail size={15} className="text-[#FF5500]" />,
      action: () => scrollTo('contact'),
    },
    {
      id: 'nav-linkedin',
      category: 'Navigation',
      title: 'LinkedIn Section',
      subtitle: 'View live profile iframe and connect',
      icon: <Linkedin size={15} className="text-[#0077B5]" />,
      action: () => scrollTo('linkedin'),
    },
    {
      id: 'proj-printify',
      category: 'Projects',
      title: 'Visit: Printify Notes',
      subtitle: 'Print-on-demand platform for students · printifynotes.in',
      icon: <Sparkles size={15} className="text-[#FF5500]" />,
      action: () => {
        sound.playTelemetry(2000);
        window.open('https://www.printifynotes.in/', '_blank');
        onClose();
      },
    },
    {
      id: 'proj-josaa',
      category: 'Projects',
      title: 'Visit: JoSAA College Predictor',
      subtitle: 'JEE rank & college cut-off predictor web app',
      icon: <Sparkles size={15} className="text-[#00FF9D]" />,
      action: () => {
        sound.playTelemetry(2000);
        window.open('https://josaacollegepredictor.vercel.app/', '_blank');
        onClose();
      },
    },
    {
      id: 'act-copy-email',
      category: 'Actions',
      title: copiedEmail ? 'Email Copied!' : 'Copy Email Address',
      subtitle: 'isardurganand@gmail.com',
      icon: copiedEmail ? (
        <Check size={15} className="text-[#00FF9D]" />
      ) : (
        <Copy size={15} className="text-[#00F0FF]" />
      ),
      action: copyEmail,
    },
    {
      id: 'act-sound',
      category: 'Actions',
      title: soundEnabled ? 'Mute Sound Effects' : 'Enable Sound Effects',
      subtitle: 'Toggle synthesized UI sound effects',
      icon: soundEnabled ? <Volume2 size={15} className="text-[#00FF9D]" /> : <VolumeX size={15} className="text-slate-500" />,
      action: () => {
        onToggleSound();
      },
    },
    {
      id: 'soc-github',
      category: 'Social',
      title: 'GitHub Profile',
      subtitle: 'github.com/isar-durganand',
      icon: <ExternalLink size={15} className="text-slate-400" />,
      action: () => {
        sound.playClick();
        window.open('https://github.com/isar-durganand', '_blank');
        onClose();
      },
    },
    {
      id: 'soc-linkedin',
      category: 'Social',
      title: 'LinkedIn Profile',
      subtitle: 'linkedin.com/in/durganandishar',
      icon: <ExternalLink size={15} className="text-slate-400" />,
      action: () => {
        sound.playClick();
        window.open('https://www.linkedin.com/in/durganandishar/', '_blank');
        onClose();
      },
    },
  ];

  const filteredCommands = commands.filter((cmd) => {
    const term = query.toLowerCase().trim();
    if (!term) return true;
    return (
      cmd.title.toLowerCase().includes(term) ||
      (cmd.subtitle && cmd.subtitle.toLowerCase().includes(term)) ||
      cmd.category.toLowerCase().includes(term)
    );
  });

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      setQuery('');
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        sound.playClick();
        setSelectedIndex((prev) => (prev + 1) % (filteredCommands.length || 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        sound.playClick();
        setSelectedIndex((prev) => (prev - 1 + filteredCommands.length) % (filteredCommands.length || 1));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filteredCommands[selectedIndex]) {
          filteredCommands[selectedIndex].action();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filteredCommands, selectedIndex, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center pt-20 sm:pt-28 px-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/85 backdrop-blur-md"
          />

          {/* Sci-Fi Shell Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: -20 }}
            transition={{ type: 'spring', stiffness: 450, damping: 30 }}
            className="relative w-full max-w-xl cyber-card overflow-hidden z-10 shadow-[0_0_50px_rgba(0,240,255,0.2)]"
          >
            <div className="hud-bracket-tl" />
            <div className="hud-bracket-tr" />
            <div className="hud-bracket-bl" />
            <div className="hud-bracket-br" />

            {/* Input Bar */}
            <div className="flex items-center gap-3 px-4 py-3.5 border-b border-[#00F0FF]/25 bg-[#03060E]">
              <Search size={16} className="text-[#00F0FF] flex-shrink-0" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  sound.playTelemetry(2400);
                }}
                placeholder="Type a command or search sections..."
                className="w-full bg-transparent text-xs sm:text-sm font-mono text-[#00F0FF] placeholder-slate-500 focus:outline-none"
              />
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#071120] text-slate-400 border border-[#00F0FF]/30">
                ESC
              </span>
            </div>

            {/* Results Stream */}
            <div className="max-h-[60vh] overflow-y-auto p-2 divide-y divide-[#00F0FF]/10 scanlines bg-[#040813]">
              {filteredCommands.length === 0 ? (
                <div className="py-12 text-center text-xs font-mono text-slate-500">
                  No matching results for "{query}"
                </div>
              ) : (
                <div className="space-y-1">
                  {filteredCommands.map((cmd, idx) => {
                    const isSelected = idx === selectedIndex;
                    return (
                      <div
                        key={cmd.id}
                        onClick={() => cmd.action()}
                        onMouseEnter={() => setSelectedIndex(idx)}
                        className={`flex items-center justify-between gap-3 px-3 py-2.5 rounded cursor-pointer transition-all ${
                          isSelected
                            ? 'bg-[#00F0FF]/15 border border-[#00F0FF]/50 text-white shadow-[0_0_12px_rgba(0,240,255,0.2)]'
                            : 'text-slate-300 hover:bg-[#071120] border border-transparent'
                        }`}
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <div className={`p-1.5 rounded ${isSelected ? 'bg-[#00F0FF]/20 text-[#00F0FF]' : 'bg-[#02050B] text-slate-400'}`}>
                            {cmd.icon}
                          </div>
                          <div className="truncate font-mono">
                            <p className="text-xs font-bold truncate">
                              {cmd.title}
                            </p>
                            {cmd.subtitle && (
                              <p className="text-[10px] text-slate-500 truncate">
                                {cmd.subtitle}
                              </p>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center gap-2 flex-shrink-0 font-mono">
                          <span className="text-[9px] uppercase px-1.5 py-0.5 rounded bg-[#02050B] text-[#00F0FF] border border-[#00F0FF]/20">
                            {cmd.category}
                          </span>
                          {isSelected && (
                            <ArrowRight size={13} className="text-[#00F0FF]" />
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Footer Status */}
            <div className="px-4 py-2 bg-[#02050B] border-t border-[#00F0FF]/20 flex items-center justify-between text-[10px] font-mono text-slate-500">
              <span>Use ↑↓ to navigate · Enter to select</span>
              <span className="text-[#00F0FF]">DURGANAND ISHAR · PORTFOLIO</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
