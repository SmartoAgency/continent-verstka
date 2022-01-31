var menu = ['Планування', 'На генплані'];
const swiper = new Swiper('.commerce-swiper', {
  // slidesPerView: 3.5,
  // spaceBetween: 40,
  // scrollbar: {
  // el: '.swiper-scrollbar',
  // hide: true,
  // },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
    renderBullet: function(index, className) {
      return '<span class="' + className + '">' + menu[index] + '</span>';
    },
  },
});

const swiper2 = new Swiper('.similar-apartment-swiper', {
  slidesPerView: 3,
  // spaceBetween: 40,
  // scrollbar: {
  // el: '.swiper-scrollbar',
  // hide: true,
  // },
  navigation: {
    nextEl: '.swiper-button-next1',
    prevEl: '.swiper-button-prev2',
  },
});
