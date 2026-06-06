import React from "react"

const Button = ({ className = "", ...props }) => {
  return (
    <button
      className={`rounded-sm px-4 disabled:opacity-50 disabled:cursor-not-allowed py-3 bg-primary cursor-pointer text-white ${className}`}
      {...props}
    >
      {props.title}
    </button>
  )
}

export default Button
