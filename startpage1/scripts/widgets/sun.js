
async function setSunset() {
  const sunset = document.querySelector('#info wrapper.grid widget[widgetid="sun"] .items .widget-text[type="normal"]:nth-child(1)');
  function sunsetTime(position) {
    var times = SunCalc.getTimes(new Date(), position.coords.latitude, position.coords.longitude);
    var hours = times.sunset.getHours() ;
    var AmOrPm = hours >= 12 ? 'pm' : 'am';
    hours = (hours % 12) || 12;
    var minutes = ("0" + times.sunset.getMinutes()).slice(-2) ;
    var finalTime = "Sunset today at " + hours + ":" + minutes + " " + AmOrPm;
    sunset.innerHTML = finalTime;
    setSunrise();
  }
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(sunsetTime);
  } else {
    sunset.innerHTML = "Geolocation is not supported by this browser.";
  }
}

function setSunrise() {
  const sunrise = document.querySelector('#info wrapper.grid widget[widgetid="sun"] .items .widget-text[type="normal"]:nth-child(2)');
  function sunriseTime(position) {
    var times = SunCalc.getTimes(new Date(), position.coords.latitude, position.coords.longitude);
    var hours = times.sunrise.getHours() ;
    var AmOrPm = hours >= 12 ? 'pm' : 'am';
    hours = (hours % 12) || 12;
    var minutes = ("0" + times.sunrise.getMinutes()).slice(-2) ;
    var finalTime = "Sunrise today at " + hours + ":" + minutes + " " + AmOrPm;
    sunrise.innerHTML = finalTime;
  }
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(sunriseTime);
  } else {
    sunrise.innerHTML = "Geolocation is not supported by this browser.";
  }
}
setSunset();



