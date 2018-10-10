/* TEXT TESTIMONIALS CAROUSEL */

/* GENERATE TESTIMONIAL ARRAY */

var testimonialsArray, tUl, i;

testimonialsArray =

      {
        "testimonials":[
            {
              "company":"The Claims Guys",
              "text":"To run a PPI claims business well requires an extremely high level of analytics. Working with Ropto, we’re able to identify high-performing sectors within a large pool to increase profitability. By sharing our customer journey post acquisition, Ropto can then target niche segments to increase ROI.",
              "name":"Tim Berry",
              "title":"CEO"
            },
            {
              "company":"Aston Martin",
              "text":"Lorem Ipsum aston",
              "name":"Steve",
              "title":"manager"
            },
            {
              "company":"Tesco",
              "text":"Lorem Ipsum tesco",
              "name":"Pete",
              "title":"Cashier"
            }
        ]

    };

    tUl = document.createElement("ul");


    for (i = 0; i < testimonialsArray.testimonials.length; i++) {

      var tLi = document.createElement("li");
      var tH3 = document.createElement("h3");
      var tP = document.createElement("p");
      var tSmall = document.createElement("small");

      var tH3Inner = document.createTextNode( testimonialsArray.testimonials[i].company );
      var tPInner = document.createTextNode( testimonialsArray.testimonials[i].text );
      var tSmallInner = document.createTextNode( (testimonialsArray.testimonials[i].name) + ", " + (testimonialsArray.testimonials[i].title) );

      tH3.appendChild(tH3Inner);
      tP.appendChild(tPInner);
      tSmall.appendChild(tSmallInner);

      tLi.appendChild(tH3);
      tLi.appendChild(tP);
      tLi.appendChild(tSmall);
      tLi.setAttribute('data-id' , i);

      if(i == 0){
        tLi.classList.add("visible");
      }

      if(i == 1){
        tLi.classList.add("right");
      }

      if(i == testimonialsArray.testimonials.length-1){
        tLi.classList.add("left");
      }

      tUl.appendChild(tLi);

    }

    var tContainer = document.getElementById("testimonial");

    var tContainerInner = document.createElement("div");
    tContainerInner.classList.add("testimonial-inner");

    var tButtonNext = document.createElement("button");
    var tButtonNextInner = document.createTextNode( "Next" );
    tButtonNext.classList.add("next-button");
    tButtonNext.appendChild(tButtonNextInner);

    var tButtonPrev = document.createElement("button");
    var tButtonPrevInner = document.createTextNode( "Prev" );
    tButtonPrev.classList.add("prev-button");
    tButtonPrev.appendChild(tButtonPrevInner);

    tContainer.appendChild(tContainerInner);
    tContainerInner.appendChild(tUl);
    tContainerInner.appendChild(tButtonPrev);
    tContainerInner.appendChild(tButtonNext);


/* CAROUSEL FUNCTION */

  tButtonNext.onclick = function(){
    buttonCarousel(1);
  };

  tButtonPrev.onclick = function(){
    buttonCarousel(0);
  };


var el = document.getElementById('testimonial')
swipedetect(el, function(swipedir){
    if (swipedir =='left'){
        buttonCarousel(1);
    } else if (swipedir =='right') {
        buttonCarousel(0);
    }
});

function buttonCarousel(direction){

  var testimonials = tUl.childNodes;
  var c, left, right;

  for(i=0; i<testimonials.length; i++){
    if( testimonials[i].classList.contains("left") ){
      testimonials[i].classList.remove("left");
    }
    if( testimonials[i].classList.contains("right") ){
      testimonials[i].classList.remove("right");
    }
    if( testimonials[i].classList.contains("visible") ){
      testimonials[i].classList.remove("visible");

      c = i;
    }
  }

  if (direction == 0){
    c--;
    if( c < 0 ){
      c = testimonials.length-1;
    }
    testimonials[c].classList.add("visible");
  }

  if (direction == 1){
    c++;
    if( c > testimonials.length-1 ){
      c = 0
    }
    testimonials[c].classList.add("visible");
  }

  left = c-1;
  if( left < 0 ){
    left = testimonials.length-1;
  }
  testimonials[left].classList.add("left");

  right = c+1;
  if( right > testimonials.length-1 ){
    right = 0;
  }
  testimonials[right].classList.add("right");

}
