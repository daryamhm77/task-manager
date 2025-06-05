const express = require("express");
const router = express.Router();
const taskController = require("../controllers/task.controller");
const verifyToken = require("../../auth/middleware/auth.middleware");
const validate = require("../../../common/middleware/validate.middleware");
const {
  createTaskSchema,
  updateTaskSchema,
} = require("../validators/task.validation");

router.use(verifyToken);

router.get("/", taskController.getTasks);
router.post("/", validate(createTaskSchema), taskController.createTask);
router.put("/:id", validate(updateTaskSchema), taskController.updateTask);
router.delete("/:id", taskController.deleteTask);

module.exports = router;
