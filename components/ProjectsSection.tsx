"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { getProjects, getPersonalInfo, type Project } from "@/lib/data";
import AnimatedSection from "@/components/AnimatedSection";
import { StaggerContainer, StaggerItem } from "@/components/StaggerContainer";

export default function ProjectsSection() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const personalInfo = getPersonalInfo();

  useEffect(() => {
    getProjects()
      .then(setProjects)
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="relative w-full py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <AnimatedSection className="mb-12">
          <p className="section-label">What I&apos;ve Built</p>
          <h2 className="text-white text-5xl font-extrabold tracking-[-1.5px]">Projects</h2>
          <p className="text-white/25 text-sm mt-2.5 leading-relaxed">
            A selection of things I&apos;ve shipped. Stars and topics pulled live from GitHub.
          </p>
        </AnimatedSection>

        {loading ? (
          <div className="flex justify-center py-16">
            <div className="w-7 h-7 border-2 border-[#00c6ff]/30 border-t-[#00c6ff] rounded-full animate-spin" />
          </div>
        ) : (
          <StaggerContainer className="grid md:grid-cols-3 gap-4 mb-8">
            {projects.map((project, index) => {
              const isFeatured = index === 0;
              return (
                <StaggerItem key={project.title} className={isFeatured ? "md:col-span-2" : ""}>
                  <div
                    className="glass-card h-full p-6 flex flex-col gap-3"
                    style={isFeatured ? { borderColor: "rgba(0,198,255,0.15)" } : {}}
                  >
                    {isFeatured && (
                      <span className="inline-flex items-center bg-[#00c6ff]/[0.08] border border-[#00c6ff]/20 text-[#00c6ff]/70 px-2.5 py-0.5 rounded-full text-[10px] tracking-[1px] uppercase w-fit">
                        ★ Featured
                      </span>
                    )}
                    <h3 className="text-white text-base font-bold tracking-tight">{project.title}</h3>
                    <p className="text-white/30 text-xs leading-relaxed flex-1">{project.description}</p>

                    {project.technologies && project.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-1.5">
                        {project.technologies.slice(0, 4).map((tech) => (
                          <span
                            key={tech}
                            className="bg-white/[0.04] border border-white/[0.07] text-white/30 px-2 py-0.5 rounded text-[10px]"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}

                    <div className="flex items-center justify-between pt-3 border-t border-white/5 mt-auto">
                      <div className="flex gap-3.5">
                        {project.githubData && (
                          <>
                            <span className="text-white/20 text-[11px]">★ {project.githubData.stargazers_count}</span>
                            <span className="text-white/20 text-[11px]">⑂ {project.githubData.forks_count}</span>
                          </>
                        )}
                      </div>
                      <Link
                        href={project.projectUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#00c6ff] text-xs font-semibold hover:text-[#00c6ff]/70 transition-colors"
                      >
                        View on GitHub →
                      </Link>
                    </div>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        )}

        <div className="flex justify-center">
          <Link
            href={personalInfo.social.github}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white/[0.03] border border-white/[0.08] text-white/40 px-7 py-3 rounded-xl text-sm flex items-center gap-2 hover:text-white/60 transition-colors duration-200"
          >
            Explore more on <span className="text-[#00c6ff]/60">GitHub</span> →
          </Link>
        </div>
      </div>
    </section>
  );
}
