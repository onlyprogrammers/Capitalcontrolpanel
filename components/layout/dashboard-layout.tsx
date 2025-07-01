"use client"

import type React from "react"

import { usePathname } from "next/navigation"
import Layout from "@/components/kokonutui/layout"

interface DashboardLayoutProps {
  children: React.ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const pathname = usePathname()

  // Don't show layout on login page
  if (pathname === "/login") {
    return <>{children}</>
  }

  return <Layout>{children}</Layout>
}
