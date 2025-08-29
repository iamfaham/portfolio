import ShineBorder from "./magicui/shine-border";
import PaginationCarousel from "./PaginationCarousel";
import { getExperience } from "@/lib/data";

export default function ExperienceSection() {
  const experiences = getExperience();

  const renderExperience = (experience: any, index: number) => (
    <ShineBorder key={index} color={["#87CEEB", "#A020F0", "#00FFFF"]}>
      <div className="rounded-lg p-2 md:p-6 shadow-lg">
        <h3 className="text-xl md:text-2xl font-semibold">{experience.role}</h3>
        <p className="text-sm md:text-md text-muted-foreground italic">
          {experience.company}
        </p>
        <p className="text-xs md:text-sm text-muted-foreground">
          {experience.duration}
        </p>
        <p className="text-md mt-4 opacity-75">{experience.description}</p>
      </div>
    </ShineBorder>
  );

  return (
    <section id="experience" className="section w-full py-8 md:py-24 lg:py-32">
      <div className="container max-w-6xl mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center text-center space-y-4">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
            My Experience
          </h2>
          <p className="text-lg md:text-xl leading-relaxed text-muted-foreground">
            Here are some of the companies I&apos;ve worked with.
          </p>

          {/* Desktop Grid Layout */}
          <div className="hidden md:grid gap-4 md:gap-8 sm:grid-cols-2 lg:grid-cols-3 w-full">
            {experiences.map((experience, index) =>
              renderExperience(experience, index)
            )}
          </div>

          {/* Mobile Pagination Layout */}
          <div className="md:hidden w-full max-w-md mx-auto">
            <PaginationCarousel
              items={experiences}
              itemsPerPage={1}
              renderItem={renderExperience}
              className="w-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
