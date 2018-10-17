var menuScrolling = false;
var targetID, currentScrollPos;

/* SCROLL MENU */

var prevScrollpos = $(document).scrollTop();

$(document).scroll( function(){
  currentScrollPos = $(document).scrollTop();
  var headerHeight = $("#banner").outerHeight();

  if( (prevScrollpos < currentScrollPos) && (currentScrollPos > headerHeight) && (menuScrolling == false)){
    $("#header").addClass( "hidden" );
  } else {
    $("#header").removeClass( "hidden" );
  }
  prevScrollpos = currentScrollPos;
});

/* NAV BUTTON */

$( "#nav-button" ).click(function() {
  if( (!$("#menu").hasClass("visible")) ){
    $("#menu").addClass( "visible" );
    $("body").addClass( "no-scroll" );
    $("#header").addClass( "menu-open" );
    $("#menu-burger").addClass( "active" );
  } else {
    $("#menu").removeClass( "visible" );
    $("body").removeClass( "no-scroll" );
    $("#header").removeClass( "menu-open" );
    $("#menu-burger").removeClass( "active" );
  }
});


/* MENU LINK CLICK */

$( ".scroll-link" ).click(function(e) {

  e.preventDefault();

  $("#header").removeClass( "menu-open" );
  $("#menu-burger").removeClass( "active" );
  $("#menu").toggleClass( "visible" );
  $("body").removeClass( "no-scroll" );

  menuScrolling = true;
  targetID = $(this).attr('href');

  $('body,html').animate({
      scrollTop: $(targetID).offset().top - 20
  }, 800);

  //KEEP NAV VISIBLE AFTER LINK CLICKED
  setTimeout(function(){
    menuScrolling = false;
  }, 1000);
});

$('#logo').click(function (e) {
    e.preventDefault();
    $('body,html').animate({
        scrollTop: 0
    }, 800);
});
