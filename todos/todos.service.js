const schemas = require("./todos.schemes");
const { Todo } = require("./todos.db");

async function getTodos(req, res) {
  try {
    console.log("radi");

    const data = await Todo.find({ userId: req.userId });

    return res.json(data);
  } catch (error) {
    console.error(error);
    return res.status(500).json("something went wrong");
  }
}

async function deletetodo(req, res) {
  try {
    const id = req.params.id.trim();


    const todo = await Todo.findOne({ _id: id, userId: req.userId });
    if (!todo) {
      return res.status(404).json("Todo not found or not yours");
    }


    await Todo.deleteOne({ _id: id });

    return res.status(200).json("Todo successfully deleted");
  } catch (err) {
    console.error(err);
    return res.status(500).json("something went wrong");
  }
}

async function createtodo(req, res) {
  try {
    const data = schemas.CreateTodoData.safeParse(req.body);
    if (!data.success) {
      return res.status(400).json(data.error);
    }

    const newtodo = await Todo.create({
      title: data.data.title,
      deadline: data.data.deadline || null,
      userId: req.userId,
    });

    return res.json(newtodo);
  } catch (error) {
    return res.json("something went wrong");
  }
}
async function updateTodo(req, res) {
  try {
    const id = req.params.id.trim();

    const data = schemas.UpdateTodoData.safeParse(req.body);
    if (!data.success) {
      return res.status(400).json(data.error);
    }

    const existingTodo = await Todo.findOne({ _id: id, userId: req.userId });
    if (!existingTodo) {
      return res.status(404).json("Todo not found or not yours");
    }

    const updatedTodo = await Todo.findByIdAndUpdate(id, data.data, {
      new: true,
    });

    return res.json(updatedTodo);
  } catch (error) {
    console.error(error);
    return res.status(500).json("something went wrong");
  }
}

module.exports = {
  createtodo,
  updateTodo,
  deletetodo,
  getTodos,
};
