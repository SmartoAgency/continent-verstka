document.querySelector('.planing').style.display = 'none';
document.querySelector('.planing-filter__close .nav__call-btn').addEventListener('click', (evt) => {
  document.querySelector('.planing').style.display = '';
});

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

  filte1r.importContent(DATA);

  function handleRangeResultsAndFilter() {
    const { from } = $('[name="all_room"]').data('ionRangeSlider').result;
    const { to } = $('[name="all_room"]').data('ionRangeSlider').result;
    filte1r.importFilterData('all__room', `${from}~${to}`);
    filteredList.import(filte1r.filter());
  }
  const deb_handleRangeResultsAndFilter = debounce(handleRangeResultsAndFilter, 500);
  $('[name="all_room"]').on('change', deb_handleRangeResultsAndFilter);

  window.addEventListener('filtering', deb_handleRangeResultsAndFilter);
}

filterInit();
