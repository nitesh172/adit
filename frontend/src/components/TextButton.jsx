import React from "react"

const TextButton = ({ title, className = "", color = "primary", children, ...props }) => {
  const colorClasses = {
    primary: "text-primary hover:text-blue-700",
    danger: "text-red-600 hover:text-red-800",
    success: "text-green-600 hover:text-green-800",
    neutral: "text-gray-500 hover:text-gray-700",
    secondary: "text-gray-700 hover:text-gray-900 border border-gray-300 hover:bg-gray-50 px-4 py-2 rounded-sm",
  }

  const baseClass =
    color === "secondary"
      ? "text-sm font-semibold cursor-pointer transition-colors"
      : "text-sm font-medium cursor-pointer transition-colors"

  return (
    <button
      className={`${baseClass} ${colorClasses[color] || colorClasses.primary} ${className}`}
      {...props}
    >
      {title || children}
    </button>
  )
}

export default TextButton
