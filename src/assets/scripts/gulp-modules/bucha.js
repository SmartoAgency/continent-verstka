$('.video')
  .parent()
  .click(function () {
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

// var swiper2 = new Swiper('.js-developer1', {
//   spaceBetween: 30,
//   slidesPerView: 1.25,
//   // freeMode: true,
//   watchSlidesProgress: true,
//   // loop: true,
//   // autoplay: {
//   //   delay: 1000,
//   // },
//   navigation: {
//     nextEl: '.swiper-button-next2',
//     prevEl: '.swiper-button-prev2',
//   },
//   scrollbar: {
//     el: '.swiper-scrollbar2',
//   },
//   pagination: {
//     el: '.swiper-pagination2',
//     type: 'fraction',
//     // touchStartPreventDefault: false,
//     formatFractionCurrent: addZero,
//     formatFractionTotal: addZero,
//   },
// });

// //
function initSlider(container) {
  const pagination = container.querySelector('.swiper-pagination1');
  const btnNext = container.querySelector('.swiper-button-next1');
  const btnPrev = container.querySelector('.swiper-button-prev1');
  const swipEl = container.querySelector('.js-init-swiper');
  if (!pagination || !btnNext || !btnPrev || !swipEl) {
    return;
  }
  const e = window.innerWidth >= 2e3 ? 3 : 2;
  const swiper = new Swiper(swipEl, {
    // spaceBetween: 30,
    // slidesPerView: 1.25,
    // watchSlidesProgress: true,
    slidesPerView: 1.25,
    loopedSlides: e,
    loop: true,
    speed: 750,
    spaceBetween: 16,
    pagination: {
      el: pagination,
      type: 'fraction',
      formatFractionCurrent: addZero,
      formatFractionTotal: addZero,
    },
    navigation: {
      nextEl: btnNext,
      prevEl: btnPrev,
    },
    // scrollbar: {
    //   el: container.querySelector('.swiper-scrollbar1'),
    // },
    breakpoints: {
      575: {
        spaceBetween: 30,
      },
      // 992: {
      //   spaceBetween: 20,
      //   slidesPerView: 4,
      // },
      // 1440: {
      //   spaceBetween: 20,
      //   slidesPerView: 4,
      // },
    },
  });
  const slidesLength = container.querySelectorAll('.swiper-slide:not(.swiper-slide-duplicate)')
    .length;

  const scrollbar = container.querySelector('.swiper-scrollbar1');
  scrollbar.style.setProperty('--width', `${100 / slidesLength}%`);
  swiper.on('activeIndexChange', (swiper) => {
    const singleSlideInPercent = 100 / slidesLength;
    scrollbar.style.setProperty(
      '--width',
      `${(swiper.realIndex * 100) / slidesLength + singleSlideInPercent}%`,
    );
    console.log(swiper);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const sliders = document.querySelectorAll('.js-developer');
  sliders.forEach(initSlider);
});
