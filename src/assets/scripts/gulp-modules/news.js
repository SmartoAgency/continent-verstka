const openFilter = document.querySelector('.js-open-filter');
const closeFilter = document.querySelector('.js-close-filter');
const filter = document.querySelector('.js-mobile-filter');
openFilter.addEventListener('click', () => {
  gsap.to(filter, { autoAlpha: 1, yPercent: 0 });
});
closeFilter.addEventListener('click', () => {
  gsap.to(filter, { autoAlpha: 0, yPercent: 100 });
});

const openSort = document.querySelector('.js-sort-btn');
const closeSort = document.querySelector('.js-close-sort');
const sortList = document.querySelector('.js-sort-list');
openSort.addEventListener('click', () => {
  gsap.to(sortList, { autoAlpha: 1, yPercent: 0 });
});
closeSort.addEventListener('click', () => {
  gsap.to(sortList, { autoAlpha: 0, yPercent: 100 });
});
