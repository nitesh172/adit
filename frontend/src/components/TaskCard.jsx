import React from "react"
import TextButton from "./TextButton"

function TaskCard({ task, currentUser, onEdit, onDelete, onComplete }) {
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
      <div className="space-y-4">
        <div className="flex justify-between items-start gap-x-3">
          <h4
            className={`font-ubuntu font-bold text-lg text-gray-900 line-clamp-2 leading-snug ${
              isCompleted
                ? "text-gray-400 line-through decoration-gray-300"
                : ""
            }`}
          >
            {task.title}
          </h4>
          <span
            className={`inline-flex items-center gap-x-1 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider ${
              isCompleted
                ? "bg-emerald-50 text-emerald-700 border border-emerald-200/60"
                : "bg-amber-50 text-amber-700 border border-amber-200/60"
            }`}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full ${isCompleted ? "bg-emerald-500" : "bg-amber-500"}`}
            ></span>
            {task.status}
          </span>
        </div>

        <p
          className={`text-sm leading-relaxed ${isCompleted ? "text-gray-400" : "text-gray-600"} line-clamp-3 min-h-12`}
        >
          {task.description || "No description provided."}
        </p>

        {currentUser?.role === "admin" && task.createdBy && (
          <div className="flex items-center gap-x-1.5 text-xs text-gray-400 mt-2 bg-gray-50 px-2.5 py-1.5 rounded-lg w-fit">
            <span>Created by:</span>
            <span className="font-semibold text-gray-600">{creatorName}</span>
          </div>
        )}
      </div>

      <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between">
        <span className="text-[11px] text-gray-400 font-medium">
          Created:{" "}
          {new Date(task.createdAt).toLocaleDateString(undefined, {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
        </span>
        {canModify && (
          <div className="flex gap-x-3">
            {!isCompleted && onComplete && (
              <TextButton
                onClick={() => onComplete(task)}
                title="Complete"
                color="success"
                className="font-semibold"
              />
            )}
            <TextButton
              onClick={() => onEdit(task)}
              title="Edit"
              color="primary"
              className="font-semibold"
            />
            <TextButton
              onClick={() => onDelete(task)}
              title="Delete"
              color="danger"
              className="font-semibold"
            />
          </div>
        )}
      </div>
    </div>
  )
}

export default TaskCard
