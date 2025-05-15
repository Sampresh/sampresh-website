import BlogPostClientPage from './blog-post-client-page';
import { defaultBlogPosts } from '@/lib/blog-data'; // Import from the new data file

export async function generateStaticParams() {
  // Map over the defaultBlogPosts to get the slugs
  // Ensure that posts with status "Published" are included, or adjust as needed
  const publishedPosts = defaultBlogPosts.filter(post => post.status === "Published" && post.slug);
  
  if (publishedPosts.length === 0) {
    // If there are no published posts with slugs, 
    // return a dummy slug to prevent build errors if you expect posts later.
    // Or, if you have no blog section for now, you could return an empty array,
    // but then no blog post pages will be generated.
    // console.warn("No published blog posts with slugs found for generateStaticParams. Build will proceed with a dummy slug.");
    // return [{ slug: 'no-posts' }]; // Or return [] if that's intended
  }

  return publishedPosts.map((post) => ({
    slug: post.slug!, // post.slug should exist due to the filter
  }));
}

// This is now a Server Component
export default function Page({ params }: { params: { slug: string } }) {
  return <BlogPostClientPage params={params} />;
}
