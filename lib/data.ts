import portfolioData from "@/data/portfolio.json";

export interface Project {
  title: string;
  description: string;
  projectUrl: string;
  technologies?: string[];
  image?: string | null;
}

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

export interface PortfolioData {
  personal: PersonalInfo;
  projects: Project[];
  experience: Experience[];
  skills: Skill[];
  sections: string[];
  colorMap: { [key: string]: string };
}

export const getPortfolioData = (): PortfolioData => {
  return portfolioData as PortfolioData;
};

export const getProjects = (): Project[] => {
  return portfolioData.projects;
};

export const getExperience = (): Experience[] => {
  return portfolioData.experience;
};

export const getSkills = (): Skill[] => {
  return portfolioData.skills;
};

export const getPersonalInfo = (): PersonalInfo => {
  return portfolioData.personal;
};

export const getSections = (): string[] => {
  return portfolioData.sections;
};

export const getColorMap = (): { [key: string]: string } => {
  return portfolioData.colorMap;
};
