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
const socialSelect = document.querySelectorAll('.social-select');
locoScroll.on('scroll', position => {
  if (position.scroll.y > 100) {
    handleVisibilityOnScroll([[socialSelect[0], 'visible']], 'down');
    handleVisibilityOnScroll([[socialSelect[1], 'visible']], 'down');
  } else {
    handleVisibilityOnScroll([[socialSelect[1], 'visible']]);
    handleVisibilityOnScroll([[socialSelect[0], 'visible']]);
  }
});
// btn social end
