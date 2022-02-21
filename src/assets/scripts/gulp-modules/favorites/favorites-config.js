

async function favoritesPageHandler() {
  let DATA = await fetch('./static/test-flat-data.json');
  DATA = await DATA.json();
  const favorites = new FavoritesRenderer({
    onAfterRender: () => {
      window.favoritesSwiper && window.favoritesSwiper.update();
    },
    onEmptyStorage: () => {
      const wrapper = document.querySelector('.favorites-full');
      const emptyContainer = document.querySelector('.favorites-empty');
      wrapper.style.display = 'none';
      emptyContainer.style.display = '';
    },
    onStorageWithItems: () => {
      const wrapper = document.querySelector('.favorites-full');
      const emptyContainer = document.querySelector('.favorites-empty');
      wrapper.style.display = '';
      emptyContainer.style.display = 'none';
    },
    data: DATA,
    $containerOfElements: document.querySelector('.swiper-favorites .swiper-wrapper'),
  });
}

favoritesPageHandler();
