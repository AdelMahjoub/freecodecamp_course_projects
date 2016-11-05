window.onload = function(){
  /////////////////////////
  //show content functions
  /////////////////////////
  //panel-heading : city, country code 
  function city(weather){
    var city = document.getElementsByClassName('panel-title');
    city[0].innerHTML = weather.name + " , " + weather.sys.country;
  }
  //panel-body : weather icon
  function weatherIcon(weather){
    var icon = document.getElementById('icon').firstElementChild;
    icon.classList.add('wi-owm-' + weather.weather[0].id);
  }
  //panel-body : weather description
  function weatherDescription(weather){
    var main = document.getElementById('main').firstElementChild;
    main.innerHTML = weather.weather[0].main;
    var description = document.getElementById('description').firstElementChild;
    description.innerHTML = weather.weather[0].description;
  }
  //panel-body : weather temperature, click to change unit
  function temperature(weather){
    var temp = document.getElementById('temp').firstElementChild;
    temp.innerHTML = Math.round(weather.main.temp);
    function toFahrenheit(num){
        return Math.round(num*1.8+32);
    }
    temp.addEventListener('click', function(e){
        var celsius = weather.main.temp;
        var fahrenheit = toFahrenheit(celsius);
        if(this.innerHTML == celsius){
            this.innerHTML = fahrenheit;
            this.nextElementSibling.classList.remove("wi-celsius");
            this.nextElementSibling.classList.add("wi-fahrenheit");
        }else{
            this.innerHTML = celsius;
            this.nextElementSibling.classList.remove("wi-fahrenheit");
            this.nextElementSibling.classList.add("wi-celsius");
        }
    });
  }
  //panel-body : wind, direction, spped
  function wind(weather){
    var wind = document.getElementById('wind');
    wind.firstElementChild.classList.add('towards-' + weather.wind.deg + '-deg');
    wind.firstElementChild.nextElementSibling.innerHTML = Math.round(weather.wind.speed * 3.6) + " km/h";
  }
  //panel-footer : humidity
  function humidity(weather){
    var humidity = document.getElementById('humidity');
    humidity.lastElementChild.innerHTML = weather.main.humidity;
  }
  //panel-footer : sunrise time
  function sunrise(weather){
    var sunrise = document.getElementById('sunrise').lastElementChild;
    var sunriseTime = new Date(weather.sys.sunrise*1000);
    sunrise.innerHTML = sunriseTime.toLocaleTimeString({hours : "numeric", minutes : "numeric"});
  }
  //panel-footer : sunset-time
  function sunset(weather){
    var sunset = document.getElementById('sunset').lastElementChild;
    var sunsetTime = new Date(weather.sys.sunset*1000);
    sunset.innerHTML = sunsetTime.toLocaleTimeString({hours : "numeric", minutes : "numeric"});
  }
  //panel-body : local date
  function localDate(weather){
    var localTime = document.getElementById('local-time');
    var time = new Date();
    localTime.firstElementChild.innerHTML = time.toLocaleDateString();
  }
  /////////////////////////////
  //Get content functions
  ////////////////////////////
  //get geoloc position, callback function getWeather 
  if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(getWeather);
  }
  else console.log("geoloc not supported");
  //return a cross-browser XMLHttpeRequest object
  var getHttpRequest = function(){
    var httpRequest = false;
    if(window.XMLHttpRequest){
      httpRequest = new XMLHttpRequest();
      if(httpRequest.overrideMimeType){
        httpRequest.overrideMimeType('text/xml');
      }
    }
    else if (window.ActiveXObject) {
         try {
             httpRequest = new ActiveXObject("Msxml2.XMLHTTP");
         }
         catch (e) {
             try {
                 httpRequest = new ActiveXObject("Microsoft.XMLHTTP");
             }
             catch (e) {}
         }
     }
      if (!httpRequest) {
            alert('Abandon :( Impossible de créer une instance XMLHTTP');
            return false;
      }
    return httpRequest;
  } 
  //XMLHttpRequest object
  var httpRequest = getHttpRequest();
  //return openweather api url
  function makeUrl(lat, lon){
    var suffix = "https://crossorigin.me/"
    var entryPoint = "http://api.openweathermap.org/data/2.5/weather";
    var APPID = "8a805b404354a27fccf1f2d02c50077c";
    var query = "?lat=" + lat + "&lon=" + lon + "&units=metric" + "&APPID=" + APPID;
    return (suffix + entryPoint + query);
  }
  //Main function, http request
  function getWeather(position){
    httpRequest.open("GET", makeUrl(position.coords.latitude, position.coords.longitude));
    httpRequest.onreadystatechange = function(){
      if(httpRequest.readyState === 4 && httpRequest.status === 200){
        var weather = JSON.parse(this.response);
        city(weather);
        weatherIcon(weather);
        weatherDescription(weather);
        temperature(weather);
        wind(weather);
        humidity(weather);
        sunrise(weather);
        sunset(weather);
        localDate(weather);
      }
      else{
        return false;
      }
    }
    httpRequest.send();
  }
}
