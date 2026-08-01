import { Sun, Moon, Download, Menu, X, ArrowUpRight } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useConfetti } from '../hooks/useConfetti';
import { downloadResumePDF } from '../utils/pdfGenerator';

interface NavbarProps {
  activeSection: string;
  scrollProgress: number;
  theme: 'dark' | 'light';
  toggleTheme: () => void;
}

export function Navbar({ activeSection, scrollProgress, theme, toggleTheme }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { triggerDownloadConfetti } = useConfetti();

  const navItems = [
    { id: 'hero', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'experience', label: 'Experience' },
    { id: 'projects', label: 'Projects' },
    { id: 'skills', label: 'Skills' },
    { id: 'achievements', label: 'Impact' },
    { id: 'publications', label: 'Publications' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleDownload = () => {
    triggerDownloadConfetti();
    downloadResumePDF();
  };

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Top Scroll Progress Indicator */}
      <div className="fixed top-0 left-0 right-0 h-0.5 bg-slate-200/20 dark:bg-white/10 z-50">
        <motion.div
          className="h-full bg-slate-900 dark:bg-white"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Floating Header */}
      <header className="fixed top-5 left-0 right-0 z-40 px-4 md:px-8 max-w-7xl mx-auto flex items-center justify-between pointer-events-none">
        {/* Brand/Logo Pill */}
        <motion.button
          onClick={() => scrollTo('hero')}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="pointer-events-auto flex items-center gap-3 px-5 py-2.5 rounded-full backdrop-blur-md bg-white/80 dark:bg-black/60 border border-slate-200 dark:border-white/10 shadow-sm text-slate-900 dark:text-white transition-all duration-300 hover:border-black/30 dark:hover:border-white/30"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="font-mono uppercase tracking-widest text-[11px] font-semibold">Shubham Gaikwad</span>
          <span className="hidden sm:inline-block text-[9px] px-2 py-0.5 rounded-sm bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-600 dark:text-white/60 font-mono tracking-wider uppercase">
            Architect
          </span>
        </motion.button>

        {/* Desktop Navigation Bar */}
        <motion.nav
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="hidden lg:flex pointer-events-auto items-center gap-1 px-4 py-2 rounded-full backdrop-blur-md bg-white/80 dark:bg-black/60 border border-slate-200 dark:border-white/10 shadow-sm"
        >
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`relative px-3.5 py-1.5 text-[10px] font-mono tracking-widest uppercase rounded-full transition-colors duration-200 ${
                  isActive
                    ? 'text-slate-900 dark:text-white font-bold'
                    : 'text-slate-500 dark:text-white/50 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 rounded-full bg-slate-100 dark:bg-white/10 border border-slate-300 dark:border-white/20"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{item.label}</span>
              </button>
            );
          })}
        </motion.nav>

        {/* Action Controls */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="pointer-events-auto flex items-center gap-2"
        >
          {/* Theme Toggle 
           <button
             onClick={toggleTheme}
             aria-label="Toggle Theme"
             className="p-2.5 rounded-full backdrop-blur-md bg-white/80 dark:bg-black/60 border border-slate-200 dark:border-white/10 shadow-sm text-slate-700 dark:text-white/80 hover:text-slate-900 dark:hover:text-white transition-all duration-300 hover:scale-105"
           >
             {theme === 'dark' ? <Sun className="w-3.5 h-3.5 text-amber-300" /> : <Moon className="w-3.5 h-3.5 text-slate-800" />}
           </button>
          */}

          {/* Download Resume Button */}
          <button
            onClick={handleDownload}
            className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-slate-900 text-white dark:bg-white dark:text-black font-mono text-[10px] tracking-widest uppercase font-bold transition-all duration-300 hover:scale-105 active:scale-95 group border border-slate-900 dark:border-white"
          >
            <Download className="w-3 h-3 transition-transform duration-300 group-hover:-translate-y-0.5" />
            <span>Resume</span>
          </button>

          {/* Mobile Menu Trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Mobile Menu"
            className="lg:hidden p-2.5 rounded-full backdrop-blur-md bg-white/80 dark:bg-black/60 border border-slate-200 dark:border-white/10 shadow-sm text-slate-700 dark:text-white"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </motion.div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-20 left-4 right-4 z-40 p-6 rounded-2xl backdrop-blur-2xl bg-white/95 dark:bg-slate-900/95 border border-slate-200 dark:border-slate-800 shadow-2xl lg:hidden"
          >
            <div className="flex flex-col gap-3">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className={`text-left px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                    activeSection === item.id
                      ? 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-semibold'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/50'
                  }`}
                >
                  {item.label}
                </button>
              ))}
              <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between gap-3">
                <button
                  onClick={handleDownload}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-indigo-600 text-white font-semibold text-xs shadow-md"
                >
                  <Download className="w-4 h-4" /> Download Resume PDF
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
