$btnGrid = $('.js-btn-grid');
$btnList = $('.js-btn-list');
$sortTitle = $('.js-sort-title');
$('button').on('click', function (e) {
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
});

const openFilter = document.querySelector('.js-open-filter');
const closeFilter = document.querySelector('.js-close-filter');
const filter = document.querySelector('.js-mobile-filter');
openFilter.addEventListener('click', () => {
  gsap.to(filter, { autoAlpha: 1, yPercent: 0 });
});
closeFilter.addEventListener('click', () => {
  gsap.to(filter, { autoAlpha: 0, yPercent: 100 });
});

const openSort = document.querySelector('.js-sort-btn');
const closeSort = document.querySelector('.js-close-sort');
const sortList = document.querySelector('.js-sort-list');
openSort.addEventListener('click', () => {
  gsap.to(sortList, { autoAlpha: 1, yPercent: 0 });
});
closeSort.addEventListener('click', () => {
  gsap.to(sortList, { autoAlpha: 0, yPercent: 100 });
});
