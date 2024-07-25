// components/ContactSection.tsx
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin, faTwitter, faGithub } from '@fortawesome/free-brands-svg-icons';

export default function ContactSection() {
  return (
    <section id="contact" className="section w-full py-12 md:py-24 lg:py-32">
      <div className="container max-w-6xl mx-auto px-4 md:px-6 text-center">
        <div className="flex flex-col items-center space-y-8">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Get in Touch</h2>
          <p className="text-lg md:text-xl leading-relaxed text-muted-foreground">
            Have a project in mind? Let's discuss how I can help.
          </p>
          <form className="w-full max-w-lg mx-auto space-y-4">
            <input
              type="text"
              placeholder="Name"
              className="w-full rounded-md bg-background px-4 py-2 text-foreground shadow-sm hover:bg-accent hover:text-accent-foreground focus:outline-none focus:ring-1 focus:ring-accent disabled:cursor-not-allowed disabled:opacity-50"
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full rounded-md bg-background px-4 py-2 text-foreground shadow-sm hover:bg-accent hover:text-accent-foreground focus:outline-none focus:ring-1 focus:ring-accent disabled:cursor-not-allowed disabled:opacity-50"
            />
            <textarea
              placeholder="Message"
              className="w-full rounded-md bg-background px-4 py-2 text-foreground shadow-sm hover:bg-accent hover:text-accent-foreground focus:outline-none focus:ring-1 focus:ring-accent disabled:cursor-not-allowed disabled:opacity-50"
            />
            <button
              type="submit"
              className="w-full rounded-md bg-primary px-4 py-2 text-primary-foreground shadow-sm hover:bg-primary/90 focus:outline-none focus:ring-1 focus:ring-primary disabled:cursor-not-allowed disabled:opacity-50"
            >
              Submit
            </button>
          </form>
          <div className="mt-8">
            <h3 className="text-xl font-semibold mb-4">Connect with me at:</h3>
            <div className="flex justify-center space-x-6">
              <a href="https://www.linkedin.com/in/yourprofile" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <FontAwesomeIcon icon={faLinkedin} className="text-3xl hover:text-soft-purple" />
              </a>
              <a href="https://twitter.com/yourprofile" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                <FontAwesomeIcon icon={faTwitter} className="text-3xl hover:text-soft-purple" />
              </a>
              <a href="https://github.com/yourprofile" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <FontAwesomeIcon icon={faGithub} className="text-3xl hover:text-soft-purple" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
