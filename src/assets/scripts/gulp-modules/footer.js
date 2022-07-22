const socialItem = document.querySelectorAll('.footer-social__item');
const socialLink = document.querySelectorAll('.footer-social__link');

socialItem.forEach(el => el.addEventListener('mouseenter', () => {
  el.style.backgroundColor = '#fff';
  // socialItem.forEach(el => (el.style.backgroundColor = '#ffffff'));
}));

socialItem.forEach(el => el.addEventListener('mouseleave', () => {
  el.style.backgroundColor = '';
  // socialItem.forEach(el => (el.style.backgroundColor = ''));
}));
