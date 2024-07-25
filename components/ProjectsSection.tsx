// components/ProjectsSection.tsx
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
            {/* Project items go here */}
          </div>
        </div>
      </div>
    </section>
  );
}
