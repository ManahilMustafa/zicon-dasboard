"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  Leaf,
  BadgeCheck,
  Building2,
  BarChart3,
  Settings,
  Menu,
  X,
 
} from "lucide-react"
import { useState } from "react"

const nav = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/carbon-credits", label: "Carbon Credits", icon: Leaf },
  { href: "/certificates", label: "Certificates", icon: BadgeCheck },
  { href: "/real-estate", label: "Real Estate", icon: Building2 },
  { href: "/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/settings", label: "Settings", icon: Settings },
]

export default function Sidebar() {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const NavContent = () => (
    <div className="flex h-dvh flex-col justify-between">
      {/* Top Section (Logo + Navigation) */}
      <div className="flex flex-col gap-2 p-4">
        {/* Logo and Title */}
       <div className="flex flex-col gap-2 p-4">
  {/* Logo and Title */}
  <div className="flex flex-col items-start ">
    <img
      src="/zicon.webp"
      alt="Logo"
      className="w-25 h-18 object-contain"
    />
    <Link
      href="/"
      className="font-semibold tracking-tight text-lg text-pretty text-foreground"
    >
      Asset Credibility Dashboard
    </Link>
    
  </div>
</div>


        {/* Navigation Links */}
        <nav className="mt-2 flex flex-col gap-1">
          {nav.map((item) => {
            const Icon = item.icon
            const active =
              pathname === item.href ||
              (item.href !== "/" && pathname.startsWith(item.href))
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
                  active
                    ? "bg-primary text-primary-foreground"
                    : "text-foreground hover:bg-accent hover:text-accent-foreground"
                )}
                aria-current={active ? "page" : undefined}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Icon className="size-4" aria-hidden />
                <span className="text-pretty">{item.label}</span>
              </Link>
            )
          })}
        </nav>
      </div>

      {/* Footer Section */}
      <div className="border-t border-border p-4 flex items-center justify-center text-sm text-muted-foreground">
        
        Managed by Zicon Cloud
      </div>
    </div>
  )

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-md bg-background border border-border shadow-md"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        aria-label="Toggle navigation menu"
      >
        {isMobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
      </button>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div
          className="md:hidden fixed inset-0 z-40 bg-black/50"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-64 shrink-0 border-r border-border bg-card">
        <NavContent />
      </aside>

      {/* Mobile Sidebar */}
      <aside
        className={cn(
          "md:hidden fixed top-0 left-0 z-50 w-64 h-dvh border-r border-border bg-card transform transition-transform duration-200 ease-in-out",
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <NavContent />
      </aside>
    </>
  )
}
