import resumeJson from '../resume/resume.json';
import { ResumeData } from '../types/resume';

export const resumeData = resumeJson as ResumeData;

export function getYearsOfExperience(): number {
  // Calculated from 2022 to present (~4 years)
  return 4;
}

export function getTotalSkillsCount(): number {
  const { skills } = resumeData;
  return (
    skills.frontend.length +
    skills.architecture.length +
    skills.backend.length +
    skills.testing.length +
    skills.tools.length +
    skills.core.length
  );
}

export function getCompanyCount(): number {
  return resumeData.experience.length;
}

export function getProjectCount(): number {
  return resumeData.projects.length;
}

export const CATEGORY_COLORS: Record<string, { bg: string; text: string; border: string; hex: string }> = {
  frontend: { bg: 'bg-emerald-500/10', text: 'text-emerald-400', border: 'border-emerald-500/20', hex: '#10b981' },
  architecture: { bg: 'bg-indigo-500/10', text: 'text-indigo-400', border: 'border-indigo-500/20', hex: '#6366f1' },
  backend: { bg: 'bg-cyan-500/10', text: 'text-cyan-400', border: 'border-cyan-500/20', hex: '#06b6d4' },
  testing: { bg: 'bg-amber-500/10', text: 'text-amber-400', border: 'border-amber-500/20', hex: '#f59e0b' },
  tools: { bg: 'bg-purple-500/10', text: 'text-purple-400', border: 'border-purple-500/20', hex: '#a855f7' },
  core: { bg: 'bg-rose-500/10', text: 'text-rose-400', border: 'border-rose-500/20', hex: '#f43f5e' },
};
