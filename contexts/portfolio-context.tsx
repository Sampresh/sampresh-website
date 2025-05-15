"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect, useMemo } from "react"

// Define types for our data
export type Project = {
  id: number
  title: string
  description: string
  category: string
  status: string
  date: string
  tags: string[]
  image: string
  githubUrl?: string
}

export type BlogPost = {
  id: number
  title: string
  excerpt: string
  category: string
  status: string
  date: string
  views: number
  image?: string
  readTime?: string
  slug?: string
  content?: string
}

export type Skill = {
  category: string
  icon: React.ReactNode
  items: string[]
}

export type ProfileInfo = {
  name: string
  title: string
  email: string
  bio: string
  location: string
  contact: string
  age: number
  socialLinks: {
    github: string
    linkedin: string
    twitter: string
    website: string
    dribbble: string
    youtube: string
    instagram: string
  }
  cv: {
    title: string
    fileName: string
    uploadDate: string
    path?: string
  }
}

type PortfolioContextType = {
  projects: Project[]
  setProjects: React.Dispatch<React.SetStateAction<Project[]>>
  blogPosts: BlogPost[]
  setBlogPosts: React.Dispatch<React.SetStateAction<BlogPost[]>>
  skills: Skill[]
  setSkills: React.Dispatch<React.SetStateAction<Skill[]>>
  profileInfo: ProfileInfo
  setProfileInfo: React.Dispatch<React.SetStateAction<ProfileInfo>>
  isLoading: boolean
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined)

// Default data
const defaultProjects: Project[] = [
  {
    id: 1,
    title: "Web Security Login System",
    description:
      "Implemented key security measures on a custom login page, focusing on basic authentication techniques and user validation.",
    category: "Web Development",
    status: "Published",
    date: "January 15, 2023",
    tags: ["HTML", "CSS", "JavaScript", "Web Security", "Authentication"],
    image: "/images/websecurity.png",
    githubUrl: "https://github.com/Sampresh/webSecurity.git",
  },
  {
    id: 2,
    title: "Stock Market Prediction AI Model",
    description:
      "An AI model trained to forecast stock market trends using historical S&P 500 data, focused on improving investment insights.",
    category: "AI/ML",
    status: "Published",
    date: "March 22, 2023",
    tags: ["Python", "Machine Learning", "Data Analysis", "Predictive Analytics"],
    image: "/images/ai.png",
    githubUrl: "https://github.com/Sampresh/MarketPredicition-AI-mode.git",
  },
  {
    id: 3,
    title: "Suitcase – Travel Itinerary App",
    description: "A mobile app that allows users to plan, purchase, and manage travel itineraries in one place.",
    category: "Mobile Development",
    status: "Published",
    date: "May 10, 2023",
    tags: ["Kotlin", "Android", "UI/UX Design", "Data Handling"],
    image: "/images/suitcase.png",
    githubUrl: "https://github.com/Sampresh/SuitCase-mobile-app.git",
  },
  {
    id: 4,
    title: "Live Sports Hosting Website",
    description:
      "A platform to stream and manage live sports events, built with Django for efficient backend processing.",
    category: "Web Development",
    status: "Published",
    date: "July 5, 2023",
    tags: ["Django", "Python", "Backend Development", "Real-Time Data"],
    image: "/images/live.png",
    githubUrl: "https://github.com/Sampresh/Live-matchHosting-site.git",
  },
]

const defaultBlogPosts: BlogPost[] = [
  {
    id: 1,
    title: "A Journey to Pathivara – Power, Peace, and Purpose",
    excerpt:
      "Recently, I visited Pathivara Temple in Taplejung — one of Nepal's most powerful and spiritually intense destinations. The journey wasn't just about reaching a place; it was about feeling something greater than myself.",
    image: "/images/pathivara.jpeg",
    date: "April 25, 2025",
    readTime: "4 min read",
    category: "Travel",
    status: "Published",
    views: 245,
    slug: "journey-to-pathivara",
    content:
      "Recently, I visited Pathivara Temple in Taplejung — one of Nepal's most powerful and spiritually intense destinations. The journey wasn't just about reaching a place; it was about feeling something greater than myself.\n\nPerched high in the hills, the climb to Pathivara tested my endurance and focus. But every step felt worth it. As I reached the temple, surrounded by silence and prayers carried by the wind, I genuinely felt a kind of peace I hadn't experienced in a long time.\n\nI'm not overly religious, but something about that place hit different — like I'd stepped into a force that grounds you. It reminded me to stay humble, driven, and grateful for where I'm headed.\n\nSometimes, disconnecting from the world helps you reconnect with your own clarity. Pathivara gave me that.",
  },
  {
    id: 2,
    title: "Solo Ride to Pokhara – Just Me, My Bike, and the Road",
    excerpt:
      "Six months ago, I took a solo bike trip to Pokhara. No group, no plans — just me and my machine. It was one of the most freeing things I've ever done.",
    image: "/images/pokhara.jpeg",
    date: "May 20, 2024",
    readTime: "5 min read",
    category: "Adventure",
    status: "Published",
    views: 189,
    slug: "solo-ride-to-pokhara",
    content:
      "Six months ago, I took a solo bike trip to Pokhara. No group, no plans — just me and my machine. It was one of the most freeing things I've ever done.\n\nThe ride itself was powerful — winding roads, changing skies, unexpected turns. I wasn't looking for adventure, but somehow I found it in every mile. Stopping whenever I felt like it, taking in views that no camera could do justice to, and just thinking about life without distractions... it was exactly what I needed.\n\nPokhara was beautiful as always — calm lakes, chill cafés, mountain views. But the real thrill was in the ride. It taught me that sometimes, being alone on the road gives you answers you didn't even know you were looking for.",
  },
]

