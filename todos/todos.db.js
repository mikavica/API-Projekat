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
  deadline: {
    type: Date,
    required: false,
  },
  userId:
   { type: String,
     required: true 
    },

});
const Todo = mongo.model("todo", todoSchema);
module.exports = {
    Todo,
}

