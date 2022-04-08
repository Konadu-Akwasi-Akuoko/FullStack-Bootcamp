const express = require("express");
const bodyParser = require("body-parser");
const { path } = require("express/lib/application");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
const port = 3000;

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.get("/bmicalculator", (req, res) => {
  res.sendFile(__dirname + "/bmiCalculator.html");
});

app.post("/", (req, res) => {
  let [num1, num2] = [Number(req.body.num1), Number(req.body.num2)];
  res.send(`The sum of ${num1} and ${num2} is ${num1 + num2}`);
});

app.post("/bmicalculator", (req, res) => {
  let [height, weight] = [
    Number(req.body.heightVal),
    Number(req.body.weightVal),
  ];
  //Calculate BMI
  console.log(height, weight);
  console.log(height * height);
  let bmi = weight / Math.pow(height, 2);
  res.send(`<h1>Your body mass index is ${bmi}</h1>`);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
