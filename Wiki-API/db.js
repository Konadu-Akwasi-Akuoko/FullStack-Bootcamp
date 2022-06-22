const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/wikiDB", (err, data) => {
  if (err) {
    console.log("Error connecting to MongoDB");
  } else {
    console.log("Connected to MongoDB");
    //console.log(data);
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
          console.log(err);
          reject(err);
        } else {
          //console.log(data);
          resolve(data);
        }
      });
    });
  },

  getAnArticle: (title) => {
    return new Promise((resolve, reject) => {
      Article.find({ title: title }, (err, data) => {
        if (err) {
          console.log("Error getting all articles");
          console.log(err);
          reject(err);
        } else {
          //console.log(data);
          resolve(data);
        }
      });
    });
  },

  addArticle: (title, content) => {
    return new Promise((resolve, reject) => {
      let article = new Article({
        title: title,
        content: content,
      });
      article.save((err, data) => {
        if (err) {
          console.log("Error adding article");
          console.log(err);
          reject(err);
        } else {
          //console.log(data);
          resolve(data);
        }
      });
    });
  },

  updateAWholeArticle: (titleToUpdate, title, content) => {
    return new Promise((resolve, reject) => {
      Article.replaceOne(
        { title: titleToUpdate },
        { title: title, content: content },
        (err, data) => {
          if (err) {
            console.log("Error updating article");
            console.log(err);
            reject(err);
          } else {
            //console.log(data);
            resolve(data);
          }
        }
      );
    });
  },

  updatePartOfArticle: (titleToUpdate, update) => {
    return new Promise((resolve, reject) => {
      Article.updateOne({ title: titleToUpdate }, update, (err, data) => {
        if (err) {
          console.log(err);
          reject(err);
        } else {
          //console.log(data);
          resolve(data);
        }
      });
    });
  },

  deleteAnArticle: (title) => {
    return new Promise((resolve, reject) => {
      Article.deleteOne({ title: title }, (err, data) => {
        if (err) {
          console.log(err);
          reject(err);
        } else {
          //console.log(data);
          resolve(data);
        }
      });
    });
  },

  deleteAll: () => {
    return new Promise((resolve, reject) => {
      Article.deleteMany({}, (err, data) => {
        if (err) {
          console.log("Error deleting all articles");
          console.log(err);
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
