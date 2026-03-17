document.addEventListener("DOMContentLoaded", function () {
  const points = document.querySelectorAll(".pnt");
  points.forEach(function (point) {
    point.addEventListener("click", function () {
      point.classList.toggle("is-clicked");
    });
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
  
document.addEventListener("DOMContentLoaded", function () {
  var tileCount = 100;

  var grid = document.getElementById("grid");
  if (!grid) {
    return;
  }

  for (var i = 0; i < tileCount; i++) {
    var tile = document.createElement("div");
    tile.id = "t" + (i + 1);
    tile.className = "tile";
    grid.appendChild(tile);
  }
});

window.addEventListener("resize",scrollGrid);
window.addEventListener("scroll",scrollGrid);

function scrollGrid() {
  const cards = document.querySelector(".cards");
  const mainCards = document.querySelector(".main_cards");
  if (!cards || !mainCards) {
    return;
  }

  let bodyHeight = document.body.offsetHeight,
    mainHeight = mainCards.offsetHeight,
    transY = (window.pageYOffset / (mainHeight - bodyHeight)) * -100;
	
  cards.style.setProperty("--scroll",transY + "%");
}
scrollGrid();

document.addEventListener("click", function (event) {
  const icon = event.target.closest(".card__title-icon");
  if (!icon) {
    return;
  }

  event.preventDefault();
  event.stopPropagation();

  const url = icon.getAttribute("data-url");
  if (!url || url === "#") {
    return;
  }

  window.open(url, "_blank", "noopener,noreferrer");
});

document.addEventListener("DOMContentLoaded", function () {
  const cardImages = document.querySelectorAll(".cards .card__image[data-slides]");
  const slideDelayMs = 3000;
  const fadeDurationMs = 550;

  const slideshowCards = [];

  cardImages.forEach(function (imageEl) {
    const slides = (imageEl.getAttribute("data-slides") || "")
      .split(",")
      .map(function (path) {
        return path.trim();
      })
      .filter(function (path) {
        return path.length > 0;
      });

    if (slides.length < 2) {
      return;
    }

    slideshowCards.push({
      imageEl: imageEl,
      slides: slides,
      index: 0
    });
  });

  if (slideshowCards.length === 0) {
    return;
  }

  let activeCardIndex = 0;

  window.setInterval(function () {
    const currentCard = slideshowCards[activeCardIndex];
    currentCard.imageEl.classList.add("is-fading");

    window.setTimeout(function () {
      currentCard.index = (currentCard.index + 1) % currentCard.slides.length;
      currentCard.imageEl.src = currentCard.slides[currentCard.index];
      currentCard.imageEl.classList.remove("is-fading");
    }, fadeDurationMs);

    activeCardIndex = (activeCardIndex + 1) % slideshowCards.length;
  }, slideDelayMs);
});