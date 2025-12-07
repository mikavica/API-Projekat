const todoservice = require("./todos.service");
const express = require("express");
const TodoRouter = express.Router();
const auth = require("../auth/auth.middleware");

TodoRouter.post("/", auth, todoservice.createtodo);
TodoRouter.get("/", auth, todoservice.getTodos);
TodoRouter.delete("/:id", auth,  todoservice.deletetodo);
TodoRouter.patch("/:id", auth,  todoservice.updateTodo);

module.exports = {
  TodoRouter,
};
