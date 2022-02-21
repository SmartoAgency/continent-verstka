/* eslint-disable no-unused-expressions */
/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
/** Класс отрисовывает данные с массива */
class FilteredList {
  /**
  * @param props  - Параметры.
  * @param {Array} props.data массив с обьектами данных.
  * @param {Function} props.customTemplate  - шаблон для отрисовки
  */
  constructor(props) {
    this.data = props.data || [];
    this.preparedData = [];
    this.$wrapper = document.querySelector('[data-filtered-list-wrapper]');
    this.$container = document.querySelector('[data-filtered-list]');
    this.paginationContainer = document.querySelector('[data-pagination]');
    this.customTemplate = props.customTemplate || null;
    this.initialPortionForRender = 6;
    this.portionForRender = 6;
    this.startIndex = 0;
    this.paginationActiveClassName = 'active-item';

    this.weekdays = [
      'Воскресение',
      'Понедельник',
      'Вторник',
      'Среда',
      'Четверг',
      'Пятница',
      'Суббота',
    ];
    this.data.sort((a, b) => new Date(b.date) - new Date(a.date)).reverse();

    this.prepareData();
    this.handlePagination();
  }

  addZero(n) {
    return (n < 10 ? '0' : '') + n;
  }

  getWeekdayName(indexOfDay) {
    return this.weekdays[indexOfDay];
  }

  prepareData() {
    this.preparedData = this.data;
    this.render();
  }
  /**
     * импорт данных для отрисовки.
  */

  import(data) {
    this.data = data;
    this.prepareData();
    this.render();
  }

  render() {
    this.$container.scrollTo(0, 0);
    document.querySelectorAll('[data-filtered-list-sum]').forEach((el) => {
      el.textContent = this.data.length;
    });
    this.$container.innerHTML = '';
    const arrayOfData = Object.entries(this.preparedData);
    for (let i = 0; i < this.initialPortionForRender; i++) {
      const day = arrayOfData[i];
      if (day === undefined) break;
      this.$container.insertAdjacentHTML(
        'beforeend',
        this.getTemplate(day[1]),
      );
    }

    this.renderPagination();
  }

  handlePagination() {
    const nextArrow = document.querySelector('[data-pagination-next]');
    const prevArrow = document.querySelector('[data-pagination-prev]');

    this.paginationContainer.addEventListener('click', (evt) => {
      const { target } = evt;
      if (target.closest('.pagination-item') === null) return;

      const prevActivepage = document.querySelector(`.pagination-item.${this.paginationActiveClassName}`);
      if (prevActivepage !== null) prevActivepage.classList.remove(this.paginationActiveClassName);
      target.classList.add(this.paginationActiveClassName);
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
      const { startIndex, endIndex } = target.dataset;
      prevArrow && (prevArrow.style.display = (+startIndex === 0) ? 'none' : '');
      nextArrow && (nextArrow.style.display = (+startIndex === (this.preparedData.length - 1)) ? 'none' : '');
      this.additionalRender(startIndex, endIndex);
    });
    prevArrow && prevArrow.addEventListener('click', (evt) => {
      evt.stopImmediatePropagation();
      const activeTarget = document.querySelector(`.${this.paginationActiveClassName}`);
      if (activeTarget === null) return;
      activeTarget.previousElementSibling && activeTarget.previousElementSibling.click();
    });
    nextArrow && nextArrow.addEventListener('click', (evt) => {
      evt.stopImmediatePropagation();
      const activeTarget = document.querySelector(`.${this.paginationActiveClassName}`);
      if (activeTarget === null) return;
      activeTarget.nextElementSibling && activeTarget.nextElementSibling.click();
    });
  }

  renderPagination() {
    const paginItemsCount = Math.ceil(this.preparedData.length / this.portionForRender);
    this.paginationContainer.innerHTML = '';
    if (this.preparedData.length <= this.portionForRender) return;
    for (let x = 0; x < paginItemsCount; x++) {
      this.paginationContainer.innerHTML += this.getPaginationItem({
        frontIndex: x + 1,
        startIndexRender: x * this.portionForRender,
        endRenderIndex: ((x * this.portionForRender) + this.portionForRender) - 1,
      });
    }
  }

  getPaginationItem(data) {
    return `<li 
      data-start-index="${data.startIndexRender}" 
      data-end-index="${data.endRenderIndex}" 
      index="${data.frontIndex}"
      class="pagination-item ${data.frontIndex === 1 ? this.paginationActiveClassName : ''}">${data.frontIndex}</li>`;
  }

  additionalRender(startIndex, endIndex) {
    const arrayOfData = Object.entries(this.preparedData);
    this.$container.innerHTML = '';
    for (let i = +startIndex; i <= +endIndex; i++) {
      const day = arrayOfData[i];
      if (day === undefined) break;
      this.$container.insertAdjacentHTML(
        'beforeend',
        this.getTemplate(day[1]),
      );
    }
  }

  numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  }

  getTemplate(data) {
    if (this.customTemplate) return this.customTemplate(data);
    const {
      action_price, all__room, life_room, deadline, id, price, rooms, terrace, two_level,
    } = data;
    return `
            <li class="planing__item" data-id="${id}"><a class="planing__link" href="single-flats.html?id=${id}">
            <div class="price"><span class="new-price">${this.numberWithCommas(price)} ₴</span></div>
            <div class="favorite-star">
            <div class="add-favourite">
                <label class="favourite-label">
                <input type="checkbox">
                <svg class="icon--star-circle" role="presentation">
                    <use xlink:href="#icon-star-circle"></use>
                </svg>
                </label>
            </div>
            </div>
            <div class="planing__img"> <img src="./assets/images/planing/planing1.jpg"></div>
            <h4 class="planing__title"><span>ЖК: </span>Сontinent Black</h4>
            <div class="flat-planing-container">
            <div class="square"> 
                <svg class="icon--space" role="presentation">
                <use xlink:href="#icon-space"></use>
                </svg>
                <div class="square-description"> 
                <p class="title">Площа:</p>
                <p class="value">${all__room} м²</p>
                </div>
            </div>
            <div class="square"> 
                <svg class="icon--living_space" role="presentation">
                <use xlink:href="#icon-living_space"></use>
                </svg>
                <div class="square-description"> 
                <p class="title">жила Площа:</p>
                <p class="value">${life_room} м² </p>
                </div>
            </div>
            <div class="square"> 
                <svg class="icon--room" role="presentation">
                <use xlink:href="#icon-room"></use>
                </svg>
                <div class="square-description"> 
                <p class="title">Кімнат:</p>
                <p class="value">${rooms}</p>
                </div>
            </div>
            </div>
            <div class="chekbox__container">
                ${terrace ? '<div class="checkbox"> <span class="hidden">квартира </span><span>з терасою</span></div>' : ''}
                ${two_level ? '<div class="checkbox"> <span>Дворівнева </span><span class="hidden">квартира</span></div>' : ''}
                <!-- <div class="checkbox"> <span>Дворівнева </span><span class="hidden">квартира</span></div>
                <div class="checkbox"> <span class="hidden">квартира </span><span>з терасою</span></div> -->
            </div>
            <div class="deadlines">${deadline}</div>
            <div class="prise-list"> </div></a>
        </li>
    `;
  }
}
