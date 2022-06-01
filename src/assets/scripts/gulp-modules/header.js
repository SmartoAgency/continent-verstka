function handleHeader(scroller) {
  const header = document.querySelector('.js-header');
  header.state = 'open';
  let prevScrollPosition = 0;
  scroller.on('scroll', ({ scroll }) => {
    const tempState = prevScrollPosition > scroll.y ? 'open' : 'close';
    prevScrollPosition = scroll.y;
    // console.log(tempState);
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
      // gsap.to(header, { yPercent: 0 });
      header.classList.remove('not-on-top');
      headerBottom.classList.remove('active-header-menu');
    },
    close: () => {
      // gsap.to(header, { yPercent: -100 });
      header.classList.add('not-on-top');
      headerBottom.classList.add('active-header-menu');
    },
    transparent: () => {
      // gsap.to(header, { yPercent: 0 });
      // header.classList.add('transparent');
      // headerBottom.classList.add('active-header-menu');
    },
    untransparent: () => {
      // gsap.to(header, { yPercent: -100 });
      // header.classList.remove('transparent');
      // headerBottom.classList.remove('active-header-menu');
    },
  };
}
handleHeader(locoScroll);
