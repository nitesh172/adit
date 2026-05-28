import React from "react"
import { Navigate, Outlet, useLocation } from "react-router"
import { useAuth } from "../context/AuthContext"

export default function ProtectedRoute() {
  const { user, loading } = useAuth()
  const location = useLocation()

  if (loading) {
    return null
  }

  const isAuthRoute = ["/login", "/signup"].includes(location.pathname)

  if (isAuthRoute) {
    if (user) {
      return <Navigate to="/" replace />
    }
  } else {
    if (!user) {
      return <Navigate to="/login" replace />
    }
  }

  return <Outlet />
}
