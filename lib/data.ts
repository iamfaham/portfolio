import portfolioData from "@/data/portfolio.json";
import { githubService } from "./github";
import { formatProjectTitle } from "./utils";

export interface Project {
  title: string;
  description: string;
  projectUrl: string;
  technologies?: string[];
  image?: string | null;
  githubData?: any;
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
  projects: ProjectConfig[];
  experience: Experience[];
  skills: Skill[];
  sections: string[];
  colorMap: { [key: string]: string };
}

export interface ProjectConfig {
  githubRepo: string;
}

export const getPortfolioData = (): PortfolioData => {
  return portfolioData as PortfolioData;
};

export const getProjects = async (): Promise<Project[]> => {
  try {
    const projectConfigs: ProjectConfig[] = portfolioData.projects;
    const projects: Project[] = [];

    for (const config of projectConfigs) {
      try {
        const [owner, repo] = config.githubRepo.split("/");
        const githubRepo = await githubService.getRepositoryWithTopics(
          owner,
          repo
        );
        const project = githubService.convertToProject(githubRepo);
        projects.push(project);
      } catch (error) {
        console.error(`Failed to fetch project ${config.githubRepo}:`, error);
        // Fallback to basic project info
        const repoName = config.githubRepo.split("/")[1] || "Unknown Project";
        projects.push({
          title: formatProjectTitle(repoName),
          description: "Project details unavailable",
          projectUrl: `https://github.com/${config.githubRepo}`,
          technologies: [],
          image: null,
        });
      }
    }

    return projects;
  } catch (error) {
    console.error("Error fetching projects:", error);
    return [];
  }
};

// Keep the synchronous version for backward compatibility
export const getProjectsSync = (): Project[] => {
  return portfolioData.projects.map((config) => {
    const repoName = config.githubRepo.split("/")[1] || "Unknown Project";
    return {
      title: formatProjectTitle(repoName),
      description: "Project details unavailable",
      projectUrl: `https://github.com/${config.githubRepo}`,
      technologies: [],
      image: null,
    };
  });
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

export interface Stats {
  aiProjects: number;
  technologies: number;
  githubStars: number;
}

export interface Testimonial {
  name: string;
  role: string;
  text: string;
  linkedinUrl: string;
}

export const getStats = (): Stats => {
  return (portfolioData as any).stats as Stats;
};

export const getTestimonials = (): Testimonial[] => {
  return ((portfolioData as any).testimonials ?? []) as Testimonial[];
};
