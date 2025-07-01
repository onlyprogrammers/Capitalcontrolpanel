import axios from "axios"

export interface User {
  id: number
  email: string
  name: string
  role: string
  avatar: string
}

export interface LoginCredentials {
  email: string
  password: string
}

export class AuthService {
  private static instance: AuthService
  private currentUser: User | null = null

  static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService()
    }
    return AuthService.instance
  }

  async login(credentials: LoginCredentials): Promise<User> {
    try {
      // Simulate API call - in real app, this would be an actual API endpoint
      const response = await axios.get("/data/users.json")
      console.log("Users data:", response.data) // Debug log

      if (!response.data || !response.data.users) {
        throw new Error("Invalid response format")
      }

      const users = response.data.users
      const user = users.find((u: any) => u.email === credentials.email && u.password === credentials.password)

      if (!user) {
        console.log("User not found for credentials:", credentials) // Debug log
        throw new Error("Invalid credentials")
      }

      // Remove password from user object
      const { password, ...userWithoutPassword } = user
      this.currentUser = userWithoutPassword

      // Store in localStorage for persistence
      if (typeof window !== "undefined") {
        localStorage.setItem("currentUser", JSON.stringify(userWithoutPassword))
      }

      return userWithoutPassword
    } catch (error) {
      console.error("Login error:", error) // Debug log
      throw new Error("Login failed")
    }
  }

  logout(): void {
    this.currentUser = null
    if (typeof window !== "undefined") {
      localStorage.removeItem("currentUser")
    }
  }

  getCurrentUser(): User | null {
    if (this.currentUser) {
      return this.currentUser
    }

    // Try to get from localStorage
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("currentUser")
      if (stored) {
        try {
          this.currentUser = JSON.parse(stored)
          return this.currentUser
        } catch (error) {
          console.error("Error parsing stored user:", error)
          localStorage.removeItem("currentUser")
        }
      }
    }

    return null
  }

  isAuthenticated(): boolean {
    return this.getCurrentUser() !== null
  }
}

export const authService = AuthService.getInstance()
