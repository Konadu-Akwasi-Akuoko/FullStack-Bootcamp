const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/wikiDB", (err, data) => {
  if (err) {
    console.log("Error connecting to MongoDB");
  } else {
    console.log("Connected to MongoDB");
  }
});

let articleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
});

let Article = mongoose.model("Article", articleSchema);

let db = {
  getAllArticles: () => {
    return new Promise((resolve, reject) => {
      Article.find({}, (err, data) => {
        if (err) {
          console.log("Error getting all articles");
          reject(err);
        } else {
          //console.log(data);
          resolve(data);
        }
      });
    });
  },
};

//Close the DB when SIG is received
process.on("SIGINT", () => {
  mongoose.connection.close(() => {
    console.log("Mongoose disconnected through app termination");
    process.exit(0);
  });
});

process.on("SIGTERM", () => {
  mongoose.connection.close(() => {
    console.log("Mongoose disconnected through app termination");
    process.exit(0);
  });
});

//Exports
module.exports = { db };
