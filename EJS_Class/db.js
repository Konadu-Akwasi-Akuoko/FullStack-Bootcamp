const mongoose = require("mongoose");

//Create a new items schema
const itemsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

//Create a new model with the schema
const Item = mongoose.model("Item", itemsSchema);

//Connect to the database
function ConnectToDB() {
  mongoose.connect("mongodb://127.0.0.1:27017/todolistDB", {
    useNewUrlParser: true,
  });
}

//Disconnect from the database
function DisconnectDB() {
  mongoose.connection.close();
}

//Create an object that let us want to work with the database.
let db = {
  getAllItems: function () {
    ConnectToDB();
    //Return all the items in the database
    //We can't return the docs directly because it is a callback
    //function, we need to wrap it in a promise and return it
    //After that we use .then to get the data
    let items = [];
    return new Promise((resolve, reject) => {
      Item.find({}, (err, docs) => {
        if (err) {
          console.log(err);
          //DisconnectDB();
          reject(err);
        } else {
          docs.forEach((element) => {
            items.push(element);
          });
          //DisconnectDB();
          resolve(items);
        }
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
    newItem.save((err) => {
      if (err) {
        console.log(err);
        //DisconnectDB();
      } else {
        //DisconnectDB();
      }
    });
  },
  deleteItem: function (item) {
    if (!item) {
      console.log("No item to delete, this accepts an item as a parameter");
      return;
    }
    ConnectToDB();
    //Delete an item from the database
    Item.deleteOne({ _id: item }, (err) => {
      if (err) {
        console.log(err);
        //DisconnectDB();
      } else {
        //DisconnectDB();
      }
    });
  },
};

//Create a class that let us work with custom lists
class CustomList {
  constructor(listTitle) {
    this.listTitle = listTitle;
  }

  connectToDB() {
    //Create a new model with the schema
    const Item = mongoose.model(this.listTitle, itemsSchema);
    //Connect to the database
    mongoose.connect("mongodb://127.0.0.1:27017/todolistDB", {
      useNewUrlParser: true,
    });
    return Item;
  }

  disconnectDB() {
    //Disconnect from the database
  }

  getAllItems() {
    let customItem = this.connectToDB();
    //Return all the items in the database
    //We can't return the docs directly because it is a callback
    //function, we need to wrap it in a promise and return it
    //After that we use .then to get the data
    let items = [];
    return new Promise((resolve, reject) => {
      customItem.find({}, (err, docs) => {
        if (err) {
          console.log(err);
          //DisconnectDB();
          reject(err);
        } else {
          docs.forEach((element) => {
            items.push(element);
          });
          //DisconnectDB();
          resolve(items);
        }
      });
    });
  }

  addItem(item) {
    if (!item) {
      console.log("No item to add, this accepts an item as a parameter");
      return;
    }
    let Item = this.connectToDB();
    //Create a new item in the database
    let newItem = new Item({
      name: item,
    });
    //Save the new item in the database
    newItem.save((err) => {
      if (err) {
        console.log(err);
        //DisconnectDB();
      } else {
        //DisconnectDB();
      }
    });
  }

  //Delete an item from the database
  deleteItem(item) {
    if (!item) {
      console.log("No item to delete, this accepts an item as a parameter");
      return;
    }
    let Item = this.connectToDB();
    //Delete an item from the database
    Item.deleteOne({ _id: item }, (err) => {
      if (err) {
        console.log(err);
        //DisconnectDB();
      } else {
        //DisconnectDB();
      }
    });
  }
}

module.exports = { db, CustomList };
