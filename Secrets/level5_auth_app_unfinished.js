const express = require("express");
const ejs = require("ejs");
require("dotenv").config();
//! PassportJS
const passport = require("passport");
const session = require("express-session");
//! User model from mongoose
const { User } = require("./db");
const { use } = require("passport");

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

//? Setting up middleware for PassportJS to use
//! Express session initialization for it to be used by passport
app.use(
  session({
    secret: process.env.BYTE32_BASE64_STRING,
    resave: false,
    saveUninitialized: false,
  })
);
//! Initialize passport on every route call
app.use(passport.initialize());
//! Allow passport to use our express session
app.use(passport.session());

//! Passport local strategy, implemented by passport-local-mongoose
passport.use(User.createStrategy());
//! Serializing and deserializing using passport-local-mongoose
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.route("/").get((req, res) => {
  res.render("home");
});

app
  .route("/login")
  .get((req, res) => {
    res.render("login");
  })
  .post((req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const user = new User({
      username: username,
      password: password,
    });

    req.login(user, function (err) {
      if (err) {
        console.log(err);
      } else {
        passport.authenticate("local")(req, res, function () {
          res.redirect("/secrets");
        });
      }
    });
  });

app.get("/secrets", (req, res) => {
  if (req.isAuthenticated()) {
    res.render("secrets");
  } else {
    res.redirect("login");
  }
});

app
  .route("/register")
  .get((req, res) => {
    res.render("register");
  })
  .post((req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    User.register({ username: username }, password, (err, user) => {
      if (err) {
        console.log(err);
        res.redirect("/register");
      } else {
        passport.authenticate("local")(req, res, function () {
          res.redirect("/secrets");
        });
      }
    });
  });

app.listen(port, () => {
  console.log(`Sever is running on port ${port}!`);
});
