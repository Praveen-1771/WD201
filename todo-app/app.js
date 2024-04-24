const express = require("express");
const path = require("path");
const app = express();
const Todo = require("./models/todo"); // Import the Todo model
const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.set("view engine", "ejs");

app.get("/", async (req, res) => {
  try {
    const allTodos = await Todo.getTodos(); // Get all To-Dos
    if (req.accepts("html")) {
      res.render("index", { allTodos }); // Render the EJS view
    } else {
      res.json({ allTodos }); // Return JSON response
    }
  } catch (error) {
    console.error("Error fetching todos:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.use(express.static(path.join(__dirname, "public"))); // Serve static files

app.get("/todos", async function (req, res) {
  try {
    const todos = await Todo.findAll(); // Get all To-Dos
    return res.json(todos);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/todos/:id", async function (req, res) {
  try {
    const todo = await Todo.findByPk(req.params.id);
    return res.json(todo);
  } catch (error) {
    console.error(error);
    return res.status(422).json(error);
  }
});

app.post("/todos", async function (req, res) {
  try {
    const todo = await Todo.create(req.body); // Create a new To-Do
    return res.json(todo);
  } catch (error) {
    console.error(error);
    return res.status(422).json(error);
  }
});

app.put("/todos/:id/markAsCompleted", async function (req, res) {
  try {
    const todo = await Todo.findByPk(req.params.id);
    if (!todo) {
      return res.status(404).json({ error: "To-Do not found" });
    }
    todo.completed = true;
    await todo.save(); // Mark the To-Do as completed
    return res.json(todo);
  } catch (error) {
    console.error(error);
    return res.status(422).json(error);
  }
});

app.delete("/todos/:id", async function (req, res) {
  try {
    const todo = await Todo.findByPk(req.params.id);
    if (!todo) {
      return res.status(404).json({ error: "To-Do not found" });
    }
    await todo.destroy(); // Delete the To-Do
    return res.json({ success: true });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = app;
