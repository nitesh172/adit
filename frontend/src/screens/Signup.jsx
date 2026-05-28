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

  const { signUp } = useAuth()

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await signUp(formData.name, formData.email, formData.password)
    } catch (error) {
      console.error("Signup failed:", error)
    }
  }

  return (
    <AuthWrapper>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col font-ubuntu gap-y-6 justify-center px-10 md:px-20 py-10 h-full"
      >
        <h1 className="font-bold text-3xl">Signup</h1>
        <Input
          label="Full Name"
          type="text"
          name="name"
          value={formData.name}
          required
          onChange={handleChange}
          placeholder="John Doe"
        />
        <Input
          label="Email"
          type="email"
          name="email"
          value={formData.email}
          required
          onChange={handleChange}
          placeholder="abc@gmail.com"
        />
        <Input
          label="Password"
          type="password"
          name="password"
          value={formData.password}
          required
          onChange={handleChange}
          placeholder="************"
        />
        <Button title="Signup" type="submit" className="w-full" />
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
