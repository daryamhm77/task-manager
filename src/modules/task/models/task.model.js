const mongoose = require("mongoose");
const { TASK_STATUSES, TaskStatus } = require("../enum/task-status.enum");

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      enum: TASK_STATUSES,
      default: TaskStatus.PENDING,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Auth",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Task", taskSchema);
