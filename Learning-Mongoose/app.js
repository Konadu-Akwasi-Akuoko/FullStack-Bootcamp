const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/fruitsDB", {
  useNewUrlParser: true,
});

const fruitsSchema = new mongoose.Schema({
  name: String,
  rating: Number,
  review: String,
});

const Fruit = mongoose.model("Fruit", fruitsSchema);

const apple = new Fruit({
  name: "apple",
  rating: 7.8,
  review: "good",
});

let promise = new Promise((resolve, reject) => {
  apple.save((err, result) => {
    if (err) {
      reject(err);
    } else {
      resolve(result);
    }
  });
});

promise
  .then((result) => {
    console.log(result);
    mongoose.disconnect();
  })
  .catch((err) => {
    console.log(err);
  });
