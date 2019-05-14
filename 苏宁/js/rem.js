(function() {
  setRem(750);

  window.onresize = function() {
    setRem(750);
  }
  function setRem(design) {
    var width = window.innerWidth;
    var fontSize = 0;
    if( width > 640 ) {
      width = 640;
    }
    if( width < 320 ) {
      width = 320;
    }
    fontSize = width / design * 100;
    console.log(fontSize)
    document.querySelector('html').style.fontSize = fontSize + 'px';
  }
}())