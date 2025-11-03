const express = require("express");
const mongo = require("mongoose");

const MONGO_URI = "mongodb://test:test@localhost:27017/";

mongo
  .connect(MONGO_URI)
  .then(() => {
    console.log("povezao sam se");
  })
  .catch(() => {
    console.log("nisam uspeo");
  });
const todoSchema = new mongo.Schema({
  title: {
    type: String,
    required: true,
  },
  isCompleted: {
    type: Boolean,
    default: false,
  },
});
const Todo = mongo.model("todo", todoSchema);

let todos = [];

const app = express();
app.use(express.json());
app.get("/todos", async (req, res) => {
  console.log("radi");
  const data = await Todo.find();
  return res.json(data);
});

app.delete("/todos/:id", async (req, res) => {
  const id = req.params.id;
  await Todo.findByIdAndDelete(id);

  return res.json("sisaj kurac");
});

app.post("/todos", async (req, res) => {
  try {
    const newtodo = await Todo.create({
      title: req.body.title,
    });

    return res.json(1);
  } catch (error) {
    return res.json(2);
  }
});
app.patch("/todos/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  let todo = todos.find((item) => {
    return item.id === id;
  });

  if (!todo) {
    return res.json("not found");
  }

  todo = {
    ...todo,
    isCompleted: true,
  };

  todos = todos.map((item) => {
    if (item.id === todo.id) {
      return todo;
    }
    return item;
  });
  return res.json("cao");
});
app.listen(5000, () => {
  console.log("listening");
});
