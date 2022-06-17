const express = require("express");
//Require db.js
const { db } = require("./db");
//Require CustomList from db.js
const { customList } = require("./db");

const app = express();
//Serve static files with this middleware
app.use(express.static("Public"));
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
let listTitle = date.toLocaleDateString("default", options);

let addToDoWorkList = [];

app.get("/", (req, res) => {
  //Get all the items from the database, and use .then to get the data,
  //and render the index.ejs file inside the callback function
  db.getAllItems().then((items) => {
    res.render("list", {
      _listTitle: listTitle,
      _addToDoArr: items,
    });
  });
});

app.get("/:todo", (req, res) => {
  //Because we are using the root path to get the todo, we need
  //to stop if from running if the todo is empty
  if (req.params.todo === "favicon.ico" || req.params.todo === "") {
    return;
  } else {
    let todo = req.params.todo;
    customList.getCustomList(todo).then((items) => {
      res.render("list", {
        _listTitle: todo,
        _addToDoArr: items,
      });
    });
  }
});

//Adding a new item to the database route
app.post("/", (req, res) => {
  if (req.body.list == listTitle) {
    db.addItem(req.body.toDoItem);
    res.redirect("/");
  } else {
    customList.addItemToCustomList(req.body.list, req.body.toDoItem);
    res.redirect("/" + req.body.list);
  }
});

app.post("/delete/:item", (req, res) => {
  if (req.body.checkbox == listTitle) {
    db.deleteItem(req.params.item);
    res.redirect("/");
  } else {
    customList.removeFromCustomList(req.body.checkbox, req.params.item);
    res.redirect("/" + req.body.checkbox);
  }
});

app.get("/about/konadu", (req, res) => {
  res.render("about");
});

app.listen(port, () => {
  console.log(`Sever is running on port ${port}!`);
});
