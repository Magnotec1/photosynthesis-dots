function getWeather() {
  let temperature = document.querySelector('#info wrapper.grid widget[widgetid="weather"] .items .widget-text[type="normal"]:nth-of-type(1)')
  let description = document.querySelector('#info wrapper.grid widget[widgetid="weather"] .items .widget-text[type="normal"]:nth-of-type(2)')
  let location = document.querySelector('#info wrapper.grid widget[widgetid="weather"] .items .widget-text[type="small"]:nth-of-type(3)');
  const sungeolocation = document.querySelector('#info wrapper.grid widget[widgetid="sun"] .items .widget-text[type="small"]:nth-of-type(3)')

  let api = "https://api.openweathermap.org/data/2.5/weather";
  let apiKey = openWeatherMap_key;

  location.innerHTML = "Locating...";

  navigator.geolocation.getCurrentPosition(success, error);

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
      "&units=metric";

    fetch(url)
      .then(response => response.json())
      .then(data => {
        let temp = data.main.temp;
        location.innerHTML = "";
        temperature.innerHTML = temp + "°C";
        description.innerHTML = data.weather[0].description.replace(/(^\w|\s\w)/g, m => m.toUpperCase());
        location.innerHTML = "Location: " + data.name;
        sungeolocation.innerHTML = "Location: " + data.name;
      });
  }

  function error() {
    location.innerHTML = "Unable to retrieve your location";
  }
}

getWeather();