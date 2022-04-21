const express = require("express");
const https = require("https");

const app = express();
const port = 3000;

const apiKey = "1e9818ae313ea600494097a9b264dd1d";
const apiURLGeoLocation = "https://api.openweathermap.org/geo/1.0/direct";
const apiWeather = "https://api.openweathermap.org/data/2.5/weather";
const apiUnits = "metric";

let temperature;
let windSpeed;
let humidity;
let weather;

//Serve static files
app.use(express.static("public"));

//The root of the app
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/src/index.html");
});

//Weather route for the app,
app.get("/weather", (reqExpress, resExpress) => {
  //Use HTTPSget to get the weather data from the API.
  //First get the location data from the API, then get the weather data from the API.
  //All inside the first HTTPSget method.

  https.get(
    `${apiURLGeoLocation}?appid=${apiKey}&limit=1&q=${reqExpress.query.LocName}`,
    (resHTTPS) => {
      resHTTPS
        .on("data", (data) => {
          let parsedData = JSON.parse(data);
          //? Strip down the data to lon and lat, and call the callback with it.
          parsedData = { lat: parsedData[0].lat, lon: parsedData[0].lon };
          // callBack(parsedData);
          let latitude = parsedData.lat;
          let longitude = parsedData.lon;
          https.get(
            `${apiWeather}?lat=${latitude}&lon=${longitude}&units=${apiUnits}&appid=${apiKey}`,
            (resHTTPS2) => {
              resHTTPS2.on("data", (data) => {
                let parsedData = JSON.parse(data);
                console.log(parsedData);
                temperature = parsedData.main.temp;
                windSpeed = parsedData.wind.speed;
                humidity = parsedData.main.humidity;
                weather = parsedData.weather[0].description;
                let JSONdata = {
                  temperature: temperature,
                  windSpeed: windSpeed,
                  humidity: humidity,
                  weather: weather,
                };
                JSON.stringify(JSONdata);
                resExpress.send(JSONdata);
                console.log("Finished sending data");
              });
            }
          );
        })
        .on("error", (err) => {
          console.log(`Error: ${err}`);
        });
    }
  );
});

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});

function getWeatherDetails(locName, callBack) {
  //? Use HTTPSget to get the longitude and latitude of the location,
  //? which is a get param passed to this function.
}

//? This function is serving as a callback function inside the getLocationDetails function.
function getWeather(dataFromGeoLocation) {}
