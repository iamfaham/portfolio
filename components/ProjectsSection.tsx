import ShineBorder from "@/components/magicui/shine-border"
import ShimmerButton from "./magicui/shimmer-button";
import Link from "next/link";

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
    <section id="projects" className="section w-full py-10 md:py-20 lg:py-26">
      <div className="container max-w-6xl mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center text-center space-y-6">
          <h2 className="text-3xl font-bold tracking-tighter md:text-5xl">Featured Projects</h2>
          <p className="text-lg md:text-xl leading-relaxed text-muted-foreground">
            Check out some of my recent projects.
          </p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project, index) => (
              <ShineBorder key={index}  color={["#87CEEB", "#A020F0", "#00FFFF"]}>
                <div  className=" rounded-lg overflow-hidden shadow-lg p-0 md:p-6 ">
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
              </ShineBorder >
            ))}
          </div>
            <Link
            href="https://github.com/iamfaham"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-white py-2 px-4"
          >
            <ShimmerButton shimmerColor="#87CEEB">
              <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white lg:text-lg"> Show More </span>
            </ShimmerButton>
          </Link>
        </div>
      </div>
    </section>
  );
}
