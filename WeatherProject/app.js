const express = require("express");
const https = require("https");

const app = express();
const port = 3000;

//Serve static files
app.use(express.static("public"));

app.get("/", (req, res) => {
  // let urlOpenWeather =
  //   "https://api.openweathermap.org/data/2.5/weather?lat=6.698081&lon=-1.6230404&units=metric&appid=1e9818ae313ea600494097a9b264dd1d";
  // let weatherData;
  // https.get(urlOpenWeather, (httpRes) => {
  //   if (httpRes.statusCode !== 200) {
  //     res.send(httpRes.statusCode + ", thus " + httpRes.statusMessage);
  //     console.log(httpRes.statusCode + ", thus " + httpRes.statusMessage);
  //     return;
  //   }
  //   httpRes
  //     .on("data", (data) => {
  //       weatherData = JSON.parse(data);
  //       res.send(`<h3>City name: ${weatherData.name}</h3>
  //       <h3>Temperature: ${weatherData.main.temp}</h3>
  //       <h3>Description: ${weatherData.weather[0].description}</h3>
  //       <div>
  //         <img src="https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@4x.png">
  //       </div>`);
  //     })
  //     .on("error", (err) => {
  //       res.send(err.message);
  //     });
  // });
  res.sendFile(__dirname + "/src/index.html");
});

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
