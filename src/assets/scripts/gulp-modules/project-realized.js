const swiper = new Swiper('.realized-project', {
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  autoplay: {
    delay: 4000,
  },
});

function addZero(num) {
  return num > 9 ? num : `0${num}`;
}

const swiper2 = new Swiper('.description-swiper', {
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

const swiper3 = new Swiper('.swiper-example', {
  spaceBetween: 20,
  slidesPerView: 1.25,
  // freeMode: true,
  watchSlidesProgress: true,
  // loop: true,
  // autoplay: {
  //   delay: 1000,
  // },
  navigation: {
    nextEl: '.swiper-button-next2',
    prevEl: '.swiper-button-prev2',
  },
  breakpoints: {
    575: {
      slidesPerView: 3,
      spaceBetween: 0,
    },
  },
});
