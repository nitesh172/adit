import React from "react"

const Textarea = ({ id, label, ...props }) => {
  return (
    <div className="flex flex-col gap-y-2">
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <textarea
        id={id}
        {...props}
        className="w-full bg-gray-100 py-3 px-3 rounded-sm border-none focus:outline-none min-h-25"
      />
    </div>
  )
}

export default Textarea
