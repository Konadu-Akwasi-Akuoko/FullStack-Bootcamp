const express = require("express");
const https = require("https");
const { resolve } = require("path");

const app = express();
const port = 5000;

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

app.get("/weather", (reqExpress, resExpress) => {
  let locName = reqExpress.query.LocName;
  console.log(locName);
  //Although we are using async/await, we still need to use the .then() method
  getLocationDetails(locName).then(([lat, lon]) => {
    getWeatherDetails(lat, lon).then((JSONdata) => {
      resExpress.send(JSONdata);
    });
  });
});

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});

//! Async functions - NB: async functions returns a promise
async function getLocationDetails(locName) {
  //Get location details, so that await can be used to wait for the promise
  //to resolve and we can return the data as a promise
  let locationDetails = new Promise((resolve, reject) => {
    https.get(
      `${apiURLGeoLocation}?appid=${apiKey}&limit=1&q=${locName}`,
      (resHTTPS) => {
        resHTTPS
          .on("data", (data) => {
            let parsedData = JSON.parse(data);
            console.log(parsedData);
            //Sometimes it responds with data even when the query is unsuccessful
            //Check to see if the code is 200 or not
            if (parsedData.cod && parsedData.cod !== 200) {
              console.log(
                "caught the error, with a message: " + parsedData.cod
              );
              return reject(Error(parsedData.cod));
            }
            let [lat, lon] = [parsedData[0].lat, parsedData[0].lon];
            console.log(`The Latitude is ${lat} and the longitude is ${lon}`);
            //Resolve the promise with lat and lon as array destructuring
            resolve([lat, lon]);
          })
          .on("error", (err) => {
            return reject(Error(err));
          });
      }
    );
  });
  let results = await locationDetails;
  return results;
}

async function getWeatherDetails(lat, lon) {
  //Get weather details with a promise, so that await can be used
  //to wait for the promise to resolve and return the data
  let weatherDetails = new Promise((resolve, reject) => {
    console.log(`The Latitude is ${lat} and the longitude is ${lon} --------`);
    https.get(
      `${apiWeather}?appid=${apiKey}&lat=${lat}&lon=${lon}&units=${apiUnits}`,
      (resHTTPS) => {
        resHTTPS
          .on("data", (data) => {
            let parsedData = JSON.parse(data);
            console.log(parsedData);
            //Sometimes it responds with data even when the query is unsuccessful
            //Check to see if the code is 200 or not
            if (parsedData.cod && parsedData.cod !== 200) {
              console.log(
                "caught the error, with a message: " + parsedData.cod
              );
              return reject(Error(parsedData.cod));
            }
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
            //Resolve with a JSON data object
            resolve(JSONdata);
          })
          .on("error", (err) => {
            return reject(Error(err));
          });
      }
    );
  });
  let results = await weatherDetails;
  return results;
}
