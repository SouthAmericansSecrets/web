document.addEventListener("DOMContentLoaded", function(event) {
    var xs = document.getElementsByClassName("slidesX"),
        ys = document.getElementsByClassName("slidesY");
    if(xs.length > 0){
        carousel("slidesX",0);
    }
    if(ys.length > 0){
        carousel("slidesY",0);
    }
});

function carousel(class_name, myIndex) {
    var i;
    var x = document.getElementsByClassName(class_name);
    for (i = 0; i < x.length; i++) {
       x[i].style.display = "none";
       //x[i].className = "item slidesX slides-animation";
    }
    myIndex++;
    if (myIndex > x.length) {myIndex = 1}
    x[myIndex-1].style.display = "block";
    //x[myIndex-1].className = "item slidesX slides-animation";
    setTimeout(function(){carousel(class_name,myIndex);}, 9000); // Change image every 9 seconds
}