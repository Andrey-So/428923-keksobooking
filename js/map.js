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
var announcement = [];
var announcementAuthor = [];
var announcementOffer = [];
var announcementLocation = [];
var fragment = document.createDocumentFragment();
var mapPins = document.querySelector('.map__pins');
var parent = document.querySelector('.map');
parent.classList.remove('map--faded');
var template = document.getElementsByTagName('template');
var beforeElement = document.querySelector('.map__filters-container');

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
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
  var checkin = getRandomInt(12, 14) + ':00';
  var checkout = getRandomInt(12, 14) + ':00';
  var typeAndTitle = getRandomElement(TITLES);
  var features = [];
  var featuresCopy = FEATURES.slice();
  var featuresCount = getRandomInt(1, featuresCopy.length);
  for (var j = 0; j < featuresCount; j++) {
    features.push(getRandomElement(featuresCopy));
  }
  var imageDigit = getRandomElement(IMAGES);
  announcementAuthor[i] = {
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
    author: announcementAuthor,
    offer: announcementOffer,
    location: announcementLocation
  };
  var newElement = document.createElement('button');
  newElement.className = 'map__pin';
  newElement.style = 'left: ' + (x + 40) + 'px; top: ' + (y + 20) + 'px;';
  newElement.innerHTML = '<img src=\"' + announcementAuthor[i].avatar + '\" width=\"40\" height=\"40\" draggable=\"false\">';
  fragment.appendChild(newElement);
}
mapPins.appendChild(fragment);

newElement = document.createElement('div');
newElement.className = 'map__info';
newElement.innerHTML = template[0].innerHTML;
var replaceElement = newElement.getElementsByTagName('h3');
replaceElement[0].innerText = announcement.offer[0].title;
replaceElement = newElement.getElementsByTagName('small');
replaceElement[0].innerText = announcement.offer[0].address;
replaceElement = newElement.querySelector('.popup__price');
replaceElement.innerText = announcement.offer[0].price + '₽/ночь';
replaceElement = newElement.getElementsByTagName('h4');
replaceElement[0].innerText = announcement.offer[0].type;
replaceElement = newElement.getElementsByTagName('p')[2];
replaceElement.innerText = announcement.offer[0].rooms + ' для ' + announcement.offer[0].guests + ' гостей';
replaceElement = newElement.getElementsByTagName('p')[3];
replaceElement.innerText = 'Заезд после ' + announcement.offer[0].checkin + ', выезд до ' + announcement.offer[0].checkout;
var parentFeatures = newElement.querySelector('.popup__features');
var deleteElements = newElement.querySelectorAll('.feature');
deleteElements.forEach(function (element, index) {
  parentFeatures.removeChild(deleteElements[index]);
});
announcement.offer[0].features.forEach(function (feature) {
  var newLi = document.createElement('li');
  newLi.className = 'feature feature--' + feature;
  parentFeatures.appendChild(newLi);
});
replaceElement = newElement.getElementsByTagName('p')[4];
replaceElement.innerText = announcement.offer[0].description;
parent.insertBefore(newElement, beforeElement);
replaceElement = newElement.querySelector('.popup__avatar');
replaceElement.outerHTML = '<img src=\"' + announcement.author[0].avatar + '\" class=\"popup__avatar\" width=\"70\" height=\"70\">';
