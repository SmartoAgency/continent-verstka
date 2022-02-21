/* eslint-disable no-undef */
async function newsFilter() {
  let request = await fetch('./static/test-news.json');
  request = await request.json();

  const filterConfig = new FilterConfig();
  filterConfig.importContent(request);
  const filteredList = new FilteredList({
    customTemplate: (data) => {
      const {
        date, title, img, type, complex,
      } = data;
      return `
        <li class="news-item"> <a class="news-link" href="single-news.html">
          <div class="news-img"> <img src="${img}" alt=""></div>
          <div class="news-text">
            <h5 class="date">${date}</h5>
            <h4 class="title">${title}</h4>
          </div>
          <ul class="markers"> 
            <li ${type === 'promotion' ? '' : 'style="display: none"'} class="markers-item">${type}</li>
            <li class="markers-item">${complex}</li>
          </ul></a>
        </li>
      `;
    },
  });
  filteredList.import(filterConfig.filter());
  window.addEventListener('filtering', () => {
    filteredList.import(filterConfig.filter());
  });
}

newsFilter();
