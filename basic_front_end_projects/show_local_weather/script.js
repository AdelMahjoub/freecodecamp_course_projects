
$(document).ready(function(){
  //get position 
  $.getJSON("http://ip-api.com/json",function(location){
    var zipCode, countryCode, city, region; //location vars
    var temp, tempC, tempF, weatherDescription, wIcon; //meteo vars
      //vars for weather api 
      zipCode = location.zip;
      countryCode = location.countryCode.toLowerCase();
      //vars for user location
      region = location.regionName;
      city = location.city;
      $("#city").text(city);
      $("#region").text(region);
    //url for weather api
    var url = "http://api.openweathermap.org/data/2.5/weather?zip=" + zipCode + "," + countryCode + "&APPID=b5f06fdd593ddc956b56445f0bf57047";
    //get weather
    $.getJSON(url, function(data){
        //vars for meteo
        temp = data.main.temp;
        tempF = Math.floor((temp*9/5 - 459.67))+" °F";
        tempC = Math.floor((temp -  273.15))+ " °C";
        weatherDescription = data.weather[0].description;
        var icon = "wi wi-owm-" + data.weather[0].id;
        $("i").toggleClass(icon);
        $("#temp").text(tempC);
        $("#weatherDescription").text(weatherDescription);
        $("#temp").click(function(e){
            if($(this).text()==tempC) $(this).text(tempF);
            else $(this).text(tempC);
        });
    });
  });
  $("#date").text(Date());
});
