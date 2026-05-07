import Link from "next/link";
import { getPersonalInfo } from "@/lib/data";
import { fetchPinnedRepos } from "@/lib/actions";
import { formatProjectTitle } from "@/lib/utils";
import AnimatedSection from "@/components/AnimatedSection";
import { StaggerContainer, StaggerItem } from "@/components/StaggerContainer";

export default async function ProjectsSection() {
  const personalInfo = getPersonalInfo();
  const repos = await fetchPinnedRepos();

  return (
    <section className="relative w-full py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <AnimatedSection className="mb-12">
          <p className="section-label">What I&apos;ve Built</p>
          <h2 className="text-white text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-[-1px] sm:tracking-[-1.5px]">
            Projects
          </h2>
          <p className="text-white/25 text-sm mt-2.5 leading-relaxed">
            Pinned from GitHub — stars and topics pulled live.
          </p>
        </AnimatedSection>

        {repos.length === 0 ? (
          <p className="text-white/20 text-sm text-center py-16">No pinned repos found.</p>
        ) : (
          <StaggerContainer className="grid md:grid-cols-3 gap-4 mb-8">
            {repos.map((repo, index) => {
              const isFeatured = index === 0;
              return (
                <StaggerItem key={repo.name} className={isFeatured ? "md:col-span-2" : ""}>
                  <div
                    className="glass-card h-full p-6 flex flex-col gap-3"
                    style={isFeatured ? { borderColor: "rgba(0,198,255,0.15)" } : {}}
                  >
                    {isFeatured && (
                      <span className="inline-flex items-center bg-[#00c6ff]/[0.08] border border-[#00c6ff]/20 text-[#00c6ff]/70 px-2.5 py-0.5 rounded-full text-[10px] tracking-[1px] uppercase w-fit">
                        ★ Featured
                      </span>
                    )}

                    <h3 className="text-white text-base font-bold tracking-tight">
                      {formatProjectTitle(repo.name)}
                    </h3>
                    <p className="text-white/30 text-xs leading-relaxed flex-1">
                      {repo.description || "No description provided."}
                    </p>

                    {repo.topics.length > 0 && (
                      <div className="flex flex-wrap gap-1.5">
                        {repo.topics.slice(0, 4).map((topic) => (
                          <span
                            key={topic}
                            className="bg-white/[0.04] border border-white/[0.07] text-white/30 px-2 py-0.5 rounded text-[10px]"
                          >
                            {topic}
                          </span>
                        ))}
                      </div>
                    )}

                    <div className="flex items-center justify-between pt-3 border-t border-white/5 mt-auto">
                      <div className="flex items-center gap-3.5">
                        {repo.language && (
                          <span className="flex items-center gap-1 text-white/20 text-[11px]">
                            <span
                              className="w-2 h-2 rounded-full inline-block"
                              style={{ background: repo.languageColor ?? "#666" }}
                            />
                            {repo.language}
                          </span>
                        )}
                        <span className="text-white/20 text-[11px]">★ {repo.stars}</span>
                        <span className="text-white/20 text-[11px]">⑂ {repo.forks}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        {repo.homepageUrl && (
                          <Link
                            href={repo.homepageUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-white/30 text-xs hover:text-white/60 transition-colors"
                          >
                            Live ↗
                          </Link>
                        )}
                        <Link
                          href={repo.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#00c6ff] text-xs font-semibold hover:text-[#00c6ff]/70 transition-colors"
                        >
                          GitHub →
                        </Link>
                      </div>
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
