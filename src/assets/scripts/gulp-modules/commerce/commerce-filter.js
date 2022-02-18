function setQueryStringParameter(name, value) {
  const params = new URLSearchParams(window.location.search);
  params.set(name, value);
  window.history.replaceState({}, '', decodeURIComponent(`${window.location.pathname}?${params}`));
}
function getParameterByName(name, url = window.location.href) {
  name = name.replace(/[\[\]]/g, '\\$&');
  const regex = new RegExp(`[?&]${name}(=([^&#]*)|&|#|$)`);
  const results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}
function debounce(func, timeout = 300) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => { func.apply(this, args); }, timeout);
  };
}


async function commerceFilterInit() {
  let DATA = await fetch('./static/test-flat-data.json');
  DATA = await DATA.json();
  const filte1r = new FilterConfig();
  const filteredList = new FilteredList({
    data: DATA,
    customTemplate: (data) => {
      const {
        complex, action_price, all__room, life_room, deadline, id, price, rooms, terrace, two_level,
      } = data;
      return `
        <li class="planing__item" data-id="${id}">
          <a class="planing__link" href="single-commerce.html">
            <div class="planing__img"> 
              <img src="./assets/images/planing/planing3.jpg">
            </div>
            <h4 class="planing__title"><span>ЖК: </span>${complex}</h4>
            <div class="square"> 
              <svg class="icon--space" role="presentation">
                <use xlink:href="#icon-space"></use>
              </svg>
              <div class="square-description"> 
                <p class="title">Площа:</p>
                <p class="value">${all__room} м²</p>
              </div>
            </div>
            <div class="deadlines"> 
              <div class="square-description">
                <p class="title">Строки здачі</p>
                <p class="value">${deadline}</p>
              </div>
            </div>
          </a>
        </li>
      `;
    },
  });

  function onLoadActions() {
    const rangeInstance = $('[name="all_room"]').data('ionRangeSlider');
    const [from, to] = getParameterByName('all__room') ? getParameterByName('all__room').split('~') : [false, false];
    if (from) {
      rangeInstance.update({
        from,
      });
      filte1r.importFilterData('all__room', `${from}~${to}`);
    }
    if (to) {
      rangeInstance.update({
        to,
      });
      filte1r.importFilterData('all__room', `${from}~${to}`);
    }

    filteredList.import(filte1r.filter());
  }

  filte1r.importContent(DATA);
  onLoadActions();

  function handleRangeResultsAndFilter() {
    const { from } = $('[name="all_room"]').data('ionRangeSlider').result;
    const { to } = $('[name="all_room"]').data('ionRangeSlider').result;
    filte1r.importFilterData('all__room', `${from}~${to}`);

    setQueryStringParameter('all__room', `${from}~${to}`);
    filteredList.import(filte1r.filter());
  }
  const deb_handleRangeResultsAndFilter = debounce(handleRangeResultsAndFilter, 500);
  $('[name="all_room"]').on('change', deb_handleRangeResultsAndFilter);

  window.addEventListener('filtering', deb_handleRangeResultsAndFilter);
}


commerceFilterInit();
