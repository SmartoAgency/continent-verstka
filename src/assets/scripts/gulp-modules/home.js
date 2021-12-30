const swiper = new Swiper('.mynews-swiper', {
  slidesPerView: 1.1,
  spaceBetween: 20,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  breakpoints: {
    575: {
      spaceBetween: 30,
      slidesPerView: 2.1,
    },
    992: {
      spaceBetween: 40,
      slidesPerView: 2.5,
    },
    1440: {
      spaceBetween: 60,
      slidesPerView: 2.5,
    },
  },
});

const swiper2 = new Swiper('.mygallery-swiper', {
  // slidesPerView: 1.7,
  spaceBetween: 20,
  slidesPerView: 'auto',
  navigation: {
    nextEl: '.swiper-next',
    prevEl: '.swiper-prev',
  },
  breakpoints: {
    575: {
      spaceBetween: 30,
    },
    992: {
      spaceBetween: 40,
    },
    1440: {
      spaceBetween: 60,
    },
  },
});
