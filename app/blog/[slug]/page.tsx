"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useParams } from "next/navigation"
import { ArrowLeft, Calendar, Clock, Github, Linkedin, Mail, Twitter } from "lucide-react"
import { usePortfolio } from "@/contexts/portfolio-context"
import { Navbar } from "@/components/navbar"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function BlogPostPage() {
  const params = useParams()
  const { blogPosts, isLoading, setBlogPosts } = usePortfolio()
  const [post, setPost] = useState<any>(null)

  useEffect(() => {
    if (!isLoading && blogPosts.length > 0) {
      // Find the post by slug or id
      const slug = params.slug as string
      const foundPost = blogPosts.find((p) => p.slug === slug || p.id.toString() === slug)
      setPost(foundPost)
    }
  }, [params.slug, blogPosts, isLoading])

  // Add this effect after the useEffect that finds the post
  useEffect(() => {
    // Only run if we have a post and we're on the client side
    if (!post || typeof window === "undefined") return

    // Update the view count for this post
    const updateViewCount = () => {
      setBlogPosts((prevPosts) => prevPosts.map((p) => (p.id === post.id ? { ...p, views: p.views + 1 } : p)))
    }

    // Only count the view once per session for this post
    const viewedPosts = JSON.parse(sessionStorage.getItem("viewed-posts") || "[]")
    if (!viewedPosts.includes(post.id)) {
      updateViewCount()
      sessionStorage.setItem("viewed-posts", JSON.stringify([...viewedPosts, post.id]))
    }
  }, [post, setBlogPosts])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-red-500 border-r-2 border-b-2 border-gray-800 mx-auto mb-4"></div>
          <p>Loading blog post...</p>
        </div>
      </div>
    )
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Blog/Article Not Found</h2>
          <p className="mb-6">The blog/article you're looking for doesn't exist or has been removed.</p>
          <Link href="/blog" passHref>
            <Button className="bg-red-500 hover:bg-red-600">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Blogs/Articles
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      <main className="container mx-auto py-24 px-4">
        <div className="flex items-center gap-2 mb-8">
          <Link href="/" className="text-gray-400 hover:text-red-500">
            Home
          </Link>
          <span className="text-gray-600">/</span>
          <Link href="/blog" className="text-gray-400 hover:text-red-500">
            Blogs/Articles
          </Link>
          <span className="text-gray-600">/</span>
          <span className="text-white">{post.title}</span>
        </div>

        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold mb-6">{post.title}</h1>

          <div className="flex items-center gap-4 text-sm text-gray-400 mb-8">
            <div className="flex items-center">
              <Calendar className="mr-1 h-4 w-4" />
              {post.date}
            </div>
            <div className="flex items-center">
              <Clock className="mr-1 h-4 w-4" />
              {post.readTime || "5 min read"}
            </div>
            <div className="px-2 py-1 bg-zinc-800 rounded-full text-xs">{post.category}</div>
          </div>

          <div className="relative h-80 w-full mb-8 rounded-lg overflow-hidden">
            <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
          </div>

          <div className="prose prose-invert max-w-none">
            {post.content?.split("\n\n").map((paragraph: string, idx: number) => (
              <p key={idx} className="mb-6 text-gray-300 leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>

          <div className="mt-12 pt-8 border-t border-zinc-800">
            <h3 className="text-xl font-semibold mb-6">Share this article</h3>
            <div className="flex gap-4">
              <Button variant="outline" size="icon" className="border-zinc-700 hover:border-red-500 hover:text-red-500">
                <Twitter className="h-5 w-5" />
              </Button>
              <Button variant="outline" size="icon" className="border-zinc-700 hover:border-red-500 hover:text-red-500">
                <Linkedin className="h-5 w-5" />
              </Button>
              <Button variant="outline" size="icon" className="border-zinc-700 hover:border-red-500 hover:text-red-500">
                <Mail className="h-5 w-5" />
              </Button>
            </div>
          </div>

          <div className="mt-12">
            <h3 className="text-xl font-semibold mb-6">More Blogs/Articles</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {blogPosts
                .filter((p) => p.id !== post.id && p.status === "Published")
                .slice(0, 2)
                .map((relatedPost) => (
                  <Card
                    key={relatedPost.id}
                    className="bg-zinc-900 border-zinc-800 hover:border-red-500/50 transition-all"
                  >
                    <CardContent className="p-6">
                      <h4 className="text-lg font-semibold mb-2">{relatedPost.title}</h4>
                      <p className="text-gray-400 text-sm mb-4 line-clamp-2">{relatedPost.excerpt}</p>
                      <Link
                        href={`/blog/${relatedPost.slug || relatedPost.id}`}
                        className="text-red-500 hover:text-red-400 text-sm"
                      >
                        Read more
                      </Link>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-zinc-900 py-12 px-4">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <Link href="/" className="text-2xl font-bold text-white">
                <span className="text-red-500">Sampresh</span>Karki
              </Link>
              <p className="text-gray-400 mt-2">Building the future, one line of code at a time.</p>
            </div>
            <div className="flex gap-4">
              <Button variant="ghost" size="icon" className="text-white hover:text-red-500">
                <Github className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-white hover:text-red-500">
                <Linkedin className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-white hover:text-red-500">
                <Twitter className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-white hover:text-red-500">
                <Mail className="h-5 w-5" />
              </Button>
            </div>
          </div>
          <div className="border-t border-zinc-800 mt-8 pt-8 text-center text-gray-400">
            <p>© {new Date().getFullYear()} Sampresh Karki. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
