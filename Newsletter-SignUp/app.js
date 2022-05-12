const express = require("express");
//Body parser is not needed, because Express is already doing it
//const bodyParser = require("body-parser");

const app = express();
const port = 3000;
const { mailchimpListQueries } = require("./mailchimp_api.js");

//app.use(bodyParser.urlencoded({ extended: true }));
//Converts the form data into JSON
app.use(express.json());
//Make the sever accept requests even if the content type is not a string
app.use(express.urlencoded({ extended: true }));
//Serve static files
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", (req, res) => {
  console.log(req.body);

  let fName = req.body.firstName;
  let lName = req.body.lastName;
  let pNumber = req.body.phoneNumber;
  let bDay = req.body.birthday;
  let eAddress = req.body.email;

  mailchimpListQueries
    .addMemberToList(fName, lName, pNumber, bDay, eAddress)
    .then((response) => {
      if (response.id) {
        res.sendFile(__dirname + "/success.html");
      } else {
        //res.send("Error" + "\n" + JSON.stringify(response));
        res.sendFile(__dirname + "/failure.html");
        console.log(response);
      }
    });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
