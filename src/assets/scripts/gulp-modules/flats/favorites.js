class Favorites {
  constructor(props) {
    this.storageKey = 'favorites';
    this.favorites = JSON.parse(localStorage.getItem(this.storageKey)) || [];
    this.$container = props.$containerOfElements || window;
    this.init();
    this.mutationHandler();
  }

  init() {
    this.$container.addEventListener('click', (evt) => {
      evt.stopImmediatePropagation();
      const target = evt.target.closest('.favourite-label');
      if (evt.target.tagName !== 'INPUT' || evt.target.closest('[data-id]') === null) return;
      const elementId = evt.target.closest('[data-id]').dataset.id;
      const isChecked = evt.target.checked;
      console.log(elementId);
      if (isChecked) {
        this.favorites.push(elementId);
        this.saveToStorage();
        return;
      }
      this.favorites = this.favorites.filter(el => el !== elementId);
      this.saveToStorage();
    });
  }

  saveToStorage() {
    localStorage.setItem(this.storageKey, JSON.stringify(this.favorites));
  }

  debounce(func, timeout = 300) {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => { func.apply(this, args); }, timeout);
    };
  }

  markFavoritesItems() {
    console.log('I MArk ITEMS');
    this.favorites.forEach((id) => {
      const elForMarking = document.querySelector(`[data-id="${id}"]`);
      if (elForMarking === null) return;
      elForMarking.querySelector('input').checked = true;
      console.log(elForMarking);
    });
  }

  mutationHandler() {
    this.observer = new MutationObserver(this.debounce(this.markFavoritesItems, 2000));
    this.observer.observe(this.$container, { childList: true, subtree: true });
  }
}
