
export default function TestimonialSection() {
    return (
      <section id="experience" className="section w-full py-12 md:py-24 lg:py-32">
        <div className="container max-w-6xl mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center text-center space-y-8">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">My Testimonials</h2>
            <p className="text-lg md:text-xl leading-relaxed text-muted-foreground">
              Here are some of the testimonials from the people I&apos;ve worked with.
            </p>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {/* Testimonial items go here */}
            </div>
          </div>
        </div>
      </section>
    );
  }
  