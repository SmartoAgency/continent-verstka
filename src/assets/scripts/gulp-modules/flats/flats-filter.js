document.querySelector('.planing').style.display = 'none';
document.querySelector('.planing-filter__close .nav__call-btn').addEventListener('click', (evt) => {
  const planContainer = document.querySelector('.planing');
  const planStyle = getComputedStyle(planContainer).display;
  planContainer.style.display = planStyle === 'flex' ? 'none' : 'flex';
});

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
  console.log(DATA);
  console.log(filteredList);
  console.log(filte1r);
  console.log($('[name="all_room"]').data('ionRangeSlider'));


  function onLoadActions() {
    const rangeInstance = $('[name="all_room"]').data('ionRangeSlider');
    console.log(getParameterByName('all__room'));
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

filterInit();
