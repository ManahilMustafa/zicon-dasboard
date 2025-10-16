import React, { Suspense } from "react"
import { Poppins } from "next/font/google"
import { GeistMono } from "geist/font";
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
})

export const metadata = {
  title: "Asset Credibility Monitor",
  description: "Blockchain digital asset credibility dashboard",
  generator: "v0.app",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning className="antialiased">
      <body className={`font-sans ${poppins.variable} ${GeistMono.variable}`}>
        <Suspense fallback={null}>{children}</Suspense>
        <Analytics />
      </body>
    </html>
  )
}
