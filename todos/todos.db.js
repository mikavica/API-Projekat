const mongo = require("mongoose");
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
module.exports = {
    Todo,
}

