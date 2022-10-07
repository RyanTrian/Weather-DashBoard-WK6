// Global variables
var APIkey = "&appid=55646f4610124c7421dc7f636430ed78";
var searchInput = $("#search-input");
var submitBtn = $("#submit-btn");
var citiesList = $(".previous-cities");
var currentWeather = $(".current-weather");
var forecast5 = $(".five-days");

//
function curentConditions(data) {
    let lat = data[0].lat;
    let lon = data[0].lon;
    
    
  }
function futureConditions(data) {
  
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
