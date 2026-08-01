import { useEffect } from 'react';
import { AnimatedBackground } from './components/AnimatedBackground';
import { MouseFollower } from './components/MouseFollower';
import { Navbar } from './components/Navbar';
import { Hero } from './sections/Hero';
import { About } from './sections/About';
import { Experience } from './sections/Experience';
import { Projects } from './sections/Projects';
import { Skills } from './sections/Skills';
import { Achievements } from './sections/Achievements';
import { Publications } from './sections/Publications';
import { Education } from './sections/Education';
import { Contact } from './sections/Contact';
import { Footer } from './sections/Footer';
import { useThemeAnimation } from './hooks/useThemeAnimation';
import { useScrollProgress } from './hooks/useScrollProgress';
import { useConfetti } from './hooks/useConfetti';

export default function App() {
  const { theme, toggleTheme } = useThemeAnimation();
  const { progress, activeSection, isCompleted } = useScrollProgress();
  const { triggerCompletionConfetti } = useConfetti();

  // Celebrate when user reaches 100% scroll (triggered ONLY once)
  useEffect(() => {
    if (isCompleted) {
      const timer = setTimeout(() => {
        triggerCompletionConfetti();
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isCompleted]);

  return (
    <div className="min-h-screen bg-[#fafafa] dark:bg-[#050505] text-slate-900 dark:text-white selection:bg-black selection:text-white dark:selection:bg-white dark:selection:text-black transition-colors duration-500 font-sans relative overflow-x-hidden bg-dot-grid-light dark:bg-dot-grid">
      {/* Dynamic Canvas Background */}
      <AnimatedBackground theme={theme} />

      {/* Sleek Custom Cursor */}
      <MouseFollower />

      {/* Floating Blurred Navigation */}
      <Navbar
        activeSection={activeSection}
        scrollProgress={progress}
        theme={theme}
        toggleTheme={toggleTheme}
      />

      {/* Main Content Flow */}
      <main className="relative z-10">
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Achievements />
        <Publications />
        <Education />
        <Contact />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
