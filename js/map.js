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
  }

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
}
console.log(announcementOffer)
