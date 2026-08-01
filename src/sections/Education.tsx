import { motion } from 'motion/react';
import { SectionHeading } from '../components/SectionHeading';
import { resumeData } from '../utils/resumeData';
import { GraduationCap, Calendar, MapPin } from 'lucide-react';

export function Education() {
  return (
    <section id="education" className="py-24 px-4 md:px-8 max-w-7xl mx-auto">
      <SectionHeading
        badge="Academic Credentials"
        title="Education & Technical Degrees."
        subtitle="Formal post-graduate computer application and information technology qualifications from premier universities in Mumbai."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {resumeData.education.map((edu, idx) => (
          <motion.div
            key={edu.degree}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.15 }}
            className="p-8 rounded-xl bg-white/70 dark:bg-white/[0.02] border border-slate-200 dark:border-white/10 backdrop-blur-md shadow-sm flex flex-col justify-between hover:border-slate-400 dark:hover:border-white/20 transition-all duration-300"
          >
            <div>
              <div className="p-2.5 rounded-lg bg-slate-100 dark:bg-white/5 text-slate-800 dark:text-white border border-slate-200 dark:border-white/10 w-fit mb-4">
                <GraduationCap className="w-5 h-5" />
              </div>

              <h3 className="text-xl font-bold uppercase tracking-tight text-slate-900 dark:text-white">
                {edu.degree}
              </h3>

              <div className="text-xs font-mono tracking-widest uppercase text-slate-600 dark:text-white/70 mt-2">
                {edu.institution}
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-slate-200 dark:border-white/10 flex items-center justify-between text-[10px] font-mono tracking-widest uppercase text-slate-500 dark:text-white/40">
              <span className="flex items-center gap-1">
                <Calendar className="w-3 h-3 text-slate-700 dark:text-white/60" />
                {edu.startDate} — {edu.endDate}
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3 h-3 text-emerald-500" />
                {edu.location}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
