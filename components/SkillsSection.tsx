// components/SkillsSection.tsx
import {
  FaJsSquare,
  FaReact,
  FaNodeJs,
  FaPython,
  FaDocker,
  FaGitAlt,
  FaGithub,
} from "react-icons/fa";
import {
  SiTypescript,
  SiNextdotjs,
  SiTailwindcss,
  SiFastapi,
  SiMongodb,
  SiSupabase,
  SiNpm,
  SiFramer,
} from "react-icons/si";
import { motion } from "framer-motion";
import ShineBorder from "./magicui/shine-border";
import { getSkills, getColorMap } from "@/lib/data";

// Icon mapping
const iconMap: { [key: string]: any } = {
  SiNextdotjs: SiNextdotjs,
  FaReact: FaReact,
  FaNodeJs: FaNodeJs,
  SiTailwindcss: SiTailwindcss,
  FaJsSquare: FaJsSquare,
  SiTypescript: SiTypescript,
  SiMongodb: SiMongodb,
  SiSupabase: SiSupabase,
  SiNpm: SiNpm,
  FaGithub: FaGithub,
  FaGitAlt: FaGitAlt,
  SiFramer: SiFramer,
  SiFastapi: SiFastapi,
  FaPython: FaPython,
  FaDocker: FaDocker,
};

const itemVariants = {
  hover: {
    scale: 1.1,
    y: -5,
    transition: {
      type: "spring",
      stiffness: 300,
    },
  },
};

export default function SkillsSection() {
  const skillsData = getSkills();
  const colorMap = getColorMap();

  const skills = skillsData
    .map((skill) => {
      const IconComponent = iconMap[skill.icon];
      if (!IconComponent) {
        console.warn(`Icon component not found for: ${skill.icon}`);
        return null;
      }

      const colorValue = colorMap[skill.color] || "#ffffff";

      return {
        ...skill,
        icon: (
          <IconComponent
            className="h-6 w-6 md:h-16 md:w-16"
            style={{ color: colorValue }}
          />
        ),
      };
    })
    .filter(Boolean);

  return (
    <section id="skills" className="section w-full py-10 md:py-20 lg:py-26">
      <div className="container max-w-6xl mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center text-center space-y-4">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
            My Skills
          </h2>
          <p className="text-md md:text-xl leading-relaxed text-muted-foreground">
            Here are some of the technologies I&apos;m proficient in.
          </p>
          <ShineBorder color={["#87CEEB", "#A020F0", "#00FFFF"]}>
            <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 md:gap-8 my-4 md:my-8">
              {skills.map((skill, index) => (
                <motion.div
                  key={index}
                  className="flex flex-col items-center space-y-2 z-10"
                  whileHover="hover"
                  variants={itemVariants}
                >
                  {skill?.icon}
                  <p className="text-sm md:text-md font-semibold">
                    {skill?.name}
                  </p>
                </motion.div>
              ))}
            </div>
          </ShineBorder>
        </div>
      </div>
    </section>
  );
}
