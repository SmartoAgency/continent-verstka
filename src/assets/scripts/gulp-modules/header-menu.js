window.onload = function() {
  document.body.classList.add('loaded_hiding');
  window.setTimeout(() => {
    document.body.classList.add('loaded');
    document.body.classList.remove('loaded_hiding');
  }, 1500);
};

const menuContainer = document.querySelector('.js-menu-container');
const menuClose = document.querySelector('.js-menu-close');
const menuOpen = document.querySelector('.js-menu-open');
const header = document.querySelector('.js-header');
const headerBottom = document.querySelector('.js-header-bottom');
menuOpen.addEventListener('click', () => {
  if (menuContainer.classList.contains('active-menu')) return;
  document.querySelector('body').style.overflow = 'hidden';
  menuContainer.classList.add('active-menu');
  // header.classList.add('menu-header');
});

menuClose.addEventListener('click', () => {
  if (!menuContainer.classList.contains('active-menu')) return;
  menuContainer.classList.remove('active-menu');
  header.classList.remove('menu-header');
  document.querySelector('body').style.overflow = 'auto';
});

// Mobile phone menu start
const btnCallMobile = document.querySelectorAll('.js-mobile-call');
const btnCloseMobile = document.querySelector('.js-mobile-close');
const formMobile = document.querySelector('.form-header-call');
// const formCallMobile = document.querySelector('.js-mobile-form');
// formCallMobile.addEventListener('click', () => {
//   formCall.classList.add('sideform-active');
//   document.querySelector('body').style.overflow = 'hidden';
// });
// console.log('aaaaa', btnCallMobile);
btnCallMobile.forEach(el =>
  el.addEventListener('click', () => {
    formMobile.classList.toggle('sideform-active');
    document.querySelector('body').style.overflow = 'hidden';
  }),
);

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

// bottom-header start
const btnBottomHeader = document.querySelectorAll('.js-mobile-bottom');
const headerList = document.querySelector('.js-header-list');

btnBottomHeader.forEach(el =>
  el.addEventListener('click', () => {
    headerList.classList.toggle('open-header-menu');
    el.classList.toggle('open-mobile-list');
    if (headerList.classList.contains('open-header-menu')) {
      document.querySelector('body').style.overflow = 'hidden';
    } else {
      document.querySelector('body').style.overflow = 'initial';
    }
  }),
);
window.locoScroll.update();
// bottom-header end

// popup-calculator
const swiper23 = new Swiper('.swiper-calculator', {
  slidesPerView: 1,
  spaceBetween: 0,
  scrollbar: {
    el: '.swiper-scrollbar13',
    // hide: true,
  },
  navigation: {
    nextEl: '.swiper-button-next13',
    prevEl: '.swiper-button-prev13',
  },
  pagination: {
    el: '.swiper-pagination13',
    type: 'fraction',
    touchStartPreventDefault: false,
    formatFractionCurrent: addZero,
    formatFractionTotal: addZero,
  },
  // breakpoints: {
  //   575: {
  //     slidesPerView: 3.5,
  //     spaceBetween: 40,
  //   },
  // },
});

function addZero(num) {
  return num > 9 ? num : `0${num}`;
}

// // timer 1 minute
var timeleft, time;
timeleft = time = 60;
$('#time').html(timeleft);
$('#timer_container').fadeTo('slow', 1);
$('#time').fadeTo('slow', 1);
var i, j, rotation, width;

for (i = 0; i < timeleft; i++) {
  document.getElementById('timer_container').innerHTML += "<div class='tictic'></div>";
}
var x = document.getElementById('timer_container');
var y = x.getElementsByTagName('div');
width = document.getElementById('timer_container').offsetWidth;
for (i = 0; i < timeleft; i++) {
  rotation = (360 / timeleft) * i;
  console.log(rotation + '\n');
  console.log(width + '\n');
  y[i].style.cssText = 'transform:rotate(' + rotation + 'deg) translate(0px, -' + width / 2 + 'px)';
}
var i = 0;
remainingtime = setInterval(function() {
  $('#time').html(timeleft);
  y[i].style.backgroundColor = '#ffffff';
  timeleft -= 1;
  i += 1;
  if (timeleft <= 0 && i >= time) {
    clearInterval(remainingtime);
    $('div').remove('.tictic');
    $('#time').html('Time out!');
  }
}, 1000);
