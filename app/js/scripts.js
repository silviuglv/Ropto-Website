/* When the user scrolls down, hide the navbar. When the user scrolls up, show the navbar */
var prevScrollpos = window.pageYOffset;
window.onscroll = function() {
    
    var currentScrollPos = window.pageYOffset;
    var wh = window.innerHeight;
    var hh = document.getElementById('header').clientHeight;
    var e = document.getElementById("header");
    
    
    if (prevScrollpos > currentScrollPos) {
        //scrolling down        
        if( e.classList.contains("scrolling-down") ){
            e.classList.remove("scrolling-down");
        }
    } else {
        
        //scrolling up
        if(currentScrollPos > (wh - hh)){
                if( !e.classList.contains("scrolling-down") ){
                e.classList.add("scrolling-down");
            }
            
        }
    }
    prevScrollpos = currentScrollPos;
}