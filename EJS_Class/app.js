const express = require("express");

const app = express();
//Serve static files with this middleware
app.use(express.static("public"));
//Use body-parser to parse form data with this middleware
app.use(express.urlencoded({ extended: true }));
//Convert json data to javascript object with this middleware
app.use(express.json());
//Use ejs template engine with this middleware
app.set("view engine", "ejs");
const port = process.env.PORT || 3000;

let date = new Date();
const options = {
  weekday: "long",
  month: "long",
  day: "numeric",
};

app.get("/", (req, res) => {
  res.render("list", { _date: date.toLocaleDateString("default", options) });
});

app.post("/", (req, res) => {
  console.log("Post request received " + req.body.toDoItem);
  res.render("list2", {
    _date: date.toLocaleDateString("default", options),
    addToDo1: req.body.toDoItem,
  });
});

app.listen(port, () => {
  console.log(`Sever is running on port ${port}!`);
});
