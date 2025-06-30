import type React from "react"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import AuthWrapper from "@/components/auth/auth-wrapper"
import DashboardLayout from "@/components/layout/dashboard-layout"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "KokonutUI Dashboard",
  description: "A modern financial dashboard with comprehensive money management",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <AuthWrapper>
            <DashboardLayout>{children}</DashboardLayout>
          </AuthWrapper>
        </ThemeProvider>
      </body>
    </html>
  )
}
