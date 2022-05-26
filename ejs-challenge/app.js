const express = require("express");
const { toKebabCase } = require("./modules");

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

const homeStartingContent =
  "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent =
  "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent =
  "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

let posts = [];

app.get("/", function (req, res) {
  res.render("home", {
    _homeStartingContent: homeStartingContent,
    _posts: posts,
  });
});

app.get("/contact", function (req, res) {
  res.render("contact", { _contactContent: contactContent });
});

app.get("/about", function (req, res) {
  res.render("about", { _aboutContent: aboutContent });
});

app.get("/compose", function (req, res) {
  res.render("compose");
});

//Using express route parameters
app.get("/post/:postTitle", function (req, res) {
  const postURLParameter = toKebabCase(req.params.postTitle);
  //Find the post with the title by filtering it with find()
  //This method would return the first post that matches the condition
  const post = posts.find((post) => post.urlParameter === postURLParameter);
  if (post) {
    res.render("post", {
      _postTitle: post.title,
      _postContent: post.content,
    });
  } else {
    res.render("404");
  }
});

app.post("/compose", function (req, res) {
  const postTitle = req.body.postTitle;
  const postBody = req.body.postBody;
  //Store the postTitle and postBody in an object
  const post = {
    urlParameter: toKebabCase(postTitle),
    title: postTitle,
    content: postBody,
  };
  //Push the object into the posts array
  posts.push(post);
  res.redirect("/");
});

app.listen(port, function () {
  console.log("Server started on port 3000");
});
