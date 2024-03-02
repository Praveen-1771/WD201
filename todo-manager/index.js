const express = require('express')
const app = express()
app.get("/todos", (request, response) =>
{
    //response.send("My Name is Praveen Kumar")
    console.log("Todo List")
})
app.post("/todos", (request, response) =>
{
    //response.send("My Name is Praveen Kumar")
    console.log("Creating a todo",request.body)
})
app.put("/todos/:id/markAsCompleted",(request, response) =>
{
    console.log("We have to update the with id:",request.params.id)
})
app.delete("/todos/:id", (request, response) =>
{
    console.log("Delete the Todos by id:",request.params.id)
})
app.listen(3000, () =>
{
    console.log("Start express server at 3000")
}
)