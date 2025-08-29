"use client";

import { useState, useEffect } from "react";
import ShineBorder from "@/components/magicui/shine-border";
import ShimmerButton from "./magicui/shimmer-button";
import PaginationCarousel from "./PaginationCarousel";
import Link from "next/link";
import { getProjects, getPersonalInfo, Project } from "@/lib/data";

export default function ProjectsSection() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const personalInfo = getPersonalInfo();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const fetchedProjects = await getProjects();
        setProjects(fetchedProjects);
        setError(null);
      } catch (err) {
        console.error("Error fetching projects:", err);
        setError("Failed to load projects");
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const renderProject = (project: Project, index: number) => (
    <ShineBorder
      key={index}
      color={["#87CEEB", "#A020F0", "#00FFFF"]}
      className="z-1"
    >
      <div className="rounded-lg overflow-hidden shadow-lg p-0 md:p-6 z-10 relative">
        <h3 className="text-xl font-bold">{project.title}</h3>
        <p className="text-md text-gray-400 mt-2 mb-4">{project.description}</p>

        {/* GitHub stats and metadata */}
        {project.githubData && (
          <div className="flex items-center gap-4 mb-4 text-sm text-gray-400 border-t border-gray-700 pt-3">
            {project.githubData.language && (
              <span className="flex items-center gap-1">
                💻 {project.githubData.language}
              </span>
            )}
            {project.githubData.forks_count > 0 && (
              <span className="flex items-center gap-1">
                🍴 {project.githubData.forks_count}
              </span>
            )}
            {project.githubData.topics &&
              project.githubData.topics.length > 0 && (
                <span className="flex items-center gap-1">
                  🏷️ {project.githubData.topics.slice(0, 3).join(", ")}
                </span>
              )}
          </div>
        )}

        <Link
          href={project.projectUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block text-cyan-500 hover:text-cyan-700 z-10 relative"
        >
          View Project
        </Link>
      </div>
    </ShineBorder>
  );

  if (loading) {
    return (
      <section id="projects" className="section w-full py-10 md:py-20 lg:py-26">
        <div className="container max-w-6xl mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center text-center space-y-6">
            <h2 className="text-3xl font-bold tracking-tighter md:text-5xl">
              Featured Projects
            </h2>
            <p className="text-lg md:text-xl leading-relaxed text-muted-foreground">
              Loading projects...
            </p>
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-500"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="projects" className="section w-full py-10 md:py-20 lg:py-26">
        <div className="container max-w-6xl mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center text-center space-y-6">
            <h2 className="text-3xl font-bold tracking-tighter md:text-5xl">
              Featured Projects
            </h2>
            <p className="text-lg md:text-xl leading-relaxed text-muted-foreground text-red-400">
              {error}
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-cyan-500 text-white rounded hover:bg-cyan-600"
            >
              Retry
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="projects" className="section w-full py-10 md:py-20 lg:py-26">
      <div className="container max-w-6xl mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center text-center space-y-6">
          <h2 className="text-3xl font-bold tracking-tighter md:text-5xl">
            Featured Projects
          </h2>
          <p className="text-lg md:text-xl leading-relaxed text-muted-foreground">
            Check out some of my recent projects.
          </p>

          {/* Desktop Grid Layout */}
          <div className="hidden md:grid gap-4 sm:grid-cols-2 lg:grid-cols-3 w-full">
            {projects.map((project, index) => renderProject(project, index))}
          </div>

          {/* Mobile Pagination Layout */}
          <div className="md:hidden w-full max-w-sm">
            <PaginationCarousel
              items={projects}
              itemsPerPage={1}
              renderItem={renderProject}
              className="w-full"
            />
          </div>

          <Link
            href={personalInfo.social.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-white py-2 px-4"
          >
            <ShimmerButton shimmerColor="#87CEEB">
              <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white lg:text-lg">
                Explore more projects on GitHub
              </span>
            </ShimmerButton>
          </Link>
        </div>
      </div>
    </section>
  );
}
