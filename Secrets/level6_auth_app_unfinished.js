require(dotenv).config();
const express = require("express");
const ejs = require("ejs");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
//! PassportJS
const passport = require("passport");
const session = require("express-session");
//! Mongoose
const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

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
const findOrCreate = require("mongoose-findorcreate");

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

mongoose.connect("mongodb://localhost:27017/userDB", (err) => {
  if (err) {
    console.log(`Couldn't connect because of: ${err}`);
  } else {
    console.log("Mongoose connected successfully");
  }
});

const userSchema = new mongoose.Schema({
  email: {
    type: String,
  },
  password: {
    type: String,
  },
});

userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate);

const User = mongoose.model("User", userSchema);

//! Passport local strategy, implemented by passport-local-mongoose
passport.use(User.createStrategy());
//! Serializing and deserializing using passport-local-mongoose
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

let clientId = process.env.CLIENT_ID;
let clientSecret = process.env.CLIENT_SECRET;

passport.use(
  new GoogleStrategy(
    {
      clientID: clientId,
      clientSecret: clientSecret,
      callbackURL: "http://127.0.0.1:3000/auth/google/secrets",
      userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo",
    },
    function (accessToken, refreshToken, profile, cb) {
      User.findOrCreate({ googleId: profile.id }, function (err, user) {
        return cb(err, user);
      });
    }
  )
);

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
  });

app
  .route("/register")
  .get((req, res) => {
    res.render("register");
  })
  .post((req, res) => {
    const email = req.body.email;
    const password = req.body.password;
  });

app.listen(port, () => {
  console.log(`Sever is running on port ${port}!`);
});
