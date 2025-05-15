"use client"

import { usePortfolio } from "@/contexts/portfolio-context"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Calendar, Clock } from "lucide-react"
import { memo } from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

// Memoize the BlogCard component to prevent unnecessary re-renders
const BlogCard = memo(function BlogCard({ blog }: { blog: any }) {
  return (
    <Card className="bg-black border-zinc-800 overflow-hidden hover:border-red-500/50 transition-all">
      <div className="relative h-48 w-full overflow-hidden">
        <Image
          src={blog.image || "/placeholder.svg"}
          alt={blog.title}
          fill
          className="object-cover transition-transform hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          loading="lazy"
        />
      </div>
      <CardContent className="p-6">
        <div className="flex items-center gap-4 text-sm text-gray-400 mb-3">
          <div className="flex items-center">
            <Calendar className="mr-1 h-4 w-4" />
            {blog.date}
          </div>
          <div className="flex items-center">
            <Clock className="mr-1 h-4 w-4" />
            {blog.readTime || "5 min read"}
          </div>
        </div>
        <h3 className="text-xl font-semibold mb-2">{blog.title}</h3>
        <p className="text-gray-400 mb-4">{blog.excerpt}</p>
        <Link
          href={`/blog/${blog.slug || blog.id}`}
          className="text-red-500 hover:text-red-400 inline-flex items-center"
        >
          Read More <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
      </CardContent>
    </Card>
  )
})

export function BlogSection() {
  const { blogPosts, isLoading } = usePortfolio()

  // Filter only published blog posts
  const publishedPosts = blogPosts.filter((post) => post.status === "Published").slice(0, 3)

  if (isLoading) {
    return (
      <section className="py-20 bg-zinc-900">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="h-8 w-48 bg-zinc-800 rounded mx-auto mb-4"></div>
            <div className="h-4 w-64 bg-zinc-800 rounded mx-auto"></div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-20 bg-zinc-900">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-16">
          <div>
            <h2 className="text-3xl font-bold mb-4">Latest Blogs/Articles</h2>
            <p className="text-gray-400 max-w-2xl">
              Insights, tutorials, and thoughts on development, design, and technology.
            </p>
          </div>
          <Link href="/blog" className="hidden md:flex items-center text-red-500 hover:text-red-400">
            View All Blogs/Articles <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {publishedPosts.map((blog) => (
            <BlogCard key={blog.id} blog={blog} />
          ))}
        </div>

        <div className="mt-10 text-center md:hidden">
          <Button variant="outline" className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white">
            View All Blogs/Articles <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  )
}
