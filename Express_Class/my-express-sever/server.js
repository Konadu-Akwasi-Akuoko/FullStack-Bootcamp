const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  console.log(req);
  res.send(`<h1>Hello World</h1>
  <p> Go to the <a href="/contact">contacts page</a></p>
  <p> Go to the <a href="/about">about page</a></p>`);
});

app.get("/contact", (req, res) => {
  res.send(`<span style="font-weight: bold">
  <h1>Contact me at <a href="https://google.com">my email.</a></h1>
  <p>Go to <a href="/">home</a></p>
  <p>Go to <a href="/about">about</a></p>
  </span>`);
});

app.get("/about", (req, res) => {
  res.send(`<h1>Get to know more about me at <a href="https://jw.org">this website</a></h1>
  <p>But first of all my name is Akwasi Konadu Akuoko, and you can get to know me more on <a href="https://twitter.com">twitter</a></p>
  <br>
  <p>Go to <a href="/">home</a></p>
  <p>Go to <a href="/contact">contact</a></p>`);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
