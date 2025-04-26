"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { Moon, SunDim } from "lucide-react"
import { cn } from "@/lib/utils"

interface ThemeToggleProps {
  showLabel?: boolean
  className?: string
}

export function ThemeToggle({ showLabel = false, className }: ThemeToggleProps) {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Avoid hydration mismatch by only showing the toggle after mounting
  useEffect(() => {
    setMounted(true)
  }, [])

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark")
  }

  // Don't render anything until mounted to prevent hydration mismatch
  if (!mounted) {
    return <div className={cn("h-6 w-12", className)} />
  }

  const isDark = resolvedTheme === "dark"

  return (
    <div className={cn("flex items-center", className)}>
      <button
        onClick={toggleTheme}
        className={cn(
          "relative inline-flex h-6 w-12 items-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
          isDark ? "bg-secondary" : "bg-muted",
        )}
        aria-label="Toggle theme"
      >
        <span className="sr-only">{isDark ? "Switch to light mode" : "Switch to dark mode"}</span>
        <span
          className={cn(
            "flex h-5 w-5 items-center justify-center rounded-full bg-white shadow-md transition-transform duration-200 ease-in-out",
            isDark ? "translate-x-6" : "translate-x-1",
          )}
        >
          {isDark ? <Moon className="h-3 w-3 text-foreground" /> : <SunDim className="h-3 w-3 text-amber-500" />}
        </span>
      </button>
      {showLabel && <span className="ml-2 text-sm">{isDark ? "Dark mode" : "Light mode"}</span>}
    </div>
  )
}
