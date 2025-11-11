const todoservice = require("./todos.service");
const express = require("express");
const TodoRouter = express.Router();

TodoRouter.post("/", todoservice.createtodo);
TodoRouter.get("/", todoservice.getTodos);
TodoRouter.delete("/:id", todoservice.deletetodo);
TodoRouter.patch("/:id", todoservice.updateTodo);

module.exports = {
  TodoRouter,
};
