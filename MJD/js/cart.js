(function() {
  function del() {
    var hide = document.querySelector('.win-hide');
    var box = hide.querySelector('.box');
    var dels = document.querySelectorAll('.del');
    var cancel = document.querySelector('.cancel');
    dels.forEach(function(v, i) {
      v.addEventListener('click', function() {
        v.classList.add('up');
        hide.style.display = 'block';
        box.classList.add('animated');
        box.classList.add('bounceInDown');
      })
    })
    cancel.addEventListener('click', function() {
      hide.style.display = 'none';
      document.querySelector('.up').classList.remove('up');
    
    })
  }

  del();
  
})();