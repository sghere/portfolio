import { motion } from "motion/react";
import { SectionHeading } from "../components/SectionHeading";
import { resumeData } from "../utils/resumeData";
import {
  Layers,
  Chrome,
  PackageCheck,
  Check,
  ArrowUpRight,
  Sparkles,
} from "lucide-react";

export function Projects() {
  const getProjectIcon = (type: string) => {
    if (type.includes("Microfrontend") || type.includes("Enterprise"))
      return Layers;
    if (type.includes("Browser") || type.includes("Chrome")) return Chrome;
    return PackageCheck;
  };

  return (
    <section id="projects" className="py-24 px-4 md:px-8 max-w-7xl mx-auto">
      <SectionHeading
        badge="Projects & Open Source"
        title="High-Impact Architectural Deliverables."
        subtitle="Key platforms built for microfrontends, browser automation, and open-source npm distribution."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {resumeData.projects.map((proj, idx) => {
          const Icon = getProjectIcon(proj.type);

          return (
            <motion.div
              key={proj.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              className="group relative flex flex-col justify-between p-8 rounded-xl bg-white/70 dark:bg-white/[0.02] border border-slate-200 dark:border-white/10 backdrop-blur-md hover:border-slate-400 dark:hover:border-white/20 transition-all duration-300"
            >
              <div>
                {/* Header Badge */}
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2.5 rounded-lg bg-slate-100 dark:bg-white/5 text-slate-900 dark:text-white border border-slate-200 dark:border-white/10">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[9px] font-mono tracking-widest uppercase px-2.5 py-1 rounded-sm bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-white/70 border border-slate-200 dark:border-white/10">
                    {proj.type}
                  </span>
                </div>

                {/* Project Title */}
                {proj.link ? (
                  <a href={proj.link || "#"} target={"_blank"}>
                    <h3 className="text-xl hover:underline font-bold uppercase tracking-tight text-slate-900 dark:text-white transition-colors">
                      {proj.name}
                    </h3>
                  </a>
                ) : (
                  <h3 className="text-xl font-bold uppercase tracking-tight text-slate-900 dark:text-white transition-colors">
                    {proj.name}
                  </h3>
                )}

                <p className="mt-3 text-xs md:text-sm text-slate-600 dark:text-white/70 leading-relaxed font-light">
                  {proj.description}
                </p>

                {/* Highlights List */}
                <div className="mt-6 space-y-2 pt-4 border-t border-slate-200 dark:border-white/10">
                  {proj.highlights.map((h, hIdx) => (
                    <div
                      key={hIdx}
                      className="flex items-start gap-2 text-xs text-slate-600 dark:text-white/60 font-light"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-slate-700 dark:text-white/70 shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Technologies at Bottom */}
              <div className="mt-8 pt-4 border-t border-slate-200 dark:border-white/10">
                <div className="text-[9px] font-mono text-slate-400 dark:text-white/40 uppercase tracking-widest mb-2">
                  Stack
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {proj.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 rounded-sm text-[9px] font-mono uppercase bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-white/70 border border-slate-200 dark:border-white/10"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
