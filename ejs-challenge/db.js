const { identity } = require("lodash");
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/blogDB", (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Connected to the database");
  }
});

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
});

const Post = mongoose.model("Post", postSchema);

let blogDB = {
  //! Save a new post to the database
  savePost: (title, content) => {
    const post = new Post({
      title: title,
      content: content,
    });
    post.save((err, data) => {
      if (err) {
        console.log(err);
      } else {
        //console.log(data);
      }
    });
  },
  //! Get all posts
  getAllPosts: () => {
    return new Promise((resolve, reject) => {
      Post.find({}, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  },
  //! Get a post by its title
  getPostById: (id) => {
    return new Promise((resolve, reject) => {
      Post.findById(id, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  },
};

//! Save to the database
// blogDB.savePost(
//   "Where can I get some?",
//   `here are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.`
// );

//! Find all posts in the database
// blogDB.getAllPosts()
//   .then((data) => {
//     console.log(data);
//* Received data from the database = [{_id, title, content}, {_id, title, content}]
//   })
//   .catch((err) => {
//     console.log(err);
//   });

//! Find a post by id
// blogDB.getPostById("62ad4ff8da8141bc469c19d8")
//   .then((data) => {
//* Received data from the database = {_id, title, content}
//     console.log(data);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

//! Find a post by id, and delete it
// Post.findByIdAndDelete("62ad4f8296149187eb6d0c17", (err, doc) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log(doc);
//   }
// });

//Disconnection from database when SIG is received
process.on("SIGINT", () => {
  mongoose.connection.close(() => {
    console.log("Disconnected from database");
    process.exit(0);
  });
});

process.on("SIGTERM", () => {
  mongoose.connection.close(() => {
    console.log("Disconnected from database");
    process.exit(0);
  });
});

module.exports = { blogDB };
