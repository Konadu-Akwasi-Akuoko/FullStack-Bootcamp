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

app
  .route("/articles")

  .get((req, res) => {
    db.getAllArticles()
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.send(err);
      });
  })

  .post((req, res) => {
    db.addArticle(req.body.title, req.body.content).then((data) => {
      res.send({ success: true, ...data._doc });
    });
  })

  .delete((req, res) => {
    db.deleteAll()
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.send(err);
      });
  });

app
  .route("/articles/:title")

  .get((req, res) => {
    db.getAnArticle(req.params.title)
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.send(err);
      });
  })

  .put((req, res) => {
    db.updateAWholeArticle(req.params.title, req.body.title, req.body.content)
      .then((data) => {
        if (data.acknowledged === true) {
          res.send({ success: true, ...data });
        } else {
          res.send({ success: false, ...data });
        }
      })
      .catch((err) => {
        res.send(err);
      });
  });

app.listen(port, () => {
  console.log(`Sever is running on port ${port}!`);
});
