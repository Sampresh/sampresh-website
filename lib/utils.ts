import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Add a safe string utility function
export function safeString(value: any): string {
  if (value === undefined || value === null) {
    return ""
  }
  return String(value)
}

// Add a safe URL utility function
export function safeUrl(url: any): string {
  if (!url) return "#"
  return String(url)
}
