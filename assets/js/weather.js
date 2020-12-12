

var citynameEl = document.querySelector("#city-name");
var cityEl = document.querySelector("#city");
var WeatherDataEl = document.querySelector("#Weather-Data");
var apiKey= "19f9a5de8a62ba08782b016182d48161"
var citysubmitEl = document.querySelector("#city-submit")
var weatherData = document.querySelector("#Weather-Data")



var getWeather = function(city){

  fetch("http://api.openweathermap.org/data/2.5/forecast?q="+city+"&unit=imperial&appid=" + apiKey)
  .then(function(response){
    return response.json()
  })
  .then(function(data){
    console.log(data)
    var lat = data.city.coord.lat;
    var lon = data.city.coord.lon;
  
    var apiUrl ="https:api.openweathermap.org/data/2.5/onecall?lat="+lat+"&lon="+lon+"&appid="+apiKey
  
    
  
   return fetch(apiUrl)
  })
  .then(function(response){
    return response.json()
  })
  .then(function(data){
    console.log(data)
    var humidity = data.current.humidity;
    var uvi = data.current.uvi;
    var temp = data.current.temp;
    var wind_speed = data.current.wind_speed;

    var currentHum = document.createElement("p")
    currentHum.textContent = "humidty: " + humidity
    weatherData.appendChild(currentHum)

    var currentUvi = document.createElement("p")
    currentUvi.textContent = "uvi: " + uvi
    weatherData.appendChild(currentUvi)
    
    var currentTemp = document.createElement("P")
    currentTemp.textContent = "temperature: " + Math.floor((parseInt(temp) - 273.15) * 9 / 5 + 32) + " F"
    weatherData.appendChild(currentTemp)

    var currentWind = document.createElement("p")
    currentWind.textContent = "windspeed: " + wind_speed
    weatherData.appendChild(currentWind)


    console.log(humidity,uvi,temp,wind_speed)
  })
}


// var displayWeather = function(city, data){
//   console.log(city)
//   console.log(data)
//   var humidity = city + data.current.humidity;
// //     var uvi = data.current.uvi;
// //     var temp = data.current.temp;
// //     var wind_speed = data.current.wind_speed;
// // var weatherData = document.querySelector("#Weather-Data")
// // var dayOne = document.createElement("h6")
// // dayOne.textContent = "humidty" + humidity
// // weatherData.appendChild(dayOne)
// }

      





citysubmitEl.addEventListener("click", function(event){
  event.preventDefault();
  console.log("click")
  var city = cityEl.value.trim();
  getWeather(city)


})

// displayWeather()