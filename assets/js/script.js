// Global variables
var APIkey = "&appid=55646f4610124c7421dc7f636430ed78";
var searchInput = $("#search-input");
var submitBtn = $("#submit-btn");
var citiesList = $(".previous-cities");
var todayContainer = $("#today-container");
var currentWeather = $(".current-weather");
var forecast5 = $(".five-days");

//fetch data from current weather api, and display desired data on the page
function curentConditions(coord) {
  let lat = coord[0].lat.toString();
  let lon = coord[0].lon.toString();
  let currentWeatherAPI = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}${APIkey}`;
  
  /* function uvIndex () {
    let oneCallAPI = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly${APIkey}`;
    fetch(oneCallAPI)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        currentWeather.append($('<p>).html("UV Index: <span>" + data.current.uvi + "</span>" ));

        // UV index will appear green if <=2, yellow if 2< <=7, and red if >7
        if (data.current.uvi <= 2) {
          $("span").attr("class", "btn btn-success");
        } else if ( data.current.uvi > 2 && data.current.uvi <= 7) {
          $("span").attr("class", "btn btn-warning");
        } else {
          $("span").attr("class", "btn btn-danger");
        }
      })
  }
  */
  fetch(currentWeatherAPI)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      // city's name, and use moment to get the date
      var city = data.name;
      var date = moment().format(" MM/DD/YYYY");
      // weather condition icon
      var weathericon = data.weather[0].icon;
      var urlicon = "http://openweathermap.org/img/w/" + weathericon + ".png";
      var cityheader = $("<h2>").html(city + date);
      todayContainer.addClass("card");
      currentWeather.addClass("card-body");
      currentWeather.prepend(cityheader);
      currentWeather.append($("<img>").attr("src", urlicon));
      // temp, feels like, humidity, windspeed
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
      // can add a UVindex function here, but the OneCall API requires having a subcription to use.
      // Though it's free for 1000call/day, I don't like having my API key on Github.
      // EX(checkout the declared function). uvIndex();
    });
}

// fetch 5 days forecast api and display the next 5 days forecast onto the page
function futureConditions(coord) {
  let lat = coord[0].lat.toString();
  let lon = coord[0].lon.toString();
  let forecastAPI = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}${APIkey}`;

  fetch(forecastAPI)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      
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
