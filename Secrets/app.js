const express = require("express");
const ejs = require("ejs");
const { db } = require("./level1_auth_db");

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

app.route("/").get((req, res) => {
  res.render("home");
});

app
  .route("/login")
  .get((req, res) => {
    res.render("login");
  })
  .post((req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    db.checkForAUser(email, password, (data) => {
      if (data.success === true) {
        res.render("secrets");
      } else {
        console.log(data);
        res.redirect("/login");
      }
    });
  });

app
  .route("/register")
  .get((req, res) => {
    res.render("register");
  })
  .post((req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    db.addUser(email, password, (data) => {
      if (data.success === true) {
        //console.log(data);
        res.render("secrets");
      } else {
        console.log(data);
      }
    });
  });

app.listen(port, () => {
  console.log(`Sever is running on port ${port}!`);
});
