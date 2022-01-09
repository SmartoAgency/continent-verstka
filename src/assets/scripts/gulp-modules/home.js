$.Tween.propHooks.number = {
  get(tween) {
    const num = tween.elem.innerHTML.replace(/^[^\d-]+/, ' ');
    return parseFloat(num) || 0;
  },

  set(tween) {
    const opts = tween.options;
    tween.elem.innerHTML = (opts.prefix || '') + tween.now.toFixed(opts.fixed || 0) + (opts.postfix || '');
  },
};

$('#num-1')
  .delay(1000)
  .animate(
    { number: 10 },
    {
      duration: 3000,
      // postfix: '+',
    },
  );

$('#num-2')
  .delay(1000)
  .animate(
    { number: 8 },
    {
      duration: 3000,
      // postfix: '+',
    },
  );

$('#num-3')
  .delay(100)
  .animate(
    { number: 72000 },
    {
      duration: 3000,
      // postfix: '+',
    },
  );

$('#num-4')
  .delay(1000)
  .animate(
    { number: 4 },
    {
      duration: 3000,
      // postfix: '+',
    },
  );

const swiper = new Swiper('.projects-swiper', {
  loop: true,
  spaceBetween: 0,
  slidesPerView: 1,
  // autoplay: {
  //   delay: 100,
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
  // thumbs: {
  //   swiper: swiper2,
  // },
});
function addZero(num) {
  return num > 9 ? num : `0${num}`;
}

// tab start
const tabsBtn = document.querySelectorAll('.tabs__nav-btn');
const tabsItems = document.querySelectorAll('.tabs__item');

tabsBtn.forEach(onTabClick);

function onTabClick(item) {
  item.addEventListener('click', () => {
    const currentBtn = item;
    const tabId = currentBtn.getAttribute('data-tab');
    const currentTab = document.querySelector(tabId);

    if (!currentBtn.classList.contains('active')) {
      tabsBtn.forEach((item) => {
        item.classList.remove('active');
      });

      tabsItems.forEach((item) => {
        item.classList.remove('active');
      });

      currentBtn.classList.add('active');
      currentTab.classList.add('active');
    }
  });
}
document.querySelector('.tabs__nav-btn').click();
// tab end

// const swiper = new Swiper('.myProjects-swiper', {
//   speed: 600,
//   parallax: true,
//   pagination: {
//     el: '.swiper-pagination',
//     clickable: true,
//   },
//   scrollbar: {
//     el: '.swiper-scrollbar',
//   },
//   navigation: {
//     nextEl: '.swiper-button-next',
//     prevEl: '.swiper-button-prev',
//   },
//   pagination: {
//     el: '.swiper-pagination',
//     clickable: true,
//   },
// });

// const swiper = new Swiper('.mynews-swiper', {
//   slidesPerView: 1.1,
//   spaceBetween: 20,
//   navigation: {
//     nextEl: '.swiper-button-next',
//     prevEl: '.swiper-button-prev',
//   },
//   breakpoints: {
//     575: {
//       spaceBetween: 30,
//       slidesPerView: 2.1,
//     },
//     992: {
//       spaceBetween: 40,
//       slidesPerView: 2.5,
//     },
//     1440: {
//       spaceBetween: 60,
//       slidesPerView: 2.5,
//     },
//   },
// });

// const swiper2 = new Swiper('.mygallery-swiper', {
//   // slidesPerView: 1.7,
//   spaceBetween: 20,
//   slidesPerView: 'auto',
//   navigation: {
//     nextEl: '.swiper-next',
//     prevEl: '.swiper-prev',
//   },
//   breakpoints: {
//     575: {
//       spaceBetween: 30,
//     },
//     992: {
//       spaceBetween: 40,
//     },
//     1440: {
//       spaceBetween: 60,
//     },
//   },
// });
