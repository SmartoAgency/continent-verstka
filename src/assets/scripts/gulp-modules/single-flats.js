const menu = ['Планування', 'Детальне', 'На поверсі', '3д тур'];
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
    renderBullet(index, className) {
      return `<span class="${className}">${menu[index]}</span>`;
    },
  },
});

const swiper2 = new Swiper('.similar-apartment-swiper', {
  slidesPerView: 1.25,
  spaceBetween: 20,
  // scrollbar: {
  // el: '.swiper-scrollbar',
  // hide: true,
  // },
  navigation: {
    nextEl: '.swiper-button-next1',
    prevEl: '.swiper-button-prev2',
  },
  breakpoints: {
    575: {
      slidesPerView: 3.1,
      spaceBetween: 0,
    },
  },
});

document.querySelectorAll('.commerce-swiper .swiper-slide').forEach((el) => {
  console.log($(el));
  el.querySelector('.js-btn-scale').addEventListener('click', () => {
    $.magnificPopup.open({
      items: {
        src: el.querySelector('img').getAttribute('src'),
      },
      type: 'image',
      callbacks: {
        beforeOpen() {},
      },
    });
  });
});
