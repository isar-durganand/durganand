/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    fontFamily: {
      display: ['"Bricolage Grotesque"', 'system-ui', 'sans-serif'],
      body: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
      mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
    },
    extend: {
      colors: {
        carbon: {
          950: '#0A0A0B',
          900: '#121215',
          850: '#16161A',
          800: '#1C1C21',
          700: '#27272A',
          600: '#3F3F46',
          500: '#52525B',
          400: '#71717A',
          300: '#A1A1AA',
          200: '#D4D4D8',
          150: '#E4E4E7',
          100: '#F4F4F5',
          50: '#FAFAF8',
        },
        accent: {
          DEFAULT: '#FF5A1F',
          hover: '#E04B14',
          surface: 'rgba(255, 90, 31, 0.08)',
          'surface-strong': 'rgba(255, 90, 31, 0.15)',
        },
      },
      letterSpacing: {
        'display': '-0.035em',
        'tight-display': '-0.05em',
      },
      borderRadius: {
        'squircle': '20px',
        'squircle-lg': '24px',
      },
      backdropBlur: {
        'nav': '20px',
      },
      transitionTimingFunction: {
        'spring': 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      animation: {
        'pulse-slow': 'pulse-slow 2s ease-in-out infinite',
        'typing': 'typing 3s steps(20) infinite',
      },
      keyframes: {
        'pulse-slow': {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.6', transform: 'scale(1.15)' },
        },
      },
    },
  },
  plugins: [],
}