const defaultProfileInfo: ProfileInfo = {
  name: "Sampresh Karki",
  title: "Computer Systems Engineering Graduate",
  email: "sampreshkarki2@gmail.com",
  bio: "I'm Sampresh, a Computer Systems Engineering graduate passionate about tech, AI, cybersecurity, and creative problem-solving. I build practical apps, design smart systems, and turn ideas into code — always learning, always building.",
  location: "Nepal",
  contact: "9769404538",
  age: 24,
  socialLinks: {
    github: "https://github.com/Sampresh",
    linkedin: "https://www.linkedin.com/in/sampresh-karki-a86409256/",
    twitter: "https://twitter.com/sampreshkarki",
    website: "https://sampresh.com.np",
    dribbble: "https://dribbble.com/sampreshkarki",
    youtube: "https://www.youtube.com/@sampres10",
    instagram: "https://www.instagram.com/sampres10",
  },
  cv: {
    title: "Sampresh Karki - Resume",
    fileName: "Sampresh-Karki-Resume.pdf",
    uploadDate: "May 10, 2023",
    path: "/cv/Sampresh-Karki-Resume.pdf",
  },
}

export const usePortfolio = () => {
  const context = useContext(PortfolioContext)
  if (context === undefined) {
    throw new Error("usePortfolio must be used within a PortfolioProvider")
  }
  return context
}

export const PortfolioProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoading, setIsLoading] = useState(true)
  const [projects, setProjects] = useState<Project[]>(defaultProjects)
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>(defaultBlogPosts)
  const [skills, setSkills] = useState<Skill[]>([])
  const [profileInfo, setProfileInfo] = useState<ProfileInfo>(defaultProfileInfo)
  const [isDataLoaded, setIsDataLoaded] = useState(false)

  // Add this function at the beginning of the PortfolioProvider component
  useEffect(() => {
    // Only run on client side
    if (typeof window === "undefined") return

    // Increment page views
    const incrementPageViews = () => {
      try {
        const currentViews = localStorage.getItem("portfolio-page-views")
        if (currentViews) {
          const newViews = Number.parseInt(currentViews, 10) + 1
          localStorage.setItem("portfolio-page-views", newViews.toString())
        } else {
          // Initialize with a default value
          localStorage.setItem("portfolio-page-views", "1")
        }
      } catch (error) {
        console.error("Error updating page views:", error)
      }
    }

    // Only increment once per session
    const hasViewedThisSession = sessionStorage.getItem("has-viewed")
    if (!hasViewedThisSession) {
      incrementPageViews()
      sessionStorage.setItem("has-viewed", "true")
    }
  }, [])

  // Load data from localStorage on initial render - only run on client side
  useEffect(() => {
    // Check if we're in a browser environment
    if (typeof window === "undefined") return

    // Use a more efficient approach to loading data
    const loadData = () => {
      try {
        // Load projects
        const savedProjects = localStorage.getItem("portfolio-projects")
        if (savedProjects) {
          setProjects(JSON.parse(savedProjects))
        }

        // Load blog posts
        const savedBlogPosts = localStorage.getItem("portfolio-blogposts")
        if (savedBlogPosts) {
          setBlogPosts(JSON.parse(savedBlogPosts))
        }

        // Load profile info
        const savedProfileInfo = localStorage.getItem("portfolio-profile")
        if (savedProfileInfo) {
          setProfileInfo(JSON.parse(savedProfileInfo))
        }

        setIsDataLoaded(true)
      } catch (error) {
        console.error("Error loading data from localStorage:", error)
      } finally {
        setIsLoading(false)
      }
    }

    // Use requestIdleCallback to load data when the browser is idle
    if ("requestIdleCallback" in window) {
      // @ts-ignore - TypeScript doesn't have types for requestIdleCallback
      window.requestIdleCallback(loadData, { timeout: 1000 })
    } else {
      // Fallback for browsers that don't support requestIdleCallback
      setTimeout(loadData, 100)
    }

    // Set a timeout to ensure loading state doesn't persist too long
    const timeoutId = setTimeout(() => {
      setIsLoading(false)
    }, 1500)

    return () => clearTimeout(timeoutId)
  }, [])

  // Save data to localStorage whenever it changes - with debounce
  useEffect(() => {
    if (!isDataLoaded || typeof window === "undefined") return

    const saveData = () => {
      try {
        localStorage.setItem("portfolio-projects", JSON.stringify(projects))
        localStorage.setItem("portfolio-blogposts", JSON.stringify(blogPosts))
        localStorage.setItem("portfolio-profile", JSON.stringify(profileInfo))
      } catch (error) {
        console.error("Error saving data to localStorage:", error)
      }
    }

    // Debounce the save operation to avoid excessive writes
    const timeoutId = setTimeout(saveData, 1000)
    return () => clearTimeout(timeoutId)
  }, [projects, blogPosts, profileInfo, isDataLoaded])

  // Memoize the context value to prevent unnecessary re-renders
  const contextValue = useMemo(
    () => ({
      projects,
      setProjects,
      blogPosts,
      setBlogPosts,
      skills,
      setSkills,
      profileInfo,
      setProfileInfo,
      isLoading,
    }),
    [projects, blogPosts, skills, profileInfo, isLoading],
  )

  return <PortfolioContext.Provider value={contextValue}>{children}</PortfolioContext.Provider>
}
