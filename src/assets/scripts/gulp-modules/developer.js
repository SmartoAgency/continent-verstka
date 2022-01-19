$('.video')
  .parent()
  .click(function() {
    if (
      $(this)
        .children('.video')
        .get(0).paused
    ) {
      $(this)
        .children('.video')
        .get(0)
        .play();
      $(this)
        .children('.playpause')
        .fadeOut();
    } else {
      $(this)
        .children('.video')
        .get(0)
        .pause();
      $(this)
        .children('.playpause')
        .fadeIn();
    }
  });

function addZero(num) {
  return num > 9 ? num : `0${num}`;
}

var swiper2 = new Swiper('.js-developer', {
  spaceBetween: 30,
  slidesPerView: 1.25,
  // freeMode: true,
  watchSlidesProgress: true,
  // loop: true,
  // autoplay: {
  //   delay: 1000,
  // },
  navigation: {
    nextEl: '.swiper-button-next1',
    prevEl: '.swiper-button-prev1',
  },
  scrollbar: {
    el: '.swiper-scrollbar1',
  },
  pagination: {
    el: '.swiper-pagination1',
    type: 'fraction',
    // touchStartPreventDefault: false,
    formatFractionCurrent: addZero,
    formatFractionTotal: addZero,
  },
});

// //
// function initSlider(container) {
//   const pagination = container.querySelector('.swiper-pagination');
//   const btnNext = container.querySelector('.swiper-button-next');
//   const btnPrev = container.querySelector('.swiper-button-prev');
//   const swipEl = container.querySelector('.js-init-swiper');
//   if (!pagination || !btnNext || !btnPrev || !swipEl) {
//     return;
//   }
//   const swiper = new Swiper(swipEl, {
//     pagination: {
//       el: pagination,
//       type: 'fraction',
//     },
//     navigation: {
//       nextEl: btnNext,
//       prevEl: btnPrev,
//     },
//   });
// }

// //
