const express = require("express")
let todos = []

const app = express()
app.use(express.json())
app.get("/todos",(req,res)=>{
    console.log("radi")
    return res.json(todos)
})
app.delete("/todos/:id",(req,res)=>{
    const id = parseInt(req.params.id, 10)

    const exists = todos.find((item)=>{
        if(item.id===id){
            return true
        }
        return false
            
    })
    if(!exists){
        return res.json("not found")
    }
    todos = todos.filter((item)=>{
        if(item.id===id){
            return false
        }
        return true
    })
    return res.json("sisaj kurac")
})

app.post("/todos",(req,res)=>{
    console.log(req.body)
    const newtodo = {
        title: req.body.title ,
        isCompleted: false,
        id: 1,
        
    }
    

    todos.push(newtodo)

    return res.json(1)
})
app.patch("/todos/:id",(req,res)=>{
    const id=parseInt(req.params.id,10)
    let todo=todos.find((item)=>{
        return item.id === id
    })

    if(!todo){
        return res.json("not found")
    }
   
    todo={
        ...todo,
        isCompleted: true,
    }

    todos=todos.map((item)=>{
        if(item.id===todo.id){
            return todo
        }
        return item
    })
    return res.json("cao")
} )
app.listen(5000,()=>{
    console.log("listening")
})