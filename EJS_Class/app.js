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

app.get("/", (req, res) => {
  let today = new Date();
  let day = "";
  if (today.getDay() === 6 || today.getDay() === 0) {
    day = `${today.getDate()}`;
  } else {
    day = `${today.getDate()}`;
  }
  res.render("list", { day: day });
});

app.listen(port, () => {
  console.log(`Sever is running on port ${port}!`);
});
