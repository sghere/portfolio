import { motion } from 'motion/react';
import { SectionHeading } from '../components/SectionHeading';
import { resumeData } from '../utils/resumeData';
import { Counter } from '../components/Counter';
import { Zap, Gauge, Flame, Users, TrendingUp, Clock } from 'lucide-react';

export function Achievements() {
  const icons = [Gauge, Zap, TrendingUp, Flame, Clock, Users];

  return (
    <section id="achievements" className="py-24 px-4 md:px-8 max-w-7xl mx-auto">
      <SectionHeading
        badge="Key Impact & Metrics"
        title="Quantifiable Performance Deliverables."
        subtitle="Empirical benchmarks demonstrating optimized Core Web Vitals, payload reductions, and user scale."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {resumeData.achievements.map((item, idx) => {
          const Icon = icons[idx % icons.length];

          // Parse numbers if available for count up
          let countValue: number | null = null;
          let prefix = '';
          let suffix = '';

          if (item.value.includes('91%')) {
            countValue = 91;
            suffix = '% Reduction';
          } else if (item.value.includes('150%')) {
            countValue = 150;
            suffix = '% Faster';
          } else if (item.value.includes('1000+')) {
            countValue = 1000;
            prefix = '1,000+ ';
            suffix = 'Users';
          }

          return (
            <motion.div
              key={item.metric}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ y: -3, transition: { duration: 0.2 } }}
              className="p-8 rounded-xl bg-white/70 dark:bg-white/[0.02] border border-slate-200 dark:border-white/10 backdrop-blur-md hover:border-slate-400 dark:hover:border-white/20 transition-all duration-300 relative overflow-hidden group"
            >
              <div className="flex items-center justify-between border-b border-slate-200 dark:border-white/10 pb-4 mb-4">
                <span className="text-[10px] font-mono tracking-widest uppercase text-slate-500 dark:text-white/40">
                  {item.metric}
                </span>
                <div className="p-2 rounded-lg bg-slate-100 dark:bg-white/5 text-slate-800 dark:text-white border border-slate-200 dark:border-white/10">
                  <Icon className="w-4 h-4" />
                </div>
              </div>

              {/* Metric Value Display */}
              <div className="text-2xl sm:text-3xl font-light italic text-slate-900 dark:text-white font-mono tracking-tight my-3">
                {countValue !== null ? (
                  <Counter value={countValue} prefix={prefix} suffix={suffix} />
                ) : (
                  item.value
                )}
              </div>

              <p className="text-[10px] text-slate-500 dark:text-white/40 font-mono tracking-wider uppercase leading-relaxed">
                Benchmark outcome verified through Chrome DevTools & WebPageTest telemetry.
              </p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
