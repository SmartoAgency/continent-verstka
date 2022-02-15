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
        return (item[filterValue] >= min && item[filterValue] <= max) ? 1 : 0;
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

    console.log(this.validItems.length);
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
          if (this.filterData[item.dataset.filterItem].has(item.value)) {
            this.filterData[item.dataset.filterItem].delete(item.value);
          } else {
            this.filterData[item.dataset.filterItem].add(item.value);
          }
        } else {
          this.filterData[item.dataset.filterItem] = item.value;
        }
        console.log(this.filterData);
        this.filter();
      });
    });
  }
}
