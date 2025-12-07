const express = require("express");
const db = require("./db");
require("dotenv").config();
const cors = require("cors");

const app = express();

db.connectToDB();

app.use(cors());
app.use(express.json());


const AuthRouter = require("./User/user.router");
const { TodoRouter } = require("./todos/todos.router");
const { CommentsRouter } = require("./comments/comments.router");
const { ProjectRouter } = require("./Project/project.router");

app.use("/auth", AuthRouter);
app.use("/todos", TodoRouter);
app.use("/comments", CommentsRouter);
app.use("/projects", ProjectRouter);

app.listen(5000, () => {
  console.log("server running on port 5000");
});
