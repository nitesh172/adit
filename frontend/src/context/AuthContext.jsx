import React, { createContext, useContext, useState, useEffect } from "react"
import config from "../config"

const AuthContext = createContext(null)

const API_URL = config.apiUrl

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const verifySession = async () => {
      try {
        const response = await fetch(`${API_URL}/auth/me`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        })

        if (response.ok) {
          const data = await response.json()
          setUser(data.user)
        } else {
          setUser(null)
        }
      } catch (error) {
        console.error("Session verification failed:", error)
        setUser(null)
      } finally {
        setLoading(false)
      }
    }

    verifySession()
  }, [])

  const login = async (email, password) => {
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || "Login failed")
      }

      setUser(data.user)
      return data.user
    } catch (error) {
      console.error("Login error:", error)
      throw error
    }
  }

  const logout = async () => {
    try {
      await fetch(`${API_URL}/auth/logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      })
    } catch (error) {
      console.error("Logout error:", error)
    } finally {
      setUser(null)
    }
  }

  const signUp = async (name, email, password, role = "user") => {
    try {
      const response = await fetch(`${API_URL}/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password, role }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || "Registration failed")
      }

      return login(email, password)
    } catch (error) {
      console.error("Sign up error:", error)
      throw error
    }
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, signUp }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
