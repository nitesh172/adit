import React, { useEffect, useState } from "react"
import config from "../config"
import { useAuth } from "../context/AuthContext"
import Button from "../components/Button"
import TaskCard from "../components/TaskCard"
import TaskModal from "../components/TaskModal"
import DeleteModal from "../components/DeleteModal"

function Home() {
  const { user } = useAuth()
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(false)
  const [statusFilter, setStatusFilter] = useState("ALL")
  const [error, setError] = useState(null)

  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false)
  const [taskToEdit, setTaskToEdit] = useState(null)

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [taskToDelete, setTaskToDelete] = useState(null)

  const fetchTasks = async () => {
    try {
      setLoading(true)
      setError(null)
      let url = `${config.apiUrl}/task`
      if (statusFilter !== "ALL") {
        url += `?status=${statusFilter}`
      }

      const response = await fetch(url, {
        method: "GET",
        credentials: "include",
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch tasks")
      }

      setTasks(data)
    } catch (err) {
      console.error("Fetch tasks error:", err)
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTasks()
  }, [statusFilter])

  const handleOpenCreateModal = () => {
    setTaskToEdit(null)
    setIsTaskModalOpen(true)
  }

  const handleOpenEditModal = (task) => {
    setTaskToEdit(task)
    setIsTaskModalOpen(true)
  }

  const handleOpenDeleteModal = (task) => {
    setTaskToDelete(task)
    setIsDeleteModalOpen(true)
  }

  const handleCreateOrUpdateTask = async (taskData) => {
    try {
      setError(null)
      const isEditing = !!taskToEdit
      const url = isEditing
        ? `${config.apiUrl}/task/${taskToEdit._id}`
        : `${config.apiUrl}/task`

      const method = isEditing ? "PUT" : "POST"

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(taskData),
        credentials: "include",
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || "Failed to save task")
      }

      setIsTaskModalOpen(false)
      setTaskToEdit(null)
      fetchTasks()
    } catch (err) {
      console.error("Save task error:", err)
      setError(err.message)
    }
  }

  const handleDeleteTask = async () => {
    if (!taskToDelete) return
    try {
      setError(null)
      const response = await fetch(
        `${config.apiUrl}/task/${taskToDelete._id}`,
        {
          method: "DELETE",
          credentials: "include",
        },
      )

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || "Failed to delete task")
      }

      setIsDeleteModalOpen(false)
      setTaskToDelete(null)
      fetchTasks()
    } catch (err) {
      console.error("Delete task error:", err)
      setError(err.message)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 font-ubuntu">
            Tasks
          </h2>
          <p className="text-gray-500 text-sm">
            {user?.role === "admin"
              ? "All system tasks"
              : "Manage your personal tasks"}
          </p>
        </div>
        <Button
          title="Create Task"
          onClick={handleOpenCreateModal}
          className="sm:w-auto"
        />
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4 py-2 border-b border-gray-200">
        <div className="flex gap-x-2">
          {["ALL", "PENDING", "COMPLETED"].map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-4 py-1.5 rounded-sm text-sm font-semibold cursor-pointer transition-colors ${
                statusFilter === status
                  ? "bg-primary text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {status.charAt(0) + status.slice(1).toLowerCase()}
            </button>
          ))}
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-sm flex justify-between items-center">
          <p className="text-sm text-red-700">{error}</p>
          <button
            onClick={() => setError(null)}
            className="text-red-500 hover:text-red-700 cursor-pointer font-bold"
          >
            &times;
          </button>
        </div>
      )}

      {loading ? (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
        </div>
      ) : tasks.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-lg border border-dashed border-gray-300">
          <p className="text-gray-500 font-medium">No tasks found</p>
          <p className="text-gray-400 text-sm mt-1">
            Try creating a new task to get started.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tasks.map((task) => (
            <TaskCard
              key={task._id}
              task={task}
              currentUser={user}
              onEdit={handleOpenEditModal}
              onDelete={handleOpenDeleteModal}
            />
          ))}
        </div>
      )}
      <TaskModal
        isOpen={isTaskModalOpen}
        onClose={() => setIsTaskModalOpen(false)}
        onSubmit={handleCreateOrUpdateTask}
        task={taskToEdit}
        title={taskToEdit ? "Edit Task" : "Create Task"}
      />
      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteTask}
        taskTitle={taskToDelete?.title || ""}
      />
    </div>
  )
}

export default Home
