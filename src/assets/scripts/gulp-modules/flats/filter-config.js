class FilterConfig {
  constructor(props) {
    this.items = document.querySelectorAll('[data-filter-item]');
    this.filterData = {};
    Array.from(this.items).map(el => this.filterData[el.dataset.filterItem] = '');
    this.handleChange();
    this.contentForFilter = [];
    this.validItems = [];
    this.validationSchemas = {
      all__room: (item, filterValue) => {
        if (filterValue === '') return 1;
        const [min, max] = filterValue.split('~');
        return (item.all__room >= min && item.all__room <= max) ? 1 : 0;
      },
      date: (item, filterValue) => {
        if (filterValue === '') return 1;
        let [from, to] = filterValue.split('~');
        from = new Date(from).getTime();
        to = new Date(to).getTime();
        const dateOfEl = new Date(item.date).getTime();
        return (dateOfEl >= from && dateOfEl <= to) ? 1 : 0;
      },
    };
  }

  filter() {
    this.validItems = [];
    this.contentForFilter.forEach((flat) => {
      let validFieldsCount = 0;
      const validationDataArray = Object.entries(this.filterData);
      const validationDataLength = validationDataArray.length;
      validationDataArray.forEach((filterPoint) => {
        const name = filterPoint[0];
        const value = filterPoint[1];
        const constructor = Object.getPrototypeOf(value).constructor.name;

        switch (constructor) {
          case 'Object':
            if (value.min === '' && value.max === '') {
              validFieldsCount += 1;
              break;
            }
            if (
              value.min <= +flat[name]
                            && value.max >= +flat[name]
            ) { validFieldsCount += 1; }
            break;
          case 'Set':
            if (value.size === 0) {
              validFieldsCount += 1;
              break;
            }
            if (value.has(flat[name])) validFieldsCount += 1;
            break;
          case 'String':
            if (typeof this.validationSchemas[name] === 'function') {
              validFieldsCount += this.validationSchemas[name](flat, value);
              break;
            }
            if (value === '') {
              validFieldsCount += 1;
              break;
            }
            if (value == flat[name]) validFieldsCount += 1;
            break;
          case 'Array':
            validFieldsCount += 1;
            break;
          default:
            break;
        }
      });

      if (validFieldsCount === validationDataLength) {
        this.validItems.push(flat);
      }
    });
    return this.validItems;
  }


  importContent(data /** array of Objects */) {
    this.contentForFilter = data;
    console.log(this.contentForFilter);
    this.filter();
  }

  importFilterData(propertie, value) {
    this.filterData[propertie] = value;
    console.log(this.filterData);
    this.filter();
  }

  handleChange() {
    this.items.forEach((item) => {
      if (item.dataset.type === 'checkbox') {
        this.filterData[item.dataset.filterItem] = new Set();
      }
      item.addEventListener('change', (evt) => {
        if (item.dataset.type === 'checkbox') {
          if (this.filterData[item.dataset.filterItem].has(+item.value)) {
            this.filterData[item.dataset.filterItem].delete(+item.value);
            this.setQueryStringParameter(item.dataset.filterItem, Array.from(this.filterData[item.dataset.filterItem]).join('_'));
          } else {
            this.filterData[item.dataset.filterItem].add(+item.value);
            this.setQueryStringParameter(item.dataset.filterItem, Array.from(this.filterData[item.dataset.filterItem]).join('_'));
          }
        } else {
          this.filterData[item.dataset.filterItem] = item.value;
          this.setQueryStringParameter(item.dataset.filterItem, item.value);
        }

        this.filter();
        window.dispatchEvent(new Event('filtering'));
      });
    });
  }

  getUrlParams() {
    const array = window.location.search.replace('?', '').split('&').map(el => el.split('='));
    const obj = {};
    array.forEach(el => obj[el[0]] = el[1]);
    return obj;
  }

  setQueryStringParameter(key, value) {
    const baseUrl = [location.protocol, '//', location.host, location.pathname].join('');
    const urlQueryString = document.location.search;
    const newParam = `${key}=${value}`;
    let params = `?${newParam}`;

    // If the "search" string exists, then build params from it
    if (urlQueryString) {
      const updateRegex = new RegExp(`([\?&])${key}[^&]*`);
      const removeRegex = new RegExp(`([\?&])${key}=[^&;]+[&;]?`);

      if (typeof value === 'undefined' || value == null || value == '') {
        params = urlQueryString.replace(removeRegex, '$1');
        params = params.replace(/[&;]$/, '');
      } else if (urlQueryString.match(updateRegex) !== null) {
        params = urlQueryString.replace(updateRegex, `$1${newParam}`);
      } else { // Otherwise, add it to end of query string
        params = `${urlQueryString}&${newParam}`;
      }
    }
    window.history.replaceState({}, '', baseUrl + params);
    console.log(this.getUrlParams());
  }
}