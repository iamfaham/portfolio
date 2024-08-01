import BlogCards from '@/components/BlogCards';

export const metadata = {
  title: 'Blogs',
  description: 'Recent blogs from iamfaham on Dev.to',
};

export default function BlogsPage() {
  return (
    <div className="container mx-auto py-12 bg-black w-full h-full px-10">
      <h1 className="text-4xl font-bold text-center mb-8">Recent Blogs</h1>
      <BlogCards />
    </div>
  );
}
