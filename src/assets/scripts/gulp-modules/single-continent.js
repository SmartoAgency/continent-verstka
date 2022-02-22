const swiper2 = new Swiper('.similar-apartment-swiper', {
  slidesPerView: 1.25,
  spaceBetween: 20,
  // scrollbar: {
  // el: '.swiper-scrollbar',
  // hide: true,
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
