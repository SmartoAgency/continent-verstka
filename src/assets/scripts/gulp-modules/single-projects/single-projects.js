/* eslint-disable no-undef */

gsap.registerPlugin(ScrollTrigger);
locoScroll.on('scroll', () => {
  // eslint-disable-next-line no-unused-expressions
  ScrollTrigger.update;
});
const pageContainer = document.querySelector('.page__inner');
ScrollTrigger.scrollerProxy(pageContainer, {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {
      top: 0, left: 0, width: window.innerWidth, height: window.innerHeight,
    };
  },
  pinType: document.querySelector('.page__inner').style.transform ? 'transform' : 'fixed',
});


ScrollTrigger.addEventListener('fixed', () => locoScroll.update());
ScrollTrigger.refresh();

gsap.timeline({
  scrollTrigger: {
    trigger: '.our-philosophy',
    scrub: true,
    scroller: pageContainer,
  },
})
  .fromTo('.our-philosophy h2', {
    xPercent: -120,
  }, {

    xPercent: 30,
  });
