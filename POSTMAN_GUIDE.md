# Postman Guide - Todo API

## Base URL
```
http://localhost:5000
```

## Step 1: Create Todos First

### Create Todo 1
**POST** `http://localhost:5000/todos`

**Headers:**
```
Content-Type: application/json
```

**Body (raw JSON):**
```json
{
  "title": "Complete project documentation"
}
```

**Response:** You'll get back a todo object with an `_id`. Copy this ID!
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "title": "Complete project documentation",
  "isCompleted": false
}
```

### Create Todo 2
**POST** `http://localhost:5000/todos`

**Body:**
```json
{
  "title": "Write unit tests"
}
```

Copy the `_id` from the response.

---

## Step 2: Create a Project with Todos

### Create Project
**POST** `http://localhost:5000/projects`

**Headers:**
```
Content-Type: application/json
```

**Body (raw JSON):**
```json
{
  "name": "My First Project",
  "description": "A project to track important tasks",
  "todos": [
    "507f1f77bcf86cd799439011",
    "507f1f77bcf86cd799439012"
  ]
}
```

**Note:** Replace the IDs in the `todos` array with the actual `_id` values you got from creating todos.

**Response:**
```json
{
  "_id": "507f191e810c19729de860ea",
  "name": "My First Project",
  "description": "A project to track important tasks",
  "todos": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "title": "Complete project documentation",
      "isCompleted": false
    },
    {
      "_id": "507f1f77bcf86cd799439012",
      "title": "Write unit tests",
      "isCompleted": false
    }
  ]
}
```

---

## Step 3: Get All Projects

**GET** `http://localhost:5000/projects`

**Response:**
```json
[
  {
    "_id": "507f191e810c19729de860ea",
    "name": "My First Project",
    "description": "A project to track important tasks",
    "todos": [...]
  }
]
```

---

## Step 4: Get a Specific Project

**GET** `http://localhost:5000/projects/{project_id}`

Replace `{project_id}` with the actual project ID.

**Example:**
```
GET http://localhost:5000/projects/507f191e810c19729de860ea
```

---

## Step 5: Update a Project (Add More Todos)

First, create another todo, then update the project:

**PATCH** `http://localhost:5000/projects/{project_id}`

**Body:**
```json
{
  "name": "My Updated Project",
  "description": "Updated description",
  "todos": [
    "507f1f77bcf86cd799439011",
    "507f1f77bcf86cd799439012",
    "507f1f77bcf86cd799439013"
  ]
}
```

---

## Step 6: Create a Project Without Todos (Optional)

**POST** `http://localhost:5000/projects`

**Body:**
```json
{
  "name": "Empty Project",
  "description": "This project has no todos yet"
}
```

Or even simpler:
```json
{
  "name": "Empty Project"
}
```

---

## Complete Workflow Example

1. **Create Todo 1:**
   - POST `/todos`
   - Body: `{"title": "Buy groceries"}`
   - Copy `_id`: `507f1f77bcf86cd799439011`

2. **Create Todo 2:**
   - POST `/todos`
   - Body: `{"title": "Walk the dog"}`
   - Copy `_id`: `507f1f77bcf86cd799439012`

3. **Create Project with Todos:**
   - POST `/projects`
   - Body: 
     ```json
     {
       "name": "Daily Tasks",
       "description": "My daily todo list",
       "todos": ["507f1f77bcf86cd799439011", "507f1f77bcf86cd799439012"]
     }
     ```

4. **View Project:**
   - GET `/projects/{project_id}`

---

## Other Available Endpoints

### Get All Todos
**GET** `http://localhost:5000/todos`

### Update Todo
**PATCH** `http://localhost:5000/todos/{todo_id}`

### Delete Todo
**DELETE** `http://localhost:5000/todos/{todo_id}`

### Delete Project
**DELETE** `http://localhost:5000/projects/{project_id}`

---

## Tips

1. **Always create todos first** before adding them to a project
2. **Copy the `_id`** from todo responses to use in project creation
3. **Use the ObjectId format** - MongoDB ObjectIds are 24 character hex strings
4. **Check your server is running** on port 5000 before making requests
5. **Make sure MongoDB is running** (check your docker-compose.yaml)

## Troubleshooting

- **404 Error**: Check that the ID is correct and the resource exists
- **400 Error**: Check your JSON body format matches the schema
- **500 Error**: Check server logs and MongoDB connection
- **Connection Refused**: Make sure the server is running on port 5000



