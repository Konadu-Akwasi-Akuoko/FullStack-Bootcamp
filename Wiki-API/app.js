const express = require("express");
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

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/articles", (req, res) => {
  db.getAllArticles().then((data) => {
    res.send(data);
  });
});

app.listen(port, () => {
  console.log(`Sever is running on port ${port}!`);
});
