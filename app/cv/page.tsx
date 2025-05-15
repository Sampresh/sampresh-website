"use client"

import Link from "next/link"
import { Download, FileText } from "lucide-react"
import { usePortfolio } from "@/contexts/portfolio-context"
import { Navbar } from "@/components/navbar"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function CVPage() {
  const { profileInfo, isLoading } = usePortfolio()

  const handleDownloadCV = () => {
    // Create a link to download the CV
    const link = document.createElement("a")
    link.href = profileInfo.cv.path || "/cv/Sampresh-Karki-Resume.pdf"
    link.download = profileInfo.cv.fileName || "Sampresh-Karki-Resume.pdf"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-red-500 border-r-2 border-b-2 border-gray-800 mx-auto mb-4"></div>
          <p>Loading CV information...</p>
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
          <span className="text-white">CV</span>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">My Resume</h1>
            <p className="text-gray-400 mb-8">
              Download my resume to learn more about my skills, experience, and education.
            </p>
            <Button className="bg-red-500 hover:bg-red-600" onClick={handleDownloadCV}>
              <Download className="mr-2 h-4 w-4" /> Download CV
            </Button>
          </div>

          <Card className="bg-zinc-900 border-zinc-800 mb-8">
            <CardContent className="p-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold">{profileInfo.name}</h2>
                  <p className="text-red-500">{profileInfo.title}</p>
                </div>
                <FileText className="h-12 w-12 text-red-500" />
              </div>

              <div className="space-y-8">
                <section>
                  <h3 className="text-xl font-semibold mb-4 border-b border-zinc-800 pb-2">Summary</h3>
                  <p className="text-gray-300">{profileInfo.bio}</p>
                </section>

                <section>
                  <h3 className="text-xl font-semibold mb-4 border-b border-zinc-800 pb-2">Experience</h3>
                  <div className="space-y-6">
                    <div>
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium">Computer Systems Engineering Graduate</h4>
                          <p className="text-red-500">Tech Innovations Inc.</p>
                        </div>
                        <span className="text-sm text-gray-400">2022 - Present</span>
                      </div>
                      <ul className="list-disc list-inside text-gray-300 mt-2 space-y-1">
                        <li>Developed web security login systems with authentication mechanisms</li>
                        <li>Created AI models for stock market prediction using S&P 500 data</li>
                        <li>Built mobile applications for travel itinerary management</li>
                      </ul>
                    </div>
                  </div>
                </section>

                <section>
                  <h3 className="text-xl font-semibold mb-4 border-b border-zinc-800 pb-2">Education</h3>
                  <div>
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium">Computer Systems Engineering</h4>
                        <p className="text-red-500">University of Technology</p>
                      </div>
                      <span className="text-sm text-gray-400">2018 - 2022</span>
                    </div>
                  </div>
                </section>

                <section>
                  <h3 className="text-xl font-semibold mb-4 border-b border-zinc-800 pb-2">Skills</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium mb-2">Technical Skills</h4>
                      <ul className="list-disc list-inside text-gray-300 space-y-1">
                        <li>Python, JavaScript</li>
                        <li>Next.js, Tailwind CSS</li>
                        <li>Django, Kotlin (Android)</li>
                        <li>MongoDB, Firebase</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Core Skills</h4>
                      <ul className="list-disc list-inside text-gray-300 space-y-1">
                        <li>Creative Problem Solving</li>
                        <li>Project Development</li>
                        <li>Team Collaboration</li>
                        <li>Adaptability</li>
                      </ul>
                    </div>
                  </div>
                </section>
              </div>
            </CardContent>
          </Card>

          <div className="text-center">
            <p className="text-gray-400 mb-4">Need more information or want to discuss a project?</p>
            <Link href="/contact" passHref>
              <Button variant="outline" className="border-red-500 text-\
