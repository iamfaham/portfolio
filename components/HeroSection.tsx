import { getPersonalInfo, getStats } from "@/lib/data";
import { fetchGitHubStats } from "@/lib/actions";
import { StaggerContainer, StaggerItem } from "@/components/StaggerContainer";
import HeroBackground from "@/components/HeroBackground";
import HeroCTAs from "@/components/HeroCTAs";

export default async function HeroSection() {
  const personalInfo = getPersonalInfo();
  const { technologies } = getStats();
  const { totalCommits, commitStreak } = await fetchGitHubStats();

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-5 pb-24 overflow-hidden">
      <HeroBackground />

      <StaggerContainer className="relative z-10 flex flex-col items-center w-full max-w-2xl mx-auto">
        {/* Role chip */}
        <StaggerItem>
          <div className="inline-flex items-center border border-[#00c6ff]/20 bg-[#00c6ff]/5 text-[#00c6ff]/70 px-3 sm:px-4 py-1.5 rounded-full text-[10px] sm:text-[11px] tracking-[2px] uppercase mb-8">
            AI · ML · GenAI Developer
          </div>
        </StaggerItem>

        {/* Title */}
        <StaggerItem>
          <div className="mb-6">
            <p className="text-white/40 text-lg sm:text-2xl font-light tracking-tight mb-2">
              Hi, I&apos;m
            </p>
            <h1 className="text-gradient text-4xl sm:text-6xl md:text-7xl font-black tracking-[-2px] sm:tracking-[-3px] leading-none">
              {personalInfo.name}
            </h1>
          </div>
        </StaggerItem>

        {/* Tagline */}
        <StaggerItem>
          <p className="text-white/30 text-sm leading-relaxed max-w-sm sm:max-w-lg mx-auto mb-9">
            {personalInfo.description.charAt(0).toUpperCase() +
              personalInfo.description.slice(1)}
          </p>
        </StaggerItem>

        {/* CTAs — client component (onClick handlers) */}
        <StaggerItem>
          <HeroCTAs />
        </StaggerItem>

        {/* Stat strip */}
        <StaggerItem>
          <div className="glass-card flex divide-x divide-white/[0.05]">
            {[
              { value: `${totalCommits}+`, label: "Commits" },
              { value: `${technologies}+`, label: "Technologies" },
              { value: `${commitStreak}d`, label: "Commit Streak" },
            ].map(({ value, label }) => (
              <div key={label} className="px-5 sm:px-8 py-3.5 text-center">
                <div className="text-[#00c6ff] text-lg sm:text-xl font-extrabold tracking-tight">
                  {value}
                </div>
                <div className="text-white/20 text-[9px] sm:text-[10px] tracking-widest uppercase mt-0.5">
                  {label}
                </div>
              </div>
            ))}
          </div>
        </StaggerItem>
      </StaggerContainer>

      {/* Scroll hint */}
      <div className="absolute bottom-7 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-white/[0.12] text-[10px] tracking-[2px] uppercase z-10">
        <div className="w-px h-9 bg-gradient-to-b from-[#00c6ff]/40 to-transparent" />
        scroll
      </div>
    </section>
  );
}
