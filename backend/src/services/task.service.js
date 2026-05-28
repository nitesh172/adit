const { Task } = require("../models")

module.exports = class TaskService {
  async getTask(taskId) {
    const task = await Task.findById(taskId)
    return task
  }

  async getTasks(filter) {
    return await Task.find(filter)
  }

  async createTask(taskPayload) {
    const task = new Task(taskPayload)
    await task.save()
    return task
  }

  async updateTask(taskId, updatePayload) {
    const task = await Task.findByIdAndUpdate(taskId, updatePayload, {
      new: true,
    })
    return task
  }

  async deleteTask(taskId) {
    await Task.findByIdAndDelete(taskId)
  }
}
