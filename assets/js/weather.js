

var citynameEl = document.querySelector("#city-name");
var cityEl = document.querySelector("#city");
var WeatherDataEl = document.querySelector("#Weather-Data");
var apiKey= "19f9a5de8a62ba08782b016182d48161"
var citysubmitEl = document.querySelector("#city-submit")
var weatherData = document.querySelector("#Weather-Data")
var cityArr = [] // this is for the local storage 



var getWeather = function(city){

  cityArr = JSON.parse(localStorage.getItem("previousCities"));

  if (!localStorage.getItem("previousCities")){
      cityArr = []
  }

  



  fetch("https://api.openweathermap.org/data/2.5/forecast?q="+city+"&unit=imperial&appid=" + apiKey)
  .then(function(response){
    return response.json()
  })
  .then(function(data){
    console.log(data)
    var lat = data.city.coord.lat;
    var lon = data.city.coord.lon;
  
    var apiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat="+lat+"&lon="+lon+"&appid="+apiKey

    
  
  
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
    currentWind.textContent = "windspeed: " + wind_speed + "MPH"
    weatherData.appendChild(currentWind)


    console.log(humidity,uvi,temp,wind_speed)

    var apiUrl = "https://api.openweathermap.org/data/2.5/forecast?q="+city+"&unit=imperial&appid=" + apiKey
    fetch(apiUrl).then(function(response){

      response.json().then(function(data){
        console.log("5 Day", data)
        
        //5-day forecast 

        var dayOneData = data.list[1]
        var dayTwoData= data.list[9]
        var dayThreeData = data.list[17]
        var dayFourData = data.list[25]
        var dayFiveData = data.list[33]
        
        document.querySelector("#day1-icon").setAttribute("src", "http://openweathermap.org/img/wn/" + dayOneData.weather[0].icon + ".png" )
        document.querySelector("#day2-icon").setAttribute("src", "http://openweathermap.org/img/wn/" + dayTwoData.weather[0].icon + ".png" )
        document.querySelector("#day3-icon").setAttribute("src", "http://openweathermap.org/img/wn/" + dayThreeData.weather[0].icon + ".png" )
        document.querySelector("#day4-icon").setAttribute("src", "http://openweathermap.org/img/wn/" + dayFourData.weather[0].icon + ".png" )
        document.querySelector("#day5-icon").setAttribute("src", "http://openweathermap.org/img/wn/" + dayFiveData.weather[0].icon + ".png" )

        document.querySelector("#day1-date").textContent = (new Date(dayOneData.dt * 1000)).toLocaleDateString()
        document.querySelector("#day1-temp").textContent = "temp:" + Math.floor((parseInt(dayOneData.main.temp)-273.15) * 9 / 5 + 32) + " F";
        document.querySelector("#day1-hum").textContent = "humidity:" + dayOneData.main.humidity + "%";

        document.querySelector("#day2-date").textContent = (new Date(dayTwoData.dt * 1000)).toLocaleDateString()
        document.querySelector("#day2-temp").textContent = "temp:" + Math.floor((parseInt(dayTwoData.main.temp)-273.15) * 9 / 5 + 32) + " F";
        document.querySelector("#day2-hum").textContent = "humidity:" + dayTwoData.main.humidity + "%";

        document.querySelector("#day3-date").textContent = (new Date(dayThreeData.dt * 1000)).toLocaleDateString()
        document.querySelector("#day3-temp").textContent = "temp:" + Math.floor((parseInt(dayThreeData.main.temp)-273.15) * 9 / 5 + 32) + " F";
        document.querySelector("#day3-hum").textContent = "humidity:" + dayThreeData.main.humidity + "%";

        document.querySelector("#day4-date").textContent = (new Date(dayFourData.dt * 1000)).toLocaleDateString()
        document.querySelector("#day4-temp").textContent = "temp:" + Math.floor((parseInt(dayFourData.main.temp)-273.15) * 9 / 5 + 32) + " F";
        document.querySelector("#day4-hum").textContent = "humidity:" + dayFourData.main.humidity + "%";

        document.querySelector("#day5-date").textContent = (new Date(dayFiveData.dt * 1000)).toLocaleDateString()
        document.querySelector("#day5-temp").textContent = "temp:" + Math.floor((parseInt(dayFiveData.main.temp)-273.15) * 9 / 5 + 32) + " F";
        document.querySelector("#day5-hum").textContent = "humidity:" + dayFiveData.main.humidity + "%";

         
         

      })
    })
    
    
  })
}



      





citysubmitEl.addEventListener("click", function(event){
  event.preventDefault();
  console.log("click")
  var city = cityEl.value.trim();
  getWeather(city)
  

  

})
