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
    this.customTemplate = props.customTemplate || null;
    this.initialPortionForRender = 12;
    this.portionForRender = 12;
    this.startIndex = 0;
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
    this.startIndex = 0;
    this.portionForRender = this.initialPortionForRender;
    this.$container.scrollTo(0, 0);
    document.querySelectorAll('[data-filtered-list-sum]').forEach((el) => {
      el.textContent = this.data.length;
    });
    this.$container.innerHTML = '';
    const arrayOfData = Object.entries(this.preparedData);
    for (let i = 0; i < this.portionForRender; i++) {
      const day = arrayOfData[i];
      if (day === undefined) break;
      this.$container.insertAdjacentHTML(
        'beforeend',
        this.getTemplate(day[1]),
      );
    }

    this.startIndex = this.portionForRender;
    this.portionForRender += this.portionForRender;

    // console.log(this.$container.lastElementChild);
    this.$container.lastElementChild && this.addIntersectionOnceWithCallback(this.$container.lastElementChild, () => {
      this.additionalRender();
    });
  }

  addIntersectionOnceWithCallback(el, cb = () => {}) {
    const image = el;
    const target = image;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          cb();
          observer.unobserve(target);
        }
      });
    }, {
      rootMargin: '0px',
      threshold: 0.1,
    });
    observer.observe(target);
  }

  additionalRender() {
    const arrayOfData = Object.entries(this.preparedData);
    for (let i = this.startIndex; i < this.portionForRender; i++) {
      const day = arrayOfData[i];
      if (day === undefined) break;
      this.$container.insertAdjacentHTML(
        'beforeend',
        this.getTemplate(day[1]),
      );
    }
    this.startIndex = this.portionForRender;
    this.portionForRender += this.portionForRender;
    this.addIntersectionOnceWithCallback(this.$container.lastElementChild, () => {
      this.additionalRender();
    });
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
