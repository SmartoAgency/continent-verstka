

function noScroll() {
  document.addEventListener('DOMContentLoaded', () => {
    window.locoScroll.destroy();
  });
  let prevScrollPosition = 0;
  const headerBottom = document.querySelector('.js-header-bottom');
  /**
   * 1 - down
   * 0 - up
   */
  const onscrollHeaderActions = [
    () => {
      document.getElementById('header').classList.remove('not-on-top');
      headerBottom.classList.remove('active-header-menu');
    },
    () => {
      document.getElementById('header').classList.add('not-on-top');
      headerBottom.classList.add('active-header-menu');
    },
  ];
  window.onscroll = function (e) {
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
}
noScroll();
