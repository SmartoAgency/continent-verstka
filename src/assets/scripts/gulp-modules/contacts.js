const mapOpen = document.querySelector('.js-open-map');
const mapClose = document.querySelector('.js-close-map');
const mapContainer = document.querySelector('.map-address');
mapOpen.addEventListener('click', () => {
  if (mapContainer.classList.contains('map-address-visible')) return;
  document.querySelector('body').style.overflow = 'hidden';
  mapContainer.classList.add('map-address-visible');
  mapOpen.classList.add('map-btn-open');
});

mapClose.addEventListener('click', () => {
  if (!mapContainer.classList.contains('map-address-visible')) return;
  mapContainer.classList.remove('map-address-visible');
  document.querySelector('body').style.overflow = 'auto';
  mapOpen.classList.remove('map-btn-open');
});
