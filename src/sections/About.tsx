import { motion } from 'motion/react';
import { SectionHeading } from '../components/SectionHeading';
import { Counter } from '../components/Counter';
import {
  resumeData,
  getYearsOfExperience,
  getTotalSkillsCount,
  getCompanyCount,
  getProjectCount,
} from '../utils/resumeData';
import { Code2, Cpu, Zap, Layers, Award } from 'lucide-react';

export function About() {
  const years = getYearsOfExperience();
  const totalSkills = getTotalSkillsCount();
  const companies = getCompanyCount();
  const projectsCount = getProjectCount();

  const metrics = [
    { label: 'Years Experience', value: years, suffix: '+', icon: Award, color: 'text-indigo-500' },
    { label: 'Enterprise Systems', value: companies, suffix: '', icon: Layers, color: 'text-purple-500' },
    { label: 'Major Projects', value: projectsCount, suffix: '', icon: Code2, color: 'text-emerald-500' },
    { label: 'Tech Stack Skills', value: totalSkills, suffix: '+', icon: Cpu, color: 'text-cyan-500' },
    { label: 'Page Load Speedup', value: 150, suffix: '%', icon: Zap, color: 'text-amber-500' },
  ];

  return (
    <section id="about" className="py-24 px-4 md:px-8 max-w-7xl mx-auto">
      <SectionHeading
        badge="Biography"
        title="Engineering Scalable Systems & Fluid Web Platforms"
        subtitle="Bridging high-level frontend architecture with real-world performance optimization and enterprise reliability."
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Editorial Text Column */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-7 space-y-6 text-slate-700 dark:text-white/70 leading-relaxed text-sm md:text-base font-light"
        >
          <div className="p-8 rounded-xl bg-white/70 dark:bg-white/[0.02] border border-slate-200 dark:border-white/10 backdrop-blur-md">
            <p className="mb-4">
              {resumeData.summary}
            </p>
            <p className="text-xs font-mono text-slate-500 dark:text-white/40 border-t border-slate-200 dark:border-white/10 pt-4 mt-6 tracking-wider uppercase">
              Location: {resumeData.personal.location.city}, {resumeData.personal.location.state}, {resumeData.personal.location.country} • Immediate Joiner
            </p>
          </div>

          {/* Highlights Box */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="p-5 rounded-lg bg-slate-100/80 dark:bg-white/5 border border-slate-200 dark:border-white/10">
              <div className="text-[10px] font-mono tracking-widest uppercase text-slate-800 dark:text-white/90 font-semibold mb-1">
                Core Specialization
              </div>
              <div className="text-xs font-light text-slate-600 dark:text-white/70">
                React.js, Next.js, Redux Toolkit, RTK Query, React Query & Module Federation.
              </div>
            </div>

            <div className="p-5 rounded-lg bg-slate-100/80 dark:bg-white/5 border border-slate-200 dark:border-white/10">
              <div className="text-[10px] font-mono tracking-widest uppercase text-slate-800 dark:text-white/90 font-semibold mb-1">
                Performance Record
              </div>
              <div className="text-xs font-light text-slate-600 dark:text-white/70">
                Reduced JS payload by 91% (3.2MB → 290KB) & LCP from 5.4s to 1.2s.
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Animated Stats Cards */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="lg:col-span-5 grid grid-cols-2 gap-4"
        >
          {metrics.map((metric, idx) => {
            const Icon = metric.icon;
            return (
              <motion.div
                key={metric.label}
                whileHover={{ y: -3, transition: { duration: 0.2 } }}
                className={`p-6 rounded-xl bg-white/70 dark:bg-white/[0.02] border border-slate-200 dark:border-white/10 ${
                  idx === 0 ? 'col-span-2' : ''
                }`}
              >
                <div className="flex justify-between items-end border-b border-slate-200 dark:border-white/10 pb-4 mb-3">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500 dark:text-white/40">
                    {metric.label}
                  </span>
                  <Icon className="w-4 h-4 text-slate-700 dark:text-white/70" />
                </div>
                <div className="text-3xl md:text-4xl font-light italic tracking-tight text-slate-900 dark:text-white font-mono">
                  <Counter value={metric.value} suffix={metric.suffix} />
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
