import { motion } from "framer-motion";
import { useRef } from "react";
import { NeonGradientCard } from "./magicui/neon-gradient-card";
import Link from "next/link";
import { getPersonalInfo } from "@/lib/data";

export default function AboutSection() {
  const constraintsRef = useRef(null);
  const personalInfo = getPersonalInfo();

  return (
    <section id="about" className="section w-full py-12 md:py-24 lg:py-32">
      <div className="container max-w-6xl mx-auto px-4 md:px-6 flex flex-col lg:flex-row items-center space-y-8 md:space-y-0 md:space-x-8 lg:space-x-12 xl:space-x-16">
        {/* Profile Image Section */}
        <motion.div
          ref={constraintsRef}
          className="w-56 h-56 md:w-64 md:h-64 lg:w-80 lg:h-80 flex-shrink-0"
        >
          <NeonGradientCard className="rounded-full">
            <motion.img
              loading="lazy"
              drag
              dragConstraints={constraintsRef}
              src="/profile.png"
              alt={personalInfo.name}
              className="w-full h-full rounded-full object-cover"
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
              {personalInfo.about.intro}
            </p>

            <p className="text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed text-muted-foreground">
              {personalInfo.about.expertise}
            </p>

            <p className="text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed text-muted-foreground">
              {personalInfo.about.interests}
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
