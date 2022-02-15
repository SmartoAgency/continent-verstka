const socialItem = document.querySelectorAll('.footer-social__item');
const socialLink = document.querySelectorAll('.footer-social__link');

socialLink.forEach(el => el.addEventListener('mouseenter', () => {
  el.parentElement.style.backgroundColor = '#fff';
  // socialItem.forEach(el => (el.style.backgroundColor = '#ffffff'));
}));

socialLink.forEach(el => el.addEventListener('mouseleave', () => {
  el.parentElement.style.backgroundColor = '';
  // socialItem.forEach(el => (el.style.backgroundColor = ''));
}));
