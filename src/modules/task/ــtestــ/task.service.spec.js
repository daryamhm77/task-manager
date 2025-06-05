const taskService = require("../services/task.service");
const Task = require("../models/task.model");
const { TaskStatus } = require("../enum/task-status.enum");

jest.mock("../models/task.model");

describe("TaskService", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("createTask", () => {
    it("should create and return a task", async () => {
      const mockTaskData = {
        title: "Test",
        description: "desc",
        status: TaskStatus.PENDING,
      };
      const mockUserId = "user123";
      const mockSavedTask = {
        ...mockTaskData,
        user: mockUserId,
        _id: "task123",
      };

      Task.mockImplementation(() => ({
        save: jest.fn().mockResolvedValue(mockSavedTask),
      }));

      const result = await taskService.createTask(mockTaskData, mockUserId);
      expect(result).toEqual(mockSavedTask);
    });
  });

  describe("getUserTasks", () => {
    it("should return user tasks sorted by createdAt desc", async () => {
      const mockUserId = "user123";
      const mockTasks = [{ title: "T1" }, { title: "T2" }];

      Task.find.mockReturnValue({
        sort: jest.fn().mockReturnValue(mockTasks),
      });

      const result = await taskService.getUserTasks(mockUserId);
      expect(Task.find).toHaveBeenCalledWith({ user: mockUserId });
      expect(result).toEqual(mockTasks);
    });
  });

  describe("updateTask", () => {
    it("should update and return task if found", async () => {
      const mockTask = {
        _id: "task123",
        title: "Updated",
        status: TaskStatus.DONE,
      };

      Task.findOneAndUpdate.mockResolvedValue(mockTask);

      const result = await taskService.updateTask(
        "task123",
        { title: "Updated" },
        "user123",
      );
      expect(Task.findOneAndUpdate).toHaveBeenCalled();
      expect(result).toEqual(mockTask);
    });

    it("should throw error if task not found", async () => {
      Task.findOneAndUpdate.mockResolvedValue(null);

      await expect(
        taskService.updateTask("task123", {}, "user123"),
      ).rejects.toThrow("Task not found or unauthorized");
    });
  });

  describe("deleteTask", () => {
    it("should delete and return task if found", async () => {
      const mockTask = {
        _id: "task123",
        title: "Delete me",
        status: TaskStatus.PENDING,
      };

      Task.findOneAndDelete.mockResolvedValue(mockTask);

      const result = await taskService.deleteTask("task123", "user123");
      expect(Task.findOneAndDelete).toHaveBeenCalled();
      expect(result).toEqual(mockTask);
    });

    it("should throw error if task not found", async () => {
      Task.findOneAndDelete.mockResolvedValue(null);

      await expect(
        taskService.deleteTask("task123", "user123"),
      ).rejects.toThrow("Task not found or unauthorized");
    });
  });
});
