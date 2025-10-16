"use client"

import { cn } from "@/lib/utils"

export function ScoreBadge({ score, className, variant = "default" }) {
  const clamped = Math.max(0, Math.min(100, score))

  const getScoreConfig = (score) => {
    if (score >= 90) {
      return {
        bgColor: "bg-emerald-500 dark:bg-emerald-600",
        textColor: "text-white",
        borderColor: "border-emerald-600 dark:border-emerald-700",
        label: "Excellent"
      }
    } else if (score >= 80) {
      return {
        bgColor: "bg-green-500 dark:bg-green-600",
        textColor: "text-white",
        borderColor: "border-green-600 dark:border-green-700",
        label: "Very Good"
      }
    } else if (score >= 70) {
      return {
        bgColor: "bg-blue-500 dark:bg-blue-600",
        textColor: "text-white",
        borderColor: "border-blue-600 dark:border-blue-700",
        label: "Good"
      }
    } else if (score >= 60) {
      return {
        bgColor: "bg-amber-500 dark:bg-amber-600",
        textColor: "text-white",
        borderColor: "border-amber-600 dark:border-amber-700",
        label: "Fair"
      }
    } else if (score >= 40) {
      return {
        bgColor: "bg-orange-500 dark:bg-orange-600",
        textColor: "text-white",
        borderColor: "border-orange-600 dark:border-orange-700",
        label: "Poor"
      }
    } else {
      return {
        bgColor: "bg-red-500 dark:bg-red-600",
        textColor: "text-white",
        borderColor: "border-red-600 dark:border-red-700",
        label: "Very Poor"
      }
    }
  }

  const config = getScoreConfig(clamped)

  if (variant === "minimal") {
    return (
      <div
        className={cn(
          "inline-flex items-center justify-center px-2 py-1 rounded text-xs font-semibold transition-all duration-200 hover:scale-105",
          config.bgColor,
          config.textColor,
          className
        )}
      >
        {clamped}
      </div>
    )
  }

  if (variant === "detailed") {
    return (
      <div
        className={cn(
          "inline-flex items-center gap-2 px-3 py-2 rounded-lg border transition-all duration-200 hover:scale-105",
          config.bgColor,
          config.textColor,
          config.borderColor,
          className
        )}
      >
        <div className="flex flex-col">
          <span className="text-sm font-bold">{clamped}/100</span>
          <span className="text-xs opacity-90">{config.label}</span>
        </div>
      </div>
    )
  }

  // Default variant
  return (
    <div
      className={cn(
        "inline-flex items-center justify-center px-2.5 py-1.5 rounded text-xs font-semibold transition-all duration-200 hover:scale-105 shadow-sm",
        config.bgColor,
        config.textColor,
        className
      )}
    >
      {clamped}
    </div>
  )
}
