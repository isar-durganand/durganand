/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    fontFamily: {
      display: ['"Outfit"', '"Bricolage Grotesque"', 'system-ui', 'sans-serif'],
      syne: ['"Syne"', 'sans-serif'],
      body: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
      mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
    },
    extend: {
      colors: {
        carbon: {
          950: '#07080B',
          900: '#0D0F14',
          850: '#12151B',
          800: '#181C24',
          750: '#202530',
          700: '#2A303F',
          600: '#41495D',
          500: '#64708A',
          400: '#8C98B2',
          300: '#B5BED0',
          200: '#D9DFEB',
          150: '#E9EEF6',
          100: '#F2F5FA',
          50: '#F9FAFB',
        },
        accent: {
          DEFAULT: '#FF5520',
          hover: '#E54512',
          amber: '#F59E0B',
          glow: 'rgba(255, 85, 32, 0.4)',
          surface: 'rgba(255, 85, 32, 0.08)',
          'surface-strong': 'rgba(255, 85, 32, 0.16)',
        },
        cyber: {
          cyan: '#06B6D4',
          emerald: '#10B981',
          violet: '#8B5CF6',
        },
      },
      letterSpacing: {
        'display': '-0.04em',
        'tight-display': '-0.055em',
      },
      borderRadius: {
        'squircle': '20px',
        'squircle-lg': '26px',
        'squircle-xl': '32px',
      },
      boxShadow: {
        'glow-accent': '0 0 35px -5px rgba(255, 85, 32, 0.35)',
        'glow-cyan': '0 0 35px -5px rgba(6, 182, 212, 0.35)',
        'glow-emerald': '0 0 35px -5px rgba(16, 185, 129, 0.35)',
        'glass-card': '0 12px 40px -10px rgba(0, 0, 0, 0.5), inset 0 1px 1px 0 rgba(255, 255, 255, 0.08)',
        'glass-card-light': '0 12px 30px -10px rgba(0, 0, 0, 0.08), inset 0 1px 1px 0 rgba(255, 255, 255, 0.9)',
      },
      backdropBlur: {
        'nav': '20px',
        'glass': '16px',
      },
      transitionTimingFunction: {
        'spring': 'cubic-bezier(0.22, 1, 0.36, 1)',
        'smooth': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      animation: {
        'pulse-slow': 'pulse-slow 3s ease-in-out infinite',
        'float': 'float 5s ease-in-out infinite',
        'float-delayed': 'float 5s ease-in-out 2.5s infinite',
        'shimmer': 'shimmer 2.4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 20s linear infinite',
      },
      keyframes: {
        'pulse-slow': {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.5', transform: 'scale(1.08)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        'shimmer': {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
    },
  },
  plugins: [],
}
