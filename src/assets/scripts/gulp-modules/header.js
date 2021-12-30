window.onload = function () {
  document.body.classList.add('loaded_hiding');
  window.setTimeout(() => {
    document.body.classList.add('loaded');
    document.body.classList.remove('loaded_hiding');
  }, 1500);
};

document.addEventListener('DOMContentLoaded', () => {
  document.querySelector('.js-sideform-call').style.display = '';
  document.querySelector('.js-form-gratitude').style.display = '';
  document.querySelector('.js-call-mobile').style.display = '';
  document.querySelector('.building-popup').style.display = '';
});

document.addEventListener('DOMContentLoaded', () => {
  initHeader();
});

function initHeader() {
  const menuContainer = document.querySelector('.js-menu-container');
  const menuClose = document.querySelector('.js-menu-close');
  const menuOpen = document.querySelector('.js-menu-open');
  menuOpen.addEventListener('click', () => {
    if (menuContainer.classList.contains('active')) return;
    document.querySelector('body').style.overflow = 'hidden';
    menuContainer.classList.add('active');
  });

  menuClose.addEventListener('click', () => {
    if (!menuContainer.classList.contains('active')) return;
    menuContainer.classList.remove('active');
    document.querySelector('body').style.overflow = 'auto';
  });

  // Mobile phone menu start
  const btnCallMobile = document.querySelectorAll('.js-mobile-call');
  const btnCloseMobile = document.querySelector('.js-mobile-close');
  const formMobile = document.querySelector('.form-header-call');
  const formCallMobile = document.querySelector('.js-mobile-form');
  formCallMobile.addEventListener('click', () => {
    formCall.classList.add('sideform-active');
    document.querySelector('body').style.overflow = 'hidden';
  });

  btnCallMobile.forEach(el => el.addEventListener('click', () => {
    formMobile.classList.toggle('sideform-active');
    document.querySelector('body').style.overflow = 'hidden';
  }));

  btnCloseMobile.addEventListener('click', () => {
    formMobile.classList.remove('sideform-active');
    document.querySelector('body').style.overflow = 'auto';
    formGratitude.classList.remove('sideform-active');
    document.querySelector('body').style.overflow = 'auto';
  });
  formMobile.addEventListener('click', onBackdropClick);
  function onBackdropClick(event) {
    if (event.currentTarget === event.target) {
      formMobile.classList.remove('sideform-active');
      document.querySelector('body').style.overflow = 'auto';
    }
  }
  // Mobile phone menu end

  const btnCallMenu = document.querySelectorAll('.js-call');
  const btnClose = document.querySelectorAll('.js-close');
  const formCall = document.querySelector('.sideform');
  const formGratitude = document.querySelector('.form-gratitude');
  const btnForm = document.querySelectorAll('form-button-js');

  btnCallMenu.forEach(el => el.addEventListener('click', () => {
    formCall.classList.toggle('sideform-active');
    document.querySelector('body').style.overflow = 'hidden';
  }));

  btnClose.forEach(el => el.addEventListener('click', () => {
    formCall.classList.remove('sideform-active');
    document.querySelector('body').style.overflow = 'auto';
  }));
  btnClose.forEach(el => el.addEventListener('click', () => {
    formGratitude.classList.remove('sideform-active');
    document.querySelector('body').style.overflow = 'auto';
  }));
  btnForm.forEach(el => el.addEventListener('click', () => {
    formGratitude.classList.remove('sideform-active');
    document.querySelector('body').style.overflow = 'auto';
  }));

  document.querySelector('.js-menu-main').addEventListener('click', ({ target }) => {
    if (target.tagName === 'a') {
      return;
    }
    menuClose.click();
  });
}

const placeholderForm = document.querySelector('.js-placeholder-form');
const inputForm = document.querySelector('.js-input-form');

placeholderForm.addEventListener('click', () => {
  placeholderForm.style.display = 'none';
});
inputForm.addEventListener('focus', ({ target }) => {
  // console.log(target.value);
  placeholderForm.style.display = 'none';
});
inputForm.addEventListener('blur', ({ target }) => {
  // console.log(target.value);
  if (target.value.match(/\d/g) === null) {
    placeholderForm.style.display = '';
  }
});

//
// function menuOpen(menu) {
//   const menuEl = menu;
//   menuEl.style.visibility = 'visible';
//   menuEl.classList.add('menu__active');
//   const createAnimation = (links, translateY = 0, delay = 0) => {
//     links.forEach((link, i) => {
//       // eslint-disable-next-line no-undef
//       gsap.from(link, {
//         delay: delay + i / 25,
//         y: translateY,
//         skewX: 15,
//         opacity: 0,
//       });
//     });
//   };
// }
// const links1 = menu.querySelectorAll('[data-animation1]');
// // const links2 = menu.querySelectorAll('[data-animation2]');
// // const links3 = menu.querySelectorAll('[data-animation3]');
// createAnimation(links1, 70, 0.05);
// // createAnimation(links2, 70, 0.15);
// // createAnimation(links3, 70, 0.25);

// function menuInit() {
//   const menu = document.querySelector('[data-menu]');
//   menuOpen.addEventListener('click', () => menuOpen(menu));
//   // document.querySelector('[data-close-menu]').addEventListener('click', () => menuClose(menu));
// }
