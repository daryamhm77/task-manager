const express = require("express");
const cors = require("cors");
const path = require("path");
const mainRouter = require("./app.routes");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "..", "public")));

app.use(mainRouter);

app.get("/", (req, res) => {
  res.send("🚀 Task Manager API is running");
});

module.exports = app;
