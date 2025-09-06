"use client";

export default function TestimonialSection() {
  return (
    <div className="py-20 bg-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-white mb-12">
          What People Say
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Testimonial cards would go here */}
          <div className="bg-gray-800 p-6 rounded-lg">
            <p className="text-gray-300 mb-4">
              &quot;Great work on the project! Very professional and delivered
              on time.&quot;
            </p>
            <div className="flex items-center">
              <div className="w-10 h-10 bg-gray-600 rounded-full mr-4"></div>
              <div>
                <h4 className="text-white font-semibold">John Doe</h4>
                <p className="text-gray-400 text-sm">Client</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
