import { motion } from "framer-motion"
import { useRef } from "react";
import { NeonGradientCard } from "./magicui/neon-gradient-card";

export default function AboutSection() {
  const constraintsRef = useRef(null)
  return (
    <section id="about" className="section w-full py-12 md:py-24 lg:py-32">
      <div className="container max-w-6xl mx-auto px-4 md:px-6 flex flex-col md:flex-row items-center space-y-8 md:space-y-0 md:space-x-8">
        
        <motion.div ref={constraintsRef} className=" w-1/2 lg:w-11/12">
          <NeonGradientCard className="rounded-full">  
            <motion.img drag dragConstraints={constraintsRef} src="/profile.png" alt="Syed Mohammed Faham" className="rounded-full object-cover" />
          </NeonGradientCard>
        </motion.div>    
        <div className="flex-grow text-center md:text-left">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl mb-4">About Me</h2>
          <p className="text-lg md:text-xl leading-relaxed text-muted-foreground md:text-justify">
          Hello! I&apos;m Syed Mohammed Faham, a passionate <span className="font-bold">Full Stack Developer</span> dedicated to creating seamless and innovative web applications. 
          With a solid foundation in both front-end and back-end technologies, 
          I specialize in building dynamic, user-friendly, efficient and scalable solutions that solve real-world problems.
          </p>
        </div>
      </div>
    </section>
  );
}
