const Task = require("../models/task.model");

class TaskService {
  async createTask(data, userId) {
    const task = new Task({ ...data, user: userId });
    return task.save();
  }

  async getUserTasks(userId) {
    return Task.find({ user: userId }).sort({ createdAt: -1 });
  }

  async updateTask(id, data, userId) {
    const task = await Task.findOneAndUpdate({ _id: id, user: userId }, data, {
      new: true,
      runValidators: true,
    });
    if (!task) throw new Error("Task not found or unauthorized");
    return task;
  }

  async deleteTask(id, userId) {
    const task = await Task.findOneAndDelete({ _id: id, user: userId });
    if (!task) throw new Error("Task not found or unauthorized");
    return task;
  }
}

module.exports = new TaskService();
