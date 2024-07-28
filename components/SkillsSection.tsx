import IconCloud from "@/components/magicui/icon-cloud";

export default function SkillsSection() {

  const slugs:any[] = [
    "typescript",
    "javascript",
    "react",
    "html5",
    "css3",
    "nodedotjs",
    "express",
    "nextdotjs",
    "prisma",
    "postgresql",
    "mysql",
    "firebase",
    "nginx",
    "vercel",
    "netlify",
    "render",
    "docker",
    "git",
    "github",
    "figma",
    "tailwindcss",
    "socketio",
    "solidity",
    "materialui",
    "go",
    "mopngodb",
    "python",
    "fastapi",
    "supabase",
  ]

  return (
    <section id="skills" className="section w-full py-10 md:py-20 lg:py-26">
      <div className="container max-w-6xl mx-auto px-4 md:px-6 ">
        <div className="flex flex-col items-center text-center space-y-4">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">My Skills</h2>
          <p className="text-lg md:text-xl leading-relaxed text-muted-foreground">
            Here are some of the technologies I&apos;m proficient in.
          </p>
          <div className="bg-gray-900 w-10/12 md:w-11/12 lg:w-1/2 rounded-full">
            <IconCloud iconSlugs={slugs}></IconCloud>
          </div>
        </div>
      </div>
    </section>
  );
}
