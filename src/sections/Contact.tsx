import { useState } from 'react';
import { motion } from 'motion/react';
import { SectionHeading } from '../components/SectionHeading';
import { resumeData } from '../utils/resumeData';
import { Mail, Phone, Linkedin, Github, Copy, Check, ArrowUpRight, Send } from 'lucide-react';

export function Contact() {
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(resumeData.personal.contact.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="contact" className="py-24 px-4 md:px-8 max-w-7xl mx-auto">
      <SectionHeading
        badge="Initiate Dialogue"
        title="Let's Build Extraordinary Frontend Experiences."
        subtitle="Available for Senior Frontend Engineering & UI Architecture roles. Immediate joiner."
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Main Email Hero Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-8 p-8 md:p-12 rounded-xl bg-slate-900 text-white dark:bg-white dark:text-black shadow-lg border border-slate-900 dark:border-white flex flex-col justify-between relative overflow-hidden"
        >
          <div className="relative z-10 space-y-4">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 dark:text-emerald-800 text-[10px] font-mono tracking-widest uppercase font-bold border border-emerald-500/30">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              {resumeData.personal.headline}
            </span>

            <h3 className="text-3xl sm:text-4xl md:text-5xl font-extrabold uppercase tracking-tighter">
              {resumeData.personal.fullName}
            </h3>

            <p className="text-slate-300 dark:text-slate-700 font-light text-sm md:text-base max-w-xl leading-relaxed tracking-wide">
              Based in {resumeData.personal.location.city}, {resumeData.personal.location.country}. Ready to lead frontend architecture, build scalable design systems, and deliver high-performance applications.
            </p>
          </div>

          <div className="relative z-10 mt-10 pt-8 border-t border-slate-800 dark:border-slate-200 flex flex-wrap items-center gap-4">
            <button
              onClick={copyEmail}
              className="px-6 py-3.5 rounded-full bg-white text-black dark:bg-black dark:text-white font-mono text-[10px] tracking-widest uppercase font-bold shadow-sm flex items-center gap-3 transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>{resumeData.personal.contact.email}</span>
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5 opacity-70" />}
            </button>

            {copied && (
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-[10px] font-mono uppercase tracking-widest text-emerald-400 dark:text-emerald-700 font-bold"
              >
                Copied to clipboard!
              </motion.span>
            )}
          </div>
        </motion.div>

        {/* Secondary Contact Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="lg:col-span-4 flex flex-col gap-4"
        >
          {/* Phone */}
          <a
            href={`tel:${resumeData.personal.contact.phone.replace(/\s+/g, '')}`}
            className="p-6 rounded-xl bg-white/70 dark:bg-white/[0.02] border border-slate-200 dark:border-white/10 backdrop-blur-md shadow-sm flex items-center justify-between group hover:border-slate-400 dark:hover:border-white/20 transition-all duration-300"
          >
            <div className="flex items-center gap-4">
              <div className="p-2.5 rounded-lg bg-slate-100 dark:bg-white/5 text-slate-900 dark:text-white border border-slate-200 dark:border-white/10">
                <Phone className="w-4 h-4" />
              </div>
              <div>
                <div className="text-[9px] font-mono tracking-widest uppercase text-slate-400 dark:text-white/40">Direct Phone</div>
                <div className="text-xs font-bold uppercase tracking-tight text-slate-900 dark:text-white">
                  {resumeData.personal.contact.phone}
                </div>
              </div>
            </div>
            <ArrowUpRight className="w-4 h-4 text-slate-400 dark:text-white/40 group-hover:text-slate-900 dark:group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
          </a>

          {/* LinkedIn */}
          <a
            href={resumeData.personal.contact.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="p-6 rounded-xl bg-white/70 dark:bg-white/[0.02] border border-slate-200 dark:border-white/10 backdrop-blur-md shadow-sm flex items-center justify-between group hover:border-slate-400 dark:hover:border-white/20 transition-all duration-300"
          >
            <div className="flex items-center gap-4">
              <div className="p-2.5 rounded-lg bg-slate-100 dark:bg-white/5 text-slate-900 dark:text-white border border-slate-200 dark:border-white/10">
                <Linkedin className="w-4 h-4" />
              </div>
              <div>
                <div className="text-[9px] font-mono tracking-widest uppercase text-slate-400 dark:text-white/40">LinkedIn</div>
                <div className="text-xs font-bold uppercase tracking-tight text-slate-900 dark:text-white">
                  linkedin.com/in/sghere
                </div>
              </div>
            </div>
            <ArrowUpRight className="w-4 h-4 text-slate-400 dark:text-white/40 group-hover:text-slate-900 dark:group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
          </a>

          {/* GitHub if present */}
          {resumeData.personal.contact.github && (
            <a
              href={resumeData.personal.contact.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-6 rounded-xl bg-white/70 dark:bg-white/[0.02] border border-slate-200 dark:border-white/10 backdrop-blur-md shadow-sm flex items-center justify-between group hover:border-slate-400 dark:hover:border-white/20 transition-all duration-300"
            >
              <div className="flex items-center gap-4">
                <div className="p-2.5 rounded-lg bg-slate-100 dark:bg-white/5 text-slate-900 dark:text-white border border-slate-200 dark:border-white/10">
                  <Github className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[9px] font-mono tracking-widest uppercase text-slate-400 dark:text-white/40">GitHub</div>
                  <div className="text-xs font-bold uppercase tracking-tight text-slate-900 dark:text-white">
                    github.com/sghere
                  </div>
                </div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-slate-400 dark:text-white/40 group-hover:text-slate-900 dark:group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
            </a>
          )}
        </motion.div>
      </div>
    </section>
  );
}
