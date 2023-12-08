document.addEventListener('contextmenu', e => e.preventDefault());
function jsUpdateSize(){
    // Get the dimensions of the viewport
    var height = window.innerHeight ||
                 document.documentElement.clientHeight ||
                 document.body.clientHeight;
    if (height < 600) {
        document.getElementById("main").style.marginTop = "30px";   
        document.getElementById("settings").style.marginTop = "30px";   
        document.querySelector("#info").style.display = "none";
        document.querySelector("#info > wrapper.border").style.display = "none";         
    }
    else {
        document.getElementById("main").style.marginTop = "30vh";   
        document.getElementById("settings").style.marginTop = "30vh"; 
        document.querySelector("#info").style.display = "unset";    
        document.querySelector("#info > wrapper.border").style.display = "unset";    
    }
};
window.onload = jsUpdateSize;       // When the page first loads
window.onresize = jsUpdateSize;     // When the browser changes size
targetFPS = 144
function reveal() {
    var reveals = document.querySelectorAll("*[anim=\"reveal-y1\"");
    for (var i = 0; i < reveals.length; i++) {
      var windowHeight = window.innerHeight;
      var elementTop = reveals[i].getBoundingClientRect().top;
      var elementVisible = 0;
      if (elementTop < windowHeight - elementVisible) {
        reveals[i].classList.add("active");
      } else {
        reveals[i].classList.remove("active");
      }
    }
    length = document.documentElement.scrollTop
    if (length > 100) {
      var element = document.createElement('style'),
	    sheet;
      document.head.appendChild(element);
      sheet = element.sheet;
      var styles = '#info > wrapper.arrow > .icon {';
      styles += 'transform: rotateX(180deg);';
      styles += '}';
      sheet.insertRule(styles, 0);
    } else {
      var element = document.createElement('style'),
	    sheet;
      document.head.appendChild(element);
      sheet = element.sheet;
      var styles = '#info > wrapper.arrow > .icon {';
      styles += 'transform: rotateX(0deg);';
      styles += '}';
      sheet.insertRule(styles, 0);
    }
  }
window.addEventListener("scroll", reveal);
reveal();
function scrollBottom() {
  length = document.documentElement.scrollTop 
  if (length > 100) {
    window.scrollTo({ left: 0, top: 0, behavior: "smooth" });
  } else {
    window.scrollTo({ left: 0, top: document.documentElement.scrollHeight, behavior: "smooth" });
  }
}
class ShapeOverlays {
  constructor(elm) {
    this.elm = elm;
    this.path = elm.querySelectorAll('path');
    this.numPoints = 18;
    this.duration = 600;
    this.delayPointsArray = [];
    this.delayPointsMax = 300;
    this.delayPerPath = 100;
    this.timeStart = Date.now();
    this.isOpened = false;
    this.isAnimating = false;
  }
  toggle() {
    this.isAnimating = true;
    const range = 4 * Math.random() + 6;
    for (var i = 0; i < this.numPoints; i++) {
      const radian = i / (this.numPoints - 1) * Math.PI;
      this.delayPointsArray[i] = (Math.sin(-radian) + Math.sin(-radian * range) + 2) / 4 * this.delayPointsMax;
    }
    if (this.isOpened === false) {
      this.open();
    } else {
      this.close();
    }
  }
  open() {
    this.isOpened = true;
    this.elm.classList.add('is-opened');
    this.timeStart = Date.now();
    this.renderLoop();
  }
  close() {
    this.isOpened = false;
    this.elm.classList.remove('is-opened');
    this.timeStart = Date.now();
    this.renderLoop();
  }
  updatePath(time) {
    const points = [];
    for (var i = 0; i < this.numPoints + 1; i++) {
      points[i] = ease.cubicInOut(Math.min(Math.max(time - this.delayPointsArray[i], 0) / this.duration, 1)) * 100
    }

    let str = '';
    str += (this.isOpened) ? `M 0 0 V ${points[0]} ` : `M 0 ${points[0]} `;
    for (var i = 0; i < this.numPoints - 1; i++) {
      const p = (i + 1) / (this.numPoints - 1) * 100;
      const cp = p - (1 / (this.numPoints - 1) * 100) / 2;
      str += `C ${cp} ${points[i]} ${cp} ${points[i + 1]} ${p} ${points[i + 1]} `;
    }
    str += (this.isOpened) ? `V 0 H 0` : `V 100 H 0`;
    return str;
  }
  render() {
    if (this.isOpened) {
      for (var i = 0; i < this.path.length; i++) {
        this.path[i].setAttribute('d', this.updatePath(Date.now() - (this.timeStart + this.delayPerPath * i)));
      }
    } else {
      for (var i = 0; i < this.path.length; i++) {
        this.path[i].setAttribute('d', this.updatePath(Date.now() - (this.timeStart + this.delayPerPath * (this.path.length - i - 1))));
      }
    }
  }
  renderLoop() {
    this.render();
    if (Date.now() - this.timeStart < this.duration + this.delayPerPath * (this.path.length - 1) + this.delayPointsMax) {
      setTimeout(() => {  
        requestAnimationFrame(() => {
          this.renderLoop();
        });
      }, 1000 / targetFPS);
    }
    else {
      this.isAnimating = false;
    }
  }
}

const gNavItems = document.querySelectorAll('.global-menu__item');
const elmOverlay = document.querySelector('.shape-overlays');
const overlay = new ShapeOverlays(elmOverlay);
setTimeout(() => {  
  reveal();
}, 300);