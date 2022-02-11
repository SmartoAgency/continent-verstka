var swiper2 = new Swiper('.swiper-favorites', {
  spaceBetween: 0,
  slidesPerView: 2.2,
  watchSlidesProgress: true,
  loop: true,
  // autoplay: {
  //   delay: 1000,
  // },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  breakpoints: {
    575: {
      slidesPerView: 2,
      spaceBetween: 0,
    },
    992: {
      slidesPerView: 3,
      spaceBetween: 0,
    },
  },
});
