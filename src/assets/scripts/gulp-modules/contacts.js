const mapOpen = document.querySelector('.js-open-map');
const mapClose = document.querySelector('.js-close-map');
const mapContainer = document.querySelector('.map-address');
mapOpen.addEventListener('click', () => {
  if (mapContainer.classList.contains('map-address-visible')) return;
  // document.querySelector('body').style.overflow = 'hidden';
  mapContainer.classList.add('map-address-visible');
  mapOpen.classList.add('map-btn-open');
  window.addEventListener('click', function closeMap(evt) {
    if (evt.target.closest('.js-close-map') !== null) {
      window.removeEventListener('click', closeMap);
      return;
    }
    if (evt.target.closest('.map-address') !== null || evt.target.closest('.js-open-map') !== null) return;
    mapContainer.classList.remove('map-address-visible');
    // document.querySelector('body').style.overflow = 'auto';
    mapOpen.classList.remove('map-btn-open');
    window.removeEventListener('click', closeMap);
  });
});

mapClose.addEventListener('click', () => {
  if (!mapContainer.classList.contains('map-address-visible')) return;
  mapContainer.classList.remove('map-address-visible');
  // document.querySelector('body').style.overflow = 'auto';
  mapOpen.classList.remove('map-btn-open');
});
