import React from "react"
import TextButton from "./TextButton"

function DeleteModal({ isOpen, onClose, onConfirm, taskTitle }) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full p-6 shadow-xl relative animate-in fade-in zoom-in-95 duration-150">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Delete Task</h3>
        <p className="text-gray-600 mb-6">
          Are you sure you want to delete the task <span className="font-semibold">"{taskTitle}"</span>? This action cannot be undone.
        </p>
        <div className="flex justify-end gap-x-2">
          <TextButton
            type="button"
            onClick={onClose}
            title="Cancel"
            color="secondary"
          />
          <button
            type="button"
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 text-white rounded-sm hover:bg-red-700 cursor-pointer"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}

export default DeleteModal
