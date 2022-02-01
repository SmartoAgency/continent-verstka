$btnGrid = $('.js-btn-grid');
$btnList = $('.js-btn-list');
$sortTitle = $('.js-sort-title');
$('button').on('click', function(e) {
  if ($(this).hasClass('grid')) {
    $('#container ul')
      .removeClass('list')
      .addClass('grid');
    $btnGrid.addClass('active');
    $btnList.removeClass('active');
    $sortTitle.css('display', 'none');
  } else if ($(this).hasClass('list')) {
    $('#container ul')
      .removeClass('grid')
      .addClass('list');
    $btnGrid.removeClass('active');
    $btnList.addClass('active');
    $sortTitle.css('display', 'flex');
  }
});

$('.js-range-slider').ionRangeSlider({
  type: 'double',
  min: 38,
  max: 200,
  // from: 200,
  // to: 500,
  // grid: true,
});
