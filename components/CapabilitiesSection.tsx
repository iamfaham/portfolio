"use client";

import AnimatedSection from "@/components/AnimatedSection";
import { StaggerContainer, StaggerItem } from "@/components/StaggerContainer";

const capabilities = [
  {
    icon: "🧠",
    name: "LLM Applications, AI Agents & Agentic Systems",
    description:
      "Building production-ready LLM pipelines, retrieval-augmented generation, autonomous agents, multi-agent orchestration, and agentic workflows that go beyond basic chat.",
    tools: ["LangChain", "OpenAI API", "Supabase Vector", "FastAPI", "CrewAI"],
    wide: true,
  },
  {
    icon: "👁️",
    name: "Computer Vision",
    description:
      "Multimodal models, image classification, object detection, and cross-modal attention systems.",
    tools: ["PyTorch", "Transformers", "OpenCV"],
    wide: false,
  },
  {
    icon: "📈",
    name: "ML & Reinforcement Learning",
    description:
      "Predictive modelling, classical ML pipelines, and RL agents trained on custom environments and reward functions.",
    tools: ["PyTorch", "scikit-learn", "TensorFlow", "Gym"],
    wide: false,
  },
  {
    icon: "⚡",
    name: "AI-Powered Backends",
    description:
      "REST APIs and microservices that wrap ML models, low-latency, scalable, production-ready.",
    tools: ["FastAPI", "PostgreSQL", "Docker"],
    wide: false,
  },
  {
    icon: "🌐",
    name: "Full-Stack Development",
    description:
      "End-to-end web apps with React/Next.js frontends connected to AI backends.",
    tools: ["Next.js", "React", "TypeScript"],
    wide: false,
  },
];

export default function CapabilitiesSection() {
  return (
    <section className="relative w-full py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <AnimatedSection className="mb-12">
          <p className="section-label">What I Do</p>
          <h2 className="text-white text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-[-1px] sm:tracking-[-1.5px]">Capabilities</h2>
          <p className="text-white/25 text-sm mt-2.5 leading-relaxed">
            Areas I&apos;ve shipped in and can hit the ground running on.
          </p>
        </AnimatedSection>

        <StaggerContainer className="grid md:grid-cols-3 gap-4">
          {capabilities.map((cap) => (
            <StaggerItem key={cap.name} className={cap.wide ? "md:col-span-2" : ""}>
              <div className="glass-card h-full p-6 flex flex-col gap-3">
                <span className="text-2xl">{cap.icon}</span>
                <h3 className="text-white text-[15px] font-bold tracking-tight leading-snug">
                  {cap.name}
                </h3>
                <p className="text-white/30 text-xs leading-relaxed flex-1">{cap.description}</p>
                <div className="flex flex-wrap gap-1.5">
                  {cap.tools.map((tool) => (
                    <span
                      key={tool}
                      className="bg-[#00c6ff]/[0.06] border border-[#00c6ff]/15 text-[#00c6ff]/60 px-2 py-0.5 rounded text-[10px]"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
