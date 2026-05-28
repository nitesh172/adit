import React from "react"
import TextButton from "./TextButton"

function TaskCard({ task, currentUser, onEdit, onDelete }) {
  const creatorId =
    task.createdBy &&
    (typeof task.createdBy === "object"
      ? task.createdBy._id || task.createdBy.id
      : task.createdBy)

  const canModify =
    currentUser &&
    (currentUser.role === "admin" ||
      creatorId === currentUser._id ||
      creatorId === currentUser.id)

  const isOwnTask =
    currentUser &&
    (creatorId === currentUser._id || creatorId === currentUser.id)
  const creatorName =
    task.createdBy && typeof task.createdBy === "object"
      ? isOwnTask
        ? "You"
        : task.createdBy.name
      : "Unknown"

  const isCompleted = task.status === "COMPLETED"

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between h-full">
      <div className="space-y-3">
        <div className="flex justify-between items-start gap-x-2">
          <h4 className="font-semibold text-lg text-gray-900 line-clamp-1">
            {task.title}
          </h4>
          <span
            className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wide ${
              isCompleted
                ? "bg-green-50 text-green-700 border border-green-200"
                : "bg-amber-50 text-amber-700 border border-amber-200"
            }`}
          >
            {task.status}
          </span>
        </div>
        <p className="text-gray-600 text-sm line-clamp-3 min-h-10">
          {task.description || "No description provided."}
        </p>
        {currentUser?.role === "admin" && task.createdBy && (
          <p className="text-xs text-gray-500 font-medium">
            Created by:{" "}
            <span className="font-semibold text-gray-700">{creatorName}</span>
          </p>
        )}
      </div>

      <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between">
        <span className="text-xs text-gray-400">
          Created: {new Date(task.createdAt).toLocaleDateString()}
        </span>
        {canModify && (
          <div className="flex gap-x-2">
            <TextButton
              onClick={() => onEdit(task)}
              title="Edit"
              color="primary"
            />
            <TextButton
              onClick={() => onDelete(task)}
              title="Delete"
              color="danger"
            />
          </div>
        )}
      </div>
    </div>
  )
}

export default TaskCard
