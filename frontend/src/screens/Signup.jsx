import React, { useState } from "react"
import AuthWrapper from "../components/AuthWrapper"
import Button from "../components/Button"
import Input from "../components/Input"
import { Link } from "react-router"
import { useAuth } from "../context/AuthContext"

function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  })
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const { signUp } = useAuth()

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    if (error) setError(null)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Basic Client-side Validation
    if (!formData.name.trim()) {
      setError("Please enter your full name.")
      return
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      setError("Please enter a valid email address.")
      return
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long.")
      return
    }

    try {
      setLoading(true)
      setError(null)
      await signUp(formData.name, formData.email, formData.password)
    } catch (err) {
      console.error("Signup failed:", err)
      setError(err.message || "Failed to register account.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthWrapper>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col font-ubuntu gap-y-6 justify-center px-10 md:px-20 py-10 h-full"
      >
        <div>
          <h1 className="font-extrabold text-3xl text-gray-900 tracking-tight">
            Create Account
          </h1>
          <p className="text-gray-500 text-sm mt-1.5">
            Get started to easily coordinate and track your tasks.
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-sm text-sm text-red-700 animate-in fade-in duration-200">
            {error}
          </div>
        )}

        <div className="space-y-4">
          <Input
            label="Full Name"
            type="text"
            name="name"
            value={formData.name}
            required
            disabled={loading}
            onChange={handleChange}
            placeholder="John Doe"
          />
          <Input
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            required
            disabled={loading}
            onChange={handleChange}
            placeholder="abc@gmail.com"
          />
          <Input
            label="Password"
            type="password"
            name="password"
            value={formData.password}
            required
            disabled={loading}
            onChange={handleChange}
            placeholder="************"
          />
        </div>

        <Button
          title={loading ? "Registering..." : "Signup"}
          type="submit"
          className="w-full disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={loading}
        />
        <div className="text-base text-gray-700">
          <span>Already have an account? </span>
          <Link to="/login" className="text-primary">
            Login
          </Link>
        </div>
      </form>
    </AuthWrapper>
  )
}

export default Signup
