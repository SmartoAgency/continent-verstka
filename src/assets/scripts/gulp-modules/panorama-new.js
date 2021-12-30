/* eslint-disable no-undef */
// const panorama = document.querySelector('.panorama');
// const
const windowH = window.innerHeight;
const windowW = window.innerWidth;
const panorama = {
  big: document.querySelector('.panorama-wrapper'),
  nav: document.querySelector('.panorama__nav-scope'),
  navImg: document.querySelector('.panorama__nav-img img'),
  img: document.querySelector('.panorama__image img'),
  isAnim: false,
};
function getWidth(el) {
  return el.getBoundingClientRect().width;
}
const windowRation = windowW / windowH;
const windowWToImage = (panorama.img.getBoundingClientRect().width - windowW) / windowW;
panorama.nav.style.width = `${panorama.nav.getBoundingClientRect().height * windowRation}px`;
panorama.big.addEventListener('mousemove', ({ clientX }) => {
  if (panorama.isAnim === true) return;
  const inPercent = (clientX * 100) / windowW;
  panorama.img.style.transform = `translateX(${clientX * -windowWToImage}px)`;
  panorama.nav.style.transform = `translateX(${clientX
    * ((panorama.navImg.getBoundingClientRect().width - panorama.nav.getBoundingClientRect().width)
      / windowW)}px)`;
  panorama.nav.style.backgroundPositionX = `${inPercent}%`;
});
panorama.big.addEventListener('mouseenter', ({ clientX }) => {
  panorama.isAnim = true;
  const inPercent = (clientX * 100) / windowW;
  gsap.to(panorama.img, {
    x: clientX * -windowWToImage,
    onComplete: () => {
      panorama.isAnim = false;
    },
  });
  gsap.to(panorama.nav, {
    backgroundPositionX: `${inPercent}%`,
    x: clientX * ((getWidth(panorama.navImg) - getWidth(panorama.nav)) / windowW),
  });
});

panorama.big.addEventListener('touchmove', (event) => {
  const { clientX } = event.targetTouches[0];
  if (clientX < 0 || clientX > windowW) {
    return;
  }

  if (panorama.isAnim === true) return;
  const inPercent = (clientX * 100) / windowW;
  panorama.img.style.transform = `translateX(${clientX * -windowWToImage}px)`;
  panorama.nav.style.transform = `translateX(${clientX
    * ((panorama.navImg.getBoundingClientRect().width - panorama.nav.getBoundingClientRect().width)
      / windowW)}px)`;
  panorama.nav.style.backgroundPositionX = `${inPercent}%`;
});
