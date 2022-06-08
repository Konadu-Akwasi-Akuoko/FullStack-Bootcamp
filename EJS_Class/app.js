const express = require("express");
//Require db.js
const { db } = require("./db");

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

let addToDoWorkList = [];

app.get("/", (req, res) => {
  //Get all the items from the database, and use .then to get the data,
  //and render the index.ejs file inside the callback function
  db.getAllItems().then((items) => {
    res.render("list", {
      _listTitle: date.toLocaleDateString("default", options),
      _addToDoArr: items,
    });
  });
});

app.post("/", (req, res) => {
  db.addItem(req.body.toDoItem);
  res.redirect("/");
});

app.post("/delete/:item", (req, res) => {
  db.deleteItem(req.params.item);
  res.redirect("/");
});

app.get("/work", (req, res) => {
  res.render("list", {
    _listTitle: "Work List",
    _addToDoArr: addToDoWorkList,
  });
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.listen(port, () => {
  console.log(`Sever is running on port ${port}!`);
});
