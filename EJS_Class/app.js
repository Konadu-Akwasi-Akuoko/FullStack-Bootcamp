const express = require("express");

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

let addToDoArr = [];
let addToDoWorkList = [];

app.get("/", (req, res) => {
  res.render("list", {
    _listTitle: date.toLocaleDateString("default", options),
    _addToDoArr: addToDoArr,
  });
});

app.post("/", (req, res) => {
  //Check and see the title of the request
  if (req.body.list === "Work") {
    addToDoWorkList.push(req.body.toDoItem);
    res.redirect("/work");
  } else {
    addToDoArr.push(req.body.toDoItem);
    res.redirect("/");
  }
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
