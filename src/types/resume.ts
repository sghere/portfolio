export interface PersonalContact {
  phone: string;
  email: string;
  linkedin: string;
  github: string;
}

export interface PersonalLocation {
  city: string;
  state: string;
  country: string;
}

export interface PersonalInfo {
  fullName: string;
  title: string;
  headline: string;
  location: PersonalLocation;
  contact: PersonalContact;
}

export interface SkillsData {
  frontend: string[];
  architecture: string[];
  backend: string[];
  testing: string[];
  tools: string[];
  core: string[];
}

export interface ExperienceItem {
  company: string;
  location: string;
  designation: string;
  startDate: string;
  endDate: string;
  employmentType: string;
  responsibilities: string[];
  technologies: string[];
}

export interface ProjectItem {
  name: string;
  type: string;
  description: string;
  highlights: string[];
  technologies: string[];
  link?: string;
}

export interface EducationItem {
  degree: string;
  institution: string;
  location: string;
  startDate: string;
  endDate: string;
}

export interface PublicationItem {
  title: string;
  publisher: string;
  publishedDate: string;
  url: string;
}

export interface AchievementItem {
  metric: string;
  value: string;
}

export interface ResumeData {
  personal: PersonalInfo;
  summary: string;
  skills: SkillsData;
  experience: ExperienceItem[];
  projects: ProjectItem[];
  education: EducationItem[];
  publications: PublicationItem[];
  achievements: AchievementItem[];
}

export interface SkillNode extends d3.SimulationNodeDatum {
  id: string;
  name: string;
  category: keyof SkillsData;
  radius: number;
  x?: number;
  y?: number;
  vx?: number;
  vy?: number;
}

export interface SkillLink extends d3.SimulationLinkDatum<SkillNode> {
  source: string | SkillNode;
  target: string | SkillNode;
  strength?: number;
}
