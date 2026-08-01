import { motion } from 'motion/react';
import { Download, ArrowDown, Sparkles, MapPin, Briefcase } from 'lucide-react';
import { resumeData } from '../utils/resumeData';
import { useMagnetic } from '../hooks/useMagnetic';
import { useConfetti } from '../hooks/useConfetti';
import { downloadResumePDF } from '../utils/pdfGenerator';

export function Hero() {
  const { ref: expRef, position: expPos, handleMouseMove: expMove, handleMouseLeave: expLeave } = useMagnetic(0.2);
  const { ref: dlRef, position: dlPos, handleMouseMove: dlMove, handleMouseLeave: dlLeave } = useMagnetic(0.2);
  const { triggerDownloadConfetti } = useConfetti();

  const handleDownload = () => {
    triggerDownloadConfetti();
    downloadResumePDF();
  };

  const scrollToExperience = () => {
    document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-between pt-28 pb-12 px-4 md:px-8 max-w-7xl mx-auto overflow-hidden"
    >
      {/* Top Meta Badge */}
      <div className="pt-8">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-slate-300 dark:border-white/10 bg-slate-100/80 dark:bg-white/5 backdrop-blur-md"
        >
          <span className="flex h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[10px] font-mono tracking-widest uppercase text-slate-700 dark:text-white/80">
            {resumeData.personal.headline}
          </span>
          <span className="text-slate-400 dark:text-white/20">•</span>
          <span className="text-[10px] font-mono tracking-widest uppercase text-slate-500 dark:text-white/50 flex items-center gap-1">
            <MapPin className="w-3 h-3 text-slate-700 dark:text-white/70" />
            {resumeData.personal.location.city}, {resumeData.personal.location.country}
          </span>
        </motion.div>
      </div>

      {/* Hero Typography Main Block */}
      <div className="my-auto py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-[10px] font-mono tracking-[0.2em] uppercase text-slate-500 dark:text-white/40 font-medium mb-4 flex items-center gap-2"
        >
          <Briefcase className="w-3.5 h-3.5" />
          {resumeData.personal.title}
        </motion.div>

        {/* Massive Name Display */}
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-extrabold tracking-tighter uppercase text-slate-900 dark:text-white leading-[0.88]"
        >
          {resumeData.personal.fullName} 
        
        </motion.h1>

        {/* Subtitle Headline */}
        <motion.p
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-6 text-base sm:text-lg md:text-xl font-light text-slate-600 dark:text-white/60 max-w-2xl leading-relaxed tracking-wide"
        >
          Architecting high-performance enterprise React & Next.js web platforms with precision engineering, modern state management, and fluid animations.
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          {/* Download Resume Button */}
          <motion.button
            ref={dlRef as any}
            onMouseMove={dlMove}
            onMouseLeave={dlLeave}
            animate={{ x: dlPos.x, y: dlPos.y }}
            onClick={handleDownload}
            className="px-8 py-3.5 rounded-full bg-slate-900 text-white dark:bg-white dark:text-black font-mono text-xs font-bold uppercase tracking-widest flex items-center gap-3 transition-all duration-300 hover:scale-105 active:scale-95 group shadow-sm border border-slate-900 dark:border-white"
          >
            <Download className="w-3.5 h-3.5 transition-transform duration-300 group-hover:-translate-y-0.5" />
            <span>Download CV</span>
          </motion.button>

          {/* View Experience */}
          <motion.button
            ref={expRef as any}
            onMouseMove={expMove}
            onMouseLeave={expLeave}
            animate={{ x: expPos.x, y: expPos.y }}
            onClick={scrollToExperience}
            className="px-8 py-3.5 rounded-full border border-slate-300 dark:border-white/20 bg-slate-100/50 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 text-slate-900 dark:text-white font-mono text-xs font-bold uppercase tracking-widest transition-all duration-300 active:scale-95 flex items-center gap-2"
          >
            <span>Experience</span>
            <Sparkles className="w-3.5 h-3.5 text-slate-600 dark:text-white/60" />
          </motion.button>

          {/* Contact */}
          <button
            onClick={scrollToContact}
            className="px-6 py-3.5 text-[10px] font-mono tracking-widest uppercase text-slate-500 dark:text-white/50 hover:text-slate-900 dark:hover:text-white transition-colors"
          >
            Contact →
          </button>
        </motion.div>
      </div>

      {/* Bottom Mouse Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.8 }}
        className="flex items-center justify-between border-t border-slate-200 dark:border-white/10 pt-6 text-[10px] text-slate-500 dark:text-white/40 font-mono tracking-widest uppercase"
      >
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span>4 Years Experience • Frontend Architecture</span>
        </div>

        <button
          onClick={scrollToExperience}
          className="flex items-center gap-2 text-slate-600 dark:text-white/50 hover:text-slate-900 dark:hover:text-white transition-colors group cursor-pointer"
        >
          <span>SCROLL TO EXPLORE</span>
          <ArrowDown className="w-3 h-3 transition-transform duration-300 group-hover:translate-y-1 text-slate-800 dark:text-white/80" />
        </button>
      </motion.div>
    </section>
  );
}
