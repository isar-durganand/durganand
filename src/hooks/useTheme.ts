import { useState, useEffect, useCallback } from 'react';

type Theme = 'dark' | 'light';

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('theme') as Theme | null;
      return stored || 'dark';
    }
    return 'dark';
  });

  useEffect(() => {
    const root = document.documentElement;
    // Always default and enforce dark mode styling
    root.classList.add('dark');
    if (theme === 'light') {
      root.classList.remove('dark');
      document.body.style.backgroundColor = '#0B0F19';
      document.body.style.color = '#F1F5F9';
    } else {
      root.classList.add('dark');
      document.body.style.backgroundColor = '#030509';
      document.body.style.color = '#F8FAFC';
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  }, []);

  return { theme, toggleTheme, isDark: theme === 'dark' };
}
