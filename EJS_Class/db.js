const e = require("express");
const mongoose = require("mongoose");

//Create a new items schema
const itemsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

//Create a new schema for custom list
const customListSchema = new mongoose.Schema({
  listTitle: { type: String, required: true },
  list: [itemsSchema],
});

//Create a new model with the schema
const Item = mongoose.model("Item", itemsSchema);

//Create a new customItem model with the schema
const CustomItem = mongoose.model("CustomItem", customListSchema);

//Connect to the database
function ConnectToDB() {
  mongoose.connect(
    "mongodb://127.0.0.1:27017/todolistDB",
    {
      useNewUrlParser: true,
    },
    (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log("Connected to the database");
      }
    }
  );
}

//Disconnect from the database
function DisconnectDB() {
  mongoose.disconnect((err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("disConnected to the database");
    }
  });
}

//Create an object that let us want to work with the database.
let db = {
  getAllItems: function () {
    ConnectToDB();
    /* Return all the items in the database
    We can't return the docs directly because it is a callback
    function, we need to wrap it in a promise and return it
    After that we use .then to get the data */
    let items = [];
    return new Promise((resolve, reject) => {
      Item.find({})
        .exec()
        .then((data) => {
          data.forEach((item) => {
            items.push(item);
          });
          resolve(items);
          DisconnectDB();
        })
        .catch((err) => {
          reject(err);
          DisconnectDB();
        });
    });
  },
  addItem: function (item) {
    if (!item) {
      console.log("No item to add, this accepts an item as a parameter");
      return;
    }
    ConnectToDB();
    //Create a new item in the database
    let newItem = new Item({
      name: item,
    });
    //Save the new item in the database
    newItem.save().then((data) => {
      console.log(data);
      console.log("Item added to the database");
      DisconnectDB();
    });
  },
  deleteItem: function (item) {
    if (!item) {
      console.log("No item to delete, this accepts an item as a parameter");
      return;
    }
    ConnectToDB();
    //Delete an item from the database
    Item.deleteOne({ _id: item })
      .exec()
      .then((data) => {
        console.log(data);
        console.log("Item deleted from the database");
        DisconnectDB();
      })
      .catch((err) => {
        console.log(err);
        DisconnectDB();
      });
  },
};

//Create a class that let us work with custom lists
let customList = {
  //Add an item to a custom list
  addItemToCustomList: function (listToAddTo, itemToAdd) {
    ConnectToDB();
    console.log(itemToAdd);
    /* Find the list to add the item to and add the item to it (push)
    Use .exec() to make the query a promise */
    CustomItem.updateOne(
      { listTitle: listToAddTo },
      { $push: { list: { name: itemToAdd } } }
    )
      .exec()
      .then((data) => {
        console.log(data);
        DisconnectDB();
      })
      .catch((err) => {
        console.log(err);
        DisconnectDB();
      });
  },
  getCustomList: function (listToFind) {
    ConnectToDB();
    return new Promise((resolve, reject) => {
      CustomItem.find({ listTitle: listToFind })
        .exec()
        .then((data) => {
          if (data.length === 0) {
            let newList = new CustomItem({
              listTitle: listToFind,
            });
            newList.save().then((product) => {
              console.log(product);
              DisconnectDB();
              resolve(product);
            });
          } else {
            DisconnectDB();
            resolve(data);
          }
        })
        .catch((err) => {
          console.log("Error: " + err);
          DisconnectDB();
          reject(err);
        });
    });
  },
};

//!original db implementation
//db.addItem("Add item");
db.deleteItem("62a809cd119a15030149c2c5");

//! custom items implementation
// customList.getCustomList("Anothe New list").then((data) => {
//   console.log(data);
//   data[0].list.forEach((element) => {
//     console.log(element.name);
//   });
// });
//customList.addItemToCustomList("Anothe New list", "Buy a bullion van");

module.exports = { db, customList };

//? To do see why items add to both the list.
