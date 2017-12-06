'use strict';

var TITLES = [['Большая уютная квартира', 'flat'],
  ['Маленькая неуютная квартира', 'flat'],
  ['Огромный прекрасный дворец', ''],
  ['Маленький ужасный дворец', ''],
  ['Красивый гостевой домик', 'house'],
  ['Некрасивый негостеприимный домик', 'house'],
  ['Уютное бунгало далеко от моря', 'bungalo'],
  ['Неуютное бунгало по колено в воде', 'bungalo']];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var IMAGES = ['01', '02', '03', '04', '05', '06', '07', '08'];
var ESC_KEYCODE = 27;
var map = document.querySelector('.map');
var mapPins = document.querySelector('.map__pins');
var mapPinMain = document.querySelector('.map__pin--main');
var noticeForm = document.querySelector('.notice__form');
var DEFAULT_COUNT = 8;
var previousActivePin;
var timeIn = document.querySelector('#timein');
var timeOut = document.querySelector('#timeout');
var typeOfHousing = document.querySelector('#type');
var minPrice = document.querySelector('#price');
var capacity = document.querySelector('#capacity');
var roomNubmer = document.querySelector('#room_number');

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomElement(array) {
  var rnd = Math.floor(Math.random() * array.length);
  var ret = array[rnd];
  array.splice(rnd, 1);
  return ret;
}

function getFeaturesMap(item) {
  if (Math.round(Math.random())) {
    return item;
  }
  return null;
}

var getFeatures = function () {
  return FEATURES.map(getFeaturesMap);
};

var getAnnouncement = function () {
  var x = getRandomInt(300, 900);
  var y = getRandomInt(100, 500);
  var price = getRandomInt(1000, 1000000);
  var rooms = getRandomInt(1, 5);
  var guests = getRandomInt(1, 10);
  var checkin = getRandomInt(12, 14) + ':00';
  var checkout = getRandomInt(12, 14) + ':00';
  var typeAndTitle = getRandomElement(TITLES);
  var imageDigit = getRandomElement(IMAGES);
  var features = getFeatures();
  return {
    author: {
      avatar: 'img/avatars/user' + imageDigit + '.png'
    },
    offer: {
      title: typeAndTitle[0],
      address: x + ', ' + y,
      price: price,
      type: typeAndTitle[1],
      rooms: rooms,
      guests: guests,
      checkin: checkin,
      checkout: checkout,
      features: features,
      description: '',
      photos: []
    },
    location: {
      x: x,
      y: y
    }
  };
};

var getAnnouncements = function (thisCount) {
  var announcements = [];
  for (var i = 0; i < thisCount; i++) {
    announcements.push(getAnnouncement());
  }
  return announcements;
};

var getPin = function (i) {
  var pin = document.createElement('button');
  var data = announcements[i];
  pin.className = 'map__pin';
  pin.style.left = data.location.x - 20 + 'px';
  pin.style.top = data.location.y + 40 + 'px';
  pin.innerHTML = '<img src=\"' + data.author.avatar + '\" width=\"40\" height=\"40\" draggable=\"false\">';
  pin.id = i;
  return pin;
};

var announcements = getAnnouncements(DEFAULT_COUNT);

