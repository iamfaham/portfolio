'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import ShineBorder from './magicui/shine-border';

export default function BlogCards() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get('https://dev.to/api/articles?username=iamfaham');
        setBlogs(response.data.slice(0, 6)); // Fetch only 6 recent blogs
      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {blogs.map((blog: any) => (
        <ShineBorder key={blog.id} color={["#87CEEB", "#A020F0", "#00FFFF"]}>
            <div className="bg-transparent shadow-md rounded-lg overflow-hidden z-10">
                <img src={blog.social_image} alt={blog.title} className="w-full h-48 object-cover hidden md:block" />
                <div className="p-4">
                    <h2 className="text-xl font-semibold mb-2">{blog.title}</h2>
                    <p className="text-gray-500 text-sm md:text-md">{blog.description}</p>
                    <a href={blog.url} target="_blank" rel="noopener noreferrer" className="text-cyan-500 mt-4 block text-sm md:text-md text-end">
                    Read More
                    </a>
                </div>
            </div>
        </ShineBorder>
      ))}
    </div>
  );
}
