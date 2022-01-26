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

// // !!!!!!!!!
// let incrementValue = 3,
//   showPlansCount = incrementValue;
// let $showMore = document.querySelector('.show-more-js'),
//   constructList = document.querySelectorAll('.planing__list'),
//   constructlength = constructList.length;

// increasePlans(showPlansCount, constructList);
// showPlansCount += incrementValue;
// $showMore.onclick = evt => {
//   increasePlans(showPlansCount, constructList);
//   if (constructlength - showPlansCount <= incrementValue) {
//     let lastIncrement = constructlength - showPlansCount;
//     showPlansCount += lastIncrement;
//   } else {
//     showPlansCount += incrementValue;
//   }
//   console.log(showPlansCount);
//   showPlansCount >= constructlength ? ($showMore.style.display = 'none') : null;
// };
// function increasePlans(count, list) {
//   for (var i = list.length - 1; i >= count; i--) {
//     list[i].style.display = `none`;
//   }
//   for (var i = 0; i < count; i++) {
//     // list[i].style.display = `inline-block`;
//   }
// }
// //

$('.js-range-slider').ionRangeSlider({
  type: 'double',
  min: 38,
  max: 200,
  // from: 200,
  // to: 500,
  // grid: true,
});
