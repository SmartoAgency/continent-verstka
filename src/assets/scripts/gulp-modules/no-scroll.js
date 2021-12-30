document.addEventListener('DOMContentLoaded', () => {
  window.locoScroll.destroy();
});

window.onscroll = function () {
  scrollFunction();
};

// function scrollFunction() {
//   if (document.body.scrollTop > 90 || document.documentElement.scrollTop > 90) {
//     document.getElementById('header').classList.add('not-on-top');
//   } else {
//     document.getElementById('header').classList.remove('not-on-top');
//   }
// }
function scrollFunction() {
  if (document.body.scrollTop > 90 || document.documentElement.scrollTop > 90) {
    document.querySelector('.js-scroll-down').classList.add('scroll-down');
  } else {
    document.querySelector('.js-scroll-down').classList.remove('scroll-down');
  }
}

const buttonUp = document.querySelector('.js-btn-up');

if (buttonUp) {
  buttonUp.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  });
}
