import { useEffect, useState } from 'react';
import Lenis from 'lenis';

export function useScrollProgress() {
  const [progress, setProgress] = useState<number>(0);
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  useEffect(() => {
    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    const rafId = requestAnimationFrame(raf);

    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const currentProgress = (window.scrollY / totalHeight) * 100;
        setProgress(Math.min(100, Math.max(0, currentProgress)));

        if (currentProgress >= 98.5 && !isCompleted) {
          setIsCompleted(true);
        }
      }

      // Detect active section
      const sections = [
        'hero',
        'about',
        'experience',
        'projects',
        'skills',
        'achievements',
        'publications',
        'education',
        'contact',
      ];

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= window.innerHeight * 0.4 && rect.bottom >= window.innerHeight * 0.1) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, [isCompleted]);

  return { progress, activeSection, isCompleted };
}
