$(function() {
  banner();
  setProductWidth();
  function banner() {
    var startX = 0;
    var moveX = 0;
    var distanceX = 0;
    $('.wjs-banner').on('touchstart', function(e) {
      $('.carousel').carousel('pause');
      startX = e.originalEvent.targetTouches[0].clientX;
    });

    $('.wjs-banner').on('touchmove', function(e) {
      moveX = e.originalEvent.targetTouches[0].clientX;
      distanceX = moveX - startX;
    });

    $('.wjs-banner').on('touchend', function() {
      if( distanceX > 0 ) {
        $('.carousel').carousel('prev');
      }
      if( distanceX < 0 ) {
        $('.carousel').carousel('next');
      }
      $('.carousel').carousel('cycle');
      startX = 0;
      moveX = 0;
      distanceX = 0;
    })
  }

  function setProductWidth() {
    var width = 0;
    $('.nav-product li').each(function( i, v ) {
      width += $(this).outerWidth();
    })
    $('.nav-product').width( width );
  }
})