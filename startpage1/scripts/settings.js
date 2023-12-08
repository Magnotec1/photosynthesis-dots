
settings = "off"
function toggleSettings() {
  if (settings == "on") {
    document.getElementById("settings").style.opacity = '0';
    setTimeout(() => {  
      document.getElementById("settings").style.display = 'none';
      settings = "off";
    }, 400);
  } else {
    document.getElementById("settings").style.display = 'block';
    setTimeout(() => {  
      document.getElementById("settings").style.opacity = '1';
      settings = "on";
    }, 100);
  }
}
function revealSettings() {
  document.querySelector("#settings > wrapper:nth-of-type(2)").style.opacity = '1';
  document.querySelector("#settings > wrapper:nth-of-type(3)").style.opacity = '0';
  document.querySelector("#settings > wrapper:nth-of-type(2)").style.pointerEvents = 'all';
  document.querySelector("#settings > wrapper:nth-of-type(3)").style.pointerEvents = 'none';
}
function revealAbout() {
  document.querySelector("#settings > wrapper:nth-of-type(2)").style.opacity = '0';
  document.querySelector("#settings > wrapper:nth-of-type(3)").style.opacity = '1';
  document.querySelector("#settings > wrapper:nth-of-type(2)").style.pointerEvents = 'none';
  document.querySelector("#settings > wrapper:nth-of-type(3)").style.pointerEvents = 'all';
}
lightmode = "off"
function toggleTheme() {
  if (lightmode == "on") {
    var element = document.createElement('style'),
	  sheet;
    document.head.appendChild(element);
    sheet = element.sheet;
    var styles = ':root {';
    styles += '--primary-bg: #0F110F;';
    styles += '--primary-fg: #FFFFFF;';
    styles += '--secondary-fg: #666666;';
    styles += '--secondary-bg: #151515;';
    styles += '--tertiary-bg: #0F0F0F;';
    styles += '--primary-fd: #FFFFFF55;';
    styles += '--primary-bd: #FFFFFF;';
    styles += '}';
    sheet.insertRule(styles, 0);
    lightmode = "off"
    icon = document.querySelector("#settings > widget:nth-of-type(1) > .icon")
    icon.innerHTML = "dark_mode"
    text = document.querySelector("#settings > widget:nth-of-type(1) > h2")
    text.innerHTML = "Dark"
    document.cookie = "theme=; expires=Thu, 01 Jan 1970 00:00:00 GMT;"
    document.cookie = "theme=dark"
  } else {
    var element = document.createElement('style'),
	  sheet;
    document.head.appendChild(element);
    sheet = element.sheet;
    var styles = ':root {';
    styles += '--primary-bg: #F0F0F0;';
    styles += '--primary-fg: #000000;';
    styles += '--secondary-fg: #1A1A1A;';
    styles += '--secondary-bg: #D0D0D0;';
    styles += '--tertiary-bg: #D9D9D9;';
    styles += '--primary-fd: #00000055;';
    styles += '--primary-bd: #000000;';
    styles += '}';
    sheet.insertRule(styles, 0);
    lightmode = "on"
    icon = document.querySelector("#settings > widget:nth-of-type(1) > .icon")
    icon.innerHTML = "light_mode"
    text = document.querySelector("#settings > widget:nth-of-type(1) > h2")
    text.innerHTML = "Light"
    document.cookie = "theme=; expires=Thu, 01 Jan 1970 00:00:00 GMT;"
    document.cookie = "theme=light"
  }
}
straight = "off"
function toggleRounded() {
  if (straight == "on") {
    var element = document.createElement('style'),
	  sheet;
    document.head.appendChild(element);
    sheet = element.sheet;
    var styles = ':root {';
    styles += '--wrapper-border-radius: 3em;';
    styles += '--widget-border-radius: 2em;';
    styles += '}';
    sheet.insertRule(styles, 0);
    straight = "off"
    icon = document.querySelector("#settings widget:nth-of-type(2) > .icon")
    icon.innerHTML = "rounded_corner"
    text = document.querySelector("#settings widget:nth-of-type(2) > h2")
    text.innerHTML = "On"
    document.cookie = "corner=; expires=Thu, 01 Jan 1970 00:00:00 GMT;"
    document.cookie = "corner=rounded"
  } else {
    var element = document.createElement('style'),
	  sheet;
    document.head.appendChild(element);
    sheet = element.sheet;
    var styles = ':root {';
    styles += '--wrapper-border-radius: 4px;';
    styles += '--widget-border-radius: 4px;';
    styles += '}';
    sheet.insertRule(styles, 0);
    straight = "on"
    icon = document.querySelector("#settings widget:nth-of-type(2) > .icon")
    icon.innerHTML = "select"
    text = document.querySelector("#settings widget:nth-of-type(2) > h2")
    text.innerHTML = "Off"
    document.cookie = "corner=; expires=Thu, 01 Jan 1970 00:00:00 GMT;"
    document.cookie = "corner=sharp"
  }
}
fps = "144"
function toggleFPS() {
  if (fps == "144") {
    var element = document.createElement('style'),
	  sheet;
    document.head.appendChild(element);
    sheet = element.sheet;
    targetFPS = 60
    fps = "60"
    icon = document.querySelector("#settings widget:nth-of-type(4) > .icon")
    icon.innerHTML = "schedule"
    text = document.querySelector("#settings widget:nth-of-type(4) > h2")
    text.innerHTML = "60"
    document.cookie = "fps=; expires=Thu, 01 Jan 1970 00:00:00 GMT;"
    document.cookie = "fps=60"
  } else {
    var element = document.createElement('style'),
	  sheet;
    document.head.appendChild(element);
    sheet = element.sheet;
    var styles = ':root {';
    styles += '--wrapper-border-radius: 4px;';
    styles += '--widget-border-radius: 4px;';
    styles += '}';
    targetFPS = "144"
    fps = "144"
    icon = document.querySelector("#settings widget:nth-of-type(4) > .icon")
    icon.innerHTML = "acute"
    text = document.querySelector("#settings widget:nth-of-type(4) > h2")
    text.innerHTML = "144"
    document.cookie = "fps=; expires=Thu, 01 Jan 1970 00:00:00 GMT;"
    document.cookie = "fps=144"
  }
}
function getCookie(cookie) {
  let rawCookie = cookie + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for(let i = 0; i <ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(rawCookie) == 0) {
      return c.substring(rawCookie.length, c.length);
    }
  }
  return "";
}
if (getCookie("theme") == "light") {
  toggleTheme()
}
if (getCookie("corner") == "sharp") {
  toggleRounded()
}
if (getCookie("fps") == "60") {
  toggleFPS()
}
layout = 0
function cycleLayout() {
  layout = layout + 1;
  console.log(layout)
  if (layout == 1) {
    tiledView()
  }
  if (layout == 2) {
    centeredView()
    layout = 0
  }
}