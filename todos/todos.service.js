const schemas = require("./todos.schemes");
const {Todo} = require("./todos.db");


async function getTodos(req, res) {
  console.log("radi");
  const data = await Todo.find();
  return res.json(data);
}
async function deletetodo(req, res) {
  try {
    const id = req.params.id.trim();
    console.log("Trying to delete ID:", id);

    const deletedTodo = await Todo.findByIdAndDelete(id);

    if (!deletedTodo) {
      return res.status(404).json("Todo not found");
    }

    console.log("Deleted todo:", deletedTodo);
    return res.status(200).json("Todo successfully deleted");
  } catch (err) {
    console.error("Delete error:", err);
    return res.status(500).json("Something went wrong");
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
    });

    return res.json(newtodo);
  } catch (error) {
    return res.json("something went wrong");
  }
}
async function updateTodo(req, res) {
  try {
    const id = req.params.id.trim();

    const existingtodo = await Todo.findById(id);
    if (!existingtodo) {
      return res.status(404).json("not found");
    }
    await Todo.findByIdAndUpdate(id, {
      isCompleted: true,
    });
    return res.json("cao");
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
