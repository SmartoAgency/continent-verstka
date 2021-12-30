/* eslint-disable no-undef */
// Google map start
function func() {
  const script = document.createElement('script');
  // let key = '';
  // if (window.location.href.match(/localhost/)) key = '';
  const key = 'AIzaSyC-O8Qs2eMRsMlIgf4fZe-UzPSwn3sVbkA';
  script.src = `https://maps.googleapis.com/maps/api/js?key=${key}&callback=initMap`;
  document.getElementsByTagName('head')[0].appendChild(script);
}
// setTimeout(func, 1000);
const maps = document.querySelectorAll('.map');
const options = {
  rootMargin: '0px',
  threshold: 0.1,
};

maps.forEach((image) => {
  const callback = (entries, observer) => {
    /* Content excerpted, show below */
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const lazyImage = entry.target;
        lazyImage.src = lazyImage.dataset.src;
        observer.unobserve(image);
        func();
      }
    });
  };
  const observer = new IntersectionObserver(callback, options);
  const target = image;
  observer.observe(target);
});

// eslint-disable-next-line no-unused-vars
function initMap() {
  const gmarkers1 = [];
  const center = {
    lat: 48.465315387607184,
    lng: 35.057751142925454,
  };
  /** РњР°СЃСЃРёРІ, РєСѓРґР° Р·Р°РїРёСЃС‹РІР°СЋС‚СЃСЏ РІС‹Р±СЂР°РЅС‹Рµ РєР°С‚РµРіРѕСЂРёРё */
  const choosedCategories = new Set();
  choosedCategories.add('main');
  /** Р•Р»РµРјРµРЅС‚С‹, РїСЂРё РєР»РёРєРµ РЅР° РєРѕС‚РѕСЂС‹Р№ Р±СѓРґРµС‚ РїСЂРѕРёСЃС…РѕРґРёС‚СЊ С„РёР»СЊС‚СЂР°С†РёСЏ */
  const filterItems = document.querySelectorAll('[data-marker]');
  const map = new google.maps.Map(document.getElementById('map'), {
    zoom: 15,
    center,
    scrollwheel: false,
    navigationControl: false,
    mapTypeControl: false,
    scaleControl: false,
    draggable: true,
    language: 'en',
    styles: getMapTheme(),
  });
  const filterMarkers = function (category, categoriesArray) {
    gmarkers1.forEach((el) => {
      if (categoriesArray.has(el.category) || categoriesArray.size === 1) {
        el.setMap(map);
        el.setAnimation(google.maps.Animation.DROP);
      } else {
        el.setMap(null);
      }
    });
  };
  filterItems.forEach((item) => {
    item.addEventListener('click', (evt) => {
      evt.stopImmediatePropagation();
      item.classList.toggle('active');
      if (item.classList.contains('active')) {
        choosedCategories.add(item.dataset.category);
      } else {
        choosedCategories.delete(item.dataset.category);
      }
      filterMarkers('main', choosedCategories);
    });
  });

  // var baseFolder = '/wp-content/themes/centower/assets/images/markers/';
  const baseFolder = './assets/images/markers/';
  const defaultMarkerSize = new google.maps.Size(40, 53);
  if (document.documentElement.clientWidth < 950) {
    // defaultMarkerSize = new google.maps.Size(40, 53);
  }
  const buildLogoSize = new google.maps.Size(265, 65);
  const markersAdresses = {
    main: `${baseFolder}contacts.svg`,
    cafe: `${baseFolder}marker-cafe.svg`,
    kinder: `${baseFolder}marker-kindergarten.svg`,
    shop: `${baseFolder}marker-shop.svg`,
    sport: `${baseFolder}marker-sport.svg`,
    education: `${baseFolder}marker-education.svg`,
    meal: `${baseFolder}marker-meal.svg`,
    med: `${baseFolder}marker-medicine.svg`,
    bank: `${baseFolder}marker-bank.svg`,
  };
  const markerPopupStyle = `
        style="
        background: #2D2D2D;
        color:#fff;
        padding:5px 10px;
        font-size: 18px;
        line-height: 22px;"
        `;

  /* beautify preserve:start */
  const markersData = [
    {
      content: `<div ${markerPopupStyle}>Apricot private kindergarten</div>`,
      type: 'main',
      icon: { url: markersAdresses.main, scaledSize: buildLogoSize },
      position: { lat: 48.465315387607184, lng: 35.057751142925454 },
    },
    {
      content: `<div ${markerPopupStyle}>РЎРµСЂРµРґРЅСЏ С€РєРѕР»Р° в„–21</div>`,
      type: 'education',
      icon: { url: markersAdresses.education, scaledSize: defaultMarkerSize },
      position: { lat: 48.46599832746873, lng: 35.035520993734906 },
    },
    {
      content: `<div ${markerPopupStyle}>Specialized School в„– 71</div>`,
      type: 'education',
      icon: { url: markersAdresses.education, scaledSize: defaultMarkerSize },
      position: { lat: 48.453248601385674, lng: 35.05303045487341 },
    },
  ];
  /* beautify preserve:end */
  const infowindow = new google.maps.InfoWindow({
    content: '',
    maxWidth: 200,
  });
  markersData.forEach((marker) => {
    const category = marker.type;
    const mapMarker = new google.maps.Marker({
      map,
      category,
      zIndex: marker.zIndex || 1,
      icon: marker.icon,
      position: new google.maps.LatLng(marker.position.lat, marker.position.lng),
    });

    google.maps.event.addListener(mapMarker, 'click', function () {
      infowindow.setContent(marker.content);
      infowindow.open(map, mapMarker);
      map.panTo(this.getPosition());
    });
    mapMarker.name = marker.type;
    gmarkers1.push(mapMarker);
  });
}

