{
  const favorites = new Favorites({
    $containerOfElements: document.querySelector('.page__inner'),
  });
  const addFavouriteButton = document.querySelector('.add-favourite');
  const { id } = addFavouriteButton.dataset;
  const checkboxLabel = addFavouriteButton.querySelector('.checkbox-name');
  const checkbox = addFavouriteButton.querySelector('input');
  checkbox.addEventListener('change', () => {
    if (!checkbox.checked) {
      // favorites.removeFromFavorites()
      checkboxLabel.textContent = checkboxLabel.dataset.off;
      return;
    }
    checkboxLabel.textContent = checkboxLabel.dataset.in;
  });

  setTimeout(() => {
    if (!checkbox.checked) {
      // favorites.removeFromFavorites()
      checkboxLabel.textContent = checkboxLabel.dataset.off;
      return;
    }
    checkboxLabel.textContent = checkboxLabel.dataset.in;
  }, 2100);
}


const menu = ['Планування', 'Детальне', 'На поверсі', '3д тур'];
const swiper = new Swiper('.commerce-swiper', {
  // slidesPerView: 3.5,
  // spaceBetween: 40,
  // scrollbar: {
  // el: '.swiper-scrollbar',
  // hide: true,
  // },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
    renderBullet(index, className) {
      return `<span class="${className}">${menu[index]}</span>`;
    },
  },
});

const swiper2 = new Swiper('.similar-apartment-swiper', {
  slidesPerView: 1.25,
  spaceBetween: 20,
  // scrollbar: {
  // el: '.swiper-scrollbar',
  // hide: true,
  // },
  navigation: {
    nextEl: '.swiper-button-next1',
    prevEl: '.swiper-button-prev2',
  },
  breakpoints: {
    575: {
      slidesPerView: 3.1,
      spaceBetween: 0,
    },
  },
});

document.querySelectorAll('.commerce-swiper .swiper-slide').forEach((el) => {
  console.log($(el));
  el.querySelector('.js-btn-scale').addEventListener('click', () => {
    $.magnificPopup.open({
      items: {
        src: el.querySelector('img').getAttribute('src'),
      },
      type: 'image',
      callbacks: {
        beforeOpen() {},
      },
    });
  });
});
