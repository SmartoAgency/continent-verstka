const openList = document.querySelector('.js-open-list');
const titleArrow = document.querySelector('.our-projects__arrow');
const projectsList = document.querySelector('.designations__list');

openList.addEventListener('click', () => {
  projectsList.classList.toggle('designations__list--open');
  if (projectsList.classList.contains('designations__list--open')) {
    titleArrow.style.transform = 'rotate(180deg)';
  } else {
    titleArrow.style.transform = '';
  }
});
