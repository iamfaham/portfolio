import ShineBorder from "./magicui/shine-border";

export default function ExperienceSection() {
  const experiences = [
    {
      role: 'Junior Full-Stack Developer',
      company: 'Tech Consulting Partners',
      duration: 'May 2024 - Present',
      description: 'Developing web applications, collaborating on features, and improving performance.',
    },
    {
      role: 'Frontend Developer',
      company: 'Freelance',
      duration: 'Apr 2024 - Jun 2024',
      description: 'Designed responsive web interfaces and worked closely with clients to meet their needs.',
    },
    {
      role: 'GDSC Design Lead',
      company: 'Google Developer Student Clubs, OIST',
      duration: 'Jun 2022 - May 2023',
      description: 'Led design projects, conducted workshops, and collaborated with developers.',
    },
  ];

  return (
    <section id="experience" className="section w-full py-8 md:py-24 lg:py-32">
      <div className="container max-w-6xl mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center text-center space-y-4">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">My Experience</h2>
          <p className="text-lg md:text-xl leading-relaxed text-muted-foreground">
            Here are some of the companies I&apos;ve worked with.
          </p>
          <div className="grid gap-4 md:gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {experiences.map((experience, index) => (
              <ShineBorder key={index} color={["#87CEEB", "#A020F0", "#00FFFF"]}>
                <div className=" rounded-lg p-2 md:p-6 shadow-lg">
                  <h3 className="text-xl md:text-2xl font-semibold">{experience.role}</h3>
                  <p className="text-sm md:text-md text-muted-foreground italic">{experience.company}</p>
                  <p className="text-xs md:text-sm text-muted-foreground">{experience.duration}</p>
                  <p className="text-md mt-4">{experience.description}</p>
                </div>
              </ShineBorder>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
