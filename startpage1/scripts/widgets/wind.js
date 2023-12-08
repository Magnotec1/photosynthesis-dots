function getWeather() {
  let speed = document.querySelector('#info wrapper.grid widget[widgetid="wind"] .items .widget-text[type="normal"]:nth-of-type(1)')
  let direction = document.querySelector('#info wrapper.grid widget[widgetid="wind"] .items .widget-text[type="normal"]:nth-of-type(2)')
  let location = document.querySelector('#info wrapper.grid widget[widgetid="wind"] .items .widget-text[type="small"]:nth-of-type(3)')

  let api = "https://api.openweathermap.org/data/2.5/weather";
  let apiKey = openWeatherMap_key;

  location.innerHTML = "Locating...";

  navigator.geolocation.getCurrentPosition(success, error);

  function  toCompass(degree){
    if (degree>337.5) return 'N';
    if (degree>292.5) return 'NW';
    if(degree>247.5) return 'W';
    if(degree>202.5) return 'SW';
    if(degree>157.5) return 'S';
    if(degree>122.5) return 'SE';
    if(degree>67.5) return 'E';
    if(degree>22.5){return 'NE';}
    return 'N';
}

  function success(position) {
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;

    let url =
      api +
      "?lat=" +
      latitude +
      "&lon=" +
      longitude +
      "&appid=" +
      apiKey +
      "&units=metric"

    fetch(url)
      .then(response => response.json())
      .then(data => {
        location.innerHTML = "";
        speed.innerHTML = data.wind.speed + " km/h";
        direction.innerHTML = toCompass(data.wind.deg);
        location.innerHTML = "Location: " + data.name;
      });
  }

  function error() {
    location.innerHTML = "Unable to retrieve your location";
  }
}

getWeather();