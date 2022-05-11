function getWeather() {
  console.log("IndexJS getWeather message: " + $("#search-box").val());
  //
  fetch(`/weather?LocName=${$("#search-box").val()}`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      $("#locationDP").html(`${$("#search-box").val()}`);
      $("#bigTempDP").html(`${data.temperature}<sup>oc</sup>`);
      $("#smallTempDP").html(`${data.temperature}<sup>oc</sup>`);
      $("#smallWindSpeedDP").html(`${data.windSpeed}m/s`);
      $("#smallHumidityDP").html(`${data.humidity}%`);
      $("#smallWeatherDP").html(`${data.weather}`);
    });
}
