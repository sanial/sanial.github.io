var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
  return new bootstrap.Tooltip(tooltipTriggerEl)
})

$('[data-toggle="tooltip"]').tooltip();

// $('.btn').click(function(){
//     //Removing `data-toggle` from all elements
//     $('.btn').removeData('toggle');
//     //Adding `data-toggle` on clicked element
//     $(this).data('toggle','button');        
// });

// $().button('toggle')

/* Latest compiled and minified JavaScript included as External Resource */
$('.btn-switch').click(function() {
  $('.btn-switch').removeClass("active red blue");
  if ($(this).find('span').text() == "Home")
    $(this).addClass('active red');
  else
    $(this).addClass('active blue');
});