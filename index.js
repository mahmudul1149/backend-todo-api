const express = require("express");
const cors = require("cors");
const app = express();
const client = require("./connect-mogodb");

app.use(cors());
app.use(express.json());

// Get APi
app.get("/todo/all", async (req, res) => {
  await client.connect();
  const todos = await client
    .db("todos-collection")
    .collection("todos")
    .find({})
    .toArray();
  res.send({
    success: true,
    todos,
  });
});

// Post Api
app.post("/todo", async (req, res) => {
  await client.connect();

  const todoCount = await client
    .db("todos-collection")
    .collection("todos")
    .countDocuments({});

  const todo = req.body;
  todo.id = todoCount + 1;

  await client.db("todos-collection").collection("todos").insertOne(todo);

  res.send({
    success: true,
    todo,
  });
});

// Update Api
app.put("/todo/:id", async (req, res) => {
  await client.connect();

  const todo = req.body;
  const id = parseInt(req.params.id);

  const updated = await client
    .db("todos-collection")
    .collection("todos")
    .updateOne({ id }, { $set: todo });

  if (updated.modifiedCount === 0) {
    res.send({
      success: false,
      message: "Could not update todo",
    });
  } else {
    res.send({
      success: true,
      todo,
    });
  }
});

// Delete Api
app.delete("/todo/:id", async (req, res) => {
  await client.connect();
  const id = parseInt(req.params.id);
  const deleted = await client
    .db("todos-collection")
    .collection("todos")
    .deleteOne({ id });
  if (deleted.deletedCount === 0) {
    res.send({
      success: false,
      message: "Could not delete todo",
    });
  } else {
    res.send({
      success: true,
    });
  }
});

const port = 3000;

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
