import BlogCards from "@/components/BlogCards";

export const metadata = {
  title: "Blogs",
  description: "Recent blogs from iamfaham on Dev.to",
};

export default function BlogsPage() {
  return (
    <div className="min-h-screen bg-black w-full">
      <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8 max-w-7xl">
        <h1 className="text-4xl font-bold text-center mb-8">Recent Blogs</h1>
        <BlogCards />
      </div>
    </div>
  );
}
