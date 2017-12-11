'use strict';

(function () {
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
  var DEFAULT_COUNT = 8;

  window.data = {
    getRandomInt: function (min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },

    getRandomElement: function (array) {
      var rnd = Math.floor(Math.random() * array.length);
      var ret = array[rnd];
      array.splice(rnd, 1);
      return ret;
    },

    announcements: function () {
      window.data.getAnnouncements(DEFAULT_COUNT);
    },

  getAnnouncements: function (thisCount) {
      // var announcements = [];
      for (var i = 0; i < thisCount; i++) {
        announcements.push(window.data.getAnnouncement());
      }
      return announcements;
    },

    getFeaturesMap: function (item) {
      if (Math.round(Math.random())) {
        return item;
      }
      return null;
    },

    getFeatures: function () {
      return FEATURES.map(window.data.getFeaturesMap);
    },

    getAnnouncement: function () {
      var x = window.data.getRandomInt(300, 900);
      var y = window.data.getRandomInt(100, 500);
      var price = window.data.getRandomInt(1000, 1000000);
      var rooms = window.data.getRandomInt(1, 5);
      var guests = window.data.getRandomInt(1, 10);
      var checkin = window.data.getRandomInt(12, 14) + ':00';
      var checkout = window.data.getRandomInt(12, 14) + ':00';
      var typeAndTitle = window.data.getRandomElement(TITLES);
      var imageDigit = window.data.getRandomElement(IMAGES);
      var features = window.data.getFeatures();
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
    },

    getPin: function (i) {
      var pin = document.createElement('button');
      var data = announcements[i];
      pin.className = 'map__pin';
      pin.style.left = data.location.x - 20 + 'px';
      pin.style.top = data.location.y + 40 + 'px';
      pin.innerHTML = '<img src=\"' + data.author.avatar + '\" width=\"40\" height=\"40\" draggable=\"false\">';
      pin.id = i;
      return pin;
    }
  };
})();