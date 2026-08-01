import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SectionHeading } from '../components/SectionHeading';
import { resumeData } from '../utils/resumeData';
import { ChevronDown, Calendar, MapPin, Building2, Zap, CheckCircle2 } from 'lucide-react';

export function Experience() {
  const [expandedIndices, setExpandedIndices] = useState<number[]>([0, 1]);

  const toggleExpand = (index: number) => {
    setExpandedIndices((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const getCompanyInitials = (name: string) => {
    if (name.includes('Tata')) return 'TCS';
    if (name.includes('SMARTe')) return 'SM';
    return name.slice(0, 2).toUpperCase();
  };

  return (
    <section id="experience" className="py-24 px-4 md:px-8 max-w-7xl mx-auto">
      <SectionHeading
        badge="Career Experience"
        title="Engineering Enterprise Platforms at Scale."
        subtitle="A detailed breakdown of roles, architecture ownership, leadership, and performance achievements."
      />

      <div className="relative border-l border-slate-300 dark:border-white/10 ml-4 md:ml-8 pl-6 md:pl-12 space-y-12">
        {resumeData.experience.map((item, idx) => {
          const isExpanded = expandedIndices.includes(idx);
          const initials = getCompanyInitials(item.company);

          return (
            <motion.div
              key={item.company + item.startDate}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              className="relative group"
            >
              {/* Timeline Node Ring */}
              <div className="absolute -left-[31px] md:-left-[55px] top-1.5 w-8 h-8 rounded-full border border-slate-400 dark:border-white/20 bg-white dark:bg-black flex items-center justify-center font-mono font-bold text-[10px] text-slate-900 dark:text-white group-hover:scale-110 transition-transform">
                {initials}
              </div>

              {/* Experience Card */}
              <div className="p-6 md:p-8 rounded-xl bg-white/70 dark:bg-white/[0.02] border border-slate-200 dark:border-white/10 backdrop-blur-md hover:border-slate-400 dark:hover:border-white/20 transition-all duration-300">
                {/* Top Role & Company Info */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                  <div>
                    <span className="inline-block text-[9px] font-mono tracking-widest uppercase px-2.5 py-0.5 rounded-sm bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-white/70 mb-2">
                      {item.employmentType}
                    </span>
                    <h3 className="text-xl md:text-2xl font-bold uppercase tracking-tight text-slate-900 dark:text-white flex flex-wrap items-center gap-2">
                      {item.designation}
                      <span className="text-slate-400 dark:text-white/30 font-light">@</span>
                      <span className="text-slate-800 dark:text-white/90">{item.company}</span>
                    </h3>
                  </div>

                  <div className="flex flex-wrap items-center gap-4 text-[10px] font-mono tracking-widest uppercase text-slate-500 dark:text-white/50">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-slate-700 dark:text-white/60" />
                      {item.startDate} — {item.endDate}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-emerald-500" />
                      {item.location}
                    </span>
                  </div>
                </div>

                {/* Technologies Chips */}
                <div className="flex flex-wrap gap-2 my-4">
                  {item.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded-sm text-[9px] uppercase font-mono bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-white/70 border border-slate-200 dark:border-white/10"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Toggle Expand Button */}
                <button
                  onClick={() => toggleExpand(idx)}
                  className="mt-2 flex items-center gap-2 text-[10px] font-mono tracking-widest uppercase font-bold text-slate-800 dark:text-white hover:underline cursor-pointer"
                >
                  <span>{isExpanded ? 'Hide Achievements' : `Show All ${item.responsibilities.length} Points`}</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
                </button>

                {/* Bullet Points */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.ul
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-6 space-y-3 pt-4 border-t border-slate-200 dark:border-white/10 text-xs md:text-sm text-slate-700 dark:text-white/70 leading-relaxed font-light"
                    >
                      {item.responsibilities.map((resp, rIdx) => {
                        const isMetric = resp.includes('%') || resp.includes('MB') || resp.includes('40%') || resp.includes('1.2 seconds') || resp.includes('350ms');
                        return (
                          <li
                            key={rIdx}
                            className={`flex items-start gap-3 p-2.5 rounded-lg transition-colors ${
                              isMetric
                                ? 'bg-slate-100/80 dark:bg-white/5 border border-slate-300 dark:border-white/10 font-normal text-slate-900 dark:text-white'
                                : ''
                            }`}
                          >
                            <CheckCircle2 className={`w-3.5 h-3.5 mt-0.5 shrink-0 ${isMetric ? 'text-slate-900 dark:text-white' : 'text-slate-400 dark:text-white/30'}`} />
                            <span>{resp}</span>
                          </li>
                        );
                      })}
                    </motion.ul>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
