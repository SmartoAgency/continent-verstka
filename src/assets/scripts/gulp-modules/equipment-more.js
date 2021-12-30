function initSlider(container) {
  const pagination = container.querySelector('.swiper-pagination');
  const btnNext = container.querySelector('.swiper-button-next');
  const btnPrev = container.querySelector('.swiper-button-prev');
  const swipEl = container.querySelector('.js-init-swiper');
  if (!pagination || !btnNext || !btnPrev || !swipEl) {
    return;
  }
  const swiper = new Swiper(swipEl, {
    pagination: {
      el: pagination,
      type: 'fraction',
    },
    navigation: {
      nextEl: btnNext,
      prevEl: btnPrev,
    },
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const sliders = document.querySelectorAll('.js-equipment');
  console.log(sliders);
  sliders.forEach(initSlider);
});

const swiper = new Swiper('.myequipment-more-swiper', {
  slidesPerView: 2.6,
  spaceBetween: 15,
  slidesPerView: 'auto',
  breakpoints: {
    575: {
      spaceBetween: 20,
    },
    992: {
      spaceBetween: 50,
    },
    1440: {
      spaceBetween: 60,
    },
  },
});

/** СТрелка переключатель в зависимости от положения на єкране */
function sideSwitchArrow(swiper, arrow, container) {
  const mediumCordValue = document.documentElement.clientWidth / 2;
  document.body.append(arrow);
  container.style.cursor = 'none';
  arrow.style.cursor = 'none';
  arrow.style.position = 'fixed';
  arrow.style.zIndex = 10;
  arrow.__proto__.hide = function () {
    this.style.opacity = '0';
    this.style.pointerEvents = 'none';
  };
  arrow.__proto__.show = function () {
    this.style.opacity = '1';
    // this.style.pointerEvents = 'auto';
  };
  arrow.dataset.side = 'leftSide';

  container.addEventListener('mousemove', desktopNavButtonHandler);
  container.addEventListener('mouseenter', () => {
    arrow.show();
  });
  container.addEventListener('mouseleave', () => {
    arrow.hide();
  });
  if (document.documentElement.clientWidth < 769) {
    window.removeEventListener('mousemove', desktopNavButtonHandler);
    arrow.remove();
  }
  function desktopNavButtonHandler(evt) {
    // arrow.style.position = 'fixed';
    arrow.style.left = `${evt.clientX - 18}px`;
    arrow.style.top = `${evt.clientY - 18}px`;

    getCursorSide(evt.clientX);
    handleArrowVisibility(evt);
  }

  function handleArrowVisibility() {}

  function getCursorSide(x) {
    if (x < mediumCordValue) {
      arrow.classList.add('left-side');
      arrow.dataset.side = 'leftSide';
      // switchGallerySlide('leftSide');
    } else {
      arrow.classList.remove('left-side');
      arrow.dataset.side = 'rightSide';
      // switchGallerySlide('rightSide')
    }
  }
  container.addEventListener('click', () => {
    switchGallerySlide(arrow.dataset.side);
  });
  if (document.documentElement.clientWidth < 576) {
    // container.removeEventListener('click', clickToChange);
  }
  const navigate = {
    leftSide: () => {
      swiper.slidePrev();
    },
    rightSide: () => {
      swiper.slideNext();
    },
  };

  function switchGallerySlide(side) {
    navigate[side]();
    return navigate.side;
  }

  // eslint-disable-next-line no-unused-vars
}
sideSwitchArrow(
  swiper,
  document.querySelector('.btn-works'),
  document.querySelector('.equipment-more-swiper'),
);
/** СТрелка переключатель в зависимости от положения на єкране END */

const equipDetailSwiper = new Swiper('[data-detail-equip-swiper]', {
  navigation: {
    nextEl: document.querySelector('.popup-button-next'),
    prevEl: document.querySelector('.popup-button-prev'),
  },
});
const equipPopup = document.querySelector('[data-equip-popup]');
const equipClose = equipPopup.querySelector('.popup-close');
const $miniSliders = document.querySelectorAll('[data-slider-content]');
const allCount = equipPopup.querySelector('[data-all]');
const currentCount = equipPopup.querySelector('[data-current]');
equipDetailSwiper.on('update', (swiper) => {
  allCount.textContent = swiper.slides.length;
  currentCount.textContent = swiper.activeIndex + 1;
  swiper.slideTo(0);
});
equipDetailSwiper.on('slideChange', (swiper) => {
  currentCount.textContent = swiper.activeIndex + 1;
  console.log(swiper);
});

// function getMiniSliderImages(slider) {
//   const images = Array.from(slider.querySelectorAll('img')).map(el => el.src);
//   const sliderContainer = document.querySelector('[data-detail-equip-swiper] .swiper-wrapper');
//   sliderContainer.innerHTML = '';
//   images.forEach(img => {
//     sliderContainer.innerHTML += `
//           <img class="swiper-slide" src="${img}"/>
//       `;
//   });
//   equipDetailSwiper.update();
// }
function getMiniSliderImages(slider) {
  const images = Array.from(slider.querySelectorAll('img')).map(el => el.src);
  const sliderContainer = document.querySelector('[data-detail-equip-swiper] .swiper-wrapper');
  sliderContainer.innerHTML = '';
  images.forEach((img) => {
    sliderContainer.innerHTML += `
          <div class="swiper-slide popup-img"><img src="${img}"/></div>
      `;
  });
  equipDetailSwiper.update();
}

$miniSliders.forEach((el) => {
  el.addEventListener('click', () => {
    gsap.to(equipPopup, { autoAlpha: 1, duration: 0.1 });
    getMiniSliderImages(el);
  });
});

equipClose.addEventListener('click', () => {
  gsap.to(equipPopup, { autoAlpha: 0, duration: 0.2 });
});
