"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import AnimatedSection from "@/components/AnimatedSection";
import { StaggerContainer, StaggerItem } from "@/components/StaggerContainer";

interface DevToArticle {
  id: number;
  title: string;
  url: string;
  cover_image: string | null;
  readable_publish_date: string;
  reading_time_minutes: number;
  tag_list: string[];
}

export default function BlogPreview() {
  const [articles, setArticles] = useState<DevToArticle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://dev.to/api/articles?username=iamfaham&per_page=3")
      .then((res) => res.json())
      .then((data) => setArticles(Array.isArray(data) ? data : []))
      .catch(() => setArticles([]))
      .finally(() => setLoading(false));
  }, []);

  if (!loading && articles.length === 0) return null;

  return (
    <section className="relative w-full py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <AnimatedSection className="mb-12 flex items-end justify-between gap-4">
          <div>
            <p className="section-label">Writing</p>
            <h2 className="text-white text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-[-1px] sm:tracking-[-1.5px]">Latest Posts</h2>
          </div>
          <a
            href="https://dev.to/iamfaham"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#00c6ff] text-xs font-semibold border-b border-[#00c6ff]/20 pb-0.5 mb-1.5 whitespace-nowrap hover:border-[#00c6ff]/50 transition-colors"
          >
            View all on Dev.to →
          </a>
        </AnimatedSection>

        {loading ? (
          <div className="flex justify-center py-16">
            <div className="w-7 h-7 border-2 border-[#00c6ff]/30 border-t-[#00c6ff] rounded-full animate-spin" />
          </div>
        ) : (
          <StaggerContainer className="grid md:grid-cols-3 gap-4">
            {articles.map((article) => (
              <StaggerItem key={article.id}>
                <Link
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-card flex flex-col overflow-hidden h-full hover:border-[#00c6ff]/20 transition-colors duration-200 block no-underline"
                >
                  {/* Cover image */}
                  <div className="relative w-full h-40 bg-gradient-to-br from-[#0d1117] to-[#1a1f2e] flex-shrink-0">
                    {article.cover_image && (
                      <Image
                        src={article.cover_image}
                        alt={article.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    )}
                    <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-black/90 to-transparent" />
                  </div>

                  {/* Body */}
                  <div className="p-5 flex flex-col gap-2.5 flex-1">
                    {article.tag_list[0] && (
                      <span className="bg-[#00c6ff]/[0.06] border border-[#00c6ff]/15 text-[#00c6ff]/60 px-2.5 py-0.5 rounded-full text-[10px] tracking-[1px] uppercase w-fit">
                        {article.tag_list[0]}
                      </span>
                    )}
                    <h3 className="text-white text-sm font-bold leading-snug tracking-tight flex-1">
                      {article.title}
                    </h3>
                    <div className="flex items-center justify-between pt-3 border-t border-white/5 mt-auto">
                      <div className="flex gap-3 text-white/20 text-[11px]">
                        <span>{article.readable_publish_date}</span>
                        <span>{article.reading_time_minutes} min read</span>
                      </div>
                      <span className="text-[#00c6ff] text-[11px] font-semibold">Read →</span>
                    </div>
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
        )}
      </div>
    </section>
  );
}
