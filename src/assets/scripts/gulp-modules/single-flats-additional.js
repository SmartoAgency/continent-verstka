const GET = (function () {
  const array = window.location.search.replace('?', '').split('&').map(el => el.split('='));
  const obj = {};
  array.forEach(el => obj[el[0]] = el[1]);
  if (obj.rooms === undefined) obj.rooms = '1';
  return obj;
}());

const favorites = new Favorites({
  $containerOfElements: document.querySelector('.single-commerce-container__description'),
  onChangeFavoritesData: (inFavorites) => {
    const favorButtonTitle = document.querySelector('.add-favourite .checkbox-name');
    favorButtonTitle.textContent = inFavorites ? favorButtonTitle.dataset.in : favorButtonTitle.dataset.off;
  },
});
const favorButtonTitle = document.querySelector('.add-favourite .checkbox-name');
favorButtonTitle.textContent = favorites.isInFavorites(GET.id) ? favorButtonTitle.dataset.in : favorButtonTitle.dataset.off;


GET.id && favorites.$container.setAttribute('data-id', GET.id);
console.log(favorites);
