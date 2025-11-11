const { IdSchema } = require("../common/schemas/id.schema");
const {Comment} = require("./comments.db");
const schemas = require("./comments.schemas");

async function getComment(req,res) {
  const params = IdSchema.parse(req.params)
    const data = await Comment.find({
      todoId: params.id
    });
    return res.json(data);
}
async function deleteComment(req,res)  {
try{
  const {id} = IdSchema.parse(req.params)


    const deletedComment = await Comment.findByIdAndDelete(id);
    
    if (!deletedComment) {
        return res.status(404).json("Comment not found");
      }
      console.log("Deleted Comment:", deletedComment);
    return res.status(200).json("Comment successfully deleted");
}catch (err) {
    console.error("Delete error:", err);
    return res.status(500).json("Something went wrong");
  }

}
async function createComment(req,res){
    try {
        const data = schemas.CreateCommentData.safeParse(req.body);
        if (!data.success) {
          return res.status(400).json(data.error);
        }
    
        const newcomment = await Comment.create({
          title: data.data.title,
          author: data.data.author,
          todoId: data.data.todoId,
        });
    
        return res.json(newcomment);
      } catch (error) {
        console.log (error)
        return res.json("something went wrong");
      }
}    
async function updateComment(req,res){
    try {
        const id = req.params.id.trim();
      console.log(req.body)

    
        const existingcomment = await Comment.findById(id);
        if (!existingcomment) {
          return res.status(404).json("not found");
        }
        await Comment.findByIdAndUpdate(id, {
          isCompleted: true,
        });
        return res.json("cao");
      } catch (error) {
        console.error(error);
        return res.status(500).json("something went wrong");
      }
}
module.exports = {
    getComment,
    deleteComment,
    createComment,
    updateComment
};

    
