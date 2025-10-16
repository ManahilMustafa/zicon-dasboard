"use client"

import { cn } from "@/lib/utils"

export function CredibilityScore({ score, size, className, showLabel = false }) {
  const actualSize = size || 42
  const radius = (actualSize - 6) / 2
  const circumference = 2 * Math.PI * radius
  const clamped = Math.max(0, Math.min(100, score))
  const offset = circumference - (clamped / 100) * circumference

  // Color scheme for circular progress
  const getScoreConfig = (score) => {
    if (score >= 90) {
      return {
        ringColor: "stroke-emerald-500 dark:stroke-emerald-400",
        textColor: "text-emerald-600 dark:text-emerald-300",
        label: "Excellent"
      }
    } else if (score >= 80) {
      return {
        ringColor: "stroke-green-500 dark:stroke-green-400",
        textColor: "text-green-600 dark:text-green-300",
        label: "Very Good"
      }
    } else if (score >= 70) {
      return {
        ringColor: "stroke-blue-500 dark:stroke-blue-400",
        textColor: "text-blue-600 dark:text-blue-300",
        label: "Good"
      }
    } else if (score >= 60) {
      return {
        ringColor: "stroke-amber-500 dark:stroke-amber-400",
        textColor: "text-amber-600 dark:text-amber-300",
        label: "Fair"
      }
    } else if (score >= 40) {
      return {
        ringColor: "stroke-orange-500 dark:stroke-orange-400",
        textColor: "text-orange-600 dark:text-orange-300",
        label: "Poor"
      }
    } else {
      return {
        ringColor: "stroke-red-500 dark:stroke-red-400",
        textColor: "text-red-600 dark:text-red-300",
        label: "Very Poor"
      }
    }
  }

  const config = getScoreConfig(clamped)

  if (showLabel) {
    return (
      <div className={cn("flex items-center gap-2 sm:gap-3", className)}>
        <div
          className="relative inline-flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12"
          style={{ width: actualSize, height: actualSize }}
        >
          <svg
            width={actualSize}
            height={actualSize}
            viewBox={`0 0 ${actualSize} ${actualSize}`}
            className="rotate-[-90deg]"
          >
            {/* Background circle - white for light theme, dark for dark theme */}
            <circle
              cx={actualSize / 2}
              cy={actualSize / 2}
              r={radius}
              className="fill-white dark:fill-gray-800 stroke-gray-200 dark:stroke-gray-700"
              strokeWidth="1"
            />
            {/* Progress ring */}
            <circle
              cx={actualSize / 2}
              cy={actualSize / 2}
              r={radius}
              className={cn("stroke-current transition-all duration-500 ease-in-out", config.ringColor)}
              strokeWidth="4"
              strokeLinecap="round"
              fill="transparent"
              style={{
                strokeDasharray: `${circumference} ${circumference}`,
                strokeDashoffset: offset,
              }}
            />
          </svg>

          {/* Centered number */}
          <span
            className={cn(
              "absolute text-xs font-bold select-none",
              config.textColor
            )}
          >
            {clamped}
          </span>
        </div>
        <div className="flex flex-col">
          <span className={cn("text-xs sm:text-sm font-semibold", config.textColor)}>
            {clamped}/100
          </span>
          <span className="text-xs text-gray-500 dark:text-gray-400">
            {config.label}
          </span>
        </div>
      </div>
    )
  }

  return (
    <div
      className={cn("relative inline-flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12", className)}
      style={{ width: actualSize, height: actualSize }}
    >
      <svg
        width={actualSize}
        height={actualSize}
        viewBox={`0 0 ${actualSize} ${actualSize}`}
        className="rotate-[-90deg]"
      >
        {/* Background circle - white for light theme, dark for dark theme */}
        <circle
          cx={actualSize / 2}
          cy={actualSize / 2}
          r={radius}
          className="fill-white dark:fill-gray-800 stroke-gray-200 dark:stroke-gray-700"
          strokeWidth="1"
        />
        {/* Progress ring */}
        <circle
          cx={actualSize / 2}
          cy={actualSize / 2}
          r={radius}
          className={cn("stroke-current transition-all duration-500 ease-in-out", config.ringColor)}
          strokeWidth="4"
          strokeLinecap="round"
          fill="transparent"
          style={{
            strokeDasharray: `${circumference} ${circumference}`,
            strokeDashoffset: offset,
          }}
        />
      </svg>

      {/* Centered number */}
      <span
        className={cn(
          "absolute text-xs font-bold select-none",
          config.textColor
        )}
      >
        {clamped}
      </span>
    </div>
  )
}
