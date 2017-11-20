var defaultPosition = "Brighton";

function getWeather() {
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
  } else {
    loadWeather(defaultPosition);
  }
}

function onError(error) {
  alert(error.message +  ". Will be set default Brighton location.");
  loadWeather(defaultPosition);
}

function onSuccess(position) {
  loadWeather(position.coords.latitude + ',' + position.coords.longitude); //tutaj wywołujemy loadWeather
}

function main() {
  getWeather();
  setInterval(getWeather, 1000000);
}

function loadWeather(location, woeid) {
  $.simpleWeather({
    location: location,
    woeid: woeid,
    unit: 'c',
    success: function (weather) {
      city = weather.city;
      temp = weather.temp + '&deg;';
      wcode = '<img class = "weathericon" src="images/weathericons/' + weather.code + '.svg">';
      wind = '<p>' + weather.wind.speed + '</p><p>' + weather.units.speed + '</p>';
      humidity = weather.humidity + ' %';

      $(".location").text(city);
      $(".temperature").html(temp);
      $(".climate_bg").html(wcode);
      $(".windspeed").html(wind);
      $(".humidity").text(humidity);
    },
    error: function (error) {
      $(".error").html('<p>' + error + '</p>');
    }
  });
}

$(main);
