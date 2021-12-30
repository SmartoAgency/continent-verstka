window.addEventListener('load', () => {
  gsap.registerPlugin(ScrollTrigger);
  /* eslint-disable no-undef */
  locoScroll.on('scroll', ScrollTrigger.update);

  ScrollTrigger.scrollerProxy(document.body, {
    scrollTop(value) {
      return arguments.length
        ? locoScroll.scrollTo(value, 0, 0)
        : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
    pinType: document.querySelector('.page__inner').style.transform ? 'transform' : 'fixed',
  });
  ScrollTrigger.addEventListener('refresh', () => locoScroll.update());

  // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
  ScrollTrigger.refresh();

  const paralaxImages = document.querySelectorAll('.advantage-content-item img');
  paralaxImages.forEach((image) => {
    const wrap = document.createElement('div');
    wrap.style.overflow = 'hidden';
    wrap.style.height = '100%';
    image.parentElement.prepend(wrap);
    gsap.set(image, { willChange: 'transform', scale: 1.1 });
    wrap.prepend(image);

    gsap
      .timeline({
        ease: 'none',
        scrollTrigger: {
          trigger: wrap,
          scrub: 0.5,
          markers: true,
          onLeave: () => {
            console.log('leave');
          },
          // markers: true,
        },
      })
      .fromTo(
        image,
        {
          y: -35,
        },
        {
          y: 35,
          ease: 'linear',
        },
      );
  });
});
