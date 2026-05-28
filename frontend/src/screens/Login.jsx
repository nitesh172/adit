import { useState } from "react"
import AuthWrapper from "../components/AuthWrapper"
import Button from "../components/Button"
import Input from "../components/Input"
import { useAuth } from "../context/AuthContext"
import { Link } from "react-router"

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const { login } = useAuth()

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await login(formData.email, formData.password)
    } catch (error) {
      console.error("Login failed:", error)
    }
  }

  return (
    <AuthWrapper>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col font-ubuntu gap-y-6 justify-center px-10 md:px-20 py-10 h-full"
      >
        <h1 className="font-bold text-3xl">Login</h1>
        <Input
          label="Email"
          value={formData.email}
          name="email"
          type="email"
          required
          onChange={handleChange}
          placeholder="abc@gmail.com"
        />
        <Input
          label="Password"
          value={formData.password}
          required
          name="password"
          type="password"
          onChange={handleChange}
          placeholder="************"
        />
        <Button title="Login" type="submit" className="w-full" />
        <div className="text-base text-gray-700">
          <span>Don't have an account? </span>
          <Link to="/signup" className="text-primary">
            Sign Up
          </Link>
        </div>
      </form>
    </AuthWrapper>
  )
}

export default Login
