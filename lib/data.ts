import portfolioData from "@/data/portfolio.json";

export interface Experience {
  role: string;
  company: string;
  duration: string;
  description: string;
  technologies?: string[];
}

export interface Skill {
  name: string;
  icon: string;
  color: string;
}

export interface PersonalInfo {
  name: string;
  title: string;
  description: string;
  about: {
    intro: string;
    expertise: string;
    interests: string;
  };
  social: {
    github: string;
    linkedin: string;
    twitter: string;
  };
}

export interface Stats {
  technologies: number;
  commitStreak: number;
  totalCommits: number;
}

export interface Testimonial {
  name: string;
  role: string;
  text: string;
  linkedinUrl: string;
}

export const getPersonalInfo = (): PersonalInfo => portfolioData.personal;
export const getExperience = (): Experience[] => portfolioData.experience;
export const getSkills = (): Skill[] => portfolioData.skills;
export const getSections = (): string[] => portfolioData.sections;
export const getColorMap = (): { [key: string]: string } => portfolioData.colorMap;
export const getStats = (): Stats => (portfolioData as any).stats as Stats;
export const getTestimonials = (): Testimonial[] =>
  ((portfolioData as any).testimonials ?? []) as Testimonial[];
