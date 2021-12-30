function handleVisibilityOnScroll(elems = [], direction = 'up') {
  elems.forEach((elem) => {
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
// locoScroll.on('scroll', position => {
//   if (position.scroll.y > 50) {
//     handleVisibilityOnScroll([[header, 'not-on-top']], 'down');
//   } else {
//     handleVisibilityOnScroll([[header, 'not-on-top']]);
//   }
// });

const arrowDown = document.querySelector('.js-scroll-down');
locoScroll.on('scroll', (position) => {
  if (position.scroll.y > 90) {
    handleVisibilityOnScroll([[arrowDown, 'scroll-down']], 'down');
  } else {
    handleVisibilityOnScroll([[arrowDown, 'scroll-down']]);
  }
});
