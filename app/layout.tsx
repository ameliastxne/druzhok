import type React from "react"
import type { Metadata, Viewport } from "next"
import { Nunito } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const nunito = Nunito({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "600", "700", "800"],
})

export const metadata: Metadata = {
  title: "Druzhok - Твій друг",
  description: "Druzhok допомагає дітям розуміти та керувати своїми емоціями через гру та розповіді",
}

export const viewport: Viewport = {
  themeColor: "#5B8DEF",
  width: "device-width",
  initialScale: 1,
  userScalable: false,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="uk">
      <body className={`${nunito.className} antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
