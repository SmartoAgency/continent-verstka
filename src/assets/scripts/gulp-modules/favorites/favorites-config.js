

async function favoritesPageHandler() {
  const url = document.documentElement.dataset.mode === 'production' ? '/wp-admin/admin-ajax.php' : './static/test-flat-data.json';
  const sendData = new FormData();
  sendData.append('action', 'getFlats');
  let DATA = await fetch(url, {
    method: 'POST',
    body: sendData,
  });
  DATA = await DATA.json();
  console.log(DATA);
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
