// $(() => {
//   // Cache selectors
//   const $accordion = $('.js-accordion');
//   const $allPanels = $(' .accordion-panel').hide();
//   const $allItems = $('.accordion-item');

//   // Event listeners
//   $accordion.on('click', '.accordion-toggle', function () {
//     // Toggle the current accordion panel and close others
//     $allPanels.slideUp();
//     $allItems.removeClass('is-open');
//     if (
//       $(this)
//         .next()
//         .is(':visible')
//     ) {
//       $('.accordion-panel').slideUp();
//     } else {
//       $(this)
//         .next()
//         .slideDown()
//         .closest('.accordion-item')
//         .addClass('is-open');
//     }
//     return false;
//   });
//   openAccordeonOnAnchorLink();
// });
$(() => {
  // Cache selectors
  const $accordion = $('.js-accordion');
  const $allPanels = $(' .accordion-panel').hide();
  const $allItems = $('.accordion-item');

  // Event listeners
  $accordion.on('click', '.accordion-toggle', function () {
    // Toggle the current accordion panel and close others
    // $allPanels.slideUp();
    // $allItems.removeClass('is-open');
    if (
      $(this)
        .next()
        .is(':visible')
    ) {
      // $('.accordion-panel').slideUp();

      $(this)
        .parent()
        .removeClass('is-open');
      $(this)
        .next()
        .slideUp();
    } else {
      $(this)
        .next()
        .slideDown()
        .closest('.accordion-item')
        .addClass('is-open');
    }
    setTimeout(() => {
      window.locoScroll.update();
    }, 700);
    return false;
  });
  openAccordeonOnAnchorLink();
});
