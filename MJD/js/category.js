(function() {
  function touchScroll(){ 
    var left = document.querySelector('.left');
    var ul = left.querySelector('ul');
    var minTop = left.offsetHeight - ul.offsetHeight;
    var startY = 0;
    var moveY = 0;
    var distanceY = 0;
    var currentY = 0
    //touchstart
    // 记录开始触屏的位置
    left.addEventListener('touchstart', function(e) {
      startY = e.targetTouches[0].clientY;
    }, false);
    //touchmove
    left.addEventListener('touchmove', function(e) {
      moveY = e.targetTouches[0].clientY;
      distanceY = moveY - startY;
      ul.style.transition = 'none';
      ul.style.transform = 'translateY('+ ( currentY + distanceY ) +'px)';
    }, false);
    //touchend
    left.addEventListener('touchend', function() {
      currentY += distanceY;
      if( currentY < minTop ) {
        currentY = minTop;
      }
      if( currentY > 0 ) {
        currentY = 0;
      }
      ul.style.transition = "transform 0.3s";
      ul.style.transform = 'translateY('+ currentY +'px)';
      startY = 0;
      moveY = 0;
      distanceY = 0;
    }, false);
  }


    var myScroll = new IScroll('.right');

  touchScroll();
})();