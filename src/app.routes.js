const { Router } = require("express");
const authRoutes = require("./modules/auth/routes/auth.routes");
const taskRoutes = require("./modules/task/routes/task.routes");

const mainRouter = Router();

mainRouter.use("/auth", authRoutes);
mainRouter.use("/tasks", taskRoutes);

module.exports = mainRouter;
