// On DOM ready,
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
    return false;
  });
  openAccordeonOnAnchorLink();
});

function debounce(func, wait, immediate) {
  let timeout;

  return function executedFunction() {
    const context = this;
    const args = arguments;
    const later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

const $menu = document.querySelector('.menu');
const $menuImage = document.querySelector('.js-menu-img');
const debounced = debounce(switchMenuImage, 250);

document.querySelectorAll('[data-src]').forEach((el) => {
  el.addEventListener('click', debounced);
});

function switchMenuImage(evt) {
  const linkWithImage = evt.target.closest('[data-image]');
  const isOpenedAccordeon = document.querySelectorAll('.is-open').length > 0;
  gsap.set($menuImage, { webkitClipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' });
  const tl = gsap.timeline();
  tl.to($menuImage, {
    webkitClipPath: 'polygon(0 0, 0% 0, 0% 100%, 0 100%)',
    scale: 1.1,
    ease: 'power4.in',
    duration: 0.55,
  });
  tl.add(() => {
    $menuImage.dataset.image = linkWithImage.dataset.image;
    $menuImage.src = isOpenedAccordeon
      ? linkWithImage.dataset.image
      : $menuImage.dataset.defaultSrc;
  });
  tl.to(
    $menuImage,
    {
      webkitClipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
      ease: 'power4.in',
      scale: 1,
      duration: 1,
    },
    '<',
  );
}

window.addEventListener('load', (evt) => {
  const pageId = document.body.getAttribute('id');
  if (!pageId.match(/(home-page)/)) {
    gsap.to('[data-preloader]', 1, { autoAlpha: 0 });
    gsap.to('[data-preloader]', { display: 'none' });
  }
});
