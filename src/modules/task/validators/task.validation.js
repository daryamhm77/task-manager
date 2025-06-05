const Joi = require("joi");
const { TASK_STATUSES } = require("../enum/task-status.enum");

const createTaskSchema = Joi.object({
  title: Joi.string().min(3).required(),
  description: Joi.string().allow("").optional(),
  status: Joi.string()
    .valid(...TASK_STATUSES)
    .optional(),
});

const updateTaskSchema = Joi.object({
  title: Joi.string().min(3).optional(),
  description: Joi.string().allow("").optional(),
  status: Joi.string()
    .valid(...TASK_STATUSES)
    .optional(),
}).min(1);

module.exports = {
  createTaskSchema,
  updateTaskSchema,
};
