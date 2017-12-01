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
var map = document.querySelector('.map');
var mapPins = document.querySelector('.map__pins');
var mapPinMain = document.querySelector('.map__pin--main');
var noticeForm = document.querySelector('.notice__form');
var count = 8;
var previousActivePin;

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
  return pin;
};

var announcements = getAnnouncements(count);

var createInfo = function () {
  var template = document.getElementsByTagName('template');
  var beforeElement = document.querySelector('.map__filters-container');
  var mapInfo = document.createElement('div');
  var thisAnnouncement = announcements[0];
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
};

var showPins = function () {
  for (var i = 0; i < count; i++) {
    var mapPin = getPin(i);
    mapPins.appendChild(mapPin);
  }
};

var onPinClick = function (evt) {
  var currentActivePin = evt.target.parentElement.classList;
  if (previousActivePin) {
    previousActivePin.remove('map__pin--active');
  }
  if (currentActivePin[0] === 'map__pin') {
    currentActivePin.add('map__pin--active');
    previousActivePin = evt.target.parentElement.classList;
  }
};

var activation = function () {
  map.classList.remove('map--faded');
  noticeForm.classList.remove('notice__form--disabled');
  mapPinMain.removeEventListener('mouseup', activation);
  showPins();
};

mapPinMain.addEventListener('mouseup', activation);
mapPins.addEventListener('click', onPinClick);

// createInfo();
