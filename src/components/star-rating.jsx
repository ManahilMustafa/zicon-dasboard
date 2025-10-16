"use client"

import { Star } from "lucide-react"
import { cn } from "@/lib/utils"

export function StarRating({ score, size, className, showScore = false }) {
  // Convert percentage to star count based on the specified ranges
  const getStarCount = (score) => {
    if (score >= 80) return 5
    if (score >= 60) return 4
    if (score >= 40) return 3
    if (score >= 20) return 2
    if (score >= 0) return 1
    return 0
  }

  const starCount = getStarCount(score)
  const stars = []

  for (let i = 1; i <= 5; i++) {
    stars.push(
      <Star
        key={i}
        className={cn(
          "transition-colors duration-200 w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5",
          i <= starCount 
            ? "fill-yellow-400 text-yellow-400" 
            : "fill-gray-200 text-gray-200",
          className
        )}
        size={size || 16}
      />
    )
  }

  return (
    <div className="flex items-center gap-1">
      <div className="flex gap-0.5 sm:gap-1">
        {stars}
      </div>
      {showScore && (
        <span className="ml-1 sm:ml-2 text-xs sm:text-sm text-gray-600 dark:text-gray-400">
          {score}%
        </span>
      )}
    </div>
  )
}
