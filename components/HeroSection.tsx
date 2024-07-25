// components/HeroSection.tsx
import Link from 'next/link';

export default function HeroSection() {
  return (
    <section id="hero" className="w-full pt-12 md:pt-16">
      <div className="container xl:space-y-16">
        <div className="max-w-[1300px] mx-auto gap-4 px-4">
          <div className="flex flex-col items-center">
            <h1 className="text-5xl">Full-Stack Developer</h1>
            <p className="text-2xl font-medium">Syed Mohammed Faham</p>
          </div>
          <div className="flex justify-center items-center space-x-4 mt-4">
            <Link
              href="#projects"
              className="inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium bg-soft-purple text-dark-gray hover:bg-teal"
            >
              View Projects
            </Link>
            <Link
              href="#contact"
              className="inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium bg-soft-purple text-dark-gray hover:bg-teal"
            >
              Contact Me
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
