import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Copy, Check } from 'lucide-react';
import { sound } from '../../utils/audio';

interface HistoryItem {
  cmd: string;
  output: React.ReactNode;
}

export function InteractiveTerminal({ onToggleTheme }: { onToggleTheme?: () => void }) {
  const [copied, setCopied] = useState(false);
  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState<HistoryItem[]>([
    {
      cmd: 'whoami',
      output: (
        <span className="text-slate-300">
          Durganand Ishar &middot; <span className="text-[#00F0FF] font-semibold">BTech CSE Student @ MRIIRS</span> &middot; Full-Stack Developer &amp; Problem Solver.
        </span>
      ),
    },
    {
      cmd: 'help',
      output: (
        <span className="text-slate-400">
          Available commands: <span className="text-[#00F0FF] font-bold">projects</span>, <span className="text-[#00FF9D] font-bold">skills</span>, <span className="text-[#FF5500] font-bold">contact</span>, <span className="text-amber-400 font-bold">stats</span>, <span className="text-slate-200 font-bold">clear</span>
        </span>
      ),
    },
  ]);

  const terminalBodyRef = useRef<HTMLDivElement | null>(null);
  const terminalInputRef = useRef<HTMLInputElement | null>(null);

  const executeCommand = (rawCmd: string) => {
    const cmd = rawCmd.trim().toLowerCase();
    if (!cmd) return;

    sound.playTelemetry(1600);

    let output: React.ReactNode = null;

    switch (cmd) {
      case 'help':
        output = (
          <div className="space-y-1 text-xs">
            <p className="text-[#00F0FF] font-mono">// Available Commands:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 pt-1 font-mono text-slate-300">
              <div><span className="text-[#00F0FF] font-bold">projects</span> : Shipped web products</div>
              <div><span className="text-[#00FF9D] font-bold">skills</span> : Core programming skills</div>
              <div><span className="text-amber-400 font-bold">stats</span> : Project metrics &amp; numbers</div>
              <div><span className="text-[#FF5500] font-bold">contact</span> : Email and social profiles</div>
              <div><span className="text-slate-400 font-bold">clear</span> : Clear terminal output</div>
            </div>
          </div>
        );
        break;

      case 'projects':
        output = (
          <div className="space-y-2 text-xs font-mono">
            <div className="p-2.5 rounded bg-[#070D1A] border border-[#00F0FF]/30">
              <span className="text-[#FF5500] font-bold">&gt;&gt; Printify Notes</span> — In-browser dark-mode PDF inverter. 100% private, no server uploads.
              <p className="text-slate-400 text-[11px] mt-0.5">Live site: https://www.printifynotes.in/</p>
            </div>
            <div className="p-2.5 rounded bg-[#070D1A] border border-[#00FF9D]/30">
              <span className="text-[#00FF9D] font-bold">&gt;&gt; JoSAA College Predictor</span> — Admission chance predictor using 72,000+ official cutoffs.
              <p className="text-slate-400 text-[11px] mt-0.5">Live site: https://josaacollegepredictor.vercel.app/</p>
            </div>
          </div>
        );
        break;

      case 'skills':
        output = (
          <div className="space-y-1 text-xs text-slate-300 font-mono">
            <p><span className="text-[#FF5500] font-bold">[Languages]</span> C, C++ (STL &amp; DSA), Python, TypeScript, JavaScript</p>
            <p><span className="text-[#00F0FF] font-bold">[Frontend]</span> React, Tailwind CSS, HTML5, Responsive Layouts</p>
            <p><span className="text-[#00FF9D] font-bold">[Backend &amp; Tools]</span> Python Flask, Git, GitHub, Vercel, Firebase, Vite</p>
            <p><span className="text-amber-400 font-bold">[Certifications]</span> Google Cloud AI Foundations &amp; AI Fundamentals</p>
          </div>
        );
        break;

      case 'stats':
        output = (
          <div className="space-y-1 text-xs text-slate-300 font-mono">
            <p className="text-[#00FF9D]">✓ 72,000+ Official JoSAA Cutoff Records Processed</p>
            <p className="text-[#FF5500]">✓ Up to 60% Printing Ink Saved on Inverted PDFs</p>
            <p className="text-[#00F0FF]">✓ 100% Client-Side Privacy (Zero Server Storage)</p>
            <p className="text-amber-400">✓ 250+ Data Structures &amp; Algorithm Problems Solved</p>
          </div>
        );
        break;

      case 'contact':
        output = (
          <div className="space-y-1 text-xs text-slate-300 font-mono">
            <p>Email: <span className="text-[#00F0FF]">isardurganand@gmail.com</span></p>
            <p>GitHub: <a href="https://github.com/isar-durganand" target="_blank" rel="noreferrer" className="text-[#00FF9D] underline">github.com/isar-durganand</a></p>
            <p>LinkedIn: <a href="https://www.linkedin.com/in/durganandishar/" target="_blank" rel="noreferrer" className="text-[#00F0FF] underline">linkedin.com/in/durganandishar</a></p>
          </div>
        );
        break;

      case 'clear':
        setHistory([]);
        setInputVal('');
        return;

      case 'whoami':
        output = (
          <span className="text-slate-200 font-mono">
            Durganand Ishar &middot; CSE Student at MRIIRS, Faridabad &middot; Full-Stack Developer &amp; C++ Enthusiast.
          </span>
        );
        break;

      default:
        output = (
          <span className="text-rose-400 font-mono">
            Command not found: &quot;{rawCmd}&quot;. Type <span className="text-[#00F0FF] underline cursor-pointer" onClick={() => executeCommand('help')}>help</span> for commands.
          </span>
        );
        break;
    }

    setHistory((prev) => [...prev, { cmd: rawCmd, output }]);
    setInputVal('');
  };

  // Scroll ONLY the terminal body, NEVER scroll the browser window!
  useEffect(() => {
    if (terminalBodyRef.current) {
      terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
    }
  }, [history]);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText('isardurganand@gmail.com');
      setCopied(true);
      sound.playSuccess();
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // Fallback
    }
  };

  return (
    <div className="relative rounded-xl bg-[#040813] border border-[#00F0FF]/30 shadow-[0_0_30px_rgba(0,240,255,0.12)] overflow-hidden">
      {/* Corner HUD Ticks */}
      <div className="hud-bracket-tl" />
      <div className="hud-bracket-tr" />
      <div className="hud-bracket-bl" />
      <div className="hud-bracket-br" />

      {/* Terminal Title Bar */}
      <div className="flex items-center justify-between px-3.5 py-2.5 bg-[#02050B] border-b border-[#00F0FF]/20">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 shadow-[0_0_6px_#f43f5e]" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 shadow-[0_0_6px_#f59e0b]" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_6px_#10b981]" />
          </div>

          <div className="flex items-center gap-1 ml-2">
            <span className="text-[10px] font-mono text-[#00F0FF] uppercase tracking-widest font-bold">
              [ BASH TERMINAL // DURGANAND ]
            </span>
          </div>
        </div>

        <button
          onClick={copyEmail}
          className="p-1 rounded text-slate-400 hover:text-[#00F0FF] transition-colors"
          title="Copy email: isardurganand@gmail.com"
        >
          {copied ? <Check size={13} className="text-[#00FF9D]" /> : <Copy size={13} />}
        </button>
      </div>

      {/* Terminal Scrollable Body Container */}
      <div
        ref={terminalBodyRef}
        className="p-4 font-mono text-xs sm:text-[13px] leading-relaxed h-[270px] max-h-[320px] overflow-y-auto bg-[#03060E] scanlines"
      >
        <div className="space-y-3">
          {history.map((item, idx) => (
            <div key={idx} className="space-y-1">
              <div className="flex items-center gap-2 text-slate-400">
                <span className="text-[#00F0FF] font-bold">&gt;&gt;</span>
                <span className="text-[#00FF9D] font-semibold">durganand@dev</span>
                <span className="text-slate-600">:~$</span>
                <span className="text-white font-bold">{item.cmd}</span>
              </div>
              <div className="pl-4">{item.output}</div>
            </div>
          ))}

          {/* Input Form without Window Scroll */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              executeCommand(inputVal);
            }}
            className="flex items-center gap-2 text-slate-400 pt-1"
          >
            <span className="text-[#00F0FF] font-bold">&gt;&gt;</span>
            <span className="text-[#00FF9D] font-semibold">durganand@dev</span>
            <span className="text-slate-600">:~$</span>
            <input
              ref={terminalInputRef}
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder="type 'help' or click commands below..."
              className="flex-1 bg-transparent text-[#00F0FF] placeholder-slate-700 focus:outline-none font-mono"
            />
          </form>
        </div>
      </div>

      {/* Quick Action Buttons */}
      <div className="px-3 py-2 bg-[#02050B] border-t border-[#00F0FF]/20 flex flex-wrap items-center gap-1.5">
        <span className="text-[10px] font-mono text-slate-500 uppercase">Quick:</span>
        {['help', 'projects', 'skills', 'stats', 'contact', 'clear'].map((cmd) => (
          <button
            key={cmd}
            type="button"
            onClick={(e) => {
              e.preventDefault();
              executeCommand(cmd);
            }}
            className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#071120] hover:bg-[#00F0FF]/20 text-slate-300 hover:text-[#00F0FF] border border-[#00F0FF]/20 hover:border-[#00F0FF]/60 transition-all cursor-pointer"
          >
            {cmd}
          </button>
        ))}
      </div>
    </div>
  );
}
