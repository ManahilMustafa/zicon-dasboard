"use client"

import ThemeToggle from "./theme-toggle"
import { Input } from "@/components/ui/input"

export default function Topbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 items-center justify-between px-4 md:px-6 gap-3">
        <div className="flex-1">
          <div className="hidden sm:block">
            <Input className="max-w-md" placeholder="Search assets, issuers, hashes..." aria-label="Search" />
          </div>
          <div className="sm:hidden">
            <Input className="w-full" placeholder="Search..." aria-label="Search" />
          </div>
        </div>
        <ThemeToggle />
      </div>
    </header>
  )
}
