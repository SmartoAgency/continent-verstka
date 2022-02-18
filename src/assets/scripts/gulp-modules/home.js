$.Tween.propHooks.number = {
  get(tween) {
    const num = tween.elem.innerHTML.replace(/^[^\d-]+/, ' ');
    return parseFloat(num) || 0;
  },

  set(tween) {
    const opts = tween.options;
    let changedData = tween.now
      .toFixed(0)
      .toString()
      .split('');
    changedData.splice(2, 0, ' ');
    changedData = changedData.join('');
    tween.elem.innerHTML =
      // (opts.prefix || '') + tween.now.toFixed(opts.fixed || 0) + (opts.postfix || '');
      changedData;
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

$('.video')
  .parent()
  .click(function () {
    if (
      $(this)
        .children('.video')
        .get(0).paused
    ) {
      $(this)
        .children('.video')
        .get(0)
        .play();
      $(this)
        .children('.playpause')
        .fadeOut();
    } else {
      $(this)
        .children('.video')
        .get(0)
        .pause();
      $(this)
        .children('.playpause')
        .fadeIn();
    }
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

function addZero(num) {
  return num > 9 ? num : `0${num}`;
}

const swiper10 = new Swiper('.project-swiper-img', {
  spaceBetween: 20,
  slidesPerView: 1,
  // loop: true,
  freeMode: false,
  watchSlidesProgress: true,
  // loop: true,
  // autoplay: {
  //   delay: 1000,
  // },
  thumbs: {
    swiper: swiper11,
  },
  breakpoints: {
    575: {
      slidesPerView: 1,
      spaceBetween: 0,
    },
  },
});

var swiper11 = new Swiper('.project-swiper', {
  spaceBetween: 20,
  slidesPerView: 1,
  freeMode: false,
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
  breakpoints: {
    575: {
      slidesPerView: 1,
      spaceBetween: 0,
    },
  },
});

window.addEventListener('our-projects-switch-tab', () => {
  swiper11.update();
  swiper10.update();
});

const isMobile = () => window.matchMedia('(max-width: 1024px)').matches;

if (isMobile()) {
  const slideWrapper = document.querySelector('.active-project');
  const swiperWrapper = document.createElement('div');
  swiperWrapper.classList.add('swiper-wrapper');
  slideWrapper.append(swiperWrapper);
  document.querySelectorAll('.active-project__item').forEach((el) => {
    el.classList.add('swiper-slide');
    swiperWrapper.append(el);
  });
  const swiper = new Swiper('.active-project', {
    // Optional parameters
    slidesPerView: 1.25,
    loop: true,
    // freeMode: true,
    spaceBetween: 20,
    on: {
      init: (swiper) => {
        const slidesLength = document.querySelectorAll(
          '.active-project .swiper-slide:not(.swiper-slide-duplicate)',
        ).length;
        document.querySelector('.swiper-pagination1').innerHTML = `
         01 / ${addZero(slidesLength)}
        `;
      },
    },
    breakpoints: {
      // when window width is >= 320px
      620: {
        slidesPerView: 2.25,
      },
    },
  });
  window.addEventListener('our-projects-switch-tab', () => {
    swiper.update();
  });

  window.addEventListener('our-projects-switch-tab', () => {
    swiper.update();
  });

  const slidesLength = document.querySelectorAll(
    '.active-project .swiper-slide:not(.swiper-slide-duplicate)',
  ).length;

  const scrollbar = document.querySelector('.swiper-scrollbar1');
  scrollbar.style.setProperty('--width', `${100 / slidesLength}%`);
  swiper.on('activeIndexChange', (swiper) => {
    document.querySelector('.swiper-pagination1').innerHTML = `
     ${addZero(swiper.realIndex + 1)} / ${addZero(slidesLength)}
    `;
    const singleSlideInPercent = 100 / slidesLength;
    scrollbar.style.setProperty(
      '--width',
      `${(swiper.realIndex * 100) / slidesLength + singleSlideInPercent}%`,
    );
    console.log(swiper);
  });
}

function handleHeader(scroller) {
  const header = document.querySelector('.js-header');
  header.state = 'open';
  let prevScrollPosition = 0;
  scroller.on('scroll', ({ scroll }) => {
    const tempState = prevScrollPosition > scroll.y ? 'open' : 'close';
    prevScrollPosition = scroll.y;
    if (scroll.y > 150) {
      changeState.untransparent();
    } else {
      changeState.transparent();
    }
    if (tempState === header.state || scroll.y < 150) return;
    header.state = tempState;
    changeState[tempState]();
  });

  const changeState = {
    open: () => {
      gsap.to(header, { yPercent: 0 });
    },
    close: () => {
      gsap.to(header, { yPercent: -160 });
    },
    transparent: () => {
      // header.classList.remove('single-header');
      header.classList.add('transparent');
    },
    untransparent: () => {
      header.classList.remove('transparent');
      // header.classList.add('single-header');
    },
  };
}
handleHeader(locoScroll);

// number start
const swiper20 = new Swiper('.swiper-numbers-list', {
  slidesPerView: 3,
  spaceBetween: 20,
  // loop: true,
  autoplay: {
    delay: 5000,
  },

  breakpoints: {
    670: {
      slidesPerView: 4,
      spaceBetween: 60,
    },
  },
});

swiper20.on('reachEnd', () => {
  swiper20.autoplay.stop();
});
// number end
