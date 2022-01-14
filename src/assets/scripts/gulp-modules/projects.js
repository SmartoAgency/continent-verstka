const swiper10 = new Swiper('.project-swiper-img', {
  // spaceBetween: 10,
  slidesPerView: 1,
  // loop: true,
  freeMode: true,
  watchSlidesProgress: true,
  // loop: true,
  // autoplay: {
  //   delay: 1000,
  // },
  thumbs: {
    swiper: swiper11,
  },
});

var swiper11 = new Swiper('.project-swiper', {
  spaceBetween: 10,
  slidesPerView: 1,
  freeMode: true,
  watchSlidesProgress: true,
  // loop: true,
  // autoplay: {
  //   delay: 1000,
  // },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  scrollbar: {
    el: '.swiper-scrollbar',
  },
  pagination: {
    el: '.swiper-pagination',
    type: 'fraction',
    touchStartPreventDefault: false,
    formatFractionCurrent: addZero,
    formatFractionTotal: addZero,
  },
  thumbs: {
    swiper: swiper10,
  },
});
function addZero(num) {
  return num > 9 ? num : `0${num}`;
}
window.addEventListener('our-projects-switch-tab', () => {
  swiper11.update();
  swiper10.update();
});
