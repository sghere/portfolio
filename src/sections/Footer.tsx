import { resumeData } from '../utils/resumeData';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-8 px-4 md:px-8 border-t border-slate-200 dark:border-white/10 max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-[9px] uppercase tracking-[0.2em] font-mono text-slate-500 dark:text-white/40">
      <div>
        © {currentYear} {resumeData.personal.fullName} · Clean Minimalism
      </div>
      <div className="flex items-center gap-3">
        <span>React & TypeScript Architecture</span>
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
      </div>
    </footer>
  );
}
