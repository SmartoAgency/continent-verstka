document.addEventListener('DOMContentLoaded', () => {
  window.locoScroll.destroy();
});
let prevScrollPosition = 0;
/**
 * 1 - down
 * 0 - up
 */
const onscrollHeaderActions = [
  () => {
    document.getElementById('header').classList.remove('not-on-top');
  },
  () => {
    document.getElementById('header').classList.add('not-on-top');
  },
];
window.onscroll = function(e) {
  const currentY = window.pageYOffset;

  const direction = prevScrollPosition < currentY ? 1 : 0;

  onscrollHeaderActions[direction]();
  prevScrollPosition = currentY;
  // scrollFunction();
};

// function scrollFunction() {
//   // if (document.body.scrollTop > 150 || document.documentElement.scrollTop > 150) {
//   //   document.getElementById('header').classList.add('not-on-top');
//   // } else {
//   //   document.getElementById('header').classList.remove('not-on-top');
//   // }
// }
