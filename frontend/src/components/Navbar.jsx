import React from "react"
import { useAuth } from "../context/AuthContext"
import { Link } from "react-router"

const Navbar = () => {
  const { user } = useAuth()
  return (
    <div className="flex flex-row justify-between bg-primary py-4 items-center px-8">
      <Link to="/" className="font-ubuntu font-bold text-white text-2xl">
        Task Manager
      </Link>
      <Link
        to="/profile"
        className="rounded-full bg-gray-200 peer h-10 w-10 cursor-pointer flex items-center justify-center"
      >
        {user && user.name[0].toUpperCase()}
      </Link>
    </div>
  )
}

export default Navbar
