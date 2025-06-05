const TaskStatus = {
  PENDING: "pending",
  IN_PROGRESS: "in-progress",
  DONE: "done",
};

const TASK_STATUSES = Object.values(TaskStatus);

module.exports = { TaskStatus, TASK_STATUSES };
