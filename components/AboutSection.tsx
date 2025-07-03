import { motion } from "framer-motion";
import { useRef } from "react";
import { NeonGradientCard } from "./magicui/neon-gradient-card";
import Link from "next/link";

export default function AboutSection() {
  const constraintsRef = useRef(null);

  return (
    <section id="about" className="section w-full py-12 md:py-24 lg:py-32">
      <div className="container max-w-6xl mx-auto px-4 md:px-6 flex flex-col lg:flex-row items-center space-y-8 md:space-y-0 md:space-x-8 lg:space-x-12 xl:space-x-16">
        {/* Profile Image Section - Unchanged */}
        <motion.div ref={constraintsRef} className=" w-1/2 md:w-1/3 lg:w-full">
          <NeonGradientCard className="rounded-full">
            <motion.img
              loading="lazy"
              drag
              dragConstraints={constraintsRef}
              src="/profile.png"
              alt="Syed Mohammed Faham"
              className="rounded-full object-cover"
              data-interactive
            />
          </NeonGradientCard>
        </motion.div>

        {/* Content Section - Only Typography Changes */}
        <div className="flex-grow text-center lg:text-left">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter md:my-10 lg:mb-4">
            About Me
          </h2>

          <div className="space-y-3 sm:space-y-4">
            <p className="text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed text-muted-foreground">
              Hello! I&apos;m Syed Mohammed Faham, a passionate{" "}
              <span className="font-bold">AI/ML Developer</span> dedicated to
              creating intelligent and innovative machine learning solutions.
            </p>

            <p className="text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed text-muted-foreground">
              With expertise in artificial intelligence, machine learning
              algorithms, and data science, I specialize in building intelligent
              systems, predictive models, and AI-powered applications that solve
              complex real-world problems.
            </p>

            <p className="text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed text-muted-foreground">
              I enjoy continuous learning and staying updated with industry
              trends, particularly in Generative AI. Outside of work, I love
              reading technology blogs, acquiring new skills, engaging in
              strategic video games and Coffee.
            </p>
          </div>

          <div className="mt-4 sm:mt-6">
            <p className="text-sm sm:text-base md:text-lg lg:text-xl">
              Explore my latest{" "}
              <Link
                target="_blank"
                className="text-cyan-500 hover:text-cyan-700 transition-colors duration-200"
                href="/blogs"
              >
                blogs here.
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
