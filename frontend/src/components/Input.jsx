import React from "react"

const Input = ({ id, label, ...props }) => {
  return (
    <div className="flex flex-col gap-y-2">
      {label && <label htmlFor={id}>{label}</label>}
      <input
        id={id}
        {...props}
        className="w-full bg-gray-100 py-3 px-3 rounded-sm border-none focus:outline-none"
      />
    </div>
  )
}

export default Input
