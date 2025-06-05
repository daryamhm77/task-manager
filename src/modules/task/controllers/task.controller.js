const taskService = require("../services/task.service");

class TaskController {
  async createTask(req, res) {
    try {
      const task = await taskService.createTask(req.body, req.user.id);
      res.status(201).json({ task, message: "Task created" });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }

  async getTasks(req, res) {
    try {
      const tasks = await taskService.getUserTasks(req.user.id);
      res.status(200).json(tasks);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  async updateTask(req, res) {
    try {
      const updated = await taskService.updateTask(
        req.params.id,
        req.body,
        req.user.id,
      );
      res.status(200).json({ updated, message: "Task updated" });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }

  async deleteTask(req, res) {
    try {
      await taskService.deleteTask(req.params.id, req.user.id);
      res.status(200).json({ message: "Task deleted" });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }
}

module.exports = new TaskController();
