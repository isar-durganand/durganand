import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Linkedin,
  ExternalLink,
  ShieldCheck,
  MapPin,
  RefreshCw,
  UserPlus,
  Send,
  Building2,
  Check,
  Search,
  Home,
  Users,
  Briefcase,
  MessageSquare,
  Bell,
  Grid,
  Sparkles,
  Layers,
  Monitor,
  Maximize2
} from 'lucide-react';
import { sound } from '../../utils/audio';

export function LinkedInSection() {
  const [viewMode, setViewMode] = useState<'profile' | 'full-screenshot' | 'iframe'>('profile');
  const [connected, setConnected] = useState(false);
  const [reloadKey, setReloadKey] = useState(0);

  const linkedinUrl = 'https://www.linkedin.com/in/durganandishar/';

  const handleConnect = () => {
    sound.playSuccess();
    setConnected(true);
    setTimeout(() => {
      window.open(linkedinUrl, '_blank');
    }, 450);
  };

  const handleMessage = () => {
    sound.playClick();
    window.location.href = 'mailto:isardurganand@gmail.com?subject=Connecting%20via%20LinkedIn';
  };

  const handleRefresh = () => {
    sound.playClick();
    setReloadKey((prev) => prev + 1);
  };

  return (
    <section id="linkedin" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[520px] bg-[#0077B5]/12 blur-[140px] rounded-full pointer-events-none -z-10" />

      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-4 border-b border-[#00F0FF]/20">
        <div>
          <div className="flex items-center gap-2 mb-2 font-mono text-xs text-[#0077B5] tracking-widest uppercase">
            <span className="inline-block w-2 h-2 rounded-full bg-[#0077B5] animate-ping" />
            <span>// PROFESSIONAL NETWORK</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-mono tracking-tight text-white flex items-center gap-3">
            <span>LinkedIn Profile</span>
            <span className="text-xs font-normal px-2.5 py-1 rounded bg-[#0077B5]/20 text-[#0077B5] border border-[#0077B5]/40 flex items-center gap-1.5">
              <Linkedin size={13} />
              LIVE EMBED
            </span>
          </h2>
          <p className="text-sm font-mono text-slate-400 mt-1">
            CSE Student @ MRIIRS &middot; Aspiring SWE &amp; AI Engineer &middot; 162 Connections
          </p>
        </div>

        <div className="mt-4 sm:mt-0 flex items-center gap-3">
          <button
            onClick={handleRefresh}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#071120] hover:bg-[#0C1B33] text-slate-300 hover:text-white border border-[#00F0FF]/30 text-xs font-mono transition-all cursor-pointer"
            title="Reload Frame"
          >
            <RefreshCw size={13} />
            <span>RELOAD</span>
          </button>

          <a
            href={linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => sound.playTelemetry(2200)}
            className="flex items-center gap-2 px-4 py-1.5 rounded bg-[#0077B5] hover:bg-[#0088D1] text-white font-mono text-xs font-bold transition-all shadow-[0_0_15px_rgba(0,119,181,0.4)] cursor-pointer"
          >
            <Linkedin size={14} />
            <span>OPEN PROFILE</span>
            <ExternalLink size={13} />
          </a>
        </div>
      </div>

      {/* Main Container */}
      <div className="cyber-card p-3 sm:p-5 relative rounded-xl border border-[#0077B5]/40 bg-[#030814]/95 shadow-[0_0_35px_rgba(0,119,181,0.18)]">
        <div className="hud-bracket-tl" />
        <div className="hud-bracket-tr" />
        <div className="hud-bracket-bl" />
        <div className="hud-bracket-br" />

        {/* Browser Top Navigation Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-4 py-2.5 bg-[#07101E] border border-[#00F0FF]/20 rounded-t-lg text-xs font-mono">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
              <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
            </div>
            <div className="hidden md:flex items-center gap-1.5 px-3 py-0.5 rounded bg-[#03060E] text-[#00F0FF] border border-[#00F0FF]/25 text-[11px]">
              <Linkedin size={12} className="text-[#0077B5]" />
              <span>https://www.linkedin.com/in/durganandishar/</span>
            </div>
          </div>

          {/* View Switcher: Interactive Card vs Full Screenshot vs Raw Iframe */}
          <div className="flex items-center gap-1.5 bg-[#02050E] p-1 rounded border border-[#00F0FF]/25 overflow-x-auto max-w-full no-scrollbar">
            <button
              onClick={() => {
                sound.playClick();
                setViewMode('profile');
              }}
              className={`px-3 py-1 rounded text-[11px] font-mono transition-all cursor-pointer flex items-center gap-1.5 ${
                viewMode === 'profile'
                  ? 'bg-[#0077B5] text-white font-bold shadow-[0_0_10px_rgba(0,119,181,0.4)]'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Layers size={11} />
              <span>LIVE PROFILE</span>
            </button>

            <button
              onClick={() => {
                sound.playClick();
                setViewMode('full-screenshot');
              }}
              className={`px-3 py-1 rounded text-[11px] font-mono transition-all cursor-pointer flex items-center gap-1.5 ${
                viewMode === 'full-screenshot'
                  ? 'bg-[#0077B5] text-white font-bold shadow-[0_0_10px_rgba(0,119,181,0.4)]'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Monitor size={11} />
              <span>FULL VIEW</span>
            </button>

            <button
              onClick={() => {
                sound.playClick();
                setViewMode('iframe');
              }}
              className={`px-3 py-1 rounded text-[11px] font-mono transition-all cursor-pointer flex items-center gap-1.5 ${
                viewMode === 'iframe'
                  ? 'bg-[#00F0FF]/20 border border-[#00F0FF]/40 text-[#00F0FF]'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Maximize2 size={11} />
              <span>RAW IFRAME</span>
            </button>
          </div>

          <div className="hidden sm:flex items-center gap-2 text-[11px] font-mono">
            <span className="text-[#00FF9D] flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00FF9D] animate-ping" />
              STATUS: 200 OK
            </span>
          </div>
        </div>

        {/* Content Body */}
        <div className="border-x border-b border-[#00F0FF]/20 rounded-b-lg overflow-hidden bg-[#F4F2EE] text-[#191919]">
          <AnimatePresence mode="wait">
            {viewMode === 'profile' && (
              <motion.div
                key="exact-profile"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="p-3 sm:p-5"
              >
                {/* LinkedIn Top Bar Simulation */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 px-3 sm:px-5 py-2 flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2 sm:gap-3 flex-1">
                    <div className="w-8 h-8 rounded bg-[#0A66C2] flex items-center justify-center text-white font-black text-sm">
                      in
                    </div>
                    <div className="flex items-center gap-2 bg-[#EDF3F8] rounded px-2.5 py-1.5 w-44 sm:w-64 text-xs text-gray-500">
                      <Search size={14} className="text-gray-600" />
                      <span>Search</span>
                    </div>
                  </div>

                  <div className="hidden md:flex items-center gap-6 text-[10px] text-gray-600">
                    <div className="flex flex-col items-center cursor-pointer hover:text-black">
                      <Home size={17} />
                      <span>Home</span>
                    </div>
                    <div className="flex flex-col items-center cursor-pointer hover:text-black">
                      <Users size={17} />
                      <span>My Network</span>
                    </div>
                    <div className="flex flex-col items-center cursor-pointer hover:text-black">
                      <Briefcase size={17} />
                      <span>Jobs</span>
                    </div>
                    <div className="flex flex-col items-center cursor-pointer hover:text-black">
                      <MessageSquare size={17} />
                      <span>Messaging</span>
                    </div>
                    <div className="flex flex-col items-center relative cursor-pointer hover:text-black">
                      <Bell size={17} />
                      <span className="absolute -top-1 -right-1.5 w-4 h-4 rounded-full bg-red-600 text-white text-[9px] flex items-center justify-center font-bold">
                        16
                      </span>
                      <span>Notifications</span>
                    </div>
                  </div>
                </div>

                {/* Main 2-Column Grid matching Screenshot 69 */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
                  {/* Left Column: Primary Profile Card (8 cols) */}
                  <div className="lg:col-span-8 bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
                    {/* Real Cover Banner from Screenshot 69 */}
                    <div className="relative h-40 sm:h-52 w-full bg-[#1F2022] overflow-hidden">
                      <img
                        src="/linkedin-banner.png"
                        alt="Durganand Ishar LinkedIn Cover Banner"
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Profile Information Block */}
                    <div className="px-5 sm:px-6 pb-6 pt-0 relative">
                      {/* Avatar */}
                      <div className="flex items-end justify-between -mt-16 sm:-mt-20 mb-3">
                        <div className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-full border-4 border-white shadow-md bg-white overflow-hidden flex-shrink-0">
                          <img
                            src="/profile.webp"
                            alt="Durganand Ishar"
                            className="w-full h-full object-cover"
                          />
                        </div>

                        {/* Top-right MRIIRS logo badge matching Screenshot 69 */}
                        <div className="hidden sm:flex items-center gap-2 text-right">
                          <img
                            src="/mriirs-logo.png"
                            alt="MRIIRS Logo"
                            className="w-5 h-5 object-contain"
                            onError={(e) => {
                              (e.target as HTMLElement).style.display = 'none';
                            }}
                          />
                          <span className="text-xs font-semibold text-gray-800 max-w-[200px] leading-tight">
                            Manav Rachna International Institute of Research &amp; Studies
                          </span>
                        </div>
                      </div>

                      {/* Name & Headline */}
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h3 className="text-2xl font-bold text-gray-900 font-sans tracking-tight">
                            Durganand Ishar
                          </h3>
                          <ShieldCheck size={18} className="text-[#0A66C2]" />
                          <span className="text-xs text-gray-500 font-normal">He/Him</span>
                        </div>

                        <p className="text-sm text-gray-800 font-normal">
                          CSE Student @ MRIIRS | Aspiring SWE &amp; AI Engineer
                        </p>

                        <div className="flex flex-wrap items-center gap-2 text-xs text-gray-500 pt-0.5">
                          <span>Faridabad, Haryana, India</span>
                          <span>&middot;</span>
                          <a
                            href={linkedinUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#0A66C2] font-semibold hover:underline"
                          >
                            Contact info
                          </a>
                        </div>

                        <p className="text-xs font-semibold text-[#0A66C2] pt-1 cursor-pointer hover:underline">
                          162 connections
                        </p>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex flex-wrap items-center gap-2 mt-4 pt-2 border-t border-gray-100">
                        <button
                          onClick={handleConnect}
                          className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#0A66C2] hover:bg-[#004182] text-white text-xs font-semibold transition-all shadow-sm cursor-pointer"
                        >
                          {connected ? (
                            <>
                              <Check size={13} />
                              <span>Connected</span>
                            </>
                          ) : (
                            <>
                              <UserPlus size={13} />
                              <span>+ Connect</span>
                            </>
                          )}
                        </button>

                        <button
                          onClick={handleMessage}
                          className="flex items-center gap-1.5 px-4 py-1.5 rounded-full border border-[#0A66C2] text-[#0A66C2] hover:bg-[#EBF4FD] text-xs font-semibold transition-colors cursor-pointer"
                        >
                          <Send size={13} />
                          <span>Message</span>
                        </button>

                        <a
                          href={linkedinUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => sound.playTelemetry(2000)}
                          className="flex items-center gap-1.5 px-4 py-1.5 rounded-full border border-gray-400 text-gray-700 hover:bg-gray-100 text-xs font-semibold transition-colors"
                        >
                          <span>Open in LinkedIn</span>
                          <ExternalLink size={12} />
                        </a>
                      </div>

                      {/* Education Details Box */}
                      <div className="mt-5 p-3 rounded-lg bg-[#F8FAFC] border border-gray-200 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded bg-white border border-gray-200 p-1 flex items-center justify-center">
                            <Building2 size={20} className="text-[#0A66C2]" />
                          </div>
                          <div>
                            <p className="text-xs font-bold text-gray-900">
                              Manav Rachna International Institute of Research &amp; Studies (MRIIRS)
                            </p>
                            <p className="text-[11px] text-gray-600">
                              Bachelor of Technology - BTech, Computer Science &amp; Engineering &middot; Faridabad
                            </p>
                          </div>
                        </div>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-50 text-[#0A66C2] border border-blue-200">
                          Class of 2026–30
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Right Sidebar: Public Profile & Viewed Profiles (4 cols) */}
                  <div className="lg:col-span-4 space-y-4">
                    {/* Profile Language & URL Card */}
                    <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4 text-xs font-sans">
                      <div className="pb-3 border-b border-gray-100">
                        <p className="font-bold text-gray-900">Profile language</p>
                        <p className="text-gray-600 text-[11px] mt-0.5">English</p>
                      </div>

                      <div className="pt-3">
                        <p className="font-bold text-gray-900">Public profile &amp; URL</p>
                        <a
                          href={linkedinUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#0A66C2] text-[11px] break-all hover:underline block mt-0.5 font-medium"
                        >
                          www.linkedin.com/in/durganandishar
                        </a>
                      </div>
                    </div>

                    {/* Who your viewers also viewed (Exact from Screenshot 69) */}
                    <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4 text-xs font-sans">
                      <p className="font-bold text-gray-900 mb-3 text-xs flex items-center justify-between">
                        <span>People also viewed</span>
                        <span className="text-[10px] text-amber-600 font-semibold">● LinkedIn</span>
                      </p>

                      <div className="space-y-3">
                        <div className="flex items-start gap-2.5 pb-2.5 border-b border-gray-100">
                          <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-[10px] font-bold text-gray-700 flex-shrink-0">
                            CV
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900 text-xs">Chetan Vyavhare &middot; 3rd</p>
                            <p className="text-gray-500 text-[10px] line-clamp-2">Turning Raw Data into Business Insights | Python • SQL • Power BI</p>
                          </div>
                        </div>

                        <div className="flex items-start gap-2.5 pb-2.5 border-b border-gray-100">
                          <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-[10px] font-bold text-gray-700 flex-shrink-0">
                            KS
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900 text-xs">Kashish Srivastava &middot; 2nd</p>
                            <p className="text-gray-500 text-[10px] line-clamp-2">CSE Student | App Dev Intern | Data Analytics Enthusiast</p>
                          </div>
                        </div>

                        <div className="flex items-start gap-2.5 pb-2.5 border-b border-gray-100">
                          <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-[10px] font-bold text-gray-700 flex-shrink-0">
                            HR
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900 text-xs">Himanshu Kumar Rai &middot; 2nd</p>
                            <p className="text-gray-500 text-[10px] line-clamp-2">Data Analyst | SQL | PostgreSQL | Excel</p>
                          </div>
                        </div>

                        <div className="flex items-start gap-2.5">
                          <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-[10px] font-bold text-gray-700 flex-shrink-0">
                            VS
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900 text-xs">Vanshdeep Swami &middot; 1st</p>
                            <p className="text-gray-500 text-[10px] line-clamp-2">Aspiring Software Engineer | 12th PCM+CS Pass-Out</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {viewMode === 'full-screenshot' && (
              <motion.div
                key="full-screenshot"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="p-2 sm:p-4 bg-[#F4F2EE]"
              >
                <div className="rounded-lg overflow-hidden border border-gray-300 shadow-md">
                  <img
                    src="/linkedin-full-view.png"
                    alt="Durganand Ishar Full LinkedIn Session"
                    className="w-full h-auto object-contain"
                  />
                </div>
              </motion.div>
            )}

            {viewMode === 'iframe' && (
              <motion.div
                key="raw-iframe"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="relative w-full h-[620px] bg-white"
              >
                <iframe
                  key={reloadKey}
                  src={linkedinUrl}
                  title="Durganand Ishar LinkedIn"
                  className="w-full h-full border-0"
                  sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
                  loading="lazy"
                />

                <div className="absolute inset-x-4 bottom-4 z-20 p-4 rounded-lg bg-[#071120]/95 backdrop-blur-md border border-[#00F0FF]/30 text-xs font-mono text-slate-200">
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                    <p className="text-xs">
                      If LinkedIn blocks in-frame rendering due to <code className="text-[#00F0FF]">X-Frame-Options: SAMEORIGIN</code>, click to open directly or switch to <strong>Live Profile</strong> mode above.
                    </p>
                    <a
                      href={linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-1.5 rounded bg-[#0077B5] hover:bg-[#0088D1] text-white font-bold flex-shrink-0"
                    >
                      Open in Tab
                    </a>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Sci-Fi Status Line */}
        <div className="mt-4 pt-3 border-t border-[#00F0FF]/15 flex flex-wrap items-center justify-between text-[11px] font-mono text-slate-400">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#00FF9D]" />
            // NETWORK: LINKEDIN SYNC ACTIVE
          </span>
          <span className="text-[#00F0FF] font-bold">
            CSE STUDENT @ MRIIRS &middot; DURGANAND ISHAR
          </span>
        </div>
      </div>
    </section>
  );
}
