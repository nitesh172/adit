import React from "react"

const Button = ({ className = "", ...props }) => {
  return (
    <button
      className={`rounded-sm px-4 py-2 bg-primary cursor-pointer text-white ${className}`}
      {...props}
    >
      {props.title}
    </button>
  )
}

export default Button
