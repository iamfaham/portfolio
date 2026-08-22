const schema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": "https://iamfaham.me/#person",
  name: "Syed Mohammed Faham",
  alternateName: ["Faham", "iamfaham"],
  url: "https://iamfaham.me",
  image: "https://iamfaham.me/profile.png",
  jobTitle: "AI Software Engineer",
  description:
    "AI Software Engineer based in San Jose, CA — building intelligent systems, ML models, and GenAI applications.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "San Jose",
    addressRegion: "CA",
    addressCountry: "US",
  },
  sameAs: [
    "https://github.com/iamfaham",
    "https://www.linkedin.com/in/iamfaham",
    "https://twitter.com/iamfaham",
    "https://instagram.com/iamfaham",
    "https://medium.com/@iamfaham",
    "https://dev.to/iamfaham",
  ],
  knowsAbout: [
    "Artificial Intelligence",
    "Machine Learning",
    "Generative AI",
    "Computer Vision",
    "Python",
    "Next.js",
    "TypeScript",
  ],
  email: "iamfaham5@gmail.com",
};

export default function JsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
