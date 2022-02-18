class Favorites {
  constructor(props) {
    this.storageKey = 'favorites';
    this.favorites = JSON.parse(localStorage.getItem(this.storageKey)) || [];
    this.$container = props.$containerOfElements || window;
    this.onChangeFavoritesData = props.onChangeFavoritesData || function () {};
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
      if (isChecked) {
        this.favorites.push(elementId);
        this.moveToFavouriteEffectHandler(evt.target.closest('.add-favourite'), false);
        this.onChangeFavoritesData(true);
        this.saveToStorage();
        return;
      }
      this.moveToFavouriteEffectHandler(evt.target.closest('.add-favourite'), true);
      this.favorites = this.favorites.filter(el => el !== elementId);
      this.onChangeFavoritesData(false);
      this.saveToStorage();
    });
  }

  isInFavorites(id) {
    if (typeof id === 'undefined') return false;
    return this.favorites.includes(id.toString());
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
    this.favorites.forEach((id) => {
      const elForMarking = document.querySelector(`[data-id="${id}"]`);
      if (elForMarking === null) return;
      elForMarking.querySelector('input').checked = true;
    });
  }

  mutationHandler() {
    this.observer = new MutationObserver(this.debounce(this.markFavoritesItems, 2000));
    this.observer.observe(this.$container, { childList: true, subtree: true });
  }

  getBetweenDistance(animatingIcon, endPositionElement) {
    const animate = animatingIcon.getBoundingClientRect();
    const endAnimate = endPositionElement.getBoundingClientRect();
    const animateX = animate.left + (animate.width / 2);
    const animateY = animate.top + (animate.height / 2);
    const endAnimateX = endAnimate.left + (endAnimate.width / 2);
    const endAnimateY = endAnimate.top + (endAnimate.height / 2);

    return {
      x: endAnimateX - animateX,
      y: endAnimateY - animateY,
    };
  }

  moveToFavouriteEffectHandler(target, reverse) {
    const animatingIcon = target;
    const endPositionElement = document.querySelector('.header-container .realty__link');
    const distance = this.getBetweenDistance(animatingIcon, endPositionElement);
    this.animateFavouriteElement(endPositionElement, animatingIcon, distance, reverse);
  }

  getSpeedAnimateHeart(offsetObj) {
    return Math.abs(offsetObj.x) + Math.abs(offsetObj.y);
  }

  animateFavouriteElement(destination, element, distance, reverse) {
    if (gsap === undefined) return;
    const curElem = element.querySelector('svg').cloneNode(true);
    curElem.classList.add('favorite-star__pulse');
    const animatingElParams = element.getBoundingClientRect();
    document.body.insertAdjacentElement('beforeend', curElem);
    curElem.style.cssText += `
      position: fixed;
      z-index: 120;
        width:${animatingElParams.width}px;
        height:${animatingElParams.height}px;
        left:${animatingElParams.left}px;
        top:${animatingElParams.top}px;
        fill: transparent;
    `;

    // const speed = this.animationSpeed / 1000 * (this.getSpeedAnimateHeart(distance) / 850);
    const speed = 1.5;
    const tl = gsap.timeline({
      delay: 0,
      repeat: 0,
      paused: true,
      onComplete: () => {
        curElem.remove();
      },
    });
    if (reverse === true) {
      tl.from(curElem, { y: distance.y, duration: speed, ease: 'Power1.easeInOut' });
      tl.from(curElem, { x: distance.x, duration: speed, ease: 'Power1.easeInOut' }, `-=${speed}`);
    } else {
      tl.to(curElem, { y: distance.y, duration: speed, ease: 'Power1.easeInOut' });
      tl.to(curElem, { x: distance.x, duration: speed, ease: 'Power1.easeInOut' }, `-=${speed}`);
    }
    tl.set(curElem, { x: 0, y: 0 });
    tl.set(curElem, { clearProps: 'all' });
    tl.play();
  }
}
