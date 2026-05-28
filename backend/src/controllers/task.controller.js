const { StatusCodes } = require("http-status-codes")
const { TaskService } = require("../services")
const taskService = new TaskService()

const getTask = async (req, res) => {
  try {
    const taskId = req.params.id
    const task = await taskService.getTask(taskId)
    if (!task) {
      return res.status(StatusCodes.NOT_FOUND).json({ message: "Task not found" })
    }

    if (req.user.role !== "admin" && task.createdBy.toString() !== req.user.id.toString()) {
      return res.status(StatusCodes.FORBIDDEN).json({ message: "You are not authorized to view this task" })
    }

    res.status(StatusCodes.OK).json(task)
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message })
  }
}

const getTasks = async (req, res) => {
  try {
    const filter = req.user.role === "admin" ? {} : { createdBy: req.user.id }
    if (req.query.status) {
      filter.status = req.query.status
    }
    const tasks = await taskService.getTasks(filter)
    res.status(StatusCodes.OK).json(tasks)
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message })
  }
}

const createTask = async (req, res) => {
  try {
    const task = await taskService.createTask({
      ...req.body,
      createdBy: req.user.id,
    })
    res.status(StatusCodes.CREATED).json(task)
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message })
  }
}
const updateTask = async (req, res) => {
  try {
    const taskId = req.params.id
    const task = await taskService.getTask(taskId)
    if (!task) {
      return res.status(StatusCodes.NOT_FOUND).json({ message: "Task not found" })
    }

    if (req.user.role !== "admin" && task.createdBy.toString() !== req.user.id.toString()) {
      return res.status(StatusCodes.FORBIDDEN).json({ message: "You are not authorized to update this task" })
    }

    const updatedTask = await taskService.updateTask(taskId, req.body)
    res.status(StatusCodes.OK).json(updatedTask)
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message })
  }
}

const deleteTask = async (req, res) => {
  try {
    const taskId = req.params.id
    const task = await taskService.getTask(taskId)
    if (!task) {
      return res.status(StatusCodes.NOT_FOUND).json({ message: "Task not found" })
    }

    if (req.user.role !== "admin" && task.createdBy.toString() !== req.user.id.toString()) {
      return res.status(StatusCodes.FORBIDDEN).json({ message: "You are not authorized to delete this task" })
    }

    await taskService.deleteTask(taskId)
    res.status(StatusCodes.OK).json({ message: "Task deleted successfully" })
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message })
  }
}

module.exports = { getTask, getTasks, createTask, updateTask, deleteTask }
