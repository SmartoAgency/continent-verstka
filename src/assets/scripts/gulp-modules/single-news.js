const swiper = new Swiper('.single-news-swiper', {
  navigation: {
    nextEl: '.swiper-button-next2',
    prevEl: '.swiper-button-prev2',
  },
  pagination: {
    el: '.swiper-pagination2',
    clickable: true,
  },
  // autoplay: {
  //   delay: 4000,
  // },
});

const swiper3 = new Swiper('.swiper-news', {
  slidesPerView: 1.25,
  spaceBetween: 20,
  scrollbar: {
    el: '.swiper-scrollbar',
    // hide: true,
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  breakpoints: {
    575: {
      slidesPerView: 3.5,
      spaceBetween: 40,
    },
  },
});
