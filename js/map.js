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
var mapPins = document.querySelector('.map__pins');
var map = document.querySelector('.map');
map.classList.remove('map--faded');
var count = 8;

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

var getPin = function () {
  var pin = document.createElement('button');
  pin.className = 'map__pin';
  pin.style.left = announcements[i].location.x - 20 + 'px';
  pin.style.top = announcements[i].location.y + 40 + 'px';
  pin.innerHTML = '<img src=\"' + announcements[i].author.avatar + '\" width=\"40\" height=\"40\" draggable=\"false\">';
  return pin;
};

var announcements = getAnnouncements(count);

var createInfo = function () {
  var template = document.getElementsByTagName('template');
  var beforeElement = document.querySelector('.map__filters-container');
  var mapInfo = document.createElement('div');
  var offer = announcements[0].offer;
  mapInfo.className = 'map__info';
  mapInfo.innerHTML = template[0].innerHTML;
  mapInfo.querySelector('h3').textContent = offer.title;
  mapInfo.querySelector('small').textContent = offer.address;
  mapInfo.querySelector('.popup__price').innerHTML = offer.price + ' &#x20bd;/ночь';
  mapInfo.querySelector('h4').textContent = offer.type;
  mapInfo.querySelector('h4 + p').textContent = offer.rooms + ' для ' + offer.guests + ' гостей';
  mapInfo.querySelector('h4 + p + p').textContent = 'Заезд после ' + offer.checkin + ', выезд до ' + offer.checkout;
  var mapFeatures = mapInfo.querySelector('.popup__features');
  var deleteElements = mapInfo.querySelectorAll('.feature');
  deleteElements.forEach(function (element, index) {
    mapFeatures.removeChild(deleteElements[index]);
  });
  offer.features.forEach(function (feature) {
    if (feature) {
      var newLi = document.createElement('li');
      newLi.className = 'feature feature--' + feature;
      mapFeatures.appendChild(newLi);
    }
  });
  mapInfo.querySelector('.popup__features + p').textContent = offer.description;
  mapInfo.querySelector('.popup__avatar').src = announcements[0].author.avatar;
  map.insertBefore(mapInfo, beforeElement);
};

for (var i = 0; i < count; i++) {
  var mapPin = getPin();
  mapPins.appendChild(mapPin);
}

createInfo();
