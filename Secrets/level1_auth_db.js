const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/userDB", (err) => {
  if (err) {
    console.log(`Couldn't connect because of: ${err}`);
  } else {
    console.log("Mongoose connected successfully");
  }
});

const userSchema = new mongoose.Schema({
  email: {
    required: [true, "Please type in an email"],
    type: String,
  },
  password: {
    required: [true, "Please type in a password"],
    type: String,
  },
});

const User = new mongoose.model("User", userSchema);

const db = {
  addUser: (email, password, cbFunction) => {
    const newUser = new User({
      email: email,
      password: password,
    });

    newUser.save((err, product) => {
      if (err) {
        return cbFunction({ err, success: false });
      } else {
        return cbFunction({ ...product._doc, success: true });
      }
    });
  },

  checkForAUser: (email, password, cbFunction) => {
    User.findOne({ email: email, password: password }, (err, data) => {
      if (data) {
        return cbFunction({ ...data._doc, success: true });
      } else {
        return cbFunction({ success: false });
      }
    });
  },
};

//db.addUser("konadu@gmail.com", `525#!5564""kaa*#`, (data) => console.log(data));
db.checkForAUser("konadu@gmail.com", `525#!5564""kaa*#`, (data) =>
  console.log(data)
);

//* Disconnect MongoDB when a SIG signal is received
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

module.exports = { db };
