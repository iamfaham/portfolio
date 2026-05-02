"use client";

import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ProjectsSection from "@/components/ProjectsSection";
import CapabilitiesSection from "@/components/CapabilitiesSection";
import ExperienceSection from "@/components/ExperienceSection";
import BlogPreview from "@/components/BlogPreview";
import TestimonialSection from "@/components/TestimonialSection";
import ContactSection from "@/components/ContactSection";

export default function Portfolio() {
  return (
    <div className="dot-grid min-h-screen">
      <Navbar />
      <main className="pt-16">
        <div id="heroDiv"><HeroSection /></div>
        <div id="aboutDiv"><AboutSection /></div>
        <div id="projectsDiv"><ProjectsSection /></div>
        <div id="capabilitiesDiv"><CapabilitiesSection /></div>
        <div id="experienceDiv"><ExperienceSection /></div>
        <div id="blogDiv"><BlogPreview /></div>
        <div id="testimonialsDiv"><TestimonialSection /></div>
        <div id="contactDiv"><ContactSection /></div>
      </main>
    </div>
  );
}
