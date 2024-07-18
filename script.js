$(function() {
    $('.pnt').click(function() {
      $(this).toggleClass('is-clicked');
    });
  });

  function displayLineText() {
    var text = document.getElementById("textField");
    text.style.display = "block";
  }
  function displaySVG() {
    var x = document.getElementById("ln3");
    if (x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    
    }
  }
  // function overSVG() {
  //   var obj = document.getElementsByClassName('path3');
  //       for(var i=0;i<obj.length;i++){
  //           if(obj[i].style.display === "none"){
  //               obj[i].style.display = "block";
  //           }else{
  //               obj[i].style.display = "none";
  //           }
  //       }
  //   }
  
  $(document).ready(function () {
    var tileCount = 100;

    // Create Grid
    var grid = $('#grid');
    for (var i = 0; i < tileCount; i++) {
        var tile = document.createElement('div');
        tile.id = "t" + (i + 1);
        tile.className = "tile";

        grid.append(tile);
    }
});

window.addEventListener("resize",scrollGrid);
window.addEventListener("scroll",scrollGrid);

function scrollGrid() {
	let bodyHeight = document.body.offsetHeight,
		mainHeight = document.querySelector("main_cards").offsetHeight,
		cards = document.querySelector(".cards"),
		transY = (window.pageYOffset / (mainHeight - bodyHeight)) * -100;
	
	cards.style.setProperty("--scroll",transY + "%");
}
scrollGrid();