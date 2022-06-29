const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

//The number of salt rounds bcrytp must go
const saltRounds = 10;

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

const User = mongoose.model("User", userSchema);

const db = {
  addUser: (email, password, cbFunction) => {
    bcrypt.hash(password, saltRounds, function (err, hash) {
      if (err) {
        console.log(err);
      } else {
        const newUser = new User({
          email: email,
          password: hash,
        });

        newUser.save((err, product) => {
          if (err) {
            return cbFunction({ err, success: false });
          } else {
            return cbFunction({ ...product._doc, success: true });
          }
        });
      }
    });
  },

  checkForAUser: (email, password, cbFunction) => {
    User.findOne({ email: email }, (err, data) => {
      if (data) {
        bcrypt.compare(password, data.password, (bcryptErr, result) => {
          if (result === true) {
            return cbFunction({ ...data._doc, success: true });
          } else {
            return cbFunction({ success: false });
          }
        });
      } else {
        return cbFunction({ success: false });
      }
    });
  },
};

//db.addUser("k@k.com", `123`, (data) => console.log(data));
//db.checkForAUser("k@k.com", `123`, (data) => console.log(data));

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
