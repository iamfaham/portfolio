// components/SkillsSection.tsx
import { FaJsSquare, FaReact, FaNodeJs, FaPython, FaDocker, FaGitAlt, FaGithub } from 'react-icons/fa';
import { SiTypescript, SiNextdotjs, SiTailwindcss, SiFastapi, SiMongodb, SiSupabase, SiNpm, SiFramer } from 'react-icons/si';
import { motion } from 'framer-motion';
import ShineBorder from './magicui/shine-border';

const skills = [
  {
    name: "Next.js",
    icon: <SiNextdotjs className="h-6 w-6 md:h-16 md:w-16 text-white" />
  },
  {
    name: "React",
    icon: <FaReact className="h-6 w-6 md:h-16 md:w-16 text-blue-400" />
  },
  {
    name: "Node.js",
    icon: <FaNodeJs className="h-6 w-6 md:h-16 md:w-16 text-green-500" />
  },
  {
    name: "Tailwind CSS",
    icon: <SiTailwindcss className="h-6 w-6 md:h-16 md:w-16 text-teal-500" />
  },
  {
    name: "JavaScript",
    icon: <FaJsSquare className="h-6 w-6 md:h-16 md:w-16 text-yellow-500" />
  },
  {
    name: "TypeScript",
    icon: <SiTypescript className="h-6 w-6 md:h-16 md:w-16 text-blue-500" />
  },
  {
    name: "FastAPI",
    icon: <SiFastapi className="h-6 w-6 md:h-16 md:w-16 text-green-600" />
  },
  {
    name: "MongoDB",
    icon: <SiMongodb className="h-6 w-6 md:h-16 md:w-16 text-green-500" />
  },
  {
    name: "Supabase",
    icon: <SiSupabase className="h-6 w-6 md:h-16 md:w-16 text-green-400" />
  },
  {
    name: "Python",
    icon: <FaPython className="h-6 w-6 md:h-16 md:w-16 text-yellow-400" />
  },
  {
    name: "npm",
    icon: <SiNpm className="h-6 w-6 md:h-16 md:w-16 text-red-500" />
  },
  {
    name: "Docker",
    icon: <FaDocker className="h-6 w-6 md:h-16 md:w-16 text-blue-500" />
  },
  {
    name: "Git",
    icon: <FaGitAlt className="h-6 w-6 md:h-16 md:w-16 text-orange-500" />
  },
  {
    name: "GitHub",
    icon: <FaGithub className="h-6 w-6 md:h-16 md:w-16 text-white" />
  },
  {
    name: "Framer Motion",
    icon: <SiFramer className="h-6 w-6 md:h-16 md:w-16 text-pink-500" />
  },
];

const itemVariants = {
  hover: {
    scale: 1.1,
    y: -5,
    transition: {
      type: "spring",
      stiffness: 300,
    }
  }
};

export default function SkillsSection() {
  return (
    <section id="skills" className="section w-full py-10 md:py-20 lg:py-26">
      <div className="container max-w-6xl mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center text-center space-y-4">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">My Skills</h2>
          <p className="text-md md:text-xl leading-relaxed text-muted-foreground">
            Here are some of the technologies I&apos;m proficient in.
          </p>
          <ShineBorder color={["#87CEEB", "#A020F0", "#00FFFF"]} >
          <div className='grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 md:gap-8 my-4 md:my-8'>
            {skills.map((skill, index) => (
              <motion.div
                key={index}
                className="flex flex-col items-center space-y-2 z-10"
                whileHover="hover"
                variants={itemVariants}
              >
                {skill.icon}
                <p className="text-sm md:text-md font-semibold">{skill.name}</p>
              </motion.div>
            ))}
            </div>
          </ShineBorder>
        </div>
      </div>
    </section>
  );
}
