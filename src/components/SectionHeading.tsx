import { motion } from 'motion/react';

interface SectionHeadingProps {
  badge?: string;
  title: string;
  subtitle?: string;
  className?: string;
}

export function SectionHeading({ badge, title, subtitle, className = '' }: SectionHeadingProps) {
  return (
    <div className={`mb-12 md:mb-16 ${className}`}>
      {badge && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="inline-flex items-center gap-2 px-3 py-1 mb-4 rounded-full border border-slate-300 dark:border-white/10 bg-slate-100/80 dark:bg-white/5 text-[10px] font-mono tracking-[0.2em] uppercase text-slate-600 dark:text-white/60"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-slate-800 dark:bg-white animate-pulse" />
          {badge}
        </motion.div>
      )}
      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter uppercase text-slate-900 dark:text-white"
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-3 text-sm md:text-base text-slate-600 dark:text-white/60 max-w-2xl font-light leading-relaxed tracking-wide"
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}
