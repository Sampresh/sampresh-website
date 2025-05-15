"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Calendar, Clock, Github, Linkedin, Mail, Twitter } from "lucide-react"
import { usePortfolio } from "@/contexts/portfolio-context"
import { Navbar } from "@/components/navbar"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useState } from "react"

export default function BlogPage() {
  const { blogPosts, isLoading } = usePortfolio()
  const [searchTerm, setSearchTerm] = useState("")

  // Filter only published blog posts
  const publishedPosts = blogPosts.filter((post) => post.status === "Published")

  // Filter by search term
  const filteredPosts = publishedPosts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-red-500 border-r-2 border-b-2 border-gray-800 mx-auto mb-4"></div>
          <p>Loading blog posts...</p>
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
          <span className="text-white">Blogs/Articles</span>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <h1 className="text-4xl font-bold">Blogs/Articles</h1>
          <div className="w-full md:w-auto">
            <Input
              placeholder="Search blogs/articles..."
              className="bg-zinc-900 border-zinc-800"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((blog) => (
            <Card
              key={blog.id}
              className="bg-zinc-900 border-zinc-800 overflow-hidden hover:border-red-500/50 transition-all"
            >
              <div className="relative h-48 w-full overflow-hidden">
                <Image
                  src={blog.image || "/placeholder.svg"}
                  alt={blog.title}
                  fill
                  className="object-cover transition-transform hover:scale-105"
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
                  Read More <ArrowLeft className="ml-2 h-4 w-4 rotate-180" />
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400">No blogs/articles found matching your search.</p>
          </div>
        )}
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
