import React from 'react';
import { FaArrowDown } from 'react-icons/fa';
import Meteors from '@/components/magicui/meteors';
import BlurIn from '@/components/magicui/blur-in';
import BlurInCopy from '@/components/magicui/blur-in-copy';

export default function HeroSection() {
  return (
    <section className="w-full pt-4 md:pt-0 flex justify-center">
      <div className="container xl:space-y-16">
        <div className="max-w-[1300px] mx-auto gap-4 px-4">
          <Meteors number={30} />
          <div className="flex flex-col items-center md:justify-center">
            <BlurIn word="Hello & Welcome" className="" />
            <br />
            <BlurInCopy>
              This is the digital realm of{' '}
              <span className="block md:inline text-gradient">
                Syed Mohammed Faham
              </span>
              <span className='hidden md:inline'>,</span> a passionate Full Stack Developer crafting seamless and innovative web solutions.
            </BlurInCopy>
            <br />
            <button className="mt-8 text-white animate-bounce opacity-15 cursor-default">
              <FaArrowDown size={30} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
