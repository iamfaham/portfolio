"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import ShineBorder from "./magicui/shine-border";
import { AnimatedCircularProgressBar } from "./magicui/animated-circular-progress-bar";
import Image from "next/image";

export default function BlogCards() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        setError(false);
        setProgress(0);

        // Simulate progress for better UX
        const progressInterval = setInterval(() => {
          setProgress((prev) => {
            if (prev >= 90) return prev;
            return prev + Math.random() * 30;
          });
        }, 200);

        const response = await axios.get(
          "https://dev.to/api/articles?username=iamfaham"
        );
        setBlogs(response.data.slice(0, 6)); // Fetch only 6 recent blogs

        clearInterval(progressInterval);
        setProgress(100);

        // Small delay to show completion
        setTimeout(() => {
          setLoading(false);
        }, 500);
      } catch (error) {
        console.error("Error fetching blogs:", error);
        setError(true);
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-6">
        <AnimatedCircularProgressBar
          max={100}
          value={progress}
          min={0}
          gaugePrimaryColor="#00c6ff"
          gaugeSecondaryColor="#1f2937"
          className="size-32 sm:size-40"
        />
        <p className="text-muted-foreground text-sm sm:text-base text-center">
          Loading blogs...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-4">
        <div className="text-red-500 text-4xl mb-4">⚠️</div>
        <p className="text-muted-foreground text-sm sm:text-base text-center">
          Failed to load blogs. Please try again later.
        </p>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-cyan-500 hover:bg-cyan-600 text-white rounded-md transition-colors duration-200"
        >
          Retry
        </button>
      </div>
    );
  }

  if (blogs.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-4">
        <div className="text-gray-500 text-4xl mb-4">📝</div>
        <p className="text-muted-foreground text-sm sm:text-base text-center">
          No blogs found at the moment.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {blogs.map((blog: any) => (
        <ShineBorder key={blog.id} color={["#87CEEB", "#A020F0", "#00FFFF"]}>
          <div className="bg-transparent shadow-md rounded-lg overflow-hidden z-10">
            <Image
              src={blog.social_image}
              alt={blog.title}
              width={500}
              height={300}
              className="w-full h-48 rounded-lg object-cover hidden md:block"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{blog.title}</h2>
              <p className="text-gray-500 text-sm md:text-md">
                {blog.description}
              </p>
              <a
                href={blog.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-500 mt-4 block text-sm md:text-md text-end"
              >
                Read More
              </a>
            </div>
          </div>
        </ShineBorder>
      ))}
    </div>
  );
}
