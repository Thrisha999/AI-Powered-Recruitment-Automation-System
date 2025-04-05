"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useRouter } from "next/navigation"

type User = {
  id: string
  name: string
  email: string
  role: string
}

type AuthContextType = {
  user: User | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<void>
  signUp: (name: string, email: string, password: string) => Promise<void>
  signOut: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  // Check if user is already logged in
  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setLoading(false)
  }, [])

  const signIn = async (email: string, password: string) => {
    setLoading(true)
    try {
      // In a real app, this would be an API call to your backend
      // For demo purposes, we'll simulate a successful login
      if (password.length < 6) {
        throw new Error("Invalid credentials")
      }

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const newUser = {
        id: "user_" + Math.random().toString(36).substr(2, 9),
        name: email.split("@")[0],
        email,
        role: "recruiter",
      }

      setUser(newUser)
      localStorage.setItem("user", JSON.stringify(newUser))
      router.push("/dashboard")
    } catch (error) {
      throw error
    } finally {
      setLoading(false)
    }
  }

  const signUp = async (name: string, email: string, password: string) => {
    setLoading(true)
    try {
      // In a real app, this would be an API call to your backend
      // For demo purposes, we'll simulate a successful registration
      if (password.length < 6) {
        throw new Error("Password must be at least 6 characters")
      }

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const newUser = {
        id: "user_" + Math.random().toString(36).substr(2, 9),
        name,
        email,
        role: "recruiter",
      }

      setUser(newUser)
      localStorage.setItem("user", JSON.stringify(newUser))
      router.push("/dashboard")
    } catch (error) {
      throw error
    } finally {
      setLoading(false)
    }
  }

  const signOut = () => {
    setUser(null)
    localStorage.removeItem("user")
    router.push("/")
  }

  return <AuthContext.Provider value={{ user, loading, signIn, signUp, signOut }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

