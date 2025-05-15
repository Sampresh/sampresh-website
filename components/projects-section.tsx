"use client"

import { usePortfolio } from "@/contexts/portfolio-context"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Github, Globe } from "lucide-react"
import { memo } from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

// Memoize the ProjectCard component to prevent unnecessary re-renders
const ProjectCard = memo(function ProjectCard({ project }: { project: any }) {
  return (
    <Card className="bg-zinc-900 border-zinc-800 overflow-hidden hover:border-red-500/50 transition-all">
      <div className="relative h-48 w-full overflow-hidden">
        <Image
          src={project.image || "/placeholder.svg?height=400&width=600"}
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
          {project.tags.slice(0, 4).map((tag: string, idx: number) => (
            <Badge key={idx} variant="outline" className="bg-black border-zinc-800">
              {tag}
            </Badge>
          ))}
          {project.tags.length > 4 && (
            <Badge variant="outline" className="bg-black border-zinc-800">
              +{project.tags.length - 4}
            </Badge>
          )}
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
})

export function ProjectsSection() {
  const { projects, isLoading } = usePortfolio()

  // Filter only published projects
  const publishedProjects = projects.filter((project) => project.status === "Published").slice(0, 3)

  if (isLoading) {
    return (
      <section className="py-20 bg-black">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="h-8 w-48 bg-zinc-900 rounded mx-auto mb-4"></div>
            <div className="h-4 w-64 bg-zinc-900 rounded mx-auto"></div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-20 bg-black">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-16">
          <div>
            <h2 className="text-3xl font-bold mb-4">Featured Projects</h2>
            <p className="text-gray-400 max-w-2xl">
              A selection of my recent work. Each project represents a unique challenge and solution.
            </p>
          </div>
          <Link href="/projects" className="hidden md:flex items-center text-red-500 hover:text-red-400">
            View All Projects <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {publishedProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        <div className="mt-10 text-center md:hidden">
          <Link href="/projects" passHref>
            <Button variant="outline" className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white">
              View All Projects <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
