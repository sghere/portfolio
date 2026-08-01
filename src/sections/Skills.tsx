import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SectionHeading } from '../components/SectionHeading';
import { SkillGalaxy } from '../components/skills/SkillGalaxy';
import { SkillRadar } from '../components/skills/SkillRadar';
import { SkillConstellation } from '../components/skills/SkillConstellation';
import { Orbit, Radar, GitGraph, Sparkles } from 'lucide-react';

export function Skills() {
  const [activeTab, setActiveTab] = useState<'galaxy' | 'radar' | 'constellation'>('galaxy');

  const tabs = [
    { id: 'galaxy', label: '1. Skill Galaxy (D3 Force Orbit)', icon: Orbit },
    { id: 'radar', label: '2. Domain Radar Chart', icon: Radar },
    { id: 'constellation', label: '3. Constellation Graph', icon: GitGraph },
  ];

  return (
    <section id="skills" className="py-24 px-4 md:px-8 max-w-7xl mx-auto">
      <SectionHeading
        badge="Interactive Skill Visualizations"
        title="Technical Arsenal & Ecosystem Architecture."
        subtitle="Explore domain proficiencies through three distinct interactive visualizations driven by D3.js and spring physics."
      />

      {/* Tab Selector Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-10 p-1.5 rounded-full bg-slate-100/80 dark:bg-white/5 border border-slate-200 dark:border-white/10 backdrop-blur-md max-w-3xl mx-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`relative flex items-center gap-2 px-5 py-2.5 rounded-full text-[10px] font-mono tracking-widest uppercase font-bold transition-all duration-300 cursor-pointer ${
                isActive
                  ? 'text-white dark:text-black'
                  : 'text-slate-600 dark:text-white/50 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="skillsTab"
                  className="absolute inset-0 rounded-full bg-slate-900 dark:bg-white"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
              <Icon className="w-3.5 h-3.5 relative z-10" />
              <span className="relative z-10">{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Active Tab Visualization */}
      <div className="min-h-[550px]">
        <AnimatePresence mode="wait">
          {activeTab === 'galaxy' && (
            <motion.div
              key="galaxy"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
            >
              <SkillGalaxy />
            </motion.div>
          )}

          {activeTab === 'radar' && (
            <motion.div
              key="radar"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
            >
              <SkillRadar />
            </motion.div>
          )}

          {activeTab === 'constellation' && (
            <motion.div
              key="constellation"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
            >
              <SkillConstellation />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
