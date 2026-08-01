import { motion } from 'motion/react';
import { SectionHeading } from '../components/SectionHeading';
import { resumeData } from '../utils/resumeData';
import { BookOpen, ExternalLink, Award, FileCheck2 } from 'lucide-react';

export function Publications() {
  return (
    <section id="publications" className="py-24 px-4 md:px-8 max-w-7xl mx-auto">
      <SectionHeading
        badge="IEEE Research"
        title="Peer-Reviewed Publications."
        subtitle="Academic research and engineering papers published in international conference proceedings."
      />

      <div className="space-y-6">
        {resumeData.publications.map((pub, idx) => (
          <motion.div
            key={pub.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.15 }}
            className="p-8 md:p-10 rounded-xl bg-white/70 dark:bg-white/[0.02] border border-slate-200 dark:border-white/10 backdrop-blur-md shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-8 hover:border-slate-400 dark:hover:border-white/20 transition-all duration-300 group"
          >
            <div className="max-w-3xl space-y-3">
              <div className="flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-sm bg-slate-100 dark:bg-white/5 text-slate-800 dark:text-white border border-slate-200 dark:border-white/10 text-[9px] font-mono font-bold uppercase tracking-widest">
                  <Award className="w-3 h-3 text-slate-700 dark:text-white/70" />
                  {pub.publisher}
                </span>
                <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500 dark:text-white/40 flex items-center gap-1">
                  <FileCheck2 className="w-3 h-3 text-emerald-500" />
                  Published: {pub.publishedDate}
                </span>
              </div>

              <h3 className="text-xl md:text-2xl font-bold uppercase tracking-tight text-slate-900 dark:text-white transition-colors leading-tight">
                {pub.title}
              </h3>

              <p className="text-xs md:text-sm text-slate-600 dark:text-white/70 leading-relaxed font-light">
                Investigated Progressive Web Application (PWA) software architecture for offline-first data aggregation, caching strategies, service worker state machines, and multi-tenant SaaS delivery.
              </p>
            </div>

            <div>
              <a
                href={pub.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-slate-900 text-white dark:bg-white dark:text-black font-mono text-[10px] tracking-widest uppercase font-bold transition-all duration-300 hover:scale-105 group/btn"
              >
                <span>Read on IEEE</span>
                <ExternalLink className="w-3.5 h-3.5 transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
