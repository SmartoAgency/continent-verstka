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
      document.getElementById('header').classList.add('not-on-top');
    },
    close: () => {
      document.getElementById('header').classList.remove('not-on-top');
    },
    transparent: () => {
      header.classList.add('transparent');
    },
    untransparent: () => {
      header.classList.remove('transparent');
    },
  };
}
handleHeader(locoScroll);
