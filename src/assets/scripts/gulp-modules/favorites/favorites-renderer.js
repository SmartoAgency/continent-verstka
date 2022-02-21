class FavoritesRenderer {
  constructor(props) {
    this.$container = props.$containerOfElements;
    this.storageKey = 'favorites';
    this.data = props.data || [];
    this.idList = JSON.parse(localStorage.getItem(this.storageKey)) || [];
    this.onAfterRender = props.onAfterRender || function () {};
    this.onEmptyStorage = props.onEmptyStorage || function () {};
    this.onStorageWithItems = props.onStorageWithItems || function () {};
    this.handleRemoving();
    this.init();
  }

  handleRemoving() {
    this.$container.addEventListener('click', (evt) => {
      const target = evt.target.closest('.delete-slide');
      if (target === null) return;
      const idToRemove = target.closest('[data-id]').dataset.id;
      this.idList = this.idList.filter(id => id !== idToRemove);
      localStorage.setItem(this.storageKey, JSON.stringify(this.idList));
      this.render();
      // console.log(target.closest('[data-id]'));
    });
  }

  init() {
    this.render();
  }

  render() {
    const dataToRender = this.idList.map((id) => {
      const some = this.data.find(el => el.id === +id);
      return some;
    });

    if (this.idList.length === 0) this.onEmptyStorage();
    if (this.idList.length > 0) this.onStorageWithItems();

    this.$container.innerHTML = '';
    dataToRender.forEach((card) => {
      this.$container.insertAdjacentHTML('afterbegin', this.getTemplate(card));
    });
    this.onAfterRender();
  }

  getTemplate(data) {
    const {
      id, all__room, life_room, deadline, views, floor, city,
    } = data;
    return `
      <div class="swiper-slide" data-id="${id}">
        <div class="container-img">
          <div class="views"> 
            <div class="desctop">Це планування дивились </div>
            <div class="number">${views} </div>
            <div class="desctop">разів</div>
            <div class="mobile">переглядів</div>
          </div><a class="swiper-img" href="flats.html"><img src="./assets/images/planing/planing2.jpg" alt=""></a>
          <div class="delete-slide"> 
            <svg class="icon--close-select" role="presentation">
              <use xlink:href="#icon-close-select"></use>
            </svg>
          </div>
        </div>
        <ul class="parametrs-list">
          <li class="parametrs-item-mobile">Квартира</li>
          <li class="parametrs-item"> 
            <div class="flat">Квартира ${id}</div>
          </li>
          <li class="parametrs-item-mobile">Проект</li>
          <li class="parametrs-item"> 
            <div class="project">Continent Black</div>
          </li>
          <li class="parametrs-item-mobile">Заселення</li>
          <li class="parametrs-item"> 
            <div class="deadline">${deadline}</div>
          </li>
          <li class="parametrs-item-mobile">клас жк</li>
          <li class="parametrs-item"> 
            <div class="class">Комфорт</div>
          </li>
          <li class="parametrs-item title-list">
            <div class="title title-mobile">Метраж</div>
          </li>
          <li class="parametrs-item-mobile">Загальна площа</li>
          <li class="parametrs-item"> 
            <div class="total-area">${all__room} м²</div>
          </li>
          <li class="parametrs-item-mobile">Жила площа</li>
          <li class="parametrs-item"> 
            <div class="area">${life_room} м²</div>
          </li>
          <li class="parametrs-item title-list">
            <div class="title title-mobile">Розташування</div>
          </li>
          <li class="parametrs-item-mobile">Місто</li>
          <li class="parametrs-item"> 
            <div class="town">${city}</div>
          </li>
          <li class="parametrs-item-mobile">Поверх</li>
          <li class="parametrs-item"> 
            <div class="floor">${floor}</div>
          </li>
        </ul>
        <div class="realty js-call">Дізнатись ціну</div>
      </div>
    `;
  }
}
