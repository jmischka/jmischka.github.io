$(function(){

  function setHeight() {
    var windowHeight = $(window).innerHeight();
    $('.full-image').css('min-height', windowHeight);
    $('#wrapper').css('margin-top', windowHeight);
  };
  setHeight();

  function setContainer(){
    containerHeight = $('#image-container').find('div.current').innerHeight();
    $('#image-container').css('height', containerHeight);
  }
  setContainer();

  $(window).resize(function() {
    setHeight();
    setDistance();
    setContainer();
  });

// IMAGE FADE //////////////////////////////////////////

  var distance1,
      distance2;

  function setDistance() {
    distance1 = $('.fade-1').offset().top;
    distance2 = $('.fade-2').offset().top;
  }
  setDistance();

  $(window).on('scroll', function(){
    var windowHeight = $(window).height();
    if($(window).scrollTop() > (distance1 - windowHeight) + 100) {
      $('.fade-1').animate({'opacity':'1'}, 750);
    }
    if($(window).scrollTop() > (distance2 - windowHeight) + 200) {
      $('.fade-2').animate({'opacity':'1'}, 750);
    }
  })

// IMAGE CAROUSEL ///////////////////////////////////

  var imageLength = $('#image-container').find('div').length;
  var activeImage = 0;

  $('#image-container').find('div:eq(' + activeImage + ')').addClass('current').show();

  $('#clicker').find('i.next').on('click', function(){
    activeImage += 1;
    if(activeImage < imageLength){
      $('#image-container').find('div.current').removeClass('current').fadeOut(500);
      $('#image-container').find('div:eq(' + activeImage + ')').addClass('current').fadeIn(1000);
    } else {
      activeImage = 0;
      $('#image-container').find('div.current').removeClass('current').fadeOut(500);
      $('#image-container').find('div:eq(' + activeImage + ')').addClass('current').fadeIn(1000);
    }
  })

  $('#clicker').find('i.previous').on('click', function(){
    activeImage -= 1;
    if(activeImage >= 0){
      $('#image-container').find('div.current').removeClass('current').fadeOut(500);
      $('#image-container').find('div:eq(' + activeImage + ')').addClass('current').fadeIn(1000);
    } else {
      activeImage = imageLength - 1;
      $('#image-container').find('div.current').removeClass('current').fadeOut(500);
      $('#image-container').find('div:eq(' + activeImage + ')').addClass('current').fadeIn(1000);
    }
  })

// BANNER /////////////////////////////////////////////

$(window).on('scroll', function(){
  var windowHeight = $(window).innerHeight();
  if($(window).scrollTop() > windowHeight) {
    $('#nav-banner').addClass('active');
    $('#nav-banner').slideDown(500);
  } else if ($(window).scrollTop() < windowHeight && $('#nav-banner').hasClass('active')) {
    $('#nav-banner').removeClass('active').slideUp(500)
  }
})

// IN BRIEF CLICKER ///////////////////////////////////

  $('#brief-hed').on('click', function(){
    if($(this).hasClass('active')){
      $(this).removeClass('active');
      $('#brief-text').slideUp(750);
      setDistance();
    } else {
      $(this).addClass('active');
      $('#brief-text').slideDown(750);
      setDistance();
    }
  })

})