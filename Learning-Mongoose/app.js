const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/fruitsDB", {
  useNewUrlParser: true,
});

const fruitsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please check your data entry no name is specified"],
  },
  rating: {
    type: Number,
    min: 1,
    max: 10,
  },
  review: String,
});

const Fruit = mongoose.model("Fruit", fruitsSchema);

// Fruit.updateOne(
//   { name: "" },
//   { name: "peach", review: "I really hate peach" },
//   (err) => {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log("Successfully updated");
//     }
//   }
// );

// Fruit.deleteMany({ rating: { $gt: 5 } }, (err) => {
//   if (err) {
//     console.log(err);
//     mongoose.connection.close();
//   } else {
//     console.log("Successfully deleted");
//     mongoose.connection.close();
//   }
// });

const fruit = new Fruit({
  name: "Mango",
  rating: 6,
  review: "Not bad, not great either",
});

fruit.save();

// apple.save((err, docs) => {
//   if (err) {
//     console.log(err);
//     mongoose.connection.close();
//   } else {
//     console.log(docs);
//     mongoose.connection.close();
//   }
// });
//mongoose.connection.close();

const peopleSchema = new mongoose.Schema({
  name: String,
  age: Number,
  favoriteFruit: fruitsSchema,
});

const People = mongoose.model("People", peopleSchema);

// const person = new People({
//   name: "Akwasi",
//   age: 19,
//   favoriteFruit: fruit,
// });

People.updateMany({ age: 37 }, { favoriteFruit: fruit }, (err, res) => {
  if (err) {
    console.log(err);
  } else {
    console.log(res.acknowledged);
  }
});

// person.save();

// People.deleteMany(
//   { $or: [{ age: { $gte: 0 } }, { age: { $lte: 100 } }] },
//   (err) => {
//     if (err) {
//       console.log(err);
//       mongoose.connection.close();
//     } else {
//       console.log("Successfully deleted");
//       mongoose.connection.close();
//     }
//   }
// );

// const people = new People({
//   name: "John",
//   age: 37,
// });

// people.save((err, docs) => {
//   if (err) {
//     console.log(err);
//     mongoose.connection.close();
//   } else {
//     console.log(docs);
//     mongoose.connection.close();
//   }
// });

// People.find(function (error, docs) {
//   if (error) {
//     console.log(error);
//   } else {
//     console.log("----------------------------------------------------");
//     console.log(returnOnlyName(docs));
//     mongoose.disconnect();
//   }
// });

// function returnOnlyName(arr) {
//   let newArray = [];
//console.log(arr);
// let newArray = arr.map((element) => element.name);
// console.log(newArray);
//   arr.forEach((element, index, array) => {
//     newArray.push(element.name);
//     element = element.name;
//     console.log(`Element is ${element}`);
//     console.log(array[index].name);
//   });
//   return newArray;
// }