window.addEventListener('load', () => {
  /** Р’С‹РґРІРёР¶РЅР°СЏ РїР°РЅРµР»СЊ РјР°СЂРєРµСЂРѕРІ РЅР° РјРѕР±РёР»СЊРЅРѕР№ РІРµСЂСЃРёРё */
  const legend = document.querySelector('[data-mob-accordeon]');
  if (legend === null) return;
  const legendTitle = legend.querySelector('.map__legend-title');
  legendTitle.addEventListener('click', () => {
    legend.classList.toggle('opened');
    // РґРѕР±Р°РІРёС‚СЊ РїР»Р°РІРЅРѕСЃС‚СЊ РїРѕСЏРІР»РµРЅРёРµ Р±Р»РѕРєР° СЃ РјР°СЂРєРµСЂР°РјРё
    // if (legend.classList.contains('opened')) {
    //   gsap.fromTo('.map__legend-markers-wrap', { height: 0 },
    //     { height: '50vh' });
    // } else {
    //   gsap.fromTo('.map__legend-markers-wrap', { height: '50vh' }, { height: 0 });
    // }
  });
  legend.addEventListener('mouseenter', () => {
    if (locoScroll !== undefined) locoScroll.stop();
  });
  legend.addEventListener('mouseleave', () => {
    if (locoScroll !== undefined) locoScroll.start();
  });
});

function getMapTheme() {
  return [
    {
      featureType: 'all',
      elementType: 'labels.icon',
      stylers: [
        {
          visibility: 'off',
        },
      ],
    },
    {
      featureType: 'landscape',
      elementType: 'all',
      stylers: [
        {
          hue: '#FFA800',
        },
        {
          gamma: 1,
        },
      ],
    },
    {
      featureType: 'poi',
      elementType: 'all',
      stylers: [
        {
          hue: '#679714',
        },
        {
          saturation: 33.4,
        },
        {
          lightness: -25.4,
        },
        {
          gamma: 1,
        },
      ],
    },
    {
      featureType: 'poi.business',
      elementType: 'labels',
      stylers: [
        {
          visibility: 'off',
        },
      ],
    },
    {
      featureType: 'poi.medical',
      elementType: 'labels',
      stylers: [
        {
          visibility: 'off',
        },
      ],
    },
    {
      featureType: 'poi.school',
      elementType: 'labels',
      stylers: [
        {
          visibility: 'off',
        },
      ],
    },
    {
      featureType: 'poi.sports_complex',
      elementType: 'labels',
      stylers: [
        {
          visibility: 'off',
        },
      ],
    },
    {
      featureType: 'road.highway',
      elementType: 'all',
      stylers: [
        {
          hue: '#53FF00',
        },
        {
          saturation: -73,
        },
        {
          lightness: 40,
        },
        {
          gamma: 1,
        },
      ],
    },
    {
      featureType: 'road.arterial',
      elementType: 'all',
      stylers: [
        {
          hue: '#FBFF00',
        },
        {
          gamma: 1,
        },
      ],
    },
    {
      featureType: 'road.local',
      elementType: 'all',
      stylers: [
        {
          hue: '#00FFFD',
        },
        {
          lightness: 30,
        },
        {
          gamma: 1,
        },
      ],
    },
    {
      featureType: 'transit.line',
      elementType: 'all',
      stylers: [
        {
          visibility: 'off',
        },
      ],
    },
    {
      featureType: 'water',
      elementType: 'all',
      stylers: [
        {
          saturation: 6,
        },
        {
          lightness: 8,
        },
        {
          gamma: 1,
        },
        {
          color: '#caefff',
        },
      ],
    },
    {
      featureType: 'water',
      elementType: 'geometry',
      stylers: [
        {
          visibility: 'on',
        },
      ],
    },
    {
      featureType: 'water',
      elementType: 'labels',
      stylers: [
        {
          visibility: 'off',
        },
      ],
    },
    {
      featureType: 'water',
      elementType: 'labels.text',
      stylers: [
        {
          visibility: 'off',
        },
      ],
    },
    {
      featureType: 'water',
      elementType: 'labels.icon',
      stylers: [
        {
          visibility: 'off',
        },
      ],
    },
  ];
}

// const openList = document.querySelector('.js-open-list');
// const titleArrow = document.querySelector('.our-projects__arrow');
// const projectsList = document.querySelector('.designations__list');

// openList.addEventListener('click', () => {
//   projectsList.classList.toggle('designations__list--open');
//   if (projectsList.classList.contains('designations__list--open')) {
//     titleArrow.style.transform = 'rotate(180deg)';
//   } else {
//     titleArrow.style.transform = '';
//   }
// });
