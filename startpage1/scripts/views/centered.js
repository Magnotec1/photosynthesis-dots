function centeredView() {
  overlay.toggle()
  setTimeout(() => {  
    view = 'styles/layouts/centered.css'
    var fileref = document.createElement("link");
    fileref.rel = "stylesheet";
    fileref.type = "text/css";
    fileref.href = view;
    document.head.appendChild(fileref)
    text = document.querySelector("#settings widget:nth-of-type(3) > h2")
    text.innerHTML = "Centered"
    icon = document.querySelector("#settings widget:nth-of-type(3) > .icon")
    icon.innerHTML = "view_day"
    overlay.toggle()
  }, 1000);
}