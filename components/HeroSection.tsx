"use client";

import React, { useState, useEffect } from "react";
import { FaArrowDown } from "react-icons/fa";
import Meteors from "@/components/magicui/meteors";
import BlurIn from "@/components/magicui/blur-in";
import BlurInCopy from "@/components/magicui/blur-in-copy";
import MobileWarningDialog from "@/components/MobileWarningDialog";
import { getPersonalInfo } from "@/lib/data";
import { isTouchDevice } from "@/utils/detectTouchDevice";

export default function HeroSection() {
  const personalInfo = getPersonalInfo();
  const [showMobileWarning, setShowMobileWarning] = useState(false);

  useEffect(() => {
    // Check if it's a touch device and show warning after a short delay
    if (isTouchDevice()) {
      const timer = setTimeout(() => {
        setShowMobileWarning(true);
      }, 1000); // Show after 1 second

      return () => clearTimeout(timer);
    }
  }, []);

  const handleCloseMobileWarning = () => {
    setShowMobileWarning(false);
  };

  return (
    <section className="w-full pt-4 md:pt-0 flex justify-center">
      {/* Prism Background */}
      {/* <div className="absolute inset-0 z-0">
        <Prism
          animationType="rotate"
          timeScale={0.5}
          height={3.5}
          baseWidth={6.0}
          scale={3.5}
          hueShift={0}
          colorFrequency={1}
          noise={0.1}
          glow={1}
        />
      </div> */}

      <div className="container xl:space-y-16">
        <div className="max-w-[1300px] mx-auto gap-4 px-4">
          <Meteors number={30} />
          <div className="flex flex-col items-center md:justify-center">
            <BlurIn word="Hello & Welcome" className="" />
            <br />
            <BlurInCopy>
              This is the digital realm of{" "}
              <span className="block md:inline text-gradient">
                {personalInfo.name}
              </span>
              <span className="hidden md:inline">,</span>{" "}
              {personalInfo.description}
            </BlurInCopy>
            <br />
            <button className="mt-8 text-white animate-bounce opacity-15 cursor-default">
              <FaArrowDown size={30} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Warning Dialog */}
      <MobileWarningDialog
        isVisible={showMobileWarning}
        onClose={handleCloseMobileWarning}
      />
    </section>
  );
}
