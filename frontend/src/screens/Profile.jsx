import React from "react"
import { useAuth } from "../context/AuthContext"
import Button from "../components/Button"

function Profile() {
  const { user, logout } = useAuth()

  if (!user) {
    return null
  }

  const handleLogout = async () => {
    try {
      await logout()
    } catch (error) {
      console.error("Logout failed:", error)
    }
  }

  const firstLetter = user.name ? user.name[0].toUpperCase() : "U"

  return (
    <div className="max-w-md mx-auto my-12 bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
      <div className="bg-primary px-6 py-8 text-center flex flex-col items-center">
        <div className="h-24 w-24 rounded-full bg-white text-primary text-4xl font-bold flex items-center justify-center shadow-lg border-4 border-white mb-4">
          {firstLetter}
        </div>
        <h2 className="text-white text-2xl font-bold font-ubuntu">
          {user.name}
        </h2>
        <span className="inline-block mt-2 px-3 py-1 rounded-full bg-blue-700/30 text-white text-xs font-semibold uppercase tracking-wider">
          {user.role || "User"}
        </span>
      </div>

      <div className="px-6 py-6 space-y-4">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1">
            Email Address
          </label>
          <p className="text-gray-900 font-ubuntu">{user.email}</p>
        </div>

        <div className="pt-4 border-t border-gray-100 flex justify-end">
          <Button
            title="Log Out"
            onClick={handleLogout}
            className="w-full bg-red-600 hover:bg-red-700 transition-colors py-2.5 rounded text-sm font-semibold tracking-wide"
          />
        </div>
      </div>
    </div>
  )
}

export default Profile
