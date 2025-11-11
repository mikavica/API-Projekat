const express = require("express");
const todo = require("./todos/todos.router");
const db = require("./db");
const { CommentsRouter } = require("./comments/comments.router");
const { ProjectRouter } = require("./Project/project.router");




db.connectToDB();

const app = express();
app.use(express.json());
app.use('/todos', todo.TodoRouter);
app.use("/comments", CommentsRouter);
app.use("/projects", ProjectRouter);


app.listen(5000, () => {
  console.log("listening");
});
