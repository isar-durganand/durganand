import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Copy, Check, Github, Linkedin, Send, Mail, AlertCircle, Loader2 } from 'lucide-react';
import { sound } from '../../utils/audio';

const EMAIL = 'isardurganand@gmail.com';
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mppzbqkl';

export function ContactSection() {
  const headerRef = useRef(null);
  const isInView = useInView(headerRef, { once: true, margin: '0px 0px -60px 0px' });
  const [copied, setCopied] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState('');
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      sound.playSuccess();
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const el = document.createElement('textarea');
      el.value = EMAIL;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
      setCopied(true);
      sound.playSuccess();
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) return;

    setIsSubmitting(true);
    setFormError('');
    sound.playTelemetry(1800);

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
        }),
      });

      if (response.ok) {
        setFormSubmitted(true);
        sound.playSuccess();
        setFormData({ name: '', email: '', message: '' });
      } else {
        const data = await response.json().catch(() => null);
        const errorMessage = data?.errors?.[0]?.message || data?.error || 'Failed to transmit message. Please try copying the email address above.';
        setFormError(errorMessage);
        sound.playClick();
      }
    } catch (err) {
      setFormError('Network transmission error. Please reach out directly to isardurganand@gmail.com.');
      sound.playClick();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 sm:py-32 px-4 sm:px-6 scroll-mt-24 relative">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ type: 'spring', stiffness: 220, damping: 28 }}
          className="mb-12 sm:mb-18 text-center"
        >
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-[#FF5500] shadow-[0_0_8px_#FF5500]" />
            <span className="text-xs font-mono text-[#FF5500] uppercase tracking-widest font-bold">
              // 04 &middot; Contact &amp; Connect
            </span>
          </div>
          <h2 className="font-display font-black text-3xl sm:text-5xl lg:text-6xl tracking-tight-display text-white">
            Let's Build Something.
          </h2>
          <p className="text-xs sm:text-sm md:text-base font-body text-slate-300 mt-2 max-w-md mx-auto leading-relaxed">
            Open to software engineering internships, hackathon collaborations, and interesting project discussions.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left: Direct Email & Socials (5 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '0px 0px -60px 0px' }}
            transition={{ type: 'spring', stiffness: 200, damping: 28 }}
            className="lg:col-span-5 space-y-5"
          >
            {/* Primary Email Card */}
            <div className="cyber-card p-5 sm:p-6 space-y-3">
              <div className="hud-bracket-tl" />
              <div className="hud-bracket-tr" />
              <div className="hud-bracket-bl" />
              <div className="hud-bracket-br" />

              <div className="flex items-center gap-2 text-xs font-mono text-[#00F0FF] uppercase tracking-widest font-bold">
                <Mail size={15} />
                <span>DIRECT INBOX</span>
              </div>
              <p className="text-xs font-body text-slate-300">
                Click below to copy my primary email address:
              </p>

              <button
                onClick={copyEmail}
                className="group flex items-center justify-between gap-3 px-3.5 sm:px-4 py-3 bg-[#03060E] border border-[#00F0FF]/30 hover:border-[#00F0FF] rounded transition-all cursor-pointer w-full text-left"
              >
                <span className="text-xs sm:text-sm font-mono text-[#00F0FF] truncate font-bold">
                  {EMAIL}
                </span>
                <div className="flex items-center gap-1 text-xs font-mono flex-shrink-0">
                  {copied ? (
                    <span className="flex items-center gap-1 text-[#00FF9D] font-bold">
                      <Check size={14} />
                      <span className="hidden sm:inline">COPIED!</span>
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-slate-400 group-hover:text-[#00F0FF] transition-colors">
                      <Copy size={14} />
                      <span className="hidden sm:inline">COPY</span>
                    </span>
                  )}
                </div>
              </button>
            </div>

            {/* Social Links */}
            <div className="grid grid-cols-2 gap-3">
              <motion.a
                href="https://www.linkedin.com/in/durganandishar/"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sound.playTelemetry(1600)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                className="cyber-card p-3.5 sm:p-4 flex flex-col justify-between group cursor-pointer"
              >
                <div className="flex items-center justify-between mb-3">
                  <Linkedin size={20} className="text-[#00F0FF]" />
                  <span className="text-[9px] font-mono text-slate-400 group-hover:text-[#00F0FF]">PROFILE ↗</span>
                </div>
                <div>
                  <p className="font-mono font-bold text-xs text-white">LINKEDIN</p>
                  <p className="text-[10px] font-mono text-slate-500 truncate">in/durganandishar</p>
                </div>
              </motion.a>

              <motion.a
                href="https://github.com/isar-durganand"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sound.playTelemetry(1600)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                className="cyber-card p-3.5 sm:p-4 flex flex-col justify-between group cursor-pointer"
              >
                <div className="flex items-center justify-between mb-3">
                  <Github size={20} className="text-[#00FF9D]" />
                  <span className="text-[9px] font-mono text-slate-400 group-hover:text-[#00FF9D]">REPOS ↗</span>
                </div>
                <div>
                  <p className="font-mono font-bold text-xs text-white">GITHUB</p>
                  <p className="text-[10px] font-mono text-slate-500 truncate">isar-durganand</p>
                </div>
              </motion.a>
            </div>

            {/* Response Time Indicator */}
            <div className="p-3 sm:p-3.5 rounded bg-[#03060E] border border-[#00FF9D]/30 text-[#00FF9D] text-xs font-mono flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#00FF9D] animate-ping flex-shrink-0" />
              <span>Response Time: Typically within 12–24 hours</span>
            </div>
          </motion.div>

          {/* Right: Message Form via Formspree (7 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '0px 0px -60px 0px' }}
            transition={{ type: 'spring', stiffness: 200, damping: 28, delay: 0.1 }}
            className="lg:col-span-7 cyber-card p-5 sm:p-8 relative"
          >
            <div className="hud-bracket-tl" />
            <div className="hud-bracket-tr" />
            <div className="hud-bracket-bl" />
            <div className="hud-bracket-br" />

            {formSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-10 sm:py-12 text-center space-y-4"
              >
                <div className="w-16 h-16 mx-auto rounded-full bg-[#00FF9D]/15 border border-[#00FF9D]/40 flex items-center justify-center text-[#00FF9D] shadow-[0_0_20px_rgba(0,255,157,0.3)]">
                  <Check size={30} />
                </div>
                <h3 className="font-mono font-black text-xl text-white">
                  Message Transmitted!
                </h3>
                <p className="text-xs font-mono text-slate-300 max-w-sm mx-auto leading-relaxed">
                  Thank you! Your message was delivered directly to Durganand via Formspree. You will receive a response at your email address shortly.
                </p>
                <div className="pt-2">
                  <button
                    onClick={() => {
                      sound.playClick();
                      setFormSubmitted(false);
                    }}
                    className="px-4 py-2 rounded bg-[#071120] border border-[#00F0FF]/40 text-[#00F0FF] hover:bg-[#00F0FF]/15 text-xs font-mono transition-colors cursor-pointer"
                  >
                    Send Another Message
                  </button>
                </div>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {formError && (
                  <div className="p-3 rounded bg-red-950/40 border border-red-500/40 text-red-300 text-xs font-mono flex items-center gap-2">
                    <AlertCircle size={15} className="flex-shrink-0 text-red-400" />
                    <span>{formError}</span>
                  </div>
                )}

                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-widest text-[#00F0FF] mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Alex Morgan"
                    className="w-full px-3.5 sm:px-4 py-3 rounded bg-[#02050B] border border-[#00F0FF]/30 text-xs font-mono text-white placeholder-slate-600 focus:outline-none focus:border-[#00F0FF] focus:shadow-[0_0_12px_rgba(0,240,255,0.25)] transition-all"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-widest text-[#00F0FF] mb-1">
                    Your Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="alex@company.com"
                    className="w-full px-3.5 sm:px-4 py-3 rounded bg-[#02050B] border border-[#00F0FF]/30 text-xs font-mono text-white placeholder-slate-600 focus:outline-none focus:border-[#00F0FF] focus:shadow-[0_0_12px_rgba(0,240,255,0.25)] transition-all"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-widest text-[#00F0FF] mb-1">
                    Your Message
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell me about your project, team, or opportunity..."
                    className="w-full px-3.5 sm:px-4 py-3 rounded bg-[#02050B] border border-[#00F0FF]/30 text-xs font-mono text-white placeholder-slate-600 focus:outline-none focus:border-[#00F0FF] focus:shadow-[0_0_12px_rgba(0,240,255,0.25)] transition-all resize-none"
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileTap={{ scale: 0.98 }}
                  className="cyber-btn w-full flex items-center justify-center gap-2 py-3.5 bg-[#FF5500] hover:bg-[#FF6A00] text-white font-mono font-bold text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(255,85,0,0.4)] cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <Loader2 size={14} className="animate-spin" />
                      <span>Transmitting via Formspree...</span>
                    </span>
                  ) : (
                    <>
                      <Send size={14} />
                      <span>Send Direct Message &gt;&gt;</span>
                    </>
                  )}
                </motion.button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
