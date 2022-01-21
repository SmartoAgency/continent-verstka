$(() => {
  // Cache selectors
  const $accordion = $('.js-accordion');
  const $allPanels = $(' .accordion-panel').hide();
  const $allItems = $('.accordion-item');

  // Event listeners
  $accordion.on('click', '.accordion-toggle', function() {
    if (
      $(this)
        .next()
        .is(':visible')
    ) {
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
  // openAccordeonOnAnchorLink();
});
