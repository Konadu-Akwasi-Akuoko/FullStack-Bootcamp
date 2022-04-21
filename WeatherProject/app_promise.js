const express = require("express");
const https = require("https");
const { resolve } = require("path");

const app = express();
const port = 4000;

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

//Weather route for the app.
app.get("/weather", (reqExpress, resExpress) => {
  //Call the getLocationDetails with a parameter, it would
  //return a promise and use the then method to call the other promises.
  getLocationDetails(reqExpress.query.LocName)
    .then(getWeatherDetails)
    .then((JSONdata) => {
      //Send the JSON data to the requested client
      resExpress.send(JSONdata);
      console.log(`Data sent.`);
    })
    .catch((err) => {
      console.log("Error message: " + err);
    });
});

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});

//Promises
function getLocationDetails(locName) {
  //Returns a new promise, resolve with the Lat & Lon when the query is successful
  return new Promise((resolve, reject) => {
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
            reject(err);
          });
      }
    );
  });
}

//Use .then method to call this function and it would receive 2 parameters
//from the previous promise, resolve when a successful operation is done
function getWeatherDetails([lat, lon]) {
  return new Promise((resolve, reject) => {
    https.get(
      `${apiWeather}?lat=${lat}&lon=${lon}&units=${apiUnits}&appid=${apiKey}`,
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
            reject(err);
          });
      }
    );
  });
}
