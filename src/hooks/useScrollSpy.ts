import { useState, useEffect } from 'react';

const SECTIONS = ['work', 'about', 'skills', 'contact', 'linkedin'] as const;
export type SectionId = (typeof SECTIONS)[number];

export function useScrollSpy() {
  const [activeSection, setActiveSection] = useState<SectionId>('work');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const id = entry.target.id as SectionId;
            if (SECTIONS.includes(id)) {
              setActiveSection(id);
            }
          }
        }
      },
      {
        rootMargin: '-20% 0px -60% 0px',
        threshold: 0,
      }
    );

    const elements = SECTIONS.map((id) => document.getElementById(id)).filter(
      Boolean
    ) as HTMLElement[];

    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return { activeSection, sections: SECTIONS };
}
