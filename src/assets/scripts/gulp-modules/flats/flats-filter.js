console.log('FILTER');

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


  $('[name="all_room"]').on('change', () => {
    const { from } = $('[name="all_room"]').data('ionRangeSlider').result;
    const { to } = $('[name="all_room"]').data('ionRangeSlider').result;
    filte1r.importFilterData('all__room', `${from}~${to}`);
  });
}

filterInit();
