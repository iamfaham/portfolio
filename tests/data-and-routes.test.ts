import { describe, expect, it } from "vitest";
import { getColorMap, getExperience, getPersonalInfo, getSections, getStats, getTestimonials } from "@/lib/data";
import { markdownPages, notFoundMarkdown } from "@/lib/agent-content";
import { GET } from "@/app/api/markdown/[[...slug]]/route";
import { cn, formatProjectTitle } from "@/lib/utils";

describe("portfolio data", () => {
  it("exposes complete display data", () => {
    expect(getPersonalInfo().name).toBe("Syed Mohammed Faham");
    expect(getExperience()).toHaveLength(3);
    expect(getSections()).toContain("projectsDiv");
    expect(getColorMap()).toHaveProperty("text-white");
    expect(getStats().totalCommits).toBeGreaterThan(0);
    expect(getTestimonials()[0].linkedinUrl).toMatch(/^https:/);
  });
});

describe("presentation helpers", () => {
  it("merges class names and formats project titles", () => {
    expect(cn("p-2", "p-4", "text-white")).toBe("p-4 text-white");
    expect(formatProjectTitle("my-AI_project")).toBe("My Ai_project");
    expect(formatProjectTitle("Portfolio")).toBe("Portfolio");
  });
});

describe("Markdown route", () => {
  it("returns published Markdown pages", async () => {
    const response = GET(new Request("https://iamfaham.me/about"), { params: { slug: ["about"] } });
    expect(response.status).toBe(200);
    expect(response.headers.get("Content-Type")).toContain("text/markdown");
    expect(await response.text()).toBe(markdownPages["/about"]);
  });

  it("returns a recoverable Markdown 404", async () => {
    const response = GET(new Request("https://iamfaham.me/missing"), { params: { slug: ["missing"] } });
    expect(response.status).toBe(404);
    expect(await response.text()).toBe(notFoundMarkdown);
  });
});
