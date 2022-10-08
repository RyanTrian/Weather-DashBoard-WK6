// Global variables
var APIkey = "&appid=55646f4610124c7421dc7f636430ed78";
var searchInput = $("#search-input");
var submitBtn = $("#submit-btn");
var citiesList = $(".previous-cities");
var todayContainer = $("#today-container");
var currentWeather = $(".current-weather");
var forecast5 = $(".five-days");

//
function curentConditions(coord) {
  let lat = coord[0].lat.toString();
  let lon = coord[0].lon.toString();
  let currentWeatherAPI = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}${APIkey}`;

  fetch(currentWeatherAPI)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      var city = data.name;
      var date = moment().format(" MM/DD/YYYY");
      var weathericon = data.weather[0].icon;
      var urlicon = "http://openweathermap.org/img/w/" + weathericon + ".png";
      var cityname = $("<h3>").html(city + date);
      todayContainer.addClass("card");
      currentWeather.addClass("card-body");
      currentWeather.append(cityname);
      currentWeather.append($("<img>").attr("src", urlicon));
      var temp = Math.ceil(data.main.temp);
      currentWeather.append($("<p>").html("Temperature: " + temp + " &#8457"));
      var feelsliketemp = Math.ceil(data.main.feels_like);
      currentWeather.append(
        $("<p>").html("Feels Like: " + feelsliketemp + " &#8457")
      );
      var humidity = data.main.humidity + "&#37;";
      currentWeather.append($("<p>").html("Humidity: " + humidity));
      var windspeed = data.wind.speed;
      currentWeather.append($("<p>").html("Wind Speed: " + windspeed + " MPH"));
    });
}
function futureConditions(coord) {
  let lat = coord[0].lat.toString();
  let lon = coord[0].lon.toString();
  let forecastAPI = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}${APIkey}`;

  fetch(forecastAPI)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
    });
}

function showWeather() {
  // get the city's name, store it in a variable
  let cityName = searchInput.val();
  searchInput.val("");
  // fetch lat and lon
  let geoCodingAPI =
    "http://api.openweathermap.org/geo/1.0/direct?q=" + cityName + APIkey;

  fetch(geoCodingAPI)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      curentConditions(data);
      futureConditions(data);
    });
}

submitBtn.on("click", showWeather);
