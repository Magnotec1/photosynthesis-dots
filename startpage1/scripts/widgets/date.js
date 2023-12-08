function getDate() {
  let date = document.querySelector('#info wrapper.grid widget[widgetid="date"] .items .widget-text[type="normal"]:nth-of-type(1)');
  let year = document.querySelector('#info wrapper.grid widget[widgetid="date"] .items .widget-text[type="normal"]:nth-of-type(2)');
  let season1 = document.querySelector('#info wrapper.grid widget[widgetid="date"] .items .widget-text[type="small"]:nth-of-type(3)');
  let currentdate = new Date()
  date.innerHTML = currentdate.toLocaleString("en-US", {month: "long"}) + " " + currentdate.getDate(); 
  year.innerHTML = currentdate.getFullYear();
  function getSeason() {
    var date = new Date();
    var month = (date.getMonth()+1).toString();
  
    var season = '';
    switch (month) {
      case '12':
      case '1':
      case '2':
        season = 'Winter';
        break;
      case '3':
      case '4':
      case '5':
        season = 'Spring';
        break;
      case '6':
      case '7':
      case '8':
        season = 'Summer';
        break;
      case '9':
      case '10':
      case '11':
        season = 'Fall';
        break;
    }
    season1.innerHTML = season;
  }
  getSeason();
}
getDate();