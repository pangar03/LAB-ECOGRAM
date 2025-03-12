const express = require("express");
const path = require("path");

const app = express();

app.use(express.json());
app.use("/user", express.static(path.join(__dirname, "app1")));
app.use("/dashboard", express.static(path.join(__dirname, "app2")));

let users = [];
let posts = [];

app.get("/users", (req, res) => {
  res.send(users);
});

app.get("/posts", (req, res) => {
  res.send(posts);
});

app.post("/register", (req, res) => {
  users.push(req.body);
  res.send("User registered successfully");
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  const user = users.find((user) => user.username === username);
  if (!user) {
    return res.status(400).send("User not found");
  }
  if (user.password !== password) {
    return res.status(400).send("Invalid password");
  }
  res.send(user);
});

app.post("/create-post", (req,res) => {
  posts.push(req.body);
  res.send("Post created successfully");
});

app.listen(5050);
