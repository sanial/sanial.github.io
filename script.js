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
  const imageSlideDelayMs = 3000;
  const fadeDurationMs = 550;
  const videoPattern = /\.(mp4|webm|ogg)(\?.*)?$/i;

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

    const videoEl = document.createElement("video");
    videoEl.className = "card__video";
    videoEl.muted = true;
    videoEl.loop = false;
    videoEl.autoplay = true;
    videoEl.playsInline = true;
    videoEl.setAttribute("muted", "");
    videoEl.setAttribute("playsinline", "");
    videoEl.setAttribute("preload", "metadata");
    imageEl.insertAdjacentElement("afterend", videoEl);

    slideshowCards.push({
      imageEl: imageEl,
      videoEl: videoEl,
      slides: slides,
      index: 0,
      showingVideo: false
    });
  });

  if (slideshowCards.length === 0) {
    return;
  }

  function isVideoSlide(path) {
    return videoPattern.test(path);
  }

  function setSlide(card, slidePath, useFade) {
    const nextIsVideo = isVideoSlide(slidePath);
    const activeEl = card.showingVideo ? card.videoEl : card.imageEl;

    function applyMedia() {
      if (nextIsVideo) {
        card.imageEl.style.display = "none";
        card.videoEl.style.display = "block";
        if (card.videoEl.getAttribute("src") !== slidePath) {
          card.videoEl.src = slidePath;
        }
        card.videoEl.currentTime = 0;
        const playPromise = card.videoEl.play();
        if (playPromise && typeof playPromise.catch === "function") {
          playPromise.catch(function () {});
        }
      } else {
        card.videoEl.pause();
        card.videoEl.style.display = "none";
        card.imageEl.style.display = "block";
        card.imageEl.src = slidePath;
      }

      card.showingVideo = nextIsVideo;
      card.imageEl.classList.remove("is-fading");
      card.videoEl.classList.remove("is-fading");
    }

    if (!useFade) {
      applyMedia();
      return;
    }

    activeEl.classList.add("is-fading");
    window.setTimeout(function () {
      applyMedia();
    }, fadeDurationMs);
  }

  slideshowCards.forEach(function (card) {
    setSlide(card, card.slides[card.index], false);
  });

  let activeCardIndex = 0;

  function proceedToNextCard() {
    activeCardIndex = (activeCardIndex + 1) % slideshowCards.length;
    advanceSlideshowQueue();
  }

  function waitForVideoToFinish(card) {
    const videoEl = card.videoEl;

    function onVideoEnded() {
      videoEl.removeEventListener("ended", onVideoEnded);
      proceedToNextCard();
    }

    videoEl.addEventListener("ended", onVideoEnded);
  }

  function advanceSlideshowQueue() {
    const currentCard = slideshowCards[activeCardIndex];
    currentCard.index = (currentCard.index + 1) % currentCard.slides.length;
    const nextSlidePath = currentCard.slides[currentCard.index];
    setSlide(currentCard, nextSlidePath, true);

    if (isVideoSlide(nextSlidePath)) {
      waitForVideoToFinish(currentCard);
      return;
    }

    window.setTimeout(proceedToNextCard, imageSlideDelayMs);
  }

  window.setTimeout(advanceSlideshowQueue, imageSlideDelayMs);
});