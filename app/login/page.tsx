"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import LoginForm from "@/components/auth/login-form"
import { authService } from "@/lib/auth"

export default function LoginPage() {
  const router = useRouter()

  useEffect(() => {
    // Redirect if already authenticated
    if (authService.isAuthenticated()) {
      router.push("/dashboard")
    }
  }, [router])

  const handleLoginSuccess = () => {
    router.push("/dashboard")
  }

  return <LoginForm onLoginSuccess={handleLoginSuccess} />
}
