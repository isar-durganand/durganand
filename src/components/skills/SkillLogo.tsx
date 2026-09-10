import React from 'react';

interface SkillLogoProps {
  name: string;
  className?: string;
}

export function SkillLogo({ name, className = 'w-5 h-5' }: SkillLogoProps) {
  switch (name) {
    case 'C':
      return (
        <svg viewBox="0 0 128 128" className={className}>
          <path fill="#A8B9CC" d="M116.5 76.6c-4.4 17.5-18.4 29.5-36.8 29.5-23.7 0-41.2-18.4-41.2-42.1s17.5-42.1 41.2-42.1c17.5 0 31.5 11.4 36.3 27.9l-18.4 4.8c-3.1-9.6-9.6-15.7-17.9-15.7-13.1 0-22.7 10.9-22.7 25.1s9.6 25.1 22.7 25.1c9.2 0 15.3-6.6 18.4-16.6l18.4 4.1z" />
          <path fill="#00599C" d="M64 0C28.7 0 0 28.7 0 64s28.7 64 64 64 64-28.7 64-64S99.3 0 64 0zm0 114.7C36 114.7 13.3 92 13.3 64S36 13.3 64 13.3 114.7 36 114.7 64 92 114.7 64 114.7z" />
        </svg>
      );

    case 'C++':
    case 'C++ STL':
      return (
        <svg viewBox="0 0 128 128" className={className}>
          <path fill="#00599C" d="M117.5 76.6c-4.4 17.5-18.4 29.5-36.8 29.5-23.7 0-41.2-18.4-41.2-42.1s17.5-42.1 41.2-42.1c17.5 0 31.5 11.4 36.3 27.9l-18.4 4.8c-3.1-9.6-9.6-15.7-17.9-15.7-13.1 0-22.7 10.9-22.7 25.1s9.6 25.1 22.7 25.1c9.2 0 15.3-6.6 18.4-16.6l18.4 4.1z" />
          <path fill="#004482" d="M64 0C28.7 0 0 28.7 0 64s28.7 64 64 64 64-28.7 64-64S99.3 0 64 0zm0 114.7C36 114.7 13.3 92 13.3 64S36 13.3 64 13.3 114.7 36 114.7 64 92 114.7 64 114.7z" />
          <path fill="#00599C" d="M88 56h6v-6h4v6h6v4h-6v6h-4v-6h-6zm20 0h6v-6h4v6h6v4h-6v6h-4v-6h-6z" />
        </svg>
      );

    case 'Python':
      return (
        <svg viewBox="0 0 128 128" className={className}>
          <path fill="#3776AB" d="M63.6 5.8c-14.7 0-23.9 6.4-23.9 18.7v14h24.5v3.5H30.4C16.8 42 5.5 50.4 5.5 66.8c0 15.8 11.7 24.3 25.2 24.3h8.3v-11.8c0-13.5 11.8-25.2 25.2-25.2h24.2V39.7c0-14.2-12.3-24.3-25.4-24.3l10.6-9.6zm-12.4 9.1c3.5 0 6.3 2.8 6.3 6.3s-2.8 6.3-6.3 6.3-6.3-2.8-6.3-6.3 2.8-6.3 6.3-6.3z" />
          <path fill="#FFD438" d="M64.4 122.2c14.7 0 23.9-6.4 23.9-18.7v-14H63.8V86h33.8c13.6 0 24.9-8.4 24.9-24.8 0-15.8-11.7-24.3-25.2-24.3h-8.3v11.8c0 13.5-11.8 25.2-25.2 25.2H44.8v14.4c0 14.2 12.3 24.3 25.4 24.3l-5.8 9.6zm12.4-9.1c-3.5 0-6.3-2.8-6.3-6.3s2.8-6.3 6.3-6.3 6.3 2.8 6.3 6.3-2.8 6.3-6.3 6.3z" />
        </svg>
      );

    case 'JavaScript':
      return (
        <svg viewBox="0 0 128 128" className={className}>
          <rect width="128" height="128" rx="16" fill="#F7DF1E" />
          <path fill="#000000" d="M67.3 100c0 9-5.3 13.5-14.1 13.5-7.7 0-12.3-4.2-14.5-9.3l9.8-5.9c1.4 2.8 3.3 4.6 6.1 4.6 3.2 0 5-1.5 5-5.5V57.3h10.9V100h-3.2zm29.8 13.5c-11.8 0-18.4-6.4-20.9-12.3l9.9-5.7c1.7 3.4 4.8 6.2 8.9 6.2 4.4 0 7.2-2.1 7.2-5.2 0-3.6-2.9-4.8-8-7l-2.8-1.2c-8-3.4-13.3-7.8-13.3-17.1 0-8.5 6.6-15 17-15 7.4 0 12.8 2.8 16.2 8.7l-9.2 5.9c-1.7-3.1-3.9-4.3-7-4.3-3.1 0-5.4 1.9-5.4 4.4 0 3.1 2.1 4.3 6.9 6.4l2.8 1.2c9.5 4.1 14.7 8.3 14.7 17.7-.2 9.8-7.3 17.3-17 17.3z" />
        </svg>
      );

    case 'TypeScript':
      return (
        <svg viewBox="0 0 128 128" className={className}>
          <rect width="128" height="128" rx="16" fill="#3178C6" />
          <path fill="#FFFFFF" d="M38.8 55.4h28.4v10.9H53.9v47H42v-47H38.8V55.4zm34.6 34.8c4.3 3.9 10.2 6.4 16.5 6.4 7.2 0 11.5-3.5 11.5-8.7 0-5.1-3.6-7.8-11.8-11.2l-3.9-1.6c-11.1-4.6-16.7-10.7-16.7-20.5 0-12.1 9.9-20.9 25.1-20.9 8.2 0 15.6 2.6 20.8 7.2l-5.6 9.6c-4.2-3.3-9.1-5.1-14.8-5.1-7.2 0-11.1 3.5-11.1 8 0 4.9 3.8 7.3 11.5 10.6l3.9 1.6c12.3 5.3 17.5 11.5 17.5 21.6 0 13.5-10.4 22.3-26.6 22.3-9.5 0-18.4-3.3-24.1-8.9l7.8-10.4z" />
        </svg>
      );

    case 'React':
      return (
        <svg viewBox="0 0 128 128" className={className}>
          <ellipse cx="64" cy="64" rx="48" ry="18" fill="none" stroke="#61DAFB" strokeWidth="6" />
          <ellipse cx="64" cy="64" rx="48" ry="18" fill="none" stroke="#61DAFB" strokeWidth="6" transform="rotate(60 64 64)" />
          <ellipse cx="64" cy="64" rx="48" ry="18" fill="none" stroke="#61DAFB" strokeWidth="6" transform="rotate(120 64 64)" />
          <circle cx="64" cy="64" r="9" fill="#61DAFB" />
        </svg>
      );

    case 'HTML5':
      return (
        <svg viewBox="0 0 128 128" className={className}>
          <path fill="#E34F26" d="M19.2 115.6L8.5 0h111l-10.7 115.6L64 128l-44.8-12.4z" />
          <path fill="#EF652A" d="M64 117.8l37.2-10.3 8.9-96.5H64v106.8z" />
          <path fill="#EBEBEB" d="M64 51.9H45.7l-1.3-14.3H64V23.7H29.1l3.8 42.1H64V51.9zm0 37.3l-.2.1-16.7-4.5-1.1-12h-14l2.1 23.3 29.8 8.3.1-.2v-15z" />
          <path fill="#FFFFFF" d="M63.9 51.9h18.3l-1.7 19.3-16.6 4.5v14.4l29.8-8.3 3.4-37.9.7-7.7.4-4.2H63.9v14.9zm0-28.2h35.7l.4-4H63.9v4z" />
        </svg>
      );

    case 'CSS3':
      return (
        <svg viewBox="0 0 128 128" className={className}>
          <path fill="#1572B6" d="M19.2 115.6L8.5 0h111l-10.7 115.6L64 128l-44.8-12.4z" />
          <path fill="#33A9DC" d="M64 117.8l37.2-10.3 8.9-96.5H64v106.8z" />
          <path fill="#FFFFFF" d="M64 52.3h19.5l-1.8 20.3L64 77.5V93l29.9-8.3 3.9-43.6H64V26.2h36.1l.8-8.8H64v34.9z" />
          <path fill="#EBEBEB" d="M64 52.3H44.8l-1.3-14.9H64V26.2h-.1-35.9l.8 8.8 3.5 39.4H64V52.3zm0 39.8l-.2.1-16.8-4.5-1.1-12.3H31.9l2.1 23.8 30 8.3V92.1z" />
        </svg>
      );

    case 'Tailwind CSS':
      return (
        <svg viewBox="0 0 128 128" className={className}>
          <path fill="#06B6D4" d="M64 24C48 24 38 32 34 48c6-8 13-11 21-9 4.6 1.1 7.8 4.4 11.4 8.1C72.3 53.1 79.7 60 96 60c16 0 26-8 30-24-6 8-13 11-21 9-4.6-1.1-7.8-4.4-11.4-8.1C87.7 30.9 80.3 24 64 24zm-32 40C16 64 6 72 2 88c6-8 13-11 21-9 4.6 1.1 7.8 4.4 11.4 8.1C40.3 93.1 47.7 100 64 100c16 0 26-8 30-24-6 8-13 11-21 9-4.6-1.1-7.8-4.4-11.4-8.1C55.7 70.9 48.3 64 32 64z" />
        </svg>
      );

    case 'Git':
      return (
        <svg viewBox="0 0 128 128" className={className}>
          <path fill="#F05032" d="M125.1 56.4L71.6 2.9c-3.9-3.9-10.2-3.9-14.1 0L46 14.4l17.8 17.8c4.2-1.4 9.1-.5 12.5 2.8 3.4 3.4 4.3 8.3 2.8 12.5l17.2 17.2c4.2-1.4 9.1-.5 12.5 2.8 4.8 4.8 4.8 12.6 0 17.5s-12.6 4.8-17.5 0c-3.6-3.6-4.4-8.9-2.5-13.3L72.2 47.9v35.8c1.3.8 2.5 1.9 3.4 3.1 4.8 4.8 4.8 12.6 0 17.5s-12.6 4.8-17.5 0c-4.8-4.8-4.8-12.6 0-17.5 1.2-1.2 2.5-2.1 4-2.8V47.2c-1.5-.7-2.8-1.6-4-2.8-3.6-3.6-4.4-8.9-2.5-13.3L37.8 13.3 2.9 48.2c-3.9 3.9-3.9 10.2 0 14.1l53.5 53.5c3.9 3.9 10.2 3.9 14.1 0l54.6-54.6c3.9-3.9 3.9-10.2 0-14.8z" />
        </svg>
      );

    case 'GitHub':
      return (
        <svg viewBox="0 0 128 128" className={className} fill="#FFFFFF">
          <path fillRule="evenodd" clipRule="evenodd" d="M64 0C28.7 0 0 28.7 0 64c0 28.2 18.3 52.2 43.7 60.7 3.2.6 4.4-1.4 4.4-3.1v-10.9c-17.8 3.9-21.6-8.6-21.6-8.6-2.9-7.4-7.1-9.4-7.1-9.4-5.8-4 .4-3.9.4-3.9 6.4.5 9.8 6.6 9.8 6.6 5.7 9.8 15 7 18.7 5.3.6-4.1 2.2-7 4-8.6-14.2-1.6-29.2-7.1-29.2-31.6 0-7 2.5-12.7 6.6-17.2-.7-1.6-2.9-8.1.6-17 0 0 5.4-1.7 17.6 6.6 5.1-1.4 10.6-2.1 16-2.2 5.4.1 10.9.8 16 2.2 12.2-8.3 17.6-6.6 17.6-6.6 3.5 8.9 1.3 15.4.6 17 4.1 4.5 6.6 10.2 6.6 17.2 0 24.6-15 30-29.3 31.6 2.3 2 4.3 5.9 4.3 11.9v17.7c0 1.7 1.2 3.7 4.4 3.1C109.7 116.2 128 92.2 128 64c0-35.3-28.7-64-64-64z" />
        </svg>
      );

    case 'Vercel':
      return (
        <svg viewBox="0 0 128 128" className={className}>
          <polygon points="64,16 128,112 0,112" fill="#FFFFFF" />
        </svg>
      );

    case 'Firebase':
      return (
        <svg viewBox="0 0 128 128" className={className}>
          <path fill="#FFA000" d="M17.4 97.5L34.1 6.8c.4-2.2 3.2-3.1 4.7-1.4L58.2 24.7 17.4 97.5z" />
          <path fill="#F57F17" d="M17.4 97.5l48.5 27.2c2.1 1.2 4.7 1.2 6.8 0l48.5-27.2L89.6 42.1 17.4 97.5z" />
          <path fill="#FFCA28" d="M89.6 42.1L71.4 7.6c-1-1.9-3.7-2-4.8-.2L17.4 97.5l42.4-74.8c1-1.8 3.6-2 4.7-.3l25.1 19.7z" />
        </svg>
      );

    case 'Vite':
      return (
        <svg viewBox="0 0 128 128" className={className}>
          <path fill="url(#vite-grad)" d="M124.8 18.5L66.7 122.9c-1.2 2.1-4.2 2.1-5.4 0L3.2 18.5c-1.3-2.3.5-5.1 3.1-4.9l58.1 4.4 57.3-4.4c2.6-.2 4.4 2.6 3.1 4.9z" />
          <path fill="#FFD62E" d="M74.8 15.3l-38.6 3.8-5.7 33.7c-.5 2.7 2.1 4.8 4.7 3.8l13.6-5.4-8.8 34.6c-.8 3.1 3.2 5.1 5.3 2.6l37.8-44.5c2.1-2.5.4-6.4-2.8-6.5l-14.7-.6 10.9-18.4c1.3-2.2-.4-5.1-2.9-5.1h-3.8l5.2-1.9v2z" />
          <defs>
            <linearGradient id="vite-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#41D1FF" />
              <stop offset="100%" stopColor="#BD34FE" />
            </linearGradient>
          </defs>
        </svg>
      );

    case 'Data Structures & Algorithms':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="#00FF9D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="5" r="3" fill="#00FF9D" fillOpacity="0.25" />
          <circle cx="6" cy="18" r="3" fill="#00F0FF" fillOpacity="0.25" />
          <circle cx="18" cy="18" r="3" fill="#00F0FF" fillOpacity="0.25" />
          <path d="M10 7.5L7.5 15.5" stroke="#00F0FF" />
          <path d="M14 7.5L16.5 15.5" stroke="#00F0FF" />
        </svg>
      );

    case 'Arrays & Hashing':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="#00FF9D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="18" height="18" rx="3" fill="#00FF9D" fillOpacity="0.15" />
          <line x1="3" y1="9" x2="21" y2="9" />
          <line x1="3" y1="15" x2="21" y2="15" />
          <line x1="9" y1="3" x2="9" y2="21" />
          <line x1="15" y1="3" x2="15" y2="21" />
        </svg>
      );

    case 'Trees & Graphs':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="#00F0FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="4" r="2.5" fill="#00F0FF" />
          <circle cx="6" cy="12" r="2.5" fill="#00FF9D" />
          <circle cx="18" cy="12" r="2.5" fill="#00FF9D" />
          <circle cx="4" cy="20" r="2" fill="#FF5500" />
          <circle cx="8" cy="20" r="2" fill="#FF5500" />
          <line x1="12" y1="6.5" x2="6" y2="9.5" />
          <line x1="12" y1="6.5" x2="18" y2="9.5" />
          <line x1="6" y1="14.5" x2="4" y2="18" />
          <line x1="6" y1="14.5" x2="8" y2="18" />
        </svg>
      );

    case 'Dynamic Programming':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="#FF5500" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="3" width="20" height="18" rx="2" fill="#FF5500" fillOpacity="0.15" />
          <path d="M7 8h10" />
          <path d="M7 12h10" />
          <path d="M7 16h6" />
          <circle cx="17" cy="16" r="2" fill="#00FF9D" />
        </svg>
      );

    case 'Google':
    case 'Google Cloud':
      return (
        <svg viewBox="0 0 48 48" className={className}>
          <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
          <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
          <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
          <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
        </svg>
      );

    default:
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="#00F0FF" strokeWidth="2">
          <polyline points="16 18 22 12 16 6" />
          <polyline points="8 6 2 12 8 18" />
        </svg>
      );
  }
}
