// /* eslint-disable no-undef */
// async function newsFilter() {
//   let request = await fetch('./static/test-news.json');
//   request = await request.json();

//   const filterConfig = new FilterConfig();
//   filterConfig.importContent(request);
//   const filteredList = new FilteredList({
//     customTemplate: (data) => {
//       const {
//         date, title, img, type, complex,
//       } = data;
//       return `
//         <li class="news-item"> <a class="news-link" href="single-news.html">
//           <div class="news-img"> <img src="${img}" alt=""></div>
//           <div class="news-text">
//             <h5 class="date">${date}</h5>
//             <h4 class="title">${title}</h4>
//           </div>
//           <ul class="markers">
//             <li ${type === 'promotion' ? '' : 'style="display: none"'} class="markers-item">${type}</li>
//             <li class="markers-item">${complex}</li>
//           </ul></a>
//         </li>
//       `;
//     },
//   });
//   filteredList.import(filterConfig.filter());
//   window.addEventListener('filtering', () => {
//     filteredList.import(filterConfig.filter());
//   });
// }

// newsFilter();


/* eslint-disable no-undef */
async function newsFilter() {
  const url = window.location.href.match(/localhost/) ? './static/test-news.json' : '/wp-admin/admin-ajax.php';
  const sendData = new FormData();
  sendData.append('action', 'news');
  let request = await fetch(url, {
    body: sendData,
    method: 'POST',
  });
  request = await request.json();

  const filterConfig = new FilterConfig();
  filterConfig.importContent(request);
  const filteredList = new FilteredList({
    customTemplate: (data) => {
      const {
        date, title, img, type, complex,
      } = data;
      return data.layout;
    },
  });
  filteredList.import(filterConfig.filter());
  window.addEventListener('filtering', () => {
    filteredList.import(filterConfig.filter());
  });
}

newsFilter();

document.querySelectorAll('[data-mobile-filter]').forEach((el) => {
  const elementForClick = document.querySelector(`[for="${el.dataset.mobileFilter}"]`);
  el.addEventListener('click', (evt) => {
    document.querySelectorAll('[data-mobile-filter]').forEach($el => $el.classList.remove('check'));
    // document.querySelector('.check[data-mobile-filter]').classList.remove('check');
    el.classList.add('check');
    elementForClick.click();
  });
});
document.querySelectorAll('[data-mobile-select]').forEach((el) => {
  el.addEventListener('click', (evt) => {
    document.querySelectorAll('[data-mobile-select]').forEach($el => $el.classList.remove('check'));
    el.classList.add('check');
    $(`[data-value="${el.dataset.mobileSelect}"]`).closest('.select').find('.new-select').trigger('click');
    $(`[data-value="${el.dataset.mobileSelect}"]`).trigger('click');
    console.log($(`[data-value="${el.dataset.mobileSelect}"]`));
    console.log($(`[data-value="${el.dataset.mobileSelect}"]`).closest('.select').find('.new-select'));
    // elementForClick.dispatchEvent(new Event('click'));
  });
});
