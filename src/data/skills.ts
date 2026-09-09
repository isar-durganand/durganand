import type { SkillCategory, Credential } from '../types/portfolio';

export const skillCategories: SkillCategory[] = [
  {
    id: 'languages',
    label: 'Languages',
    description: 'Core languages for systems, algorithms, and application engineering.',
    iconName: 'code',
    items: [
      {
        name: 'C',
        context: 'Low-level programming, memory management, pointers, and systems foundations.',
        highlight: true,
      },
      {
        name: 'C++',
        context: 'Primary language for Data Structures & Algorithms, STL containers, and algorithmic problem solving.',
        highlight: true,
      },
      {
        name: 'Python',
        context: 'Data processing, automated pipelines, and scripting for analytical tools like the JoSAA Predictor.',
        project: 'JoSAA College Predictor',
        projectUrl: 'https://josaacollegepredictor.vercel.app/',
        highlight: true,
      },
      {
        name: 'JavaScript',
        context: 'Modern ES6+ syntax, asynchronous programming, DOM APIs, and dynamic web application logic.',
      },
      {
        name: 'TypeScript',
        context: 'Static typing, interface contracts, and robust type safety across production React architectures.',
        project: 'Printify Notes',
        projectUrl: 'https://www.printifynotes.in/',
        highlight: true,
      },
    ],
  },
  {
    id: 'web',
    label: 'Web Technologies',
    description: 'Modern component architectures, layouts, and reactive client interfaces.',
    iconName: 'globe',
    items: [
      {
        name: 'React',
        context: 'Declarative component architecture, custom hooks, state lifecycles, and performant UI patterns.',
        project: 'Printify Notes',
        projectUrl: 'https://www.printifynotes.in/',
        highlight: true,
      },
      {
        name: 'HTML5',
        context: 'Semantic markup, accessible document structure, and modern browser standards.',
      },
      {
        name: 'CSS3',
        context: 'Advanced layout with CSS Grid & Flexbox, fluid typography, transitions, and keyframe animations.',
      },
      {
        name: 'Tailwind CSS',
        context: 'Design-token driven utility architecture, dark/light styling, and strict hairline layout systems.',
        project: 'Printify Notes',
        projectUrl: 'https://www.printifynotes.in/',
        highlight: true,
      },
    ],
  },
  {
    id: 'tools',
    label: 'Tools & Platforms',
    description: 'Developer tooling, deployment infrastructure, and collaboration workflows.',
    iconName: 'terminal',
    items: [
      {
        name: 'Git',
        context: 'Distributed version control, atomic commits, branching workflows, and merge conflict resolution.',
        highlight: true,
      },
      {
        name: 'GitHub',
        context: 'Repository hosting, pull requests, issue tracking, and collaborative code reviews.',
        projectUrl: 'https://github.com/isar-durganand',
      },
      {
        name: 'Vercel',
        context: 'Edge deployment pipelines, serverless functions, preview branches, and continuous delivery.',
        project: 'JoSAA College Predictor',
        projectUrl: 'https://josaacollegepredictor.vercel.app/',
        highlight: true,
      },
      {
        name: 'Firebase',
        context: 'Serverless backend integrations, authentication, client-side database, and cloud hosting.',
      },
      {
        name: 'Vite',
        context: 'Next-generation ES module frontend build tooling, instantaneous HMR, and production bundling.',
        highlight: true,
      },
    ],
  },
  {
    id: 'honing',
    label: 'Algorithms & Focus',
    description: 'Daily algorithmic problem solving and computer science foundations in C++.',
    iconName: 'zap',
    accent: true,
    items: [
      {
        name: 'Data Structures & Algorithms',
        context: 'Rigorous daily practice in C++: Arrays, Hashing, Trees, Graphs, Two Pointers, and Dynamic Programming.',
        highlight: true,
      },
      {
        name: 'C++ STL',
        context: 'Standard Template Library: vector, unordered_map, priority_queue, set, and algorithm iterators.',
        highlight: true,
      },
      {
        name: 'Arrays & Hashing',
        context: 'Two pointers, sliding window, prefix sums, and hash table space-time tradeoffs.',
      },
      {
        name: 'Trees & Graphs',
        context: 'Binary search trees, BFS/DFS traversal, recursion, and graph representations.',
      },
      {
        name: 'Dynamic Programming',
        context: 'Memoization, tabulation, state transitions, and subproblem optimization.',
      },
    ],
  },
];

export const credentials: Credential[] = [
  {
    id: 'intro-to-ai',
    title: 'Introduction to AI',
    issuer: 'Google',
    organization: 'Google Cloud Skills Boost',
    date: '2026',
    badge: 'AI / ML Foundations',
    summary: 'Comprehensive foundation in artificial intelligence concepts, core machine learning paradigms, neural network fundamentals, and responsible AI ethics.',
    topics: [
      'Machine Learning Core Concepts',
      'Neural Networks & Deep Learning Basics',
      'Responsible AI & Ethics Principles',
      'Supervised vs Unsupervised Learning',
    ],
    verified: true,
  },
  {
    id: 'ai-fundamentals',
    title: 'AI Fundamentals',
    issuer: 'Google',
    organization: 'Google Cloud Skills Boost',
    date: '2026',
    badge: 'Generative AI & Cloud',
    summary: 'In-depth exploration of modern generative AI architectures, foundational transformer models, natural language processing, prompt engineering, and cloud AI workflows.',
    topics: [
      'Generative AI & Large Language Models',
      'Transformer Architecture Fundamentals',
      'Prompt Engineering & Attention Mechanisms',
      'Cloud AI & Enterprise Deployment',
    ],
    verified: true,
  },
];
