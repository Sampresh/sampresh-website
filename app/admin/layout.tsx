"use client"

import { useEffect, useState } from "react"
import type React from "react"
import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"
import { ArrowLeft, BarChart2, FileText, FolderOpen, Home, LogOut, Settings, User } from "lucide-react"

import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const pathname = usePathname()
  const { toast } = useToast()

  useEffect(() => {
    // Check if user is authenticated
    const authStatus = localStorage.getItem("isAuthenticated")
    setIsAuthenticated(authStatus === "true")
    setIsLoading(false)

    // If not authenticated and not on login page, redirect to login
    if (authStatus !== "true" && pathname !== "/admin/login") {
      router.push("/admin/login")
    }
  }, [pathname, router])

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated")
    setIsAuthenticated(false)
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    })
    router.push("/admin/login")
  }

  // Show login page directly if not authenticated
  if (pathname === "/admin/login") {
    return children
  }

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-red-500 border-r-2 border-b-2 border-gray-800 mx-auto mb-4"></div>
          <p>Loading...</p>
        </div>
      </div>
    )
  }

  // If not authenticated, don't render anything (will redirect)
  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="min-h-screen bg-black text-white flex">
      <aside className="w-64 border-r border-zinc-800 p-6 hidden md:block">
        <div className="mb-8">
          <Link href="/" className="text-xl font-bold flex items-center gap-2">
            <span className="text-red-500">Sampresh</span>Karki
          </Link>
          <p className="text-sm text-gray-400 mt-1">Admin Dashboard</p>
        </div>

        <nav className="space-y-1">
          <Link
            href="/admin"
            className={`flex items-center gap-3 px-3 py-2 rounded-md ${
              pathname === "/admin" ? "bg-zinc-900 text-white" : "text-gray-400 hover:bg-zinc-900 hover:text-white"
            }`}
          >
            <Home className={`h-5 w-5 ${pathname === "/admin" ? "text-red-500" : ""}`} />
            <span>Dashboard</span>
          </Link>
          <Link
            href="/admin/projects"
            className={`flex items-center gap-3 px-3 py-2 rounded-md ${
              pathname === "/admin/projects"
                ? "bg-zinc-900 text-white"
                : "text-gray-400 hover:bg-zinc-900 hover:text-white"
            }`}
          >
            <FolderOpen className={`h-5 w-5 ${pathname === "/admin/projects" ? "text-red-500" : ""}`} />
            <span>Projects</span>
          </Link>
          <Link
            href="/admin/blog"
            className={`flex items-center gap-3 px-3 py-2 rounded-md ${
              pathname === "/admin/blog" ? "bg-zinc-900 text-white" : "text-gray-400 hover:bg-zinc-900 hover:text-white"
            }`}
          >
            <FileText className={`h-5 w-5 ${pathname === "/admin/blog" ? "text-red-500" : ""}`} />
            <span>Blogs/Articles</span>
          </Link>
          <Link
            href="/admin/skills"
            className={`flex items-center gap-3 px-3 py-2 rounded-md ${
              pathname === "/admin/skills"
                ? "bg-zinc-900 text-white"
                : "text-gray-400 hover:bg-zinc-900 hover:text-white"
            }`}
          >
            <BarChart2 className={`h-5 w-5 ${pathname === "/admin/skills" ? "text-red-500" : ""}`} />
            <span>Skills</span>
          </Link>
          <Link
            href="/admin/profile"
            className={`flex items-center gap-3 px-3 py-2 rounded-md ${
              pathname === "/admin/profile"
                ? "bg-zinc-900 text-white"
                : "text-gray-400 hover:bg-zinc-900 hover:text-white"
            }`}
          >
            <User className={`h-5 w-5 ${pathname === "/admin/profile" ? "text-red-500" : ""}`} />
            <span>Profile</span>
          </Link>
          <Link
            href="/admin/settings"
            className={`flex items-center gap-3 px-3 py-2 rounded-md ${
              pathname === "/admin/settings"
                ? "bg-zinc-900 text-white"
                : "text-gray-400 hover:bg-zinc-900 hover:text-white"
            }`}
          >
            <Settings className={`h-5 w-5 ${pathname === "/admin/settings" ? "text-red-500" : ""}`} />
            <span>Settings</span>
          </Link>
        </nav>
      </aside>

      <div className="flex-1 flex flex-col">
        <header className="h-16 border-b border-zinc-800 flex items-center px-6">
          <Button variant="ghost" size="icon" asChild className="md:hidden mr-4">
            <Link href="/">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <h1 className="text-xl font-semibold">Admin Dashboard</h1>
          <div className="ml-auto flex items-center gap-4">
            <Button variant="outline" size="sm" asChild>
              <Link href="/">View Site</Link>
            </Button>
            <Button variant="ghost" size="sm" onClick={handleLogout} className="text-red-500">
              <LogOut className="mr-2 h-4 w-4" /> Logout
            </Button>
          </div>
        </header>

        <main className="flex-1 p-6 bg-zinc-950">{children}</main>
      </div>
    </div>
  )
}
