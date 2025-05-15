"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Github, Linkedin, Mail, MapPin, Phone, Twitter } from "lucide-react"
import { usePortfolio } from "@/contexts/portfolio-context"
import { Navbar } from "@/components/navbar"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"

export default function ContactPage() {
  const { profileInfo, isLoading } = usePortfolio()
  const { toast } = useToast()
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({
      ...formState,
      [e.target.id]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Using Formspree for form submission
      const response = await fetch("https://formspree.io/f/YOUR_FORMSPREE_ID", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formState.name,
          email: formState.email,
          subject: formState.subject,
          message: formState.message,
        }),
      })

      if (response.ok) {
        toast({
          title: "Message sent!",
          description: "Thank you for your message. I'll get back to you soon.",
        })
        // Reset form
        setFormState({
          name: "",
          email: "",
          subject: "",
          message: "",
        })
      } else {
        throw new Error("Failed to send message")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "There was a problem sending your message. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-red-500 border-r-2 border-b-2 border-gray-800 mx-auto mb-4"></div>
          <p>Loading contact information...</p>
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
          <span className="text-white">Contact</span>
        </div>

        <h1 className="text-4xl font-bold mb-12">Get in Touch</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card className="bg-zinc-900 border-zinc-800">
              <CardContent className="p-6">
                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Your Name</Label>
                      <Input
                        id="name"
                        placeholder="John Doe"
                        className="bg-zinc-800 border-zinc-700"
                        value={formState.name}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Your Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="john@example.com"
                        className="bg-zinc-800 border-zinc-700"
                        value={formState.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input
                      id="subject"
                      placeholder="Project Inquiry"
                      className="bg-zinc-800 border-zinc-700"
                      value={formState.subject}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      placeholder="Tell me about your project..."
                      className="min-h-32 bg-zinc-800 border-zinc-700"
                      value={formState.message}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    className="bg-red-500 hover:bg-red-600 w-full md:w-auto"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card className="bg-zinc-900 border-zinc-800">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-6">Contact Information</h2>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <Mail className="h-5 w-5 text-red-500 mt-1" />
                    <div>
                      <p className="font-medium">Email</p>
                      <a href={`mailto:${profileInfo.email}`} className="text-gray-400 hover:text-red-500">
                        {profileInfo.email}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <Phone className="h-5 w-5 text-red-500 mt-1" />
                    <div>
                      <p className="font-medium">Phone</p>
                      <a href={`tel:${profileInfo.contact}`} className="text-gray-400 hover:text-red-500">
                        {profileInfo.contact}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <MapPin className="h-5 w-5 text-red-500 mt-1" />
                    <div>
                      <p className="font-medium">Location</p>
                      <p className="text-gray-400">{profileInfo.location}</p>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-zinc-800">
                    <p className="font-medium mb-4">Connect with me</p>
                    <div className="flex gap-4">
                      <Button
                        variant="outline"
                        size="icon"
                        className="border-zinc-700 hover:border-red-500 hover:text-red-500"
                        onClick={() => window.open(profileInfo.socialLinks.github, "_blank")}
                      >
                        <Github className="h-5 w-5" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        className="border-zinc-700 hover:border-red-500 hover:text-red-500"
                        onClick={() => window.open(profileInfo.socialLinks.linkedin, "_blank")}
                      >
                        <Linkedin className="h-5 w-5" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        className="border-zinc-700 hover:border-red-500 hover:text-red-500"
                        onClick={() => window.open(profileInfo.socialLinks.twitter, "_blank")}
                      >
                        <Twitter className="h-5 w-5" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
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
