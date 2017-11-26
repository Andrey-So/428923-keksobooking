'use strict';

var TITLES = [['Большая уютная квартира', 'flat'],
  ['Маленькая неуютная квартира', 'flat'],
  ['Огромный прекрасный дворец', 'flat'],
  ['Маленький ужасный дворец', 'flat'],
  ['Красивый гостевой домик', 'house'],
  ['Некрасивый негостеприимный домик', 'house'],
  ['Уютное бунгало далеко от моря', 'bungalo'],
  ['Неуютное бунгало по колено в воде', 'bungalo']];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var IMAGES = ['01', '02', '03', '04', '05', '06', '07', '08'];
var announcement = [];
var announcementAutor = [];
var announcementOffer = [];
var announcementLocation = [];
var fragment = document.createDocumentFragment();
var mapPins = document.querySelector('.map__pins');
var map = document.querySelector('.map');
map.classList.remove('map--faded');
var template = document.getElementsByTagName('template');
var beforeElement = document.querySelector('.map__filters-container');

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomHours(min, max) {
  return '1' + (Math.floor(Math.random() * (max - min + 1)) + min) + ':00';
}

function getRandomElement(array) {
  var rnd = Math.floor(Math.random() * array.length);
  var ret = array[rnd];
  array.splice(rnd, 1);
  return ret;
}

for (var i = 0; i < 8; i++) {
  var x = getRandomInt(300, 900);
  var y = getRandomInt(100, 500);
  var price = getRandomInt(1000, 1000000);
  var rooms = getRandomInt(1, 5);
  var guests = getRandomInt(1, 10);
  var checkin = getRandomHours(2, 4);
  var checkout = getRandomHours(2, 4);
  var typeAndTitle = getRandomElement(TITLES);
  var features = [];
  var featuresCopy = FEATURES.slice();
  var featuresCount = getRandomInt(1, featuresCopy.length)
  for (var j = 0; j < featuresCount; j++) {
    features.push(getRandomElement(featuresCopy));
  }
  var imageDigit = getRandomElement(IMAGES);
  announcementAutor[i] = {
    avatar: 'img/avatars/user' + imageDigit + '.png'
  };
  announcementOffer[i] = {
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
  };
  announcementLocation[i] = {
    x: x,
    y: y
  };
  announcement = {
    author: announcementAutor,
    offer: announcementOffer,
    location: announcementLocation
  };
  var newElement = document.createElement('button');
  newElement.className = 'map__pin';
  newElement.style = 'left: ' + (x + 40) + 'px; top: ' + (y + 20) + 'px;';
  newElement.innerHTML = '<img src=\"' + announcementAutor[i].avatar + '\" width=\"40\" height=\"40\" draggable=\"false\">';
  fragment.appendChild(newElement);
}
mapPins.appendChild(fragment);

newElement = document.createElement('div');
newElement.className = 'map__info';
newElement.innerHTML = template;

fragment = document.createDocumentFragment();
fragment.appendChild(newElement);
fragment.insertBefore(beforeElement, null);
