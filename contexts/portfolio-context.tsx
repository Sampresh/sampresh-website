"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect, useMemo } from "react"
import { defaultBlogPosts, type BlogPost } from '@/lib/blog-data'

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

export type Skill = {
  category: string
  icon: React.ReactNode
  items: string[]
}

export type ProfileInfo = {
  name: string
  title: string
  /** Roles cycled through by the hero's particle text effect. */
  roles: string[]
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

const PROFILE_KEY = "portfolio-profile"
const PROFILE_DEFAULTS_KEY = "portfolio-profile-defaults"

/**
 * Merge a saved profile over the current code defaults, one field at a time.
 *
 * The saved copy alone would shadow `defaultProfileInfo` forever, so editing a
 * default in this file would never show up once anything had been persisted.
 * We also store the defaults that were in force when the profile was saved: if
 * a field's default has changed in code since then, the code wins for that
 * field; otherwise the saved (admin-edited) value wins. With no snapshot at all
 * we fall back to the code defaults.
 */
function reconcileProfile(
  saved: Partial<ProfileInfo> | null,
  savedAgainstDefaults: Partial<ProfileInfo> | null,
): ProfileInfo {
  // Indexed writes across a key union need a loosely typed working copy.
  const result: Record<string, unknown> = { ...defaultProfileInfo }
  if (!saved) return result as unknown as ProfileInfo

  for (const key of Object.keys(defaultProfileInfo) as (keyof ProfileInfo)[]) {
    const currentDefault = defaultProfileInfo[key]
    const previousDefault = savedAgainstDefaults?.[key]

    const defaultChangedInCode =
      !savedAgainstDefaults || JSON.stringify(previousDefault) !== JSON.stringify(currentDefault)
    if (defaultChangedInCode) continue

    const savedValue = saved[key]
    if (savedValue === undefined || savedValue === null) continue
    if (typeof savedValue === "string" && savedValue.trim() === "") continue
    if (Array.isArray(savedValue) && savedValue.length === 0) continue

    if (
      typeof savedValue === "object" &&
      !Array.isArray(savedValue) &&
      typeof currentDefault === "object" &&
      currentDefault !== null &&
      !Array.isArray(currentDefault)
    ) {
      result[key] = {
        ...(currentDefault as object),
        ...withoutBlanks(savedValue as object),
      }
    } else {
      result[key] = savedValue
    }
  }

  return result as unknown as ProfileInfo
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

// Saved profiles can contain blank fields (e.g. a field cleared in the admin
// form). Spreading those over the defaults wipes the name/title/bio and leaves
// the hero showing only the profile image, so drop them before merging.
function withoutBlanks<T extends object>(source: T | undefined): Partial<T> {
  if (!source) return {}
  return Object.fromEntries(
    Object.entries(source).filter(([, value]) => {
      if (value === undefined || value === null) return false
      if (typeof value === "string") return value.trim() !== ""
      if (Array.isArray(value)) return value.length > 0
      return true
    }),
  ) as Partial<T>
}

const defaultProfileInfo: ProfileInfo = {
  name: "Sampresh Karki",
  title: "Computer Systems Engineering Graduate",
  roles: ["Software Engineer", "Web Developer", "App Developer"],
  email: "sampreshkarki2@gmail.com",
  bio: "Computer systems engineering graduate. I build web and mobile apps. Mostly full stack, occasionally security tooling. Available for freelance work.",
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
    fileName: "CV.pdf",
    uploadDate: "May 15, 2025",
    path: "/cv/CV.pdf",
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
        const savedProfileInfo = localStorage.getItem(PROFILE_KEY)
        if (savedProfileInfo) {
          const savedDefaults = localStorage.getItem(PROFILE_DEFAULTS_KEY)
          setProfileInfo(
            reconcileProfile(
              JSON.parse(savedProfileInfo) as Partial<ProfileInfo>,
              savedDefaults ? (JSON.parse(savedDefaults) as Partial<ProfileInfo>) : null,
            ),
          )
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
        localStorage.setItem(PROFILE_KEY, JSON.stringify(profileInfo))
        // Remember the defaults in force, so a later edit to them can be detected.
        localStorage.setItem(PROFILE_DEFAULTS_KEY, JSON.stringify(defaultProfileInfo))
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
