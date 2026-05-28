import React, { useState, useEffect } from "react"
import Button from "./Button"
import Input from "./Input"
import Textarea from "./Textarea"
import Select from "./Select"
import TextButton from "./TextButton"

function TaskModal({
  isOpen,
  onClose,
  onSubmit,
  task = null,
  title = "Create Task",
}) {
  const [taskTitle, setTaskTitle] = useState("")
  const [description, setDescription] = useState("")
  const [status, setStatus] = useState("PENDING")

  useEffect(() => {
    if (task) {
      setTaskTitle(task.title || "")
      setDescription(task.description || "")
      setStatus(task.status || "PENDING")
    } else {
      setTaskTitle("")
      setDescription("")
      setStatus("PENDING")
    }
  }, [task, isOpen])

  if (!isOpen) return null

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!taskTitle.trim()) return
    onSubmit({ title: taskTitle, description, status })
  }

  const statusOptions = [
    { value: "PENDING", label: "Pending" },
    { value: "COMPLETED", label: "Completed" },
  ]

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full p-6 shadow-xl relative animate-in fade-in zoom-in-95 duration-150">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">{title}</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            id="title"
            label="Title"
            placeholder="Enter task title"
            value={taskTitle}
            onChange={(e) => setTaskTitle(e.target.value)}
            required
          />

          <Textarea
            id="description"
            label="Description"
            placeholder="Enter task description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <Select
            id="status"
            label="Status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            options={statusOptions}
          />

          <div className="flex justify-end gap-x-2 pt-4">
            <TextButton
              type="button"
              onClick={onClose}
              title="Cancel"
              color="secondary"
            />
            <Button title="Save" type="submit" />
          </div>
        </form>
      </div>
    </div>
  )
}

export default TaskModal
