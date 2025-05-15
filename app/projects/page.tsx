"use client"

import Link from "next/link"
import Image from "next/image"
import { Github, Globe, Linkedin, Twitter, Mail } from "lucide-react"
import { usePortfolio } from "@/contexts/portfolio-context"
import { Navbar } from "@/components/navbar"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ProjectsPage() {
  const { projects, isLoading } = usePortfolio()

  // Filter only published projects
  const publishedProjects = projects.filter((project) => project.status === "Published")

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-red-500 border-r-2 border-b-2 border-gray-800 mx-auto mb-4"></div>
          <p>Loading projects...</p>
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
          <span className="text-white">Projects</span>
        </div>

        <h1 className="text-4xl font-bold mb-8">My Projects</h1>

        <Tabs defaultValue="all" className="w-full mb-12">
          <TabsList className="bg-zinc-900 border border-zinc-800 p-1 overflow-x-auto flex-nowrap">
            <TabsTrigger value="all">All Projects</TabsTrigger>
            <TabsTrigger value="web">Web Development</TabsTrigger>
            <TabsTrigger value="mobile">Mobile Development</TabsTrigger>
            <TabsTrigger value="ai">AI/ML</TabsTrigger>
          </TabsList>
          <TabsContent value="all" className="mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {publishedProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </TabsContent>
          <TabsContent value="web" className="mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {publishedProjects
                .filter((p) => p.category === "Web Development" || p.category === "Web Application")
                .map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
            </div>
          </TabsContent>
          <TabsContent value="mobile" className="mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {publishedProjects
                .filter((p) => p.category === "Mobile Development")
                .map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
            </div>
          </TabsContent>
          <TabsContent value="ai" className="mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {publishedProjects
                .filter((p) => p.category === "AI/ML")
                .map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
            </div>
          </TabsContent>
        </Tabs>
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

function ProjectCard({ project }: { project: any }) {
  return (
    <Card className="bg-zinc-900 border-zinc-800 overflow-hidden hover:border-red-500/50 transition-all">
      <div className="relative h-48 w-full overflow-hidden">
        <Image
          src={project.image || "/placeholder.svg"}
          alt={project.title}
          fill
          className="object-cover transition-transform hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          loading="lazy"
        />
      </div>
      <CardContent className="p-6">
        <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
        <p className="text-gray-400 mb-4">{project.description}</p>
        <div className="flex flex-wrap gap-2 mb-6">
          {project.tags.map((tag: string, idx: number) => (
            <Badge key={idx} variant="outline" className="bg-black border-zinc-800">
              {tag}
            </Badge>
          ))}
        </div>
        <div className="flex gap-3">
          <Button
            variant="outline"
            size="sm"
            className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
            onClick={() => window.open(`https://sampresh.com.np/projects/${project.id}`, "_blank")}
          >
            <Globe className="mr-2 h-4 w-4" /> Live Demo
          </Button>
          {project.githubUrl && (
            <Button
              variant="ghost"
              size="sm"
              className="text-white"
              onClick={() => window.open(project.githubUrl, "_blank")}
            >
              <Github className="mr-2 h-4 w-4" /> Code
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
