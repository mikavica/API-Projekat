const z = require("zod");
const { ar } = require("zod/locales");

const TodoDeadline = z.preprocess((arg) => {
     if (typeof arg=== "string" || arg instanceof Date) {
const d = new Date (arg);
return isNaN(d.getTime()) ? undefined : d;
     }
     return arg;
}, z.date());
const CreateTodoData = z.object({
  title: z.string(),
  deadline: TodoDeadline.optional(),
});
const UpdateTodoData = z.object({
  title: z.string().optional(),
  deadline: TodoDeadline.optional(),
  isCompleted: z.boolean().optional(),
});

module.exports = {
  CreateTodoData,
  UpdateTodoData,
  TodoDeadline,
};
