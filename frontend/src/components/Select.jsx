import React from "react"

const Select = ({ id, label, options = [], ...props }) => {
  return (
    <div className="flex flex-col gap-y-2">
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <select
        id={id}
        {...props}
        className="w-full bg-gray-100 py-3 px-3 rounded-sm border-none focus:outline-none cursor-pointer"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  )
}

export default Select
