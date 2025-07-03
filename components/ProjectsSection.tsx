import ShineBorder from "@/components/magicui/shine-border";
import ShimmerButton from "./magicui/shimmer-button";
import PaginationCarousel from "./PaginationCarousel";
import Link from "next/link";

const projects = [
  {
    title: "EncypherX",
    description:
      "EncypherX, a password manager with AES-encrypted password storage, etc.",
    projectUrl: "https://github.com/iamfaham/EncypherX",
  },
  {
    title: "SeCode",
    description:
      "A VS code extension for analysing security flaws in your code.",
    projectUrl: "https://github.com/iamfaham/secode",
  },
  {
    title: "Visualify",
    description: "An AI-based image editor using Next.js and Cloudinary SDK",
    projectUrl: "https://github.com/iamfaham/Visualify",
  },
];

export default function ProjectsSection() {
  const renderProject = (project: any, index: number) => (
    <ShineBorder
      key={index}
      color={["#87CEEB", "#A020F0", "#00FFFF"]}
      className="z-1"
    >
      <div className="rounded-lg overflow-hidden shadow-lg p-0 md:p-6 z-10 relative">
        <h3 className="text-xl font-bold">{project.title}</h3>
        <p className="text-md text-gray-400 mt-2">{project.description}</p>
        <Link
          href={project.projectUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-4 text-cyan-500 hover:text-cyan-700 z-10 relative"
        >
          View Project
        </Link>
      </div>
    </ShineBorder>
  );

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
            href="https://github.com/iamfaham"
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
