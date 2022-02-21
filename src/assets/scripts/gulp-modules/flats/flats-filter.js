document.querySelector('.planing').style.display = 'none';
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
    timer = setTimeout(() => { func.apply(this, args); }, timeout);
  };
}


async function filterInit() {
  let DATA = await fetch('./static/test-flat-data.json');
  DATA = await DATA.json();
  const filte1r = new FilterConfig();
  const filteredList = new FilteredList({
    data: DATA,
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
  document.querySelector('.planing-filter__last-session').addEventListener('click', function (evt) {
    if (evt.target.closest('.reset-filter') !== null) {
      this.remove();
      return;
    }
    filte1r.initFilterDataFromSearchParams();
    this.remove();
  });
  function handleRangeResultsAndFilter() {
    const { from } = $('[name="all_room"]').data('ionRangeSlider').result;
    const { to } = $('[name="all_room"]').data('ionRangeSlider').result;
    filte1r.importFilterData('all__room', `${from}~${to}`);

    setQueryStringParameter('all__room', `${from}~${to}`);
    filteredList.import(filte1r.filter());
  }
  const debouncedHandleRangeResultsAndFilter = debounce(handleRangeResultsAndFilter, 500);
  $('[name="all_room"]').on('change', debouncedHandleRangeResultsAndFilter);

  window.addEventListener('filtering', debouncedHandleRangeResultsAndFilter);

  if (window.matchMedia('(max-width: 575px)').matches) {
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
      item.parentElement.querySelector('.check') && item.parentElement.querySelector('.check').classList.remove('check');
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
    buttonToClick.click();
    mobButton.counterCliker += 1;
  });
}