var createMapInfo = function (i) {
  var template = document.getElementsByTagName('template');
  var beforeElement = document.querySelector('.map__filters-container');
  var mapInfo = document.createElement('div');
  var thisAnnouncement = announcements[i];
  mapInfo.className = 'map__info';
  mapInfo.innerHTML = template[0].innerHTML;
  mapInfo.querySelector('h3').textContent = thisAnnouncement.offer.title;
  mapInfo.querySelector('small').textContent = thisAnnouncement.offer.address;
  mapInfo.querySelector('.popup__price').innerHTML = thisAnnouncement.offer.price + ' &#x20bd;/ночь';
  mapInfo.querySelector('h4').textContent = thisAnnouncement.offer.type;
  mapInfo.querySelector('h4 + p').textContent = thisAnnouncement.offer.rooms + ' для ' + thisAnnouncement.offer.guests + ' гостей';
  mapInfo.querySelector('h4 + p + p').textContent = 'Заезд после ' + thisAnnouncement.offer.checkin + ', выезд до ' + thisAnnouncement.offer.checkout;
  var mapFeatures = mapInfo.querySelector('.popup__features');
  var deleteElements = mapInfo.querySelectorAll('.feature');
  deleteElements.forEach(function (element, index) {
    mapFeatures.removeChild(deleteElements[index]);
  });
  thisAnnouncement.offer.features.forEach(function (feature) {
    if (feature) {
      var newLi = document.createElement('li');
      newLi.className = 'feature feature--' + feature;
      mapFeatures.appendChild(newLi);
    }
  });
  mapInfo.querySelector('.popup__features + p').textContent = thisAnnouncement.offer.description;
  mapInfo.querySelector('.popup__avatar').src = thisAnnouncement.author.avatar;
  map.insertBefore(mapInfo, beforeElement);
  document.addEventListener('keydown', mapInfoClose);
  var popupClose = document.querySelector('.popup__close');
  popupClose.addEventListener('click', mapInfoClose);
};

var mapInfoClose = function (evt) {
  if ((evt.keyCode === ESC_KEYCODE) || (evt.type === 'click')) {
    deactiveteOldPin();
    document.removeEventListener('keydown', mapInfoClose);
    document.removeEventListener('click', mapInfoClose);
  }
};

var showPins = function () {
  for (var i = 0; i < DEFAULT_COUNT; i++) {
    var mapPin = getPin(i);
    mapPins.appendChild(mapPin);
  }
};

var removeMapInfo = function () {
  var mapInfo = document.querySelector('.map__info');
  if (mapInfo) {
    map.removeChild(mapInfo);
  }
};

var activateNewPin = function (evt) {
  if (evt.classList[0] === 'map__pin') {
    evt.classList.add('map__pin--active');
    if (evt.id) {
      createMapInfo(evt.id);
    }
  }
};

var deactiveteOldPin = function () {
  if (previousActivePin) {
    previousActivePin.remove('map__pin--active');
    removeMapInfo();
  }
};

var onPinClick = function (evt) {
  var currentActivePin;
  if (evt.target.localName === 'img') {
    currentActivePin = evt.target.parentElement;
  } else {
    currentActivePin = evt.target;
  }
  deactiveteOldPin();
  activateNewPin(currentActivePin);
  previousActivePin = currentActivePin.classList;
};

var activation = function () {
  map.classList.remove('map--faded');
  noticeForm.classList.remove('notice__form--disabled');
  mapPinMain.removeEventListener('mouseup', activation);
  showPins();
};

var capacityShow = function (zero, one, two, three) {
  capacity[0].hidden = !zero;
  capacity[1].hidden = !one;
  capacity[2].hidden = !two;
  capacity[3].hidden = !three;
  var i = 0;
  do {
    i++;
  } while (capacity[i].hidden === true);
  capacity.selectedIndex = i;
};

mapPinMain.addEventListener('mouseup', activation);
mapPins.addEventListener('click', onPinClick);
capacityShow(false, false, true, false);

timeIn.addEventListener('change', function () {
  timeOut.selectedIndex = timeIn.selectedIndex;
}, false);

timeOut.addEventListener('change', function () {
  timeIn.selectedIndex = timeOut.selectedIndex;
}, false);

typeOfHousing.addEventListener('change', function () {
  switch (typeOfHousing.selectedIndex) {
    case 0:
      minPrice.min = 1000;
      break;
    case 1:
      minPrice.min = 0;
      break;
    case 2:
      minPrice.min = 5000;
      break;
    case 3:
      minPrice.min = 10000;
      break;
    default:
      minPrice.min = 0;
  }
});

roomNubmer.addEventListener('change', function () {
  switch (roomNubmer.selectedIndex) {
    case 0:
      capacityShow(false, false, true, false);
      break;
    case 1:
      capacityShow(false, true, true, false);
      break;
    case 2:
      capacityShow(true, true, true, false);
      break;
    case 3:
      capacityShow(false, false, false, true);
      break;
    default:
      capacityShow(true, true, true, true);
      break;
  }
});
