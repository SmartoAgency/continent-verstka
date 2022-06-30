// document.querySelector('.planing').style.display = 'none';
document.querySelector('.planing-filter__close .nav__call-btn').style.display = 'none';
document.querySelector('.planing-filter__close .nav__call-btn').addEventListener('click', (evt) => {
  const planContainer = document.querySelector('.planing');
  const planStyle = getComputedStyle(planContainer).display;
  planContainer.style.display = planStyle === 'flex' ? 'none' : 'flex';
});
// document.querySelector('.mobile-btn-nav').addEventListener('click', (evt) => {
//   const planContainer = document.querySelector('.planing');
//   const planStyle = getComputedStyle(planContainer).display;
//   planContainer.style.display = planStyle === 'flex' ? 'none' : 'flex';
// });

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
    timer = setTimeout(() => {
      func.apply(this, args);
    }, timeout);
  };
}

async function filterInit() {
  const url = document.documentElement.dataset.mode === 'production' ? '/wp-admin/admin-ajax.php' : './static/test-flat-data.json';
  const sendData = new FormData();
  sendData.append('action', 'getFlats');
  let DATA = await fetch(url, {
    method: 'POST',
    body: sendData,
  });
  DATA = await DATA.json();
  DATA = DATA.map((el) => {
    el.rooms = +el.rooms;
    return el;
  });
  const filte1r = new FilterConfig();
  const filteredList = new FilteredList({
    data: DATA,
  });

  function onLoadActions() {
    const rangeInstance = $('[name="area"]').data('ionRangeSlider');
    const [from, to] = getParameterByName('area')
      ? getParameterByName('area').split('~')
      : [false, false];
    if (from) {
      rangeInstance.update({
        from,
      });
      filte1r.importFilterData('area', `${from}~${to}`);
    }
    if (to) {
      rangeInstance.update({
        to,
      });
      filte1r.importFilterData('area', `${from}~${to}`);
    }

    filteredList.import(filte1r.filter());
  }

  filte1r.importContent(DATA);
  document.querySelector('.planing-filter__last-session').addEventListener('click', function (evt) {
    if (evt.target.closest('.reset-filter') !== null) {
      this.remove();
      return;
    }
    onLoadActions();
    filte1r.initFilterDataFromSearchParams();
    this.remove();
  });
  // onLoadActions();
  if (Object.keys(filte1r.getUrlParams()).length === 0) {
    document.querySelector('.planing-filter__last-session').remove();
  }
  function handleRangeResultsAndFilter() {
    const { from } = $('[name="area"]').data('ionRangeSlider').result;
    const { to } = $('[name="area"]').data('ionRangeSlider').result;
    filte1r.importFilterData('area', `${from}~${to}`);

    setQueryStringParameter('area', `${from}~${to}`);
    filteredList.import(filte1r.filter());
  }
  const debouncedHandleRangeResultsAndFilter = debounce(handleRangeResultsAndFilter, 500);
  $('[name="area"]').on('change', debouncedHandleRangeResultsAndFilter);

  window.addEventListener('filtering', debouncedHandleRangeResultsAndFilter);

  if (window.matchMedia('(max-width: 992px)').matches) {
    handleMobileSortItems();
    mobCardsTypeOfViewHandler();
  }
}

filterInit();

const favorites = new Favorites({
  $containerOfElements: document.querySelector('.page__inner'),
});

/* На мобилке имитирует клик по сортировке с десктопа */
function handleMobileSortItems() {
  const $checkitems = document.querySelectorAll('[data-sort-list-mobile] li');
  $checkitems.forEach((item) => {
    const datasetToClick = item.dataset.valueToClick;
    console.log(datasetToClick);
    item.addEventListener('click', () => {
      item.parentElement.querySelector('.check')
        && item.parentElement.querySelector('.check').classList.remove('check');
      item.classList.add('check');

      document.querySelector('[data-sort-item]').value = datasetToClick;
      document.querySelector('[data-sort-item]').dispatchEvent(new Event('change'));
      document.querySelector('.js-close-sort').dispatchEvent(new Event('click'));
    });
  });
}

function mobCardsTypeOfViewHandler() {
  const mobButton = document.querySelector('.mobile-btn-nav');
  document.querySelector('.planing').style.display = '';
  mobButton.counterCliker = 1;
  mobButton.addEventListener('click', (evt) => {
    const buttonToClick = document.querySelectorAll('.planing__nav button')[(mobButton.counterCliker % 2)];
    if (mobButton.counterCliker % 2 === 0) {
      mobButton.classList.remove('grid');
    } else {
      mobButton.classList.add('grid');
    }
    // const buttonToClick = document.querySelectorAll('.planing__nav button')[
    //   mobButton.counterCliker % 2
    // ];
    buttonToClick.click();
    mobButton.counterCliker += 1;
  });
}
