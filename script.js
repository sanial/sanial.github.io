var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
  return new bootstrap.Tooltip(tooltipTriggerEl)
})

$('[data-toggle="tooltip"]').tooltip();

var scrollSpy = new bootstrap.ScrollSpy(document.body, {
  target: '#navbar-example'
})


/**Topographic background
// Topographic map animation by @jonyablonski Code Pen
**/
var svgContainer = document.querySelector('#svg-container');
var svgElem = document.querySelector('#svg-container svg');
var path = document.querySelectorAll('.line');
var svgWOrig;
var svgHOrig;
svgWOrig = svgElem.getAttribute('width');
svgHOrig = svgElem.getAttribute('height');
var minW = 320;

for(var i = 0; i < path.length; i++) {
	var length = path[i].getTotalLength();
	path[i].style.transition = path[i].style.WebkitTransition = 'none';
	path[i].style.strokeDasharray = length + ' ' + length;
	path[i].style.strokeDashoffset = length;
	path[i].getBoundingClientRect();
	path[i].style.transition = path[i].style.WebkitTransition = 'stroke-dashoffset 10s ease';
	path[i].style.strokeDashoffset = '0';
}

var svgCover = function() {

    // Find the current width and height of the viewport
    var winWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    var winHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

    // Resize the svg container to match the viewport
    svgContainer.style.width = winWidth + 'px';
    svgContainer.style.height = winHeight + 'px';

    // Find the largest scale factor of horizontal/vertical
    var scaleH = winWidth / svgWOrig;
    var scaleV = winHeight / svgHOrig;
    var scale = scaleH > scaleV ? scaleH : scaleV;

    // Don't allow scaled width to be less than min width
    if (scale * svgWOrig < minW) {
        scale = minW / svgWOrig;
    }

    // Scale the svg
    var svgNewWidth = scale * svgWOrig;
    var svgNewHeight = scale * svgHOrig;
    svgElem.style.width = svgNewWidth + 'px';
    svgElem.style.height = svgNewHeight + 'px';

    // Align to middle by scrolling within the container
    svgContainer.scrollLeft = (svgNewWidth - winWidth) / 2;
    svgContainer.scrollTop = (svgNewHeight - winHeight) / 2;
  
};

svgCover();

window.addEventListener('resize', svgCover);