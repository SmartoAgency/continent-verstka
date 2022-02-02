window.onload = function() {
  document.body.classList.add('loaded_hiding');
  window.setTimeout(() => {
    document.body.classList.add('loaded');
    document.body.classList.remove('loaded_hiding');
  }, 1500);
};

const menuContainer = document.querySelector('.js-menu-container');
const menuClose = document.querySelector('.js-menu-close');
const menuOpen = document.querySelector('.js-menu-open');
const header = document.querySelector('.js-header');
const headerBottom = document.querySelector('.js-header-bottom');
menuOpen.addEventListener('click', () => {
  if (menuContainer.classList.contains('active-menu')) return;
  document.querySelector('body').style.overflow = 'hidden';
  menuContainer.classList.add('active-menu');
  // header.classList.add('menu-header');
});

menuClose.addEventListener('click', () => {
  if (!menuContainer.classList.contains('active-menu')) return;
  menuContainer.classList.remove('active-menu');
  header.classList.remove('menu-header');
  document.querySelector('body').style.overflow = 'auto';
});
