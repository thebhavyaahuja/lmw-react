import type React from "react"
import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Learning Middleware",
  description: "Create, manage, and deliver exceptional educational content",
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30">{children}</div>
      </body>
    </html>
  )
}
