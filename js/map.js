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

var getFeatures = function () {
  var features = [];
  var featuresCopy = FEATURES.slice();
  var featuresCount = getRandomInt(1, featuresCopy.length);
  for (var j = 0; j < featuresCount; j++) {
    features.push(getRandomElement(featuresCopy));
  }
  return features;
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

for (var i = 0; i < count; i++) {
  var mapPin = getPin();
  mapPins.appendChild(mapPin);
}

// var template = document.getElementsByTagName('template');
// var beforeElement = document.querySelector('.map__filters-container');

// var mapInfo = document.createElement('div');
// mapInfo.className = 'map__info';
// mapInfo.innerHTML = template[0].innerHTML;
// mapInfo.querySelector('h3').textContent = announcement.offer[0].title;
// mapInfo.querySelector('small').textContent = announcement.offer[0].address;
// mapInfo.querySelector('.popup__price').innerHTML = announcement.offer[0].price + ' &#x20bd;/ночь';
// mapInfo.querySelector('h4').textContent = announcement.offer[0].type;
// mapInfo.querySelector('h4 + p').textContent = announcement.offer[0].rooms + ' для ' + announcement.offer[0].guests + ' гостей';
// mapInfo.querySelector('h4 + p + p').textContent = 'Заезд после ' + announcement.offer[0].checkin + ', выезд до ' + announcement.offer[0].checkout;
// var mapFeatures = mapInfo.querySelector('.popup__features');
// var deleteElements = mapInfo.querySelectorAll('.feature');
// deleteElements.forEach(function (element, index) {
//   mapFeatures.removeChild(deleteElements[index]);
// });
// announcement.offer[0].features.forEach(function (feature) {
//   var newLi = document.createElement('li');
//   newLi.className = 'feature feature--' + feature;
//   mapFeatures.appendChild(newLi);
// });
// mapInfo.querySelector('.popup__features + p').textContent = announcement.offer[0].description;
// mapInfo.querySelector('.popup__avatar').src = announcement.author[0].avatar;
// map.insertBefore(mapInfo, beforeElement);
