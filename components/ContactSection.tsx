"use client";

import { useState } from "react";
import emailjs from "emailjs-com";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLinkedin,
  faGithub,
  faXTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { getPersonalInfo } from "@/lib/data";
import AnimatedSection from "@/components/AnimatedSection";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSending, setIsSending] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const personalInfo = getPersonalInfo();

  const publicKey = process.env.NEXT_PUBLIC_EMAILJS_KEY!;
  const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!;
  const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSending(true);
    try {
      const result = await emailjs.send(
        serviceId,
        templateId,
        formData,
        publicKey,
      );
      if (result.text === "OK") {
        setFormData({ name: "", email: "", message: "" });
        setIsSubmitted(true);
        setTimeout(() => setIsSubmitted(false), 4000);
      } else {
        alert("Failed to send your message. Please try again.");
      }
    } catch {
      alert("An error occurred. Please try again.");
    } finally {
      setIsSending(false);
    }
  };

  const socials = [
    {
      icon: faLinkedin,
      label: "LinkedIn",
      handle: "iamfaham",
      url: personalInfo.social.linkedin,
    },
    {
      icon: faGithub,
      label: "GitHub",
      handle: "iamfaham",
      url: personalInfo.social.github,
    },
    {
      icon: faXTwitter,
      label: "Twitter / X",
      handle: "iamfaham",
      url: personalInfo.social.twitter,
    },
  ];

  return (
    <section className="relative w-full py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <AnimatedSection className="mb-12 text-center">
          <p
            className="section-label"
            style={{ display: "block", textAlign: "center" }}
          >
            Say Hello
          </p>
          <h2 className="text-white text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-[-1px] sm:tracking-[-1.5px]">
            Get in Touch
          </h2>
          <p className="text-white/25 text-sm mt-2.5 leading-relaxed max-w-md mx-auto">
            Have a project in mind or just want to talk AI? Drop a message and
            I&apos;ll get back to you.
          </p>
        </AnimatedSection>

        <div className="grid md:grid-cols-[1fr_280px] gap-5 items-start">
          {/* Form */}
          <div className="glass-card p-7">
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {(
                [
                  {
                    name: "name",
                    label: "Name",
                    type: "text",
                    placeholder: "Your name",
                  },
                  {
                    name: "email",
                    label: "Email",
                    type: "email",
                    placeholder: "your@email.com",
                  },
                ] as const
              ).map(({ name, label, type, placeholder }) => (
                <div key={name} className="flex flex-col gap-1.5">
                  <label className="text-white/25 text-[11px] tracking-widest uppercase">
                    {label}
                  </label>
                  <input
                    type={type}
                    name={name}
                    placeholder={placeholder}
                    value={formData[name]}
                    onChange={handleChange}
                    required
                    className="bg-white/[0.03] border border-white/[0.07] rounded-xl px-4 py-2.5 text-white/70 text-sm placeholder:text-white/20 outline-none focus:border-[#00c6ff]/30 focus:bg-[#00c6ff]/[0.02] transition-colors"
                  />
                </div>
              ))}
              <div className="flex flex-col gap-1.5">
                <label className="text-white/25 text-[11px] tracking-widest uppercase">
                  Message
                </label>
                <textarea
                  name="message"
                  placeholder="What's on your mind?"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="bg-white/[0.03] border border-white/[0.07] rounded-xl px-4 py-2.5 text-white/70 text-sm placeholder:text-white/20 outline-none focus:border-[#00c6ff]/30 focus:bg-[#00c6ff]/[0.02] transition-colors resize-none"
                />
              </div>
              <button
                type="submit"
                disabled={isSending || isSubmitted}
                className="bg-[#00c6ff]/10 border border-[#00c6ff]/30 text-[#00c6ff] py-3 rounded-xl text-sm font-semibold hover:bg-[#00c6ff]/18 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSending
                  ? "Sending..."
                  : isSubmitted
                    ? "Sent!"
                    : "Send Message →"}
              </button>
            </form>
          </div>

          {/* Right panel */}
          <div className="flex flex-col gap-4">
            <div className="glass-card p-5">
              <p className="text-white/20 text-[10px] tracking-[2px] uppercase mb-3.5">
                Find me on
              </p>
              <div className="flex flex-col gap-2.5">
                {socials.map(({ icon, label, handle, url }) => (
                  <a
                    key={label}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-2.5 rounded-xl border border-white/5 bg-white/[0.02] hover:border-[#00c6ff]/20 transition-colors"
                  >
                    <FontAwesomeIcon
                      icon={icon}
                      className="text-white/40 text-base w-5 flex-shrink-0"
                    />
                    <span className="text-white/50 text-xs font-medium">
                      {label}
                    </span>
                    <span className="text-[#00c6ff]/50 text-[11px] ml-auto">
                      {handle}
                    </span>
                  </a>
                ))}
              </div>
            </div>

            <div className="glass-card p-5">
              <p className="text-white/20 text-[10px] tracking-[2px] uppercase mb-2">
                Or email directly
              </p>
              <p className="text-[#00c6ff] text-sm font-semibold">
                iamfaham5@gmail.com
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
