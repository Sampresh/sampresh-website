"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, FolderOpen, MessageSquare, User } from "lucide-react"
import { usePortfolio } from "@/contexts/portfolio-context"

export default function AdminDashboard() {
  const { projects, blogPosts } = usePortfolio()
  const [pageViews, setPageViews] = useState(0)

  // Initialize page views from localStorage or set a default
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedViews = localStorage.getItem("portfolio-page-views")
      if (storedViews) {
        setPageViews(Number.parseInt(storedViews, 10))
      } else {
        // Set a default starting value
        const defaultViews = Math.floor(Math.random() * 1000) + 500
        localStorage.setItem("portfolio-page-views", defaultViews.toString())
        setPageViews(defaultViews)
      }
    }
  }, [])

  // Get published projects and blog posts
  const publishedProjects = projects.filter((project) => project.status === "Published")
  const publishedBlogPosts = blogPosts.filter((post) => post.status === "Published")

  // Sort projects and blog posts by date (newest first)
  const sortedProjects = [...publishedProjects].sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime()
  })

  const sortedBlogPosts = [...publishedBlogPosts].sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime()
  })

  // Get recent projects and blog posts
  const recentProjects = sortedProjects.slice(0, 4)
  const recentBlogPosts = sortedBlogPosts.slice(0, 4)

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Dashboard Overview</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-zinc-900 border-zinc-800">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Projects</CardTitle>
            <FolderOpen className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{publishedProjects.length}</div>
            <p className="text-xs text-gray-400">
              {publishedProjects.length > 0 ? `Latest: ${sortedProjects[0]?.title}` : "No published projects yet"}
            </p>
          </CardContent>
        </Card>

        <Card className="bg-zinc-900 border-zinc-800">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Blog Posts</CardTitle>
            <FileText className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{publishedBlogPosts.length}</div>
            <p className="text-xs text-gray-400">
              {publishedBlogPosts.length > 0
                ? `Latest: ${sortedBlogPosts[0]?.title.substring(0, 20)}...`
                : "No published blog posts yet"}
            </p>
          </CardContent>
        </Card>

        <Card className="bg-zinc-900 border-zinc-800">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Comments</CardTitle>
            <MessageSquare className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
            <p className="text-xs text-gray-400">Comments feature coming soon</p>
          </CardContent>
        </Card>

        <Card className="bg-zinc-900 border-zinc-800">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Profile Views</CardTitle>
            <User className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pageViews}</div>
            <p className="text-xs text-gray-400">Since site launch</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-zinc-900 border-zinc-800">
          <CardHeader>
            <CardTitle>Recent Projects</CardTitle>
            <CardDescription>Your most recently added projects</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentProjects.length > 0 ? (
                recentProjects.map((project, i) => (
                  <div
                    key={project.id}
                    className="flex items-center justify-between border-b border-zinc-800 pb-3 last:border-0 last:pb-0"
                  >
                    <div>
                      <p className="font-medium">{project.title}</p>
                      <p className="text-sm text-gray-400">{project.date}</p>
                    </div>
                    <div className="text-xs bg-green-500/20 text-green-500 px-2 py-1 rounded-full">
                      {project.status}
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-400">No projects found. Add some projects to see them here.</p>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-zinc-900 border-zinc-800">
          <CardHeader>
            <CardTitle>Recent Blogs/Articles</CardTitle>
            <CardDescription>Your most recently published blogs/articles</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentBlogPosts.length > 0 ? (
                recentBlogPosts.map((post) => (
                  <div
                    key={post.id}
                    className="flex items-center justify-between border-b border-zinc-800 pb-3 last:border-0 last:pb-0"
                  >
                    <div>
                      <p className="font-medium">
                        {post.title.length > 30 ? `${post.title.substring(0, 30)}...` : post.title}
                      </p>
                      <p className="text-sm text-gray-400">{post.date}</p>
                    </div>
                    <div className="text-xs text-gray-400">{post.views} views</div>
                  </div>
                ))
              ) : (
                <p className="text-gray-400">No blog posts found. Add some blog posts to see them here.</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
