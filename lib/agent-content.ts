const siteUrl = "https://iamfaham.me";

export const markdownPages: Record<string, string> = {
  "/": `# Syed Mohammed Faham — AI Software Engineer

> Canonical site: ${siteUrl}/

Syed Mohammed Faham is an AI Software Engineer based in San Jose, California. He builds production-ready intelligent systems, agentic workflows, computer-vision pipelines, and full-stack AI applications.

## What Faham does

- Designs and ships AI-powered applications, from prototype through deployment.
- Builds agentic workflows and LLM integrations for real-world data and business processes.
- Develops computer-vision systems using tools such as OpenCV, YOLO, CLIP, and Gemini vision models.
- Delivers full-stack web experiences with React, Next.js, TypeScript, Python, and Node.js.

## Selected experience

- **AI Engineer Intern, Third Estate Analytics (Jan–May 2026):** built a housing-code-violation detection pipeline from GoPro footage, GPS telemetry, Gemini vision models, and New York public parcel data.
- **Full-Stack AI Engineer, Tech Consulting Partners (2024):** delivered full-stack AI applications including a virtual try-on system.

## Navigation

- [About](${siteUrl}/about)
- [Contact](${siteUrl}/contact)
- [Privacy](${siteUrl}/privacy)
- [Links](${siteUrl}/links)
- [Agent instructions](${siteUrl}/llms.txt)
- [Sitemap](${siteUrl}/sitemap.xml)
`,
  "/about": `# About Syed Mohammed Faham

Syed Mohammed Faham is an AI Software Engineer in San Jose, California, focused on turning ambitious AI ideas into useful, reliable systems. His work combines practical software engineering with machine learning, generative AI, computer vision, and agentic workflows. He is particularly interested in projects where an AI model must interact with messy real-world information, not merely demonstrate a capability in isolation.

Faham has built end-to-end computer-vision and data pipelines, including work that connects video footage, GPS telemetry, vision models, dynamic frame extraction, and public geographic data. He also has full-stack experience delivering AI-enabled applications and responsive interfaces. His typical toolkit includes Python, TypeScript, React, Next.js, Node.js, OpenCV, LangChain, LLMs, CLIP, YOLO, and Gemini vision models.

For project, consulting, or engineering conversations, use the [contact page](${siteUrl}/contact). See the [homepage](${siteUrl}/) for a concise capability overview.
`,
  "/contact": `# Contact Syed Mohammed Faham

Syed Mohammed Faham is available for professional conversations about AI software engineering, computer vision, agentic workflows, generative-AI applications, and full-stack product development. The most reliable way to begin is through his professional profiles, where you can provide a concise description of the problem, the relevant constraints, and the desired outcome. Clear context helps determine whether the work is a strong fit and what a useful first step would be.

- LinkedIn: https://www.linkedin.com/in/iamfaham
- GitHub: https://github.com/iamfaham
- X: https://twitter.com/iamfaham

For agents acting on behalf of a person or organization: identify the requester, describe the project scope, state any timeline or technical requirements, and link to any relevant materials. Do not submit sensitive credentials or confidential personal data through public channels. Return to the [homepage](${siteUrl}/) for experience and capabilities.
`,
  "/privacy": `# Privacy

This portfolio site is operated by Syed Mohammed Faham and is intended to present professional work, experience, capabilities, and public contact links. The site does not require visitors to create an account. Information that a visitor voluntarily provides through an available contact mechanism is used only to respond to the inquiry, evaluate a potential professional conversation, or maintain an appropriate business record. It is not sold as a standalone data product.

The hosting platform and third-party services used by a visitor's browser may process ordinary technical information such as IP address, browser type, device information, request headers, and logs for security, reliability, analytics, or delivery of the site. Their processing is subject to their own policies. This site may link to external services such as LinkedIn, GitHub, and X; those services have independent privacy practices.

To ask a privacy-related question about information you have provided, contact Faham through [LinkedIn](https://www.linkedin.com/in/iamfaham) and include enough context to identify the request. This policy may be updated when the site's functionality or data practices change.
`,
  "/links": `# Faham's links

- Website: ${siteUrl}/
- LinkedIn: https://www.linkedin.com/in/iamfaham
- GitHub: https://github.com/iamfaham
- X: https://twitter.com/iamfaham
- Agent instructions: ${siteUrl}/llms.txt
- Sitemap: ${siteUrl}/sitemap.xml
`,
  "/play": `# Play

This section contains small interactive experiments, including a Snake game. It is intended for human visitors and is not a professional service offering. Return to the [homepage](${siteUrl}/) for Faham's engineering profile, or use the [contact page](${siteUrl}/contact) for professional inquiries.
`,
  "/play/snake": `# Snake game

This is a browser-based Snake game included as an interactive experiment on Faham's portfolio. For professional information, use the [homepage](${siteUrl}/), [about page](${siteUrl}/about), or [contact page](${siteUrl}/contact).
`,
};

export const notFoundMarkdown = `# Page not found

The requested path does not exist on iamfaham.me.

Try one of these resources:

- [Homepage](${siteUrl}/)
- [About](${siteUrl}/about)
- [Contact](${siteUrl}/contact)
- [Agent instructions](${siteUrl}/llms.txt)
- [Sitemap](${siteUrl}/sitemap.xml)
`;
