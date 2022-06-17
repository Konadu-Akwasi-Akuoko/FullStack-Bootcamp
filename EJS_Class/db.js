const e = require("express");
const mongoose = require("mongoose");
const { mongodbConnectionString } = require("./keys");

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
mongoose.connect(mongodbConnectionString, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Connected to the database");
  }
});

//Disconnect from the database
function DisconnectDB() {
  return new Promise((resolve, reject) => {
    mongoose.disconnect((err) => {
      if (err) {
        console.log(err);
        reject(err);
      } else {
        console.log("disConnected to the database");
        resolve();
      }
    });
  });
}

//Create an object that let us want to work with the database.
let db = {
  getAllItems: function () {
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
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  addItem: function (item) {
    if (!item) {
      console.log("No item to add, this accepts an item as a parameter");
      return;
    }
    //Create a new item in the database
    let newItem = new Item({
      name: item,
    });
    //Save the new item in the database
    newItem.save().then((data) => {
      //console.log(data);
    });
  },
  deleteItem: function (item) {
    if (!item) {
      console.log("No item to delete, this accepts an item as a parameter");
      return;
    }

    //Delete an item from the database
    Item.deleteOne({ _id: item })
      .exec()
      .then((data) => {
        //console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  },
};

//Create a class that let us work with custom lists
let customList = {
  //Add an item to a custom list
  addItemToCustomList: function (listToAddTo, itemToAdd) {
    /* Find the list to add the item to and add the item to it (push)
    Use .exec() to make the query a promise */
    CustomItem.updateOne(
      { listTitle: listToAddTo },
      { $push: { list: { name: itemToAdd } } }
    )
      .exec()
      .then((data) => {
        //console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  },
  //Get the list, if it doesn't exist, create it
  getCustomList: function (listToFind) {
    return new Promise((resolve, reject) => {
      CustomItem.find({ listTitle: listToFind })
        .exec()
        .then((data) => {
          if (data.length === 0) {
            let newList = new CustomItem({
              listTitle: listToFind,
            });
            newList.save().then((product) => {
              let items = product.list;
              resolve(items);
            });
          } else {
            let items = [];
            data[0].list.forEach((item) => {
              items.push(item);
            });
            resolve(items);
          }
        })
        .catch((err) => {
          console.log("Error: " + err);
          reject(err);
        });
    });
  },
  removeFromCustomList: function (listTitle, itemToRemove) {
    CustomItem.updateOne(
      { listTitle: listTitle },
      { $pull: { list: { _id: itemToRemove } } }
    )
      .exec()
      .then((data) => {
        //console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  },
};

//When a signal(SIGTERM and SIGINT) is received about closing, close the Database connection
process.on("SIGTERM", () => {
  console.log("SIGTERM received");
  DisconnectDB().then(() => {
    console.log("I'm about to exit");
    process.exit(0);
  });
});
process.on("SIGINT", () => {
  console.log("SIGINTreceived");
  DisconnectDB().then(() => {
    console.log("I'm about to exit");
    process.exit(0);
  });
});

// !original db implementation
//* db.addItem("Trying to see SIG in action");
//* db.deleteItem("62a809cd119a15030149c2c5");
//* db.getAllItems().then((data) => {
//*   console.log(data);
//* });

//! custom items implementation
//* customList.removeFromCustomList("My Own List", "62a7feeb26f8e473f521dc96");
//* customList.getCustomList("Another newer list2").then((data) => {
//*   console.log(data);
//* data.forEach((element) => {
//*   console.log(element.name);
//* });
//* });
//* customList.addItemToCustomList("Anothe New list", "Buy a bullion van");

// !Note the following:
/*
 * 1. To get the object names for all embedded documents in the customList use
 * => data[0].list[{where this matches the array id}].name
 * 2. To get all the ids for all embedded documents in the customList use
 * => data[0].list[{where this matches the array id}]._id
 */

module.exports = { db, customList };
