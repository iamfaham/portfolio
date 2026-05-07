"use client";

import { motion } from "framer-motion";

export default function HeroBackground() {
  return (
    <>
      <motion.div
        className="fixed top-[-10%] left-1/2 -translate-x-1/2 w-[400px] sm:w-[700px] h-[400px] sm:h-[700px] rounded-full bg-[#00c6ff]/[0.045] blur-[130px] pointer-events-none -z-10"
        animate={{ scale: [1, 1.12, 1], opacity: [0.045, 0.07, 0.045] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="fixed top-[20%] left-[5%] sm:left-[15%] w-[200px] sm:w-[350px] h-[200px] sm:h-[350px] rounded-full bg-[#03DAC6]/[0.03] blur-[100px] pointer-events-none -z-10"
        animate={{ y: [0, -40, 0], x: [0, 20, 0], opacity: [0.03, 0.055, 0.03] }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="fixed top-[30%] right-[5%] sm:right-[10%] w-[160px] sm:w-[280px] h-[160px] sm:h-[280px] rounded-full bg-[#00c6ff]/[0.025] blur-[90px] pointer-events-none -z-10"
        animate={{ y: [0, 30, 0], x: [0, -15, 0], opacity: [0.025, 0.05, 0.025] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />
    </>
  );
}
