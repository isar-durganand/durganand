import type { Project } from '../types/portfolio';

export const projects: Project[] = [
  {
    id: 'printify-notes',
    title: 'Printify Notes',
    tagline: '100% Private — No Data Leaves Your Device',
    description:
      'A free, privacy-first browser tool that converts dark-background lecture notes and PDFs from coaching platforms like Physics Wallah, Unacademy, and Vedantu into clean, ink-saving printable PDFs. Entirely client-side — no uploads, no signup required.',
    stack: ['React', 'TypeScript', 'Tailwind CSS'],
    liveUrl: 'https://www.printifynotes.in/',
    repoUrl: 'https://github.com/isar-durganand/printifynotes',
    screenshot: '/printifynotes-screen.png',
    highlights: [
      'Client-side PDF processing — zero server uploads',
      'Instant in-browser conversion engine',
      'Saves up to 60% ink on printouts',
    ],
  },
  {
    id: 'josaa-predictor',
    title: 'JoSAA College Predictor',
    tagline: 'Data-driven admission predictions using 72,000+ cutoff records',
    description:
      'A college and branch predictor for JoSAA counseling that uses historical cutoff data, rank-percentile analysis, and NIRF rankings to help engineering aspirants estimate admission chances across IITs, NITs, IIITs, and GFTIs.',
    stack: ['Python', 'Flask', 'Data Pipeline', 'Vercel'],
    liveUrl: 'https://josaacollegepredictor.vercel.app/',
    repoUrl: 'https://github.com/isar-durganand/josaapredictor',
    screenshot: '/josaapredictor-screen.png',
    highlights: [
      'Analyzes 72,000+ official JoSAA 2025 cutoff records',
      'Integrates NIRF college rankings',
      'Covers 128 colleges, 253 programs, 6 rounds',
    ],
  },
];
