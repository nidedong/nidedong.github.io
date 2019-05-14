(function() {
  document.querySelector(".jd-banner ul").style.height = getHeaderHeight() + 'px';
  window.addEventListener("resize", function() {
    document.querySelector(".jd-banner ul").style.height = getHeaderHeight() + 'px';
  }, false);
  // 秒杀
  downTime();
  //变色
  setHeader();
  //快报
  news();
  //轮播图
  banner();

  function downTime() {
    var hour = document.querySelector(".jd-seckill .hour");
    var minite = document.querySelector(".jd-seckill .minite");
    var second = document.querySelector(".jd-seckill .second");
    var t = 5 * 60 * 60;
    setInterval(function() {
      var h = Math.floor( t / 3600 );
      var m = Math.floor( t % 3600 / 60);
      var s = t % 60;
      h = h < 10 ? '0' + h : h;
      m = m < 10 ? '0' + m : m;
      s = s < 10 ? '0' + s : s;
      hour.innerText = h;
      minite.innerText = m;
      second.innerText = s;
      t--;
    }, 1000)
    
  }

  function setHeader() {
    window.addEventListener('scroll', function(e) {
      var scroll = document.documentElement.scrollTop;
      var height = document.querySelector(".jd-banner").offsetHeight;
      var value = scroll / height;
      if( value > 1 ) {
        value = 1;
      }
      document.querySelector(".jd-header").style.backgroundColor = "rgba(222, 24, 27, " + value + ")";

    }, false)
  }

  function news() {
    var ul = document.querySelector(".jd-news .content");
    var lis =  document.querySelectorAll(".jd-news .content li")
    var index = 0;
    setInterval(function() {
      ul.style.transition = "all 0.5s";
      index ++;
      ul.style.transform = "translateY(" + (-index * 30) + "px)";
    }, 2000);
    ul.addEventListener("transitionend", function() {
      if(index >= lis.length - 1) {
        index = 0; 
        ul.style.transition = "none";
        ul.style.transform = "translateY(0)";
      }
    }, false)
  }

  //定位轮播图

  function banner() {
    var banner = document.querySelector('.jd-banner');
    var width = banner.offsetWidth;
    var lis = banner.querySelectorAll('.jd-banner ul li');
    var olis = document.querySelectorAll(".jd-banner ol li");
    var length = lis.length - 1;
    var index = 0;
    var prev = length;
    var next = 1;
    function setData() {
      index = index > length ? 0 : index;
      index = index < 0 ? length : index;
      prev = index - 1;
      next = index + 1;
      prev = prev < 0 ? length : prev;
      next = next > length ? 0 : next;

    }
    function startBanner() {
        // lis[prev].style.transform = 'translateX()'
        index ++;
        setData();
        lis[index].style.transition = 'transform 0.3s';
        lis[prev].style.transition = 'transform 0.3s';
        lis[next].style.transition = 'none';
  
        lis[index].style.transform = 'translateX(0)';
        lis[prev].style.transform = 'translateX('+ (-width) +'px)';
        lis[next].style.transform = 'translateX('+ width +'px)';
        setPoints(index);
    }
    var timer = setInterval(startBanner, 1000);

 
    var startX = 0;
    var moveX = 0;
    var distanceX = 0;

    banner.addEventListener('touchstart', function(e) {
      startX = e.targetTouches[0].clientX;
    }, false)

    banner.addEventListener('touchmove',function(e) {
      clearInterval( timer );
      moveX = e.targetTouches[0].clientX;
      distanceX = moveX - startX;
      console.log(distanceX)
      lis[index].style.transition = 'none';
      lis[prev].style.transition = 'none';
      lis[next].style.transition = 'none';

      lis[index].style.transform = 'translateX('+ distanceX +'px)';
      lis[prev].style.transform = 'translateX('+ (-width + distanceX) +'px)';
      lis[next].style.transform = 'translateX('+ (width + distanceX) +'px)';
    })

    banner.addEventListener('touchend', function() {
      var direction = '';
      if( Math.abs(distanceX) > width / 3 ) {
        if( distanceX > 0 ) {
          index --;
          direction = 'right';
        }
        if( distanceX < 0 ) {
          index ++;
          direction = 'left';
        }
        setData();
      } 

      lis[index].style.transition = 'transform 0.3s';
      lis[next].style.transition = direction == 'left' ? 'none' : 'transform 0.3s';
      lis[prev].style.transition = direction == 'right' ? 'none' : 'transform 0.3s';
      
      lis[index].style.transform = 'translateX(0)';
      lis[prev].style.transform = 'translateX('+ (-width) +'px)';
      lis[next].style.transform = 'translateX('+ width +'px)';
      setPoints(index);

      timer = setInterval(startBanner, 1000);
    })

    function setPoints( index ) {   //设置小圆点
      olis.forEach(function(v, i) {
        v.classList.remove("current");
      })
      olis[index].classList.add("current");
    }
  }


  //ul移动的轮播图
  // function banner() {
  //   var ul = document.querySelector(".jd-banner ul");
  //   var banner = document.querySelector(".jd-banner");
  //   var lis = document.querySelectorAll(".jd-banner ul li");
  //   var olis = document.querySelectorAll(".jd-banner ol li");
  //   var width = banner.offsetWidth;
  //   var index = 1;
  //   var startX = 0;
  //   var moveX = 0;
  //   var distanceX = 0;
  //   var timer = setInterval(function() {
  //     setBanner();
  //   }, 2000);

  //   var setBanner = function() {
  //     index ++;
  //     ul.style.transition = "transform 0.5s";
  //     ul.style.transform = "translateX(" + (-index * width) + "px)";
  //   }

  //   ul.addEventListener('transitionend', function() {
  //     if( index >= lis.length - 1 ) {
  //       index = 1;
  //     }
  //     if( index <= 0) {
  //       index = 8;
  //     }
  //     ul.style.transition = "none";
  //     ul.style.transform = "translateX(" + (-index * width) + "px)";
  //     setPoints( index );
  //   }, false)
  //   //touchstart
  //   //停止定时器，记录起始位置startX
  //   banner.addEventListener('touchstart', function(e) {
  //     clearInterval( timer );
  //     startX = e.targetTouches[0].clientX;
  //   }, false)
  //   //touchmove
  //   // 记录distanceX,ul随着distanceX进行移动
  //   banner.addEventListener('touchmove', function(e) {
  //     moveX = e.targetTouches[0].clientX;
  //     distanceX = moveX - startX;
  //     //移动之前移除过渡
  //     ul.style.transition = 'none';
  //     ul.style.transform = "translateX(" + (-index * width + distanceX) + "px)";
  //   }, false)
  //   //touchend
  //   // 判断distanceX，如果大于banner的三分之一，进行滑动，否则复原
  //   // 通过distanceX的正负判断滑动方向
  //   //开启定时器
  //   banner.addEventListener('touchend', function() {
  //     if( Math.abs( distanceX ) >= width / 3 ) {
  //       if( distanceX > 0 ) {
  //         index --;
  //       }else {
  //         index ++;
  //       }
  //     }

  //     //根据index进行移动
  //     ul.style.transition = "transform 0.5s";
  //     ul.style.transform = "translateX(" + (-index * width)+ "px)";

  //     startX = 0;
  //     moveX = 0;
  //     distanceX = 0;
  //     //开启定时器
  //     timer = setInterval(function() {
  //       setBanner();
  //     }, 2000);
  //   }, false)
  //   window.addEventListener('resize', function() {
  //     width = banner.offsetWidth;
  //     ul.style.transition = 'none';
  //     ul.style.transform = "translateX(" + (-index * width) + "px)";
  //   }, false);

  //   function setPoints( index ) {   //设置小圆点
  //     olis.forEach(function(v, i) {
  //       v.classList.remove("current");
  //     })
  //     olis[index-1].classList.add("current");
  //   }

    
  // }


  function getHeaderHeight() {
    return document.querySelector(".jd-banner ul img").offsetHeight;
  }
})();