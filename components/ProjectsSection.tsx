import {NeonGradientCard} from "@/components/magicui/neon-gradient-card"


const projects = [
  {
    title: "SeCode",
    description: "A VS code extension for analysing security flaws in your code.",
    projectUrl: "https://github.com/iamfaham/secode"
  },
  {
    title: "Project Two",
    description: "A brief description of Project Two. This project involves...",
    projectUrl: "https://github.com/yourusername/project-two"
  },
  {
    title: "Project Three",
    description: "A brief description of Project Three. This project involves...",
    projectUrl: "https://github.com/yourusername/project-three"
  },
];

export default function ProjectsSection() {
  return (
    <section id="projects" className="section w-full py-12 md:py-24 lg:py-32">
      <div className="container max-w-6xl mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center text-center space-y-8">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Featured Projects</h2>
          <p className="text-lg md:text-xl leading-relaxed text-muted-foreground">
            Check out some of my recent projects.
          </p>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project, index) => (
              <NeonGradientCard key={index}>
                <div  className=" rounded-lg overflow-hidden shadow-lg p-6">
                  <h3 className="text-xl font-bold">{project.title}</h3>

                  <p className="text-md text-gray-400 mt-2">{project.description}</p>
                  <a
                    href={project.projectUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-4 text-blue-500 hover:text-blue-700"
                  >
                    View Project
                  </a>
                </div>
              </NeonGradientCard >
            ))}
          </div>
          <a
            href="https://github.com/iamfaham"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-block bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
          >
            Show More
          </a>
        </div>
      </div>
    </section>
  );
}
