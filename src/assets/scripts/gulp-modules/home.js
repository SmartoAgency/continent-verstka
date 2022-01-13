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
const swiper3 = new Swiper('.swiper-news', {
  slidesPerView: 3.5,
  spaceBetween: 40,
  scrollbar: {
    el: '.swiper-scrollbar',
    // hide: true,
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
});

// const swiper = new Swiper('.projects-swiper', {
//   loop: true,
//   spaceBetween: 0,
//   slidesPerView: 1,
//   // autoplay: {
//   //   delay: 100,
//   // },
//   navigation: {
//     nextEl: '.swiper-button-next',
//     prevEl: '.swiper-button-prev',
//   },
//   scrollbar: {
//     el: '.swiper-scrollbar',
//   },
//   pagination: {
//     el: '.swiper-pagination',
//     type: 'fraction',
//     touchStartPreventDefault: false,
//     formatFractionCurrent: addZero,
//     formatFractionTotal: addZero,
//   },
//   // thumbs: {
//   //   swiper: swiper2,
//   // },
// });
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
      tabsBtn.forEach(item => {
        item.classList.remove('active');
      });

      tabsItems.forEach(item => {
        item.classList.remove('active');
      });

      currentBtn.classList.add('active');
      currentTab.classList.add('active');
      window.dispatchEvent(new Event('our-projects-switch-tab'));
    }
  });
}
document.querySelector('.tabs__nav-btn').click();
// tab end

// // select start
$('.select').each(function() {
  const _this = $(this),
    selectOption = _this.find('option'),
    selectOptionLength = selectOption.length,
    selectedOption = selectOption.filter(':selected'),
    duration = 450; // длительность анимации

  _this.hide();
  _this.wrap('<div class="select"></div>');
  $('<div>', {
    class: 'new-select',
    text: _this.children('option:disabled').text(),
  }).insertAfter(_this);

  const selectHead = _this.next('.new-select');
  $('<div>', {
    class: 'new-select__list',
  }).insertAfter(selectHead);

  const selectList = selectHead.next('.new-select__list');
  for (let i = 1; i < selectOptionLength; i++) {
    $('<div>', {
      class: 'new-select__item',
      html: $('<span>', {
        text: selectOption.eq(i).text(),
      }),
    })
      .attr('data-value', selectOption.eq(i).val())
      .appendTo(selectList);
  }

  const selectItem = selectList.find('.new-select__item');
  selectList.slideUp(0);
  selectHead.on('click', function() {
    if (!$(this).hasClass('on')) {
      $(this).addClass('on');
      selectList.slideDown(duration);

      selectItem.on('click', function() {
        let chooseItem = $(this).data('value');

        $('select')
          .val(chooseItem)
          .attr('selected', 'selected');
        selectHead.text(
          $(this)
            .find('span')
            .text(),
        );

        selectList.slideUp(duration);
        selectHead.removeClass('on');
      });
    } else {
      $(this).removeClass('on');
      selectList.slideUp(duration);
    }
  });
});
// // select end
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

window.addEventListener('our-projects-switch-tab', () => {
  swiper11.update();
  swiper10.update();
});

// const statusBtn = document.querySelectorAll('[data-work-status]');
// const statusCircle = document.querySelectorAll('.circle');
// statusBtn.forEach((el, index) => {
//   el.addEventListener('mouseleave', () => {
//     gsap.fromTo(statusCircle, 1, { strokeDashoffset: 0 }, { strokeDashoffset: 1000 });
//   });
//   el.addEventListener('mouseenter', () => {
//     gsap.fromTo(statusCircle, 1, { strokeDashoffset: 1000 }, { strokeDashoffset: 0 });
//   });
// });
$('.video')
  .parent()
  .click(function() {
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

// btn social start
const socialBtn = document.querySelectorAll('.js-social');
socialBtn.forEach(el => {
  el.addEventListener('click', () => {
    el.classList.toggle('social-link__grow');
  });
});

function handleVisibilityOnScroll(elems = [], direction = 'up') {
  elems.forEach(elem => {
    switch (direction) {
      case 'down':
        elem[0].classList.add(elem[1]);
        break;
      default:
        elem[0].classList.remove(elem[1]);
        break;
    }
  });
}
const socialSelect = document.querySelector('.social-select');
locoScroll.on('scroll', position => {
  if (position.scroll.y > 100) {
    handleVisibilityOnScroll([[socialSelect, 'visible']], 'down');
  } else {
    handleVisibilityOnScroll([[socialSelect, 'visible']]);
  }
});
// btn social end
