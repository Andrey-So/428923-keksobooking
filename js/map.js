'use strict';

(function () {
  var DEFAULT_COUNT = 8;
  var ROOMS = {
    0: [2],
    1: [1, 2],
    2: [0, 1, 2],
    3: [3]
  };
  var MIN_CURRENT_Y = 100;
  var MAX_CURRENT_Y = 500;
  var MIN_CURRENT_X = 0;
  var MAX_CURRENT_X = 1200;
  var PRICES = {
    types: ['flat', 'bungalo', 'house', 'palace'],
    minPrices: [1000, 0, 5000, 10000]
  };
  var timeIn = document.querySelector('#timein');
  var timeOut = document.querySelector('#timeout');
  var typeOfHousing = document.querySelector('#type');
  var minPrice = document.querySelector('#price');
  var roomNubmer = document.querySelector('#room_number');
  var address = document.querySelector('#address');
  var startCoords = {
    x: 0,
    y: 0
  };

  window.announcements = window.data.getAnnouncements(DEFAULT_COUNT);

  window.mapPinMain.addEventListener('mouseup', window.form.globalActivation);
  window.mapPins.addEventListener('click', window.pin.onPinClick);
  window.form.capacityShow(ROOMS[0]);

  var syncValues = function (dstObject, dstValue) {
    for (var i = 0; i < dstObject.length; i++) {
      if (dstObject[i].value === dstValue) {
        dstObject.selectedIndex = i;
      }
    }
  };

  timeIn.addEventListener('change', function () {
    window.synchronizeFields(timeIn, timeOut, window.map.getOptionValuesInSelect(timeIn), syncValues);
  });

  timeOut.addEventListener('change', function () {
    window.synchronizeFields(timeOut, timeIn, window.map.getOptionValuesInSelect(timeOut), syncValues);
  });

  var syncValueWithMin = function (dstObject, dstValue) {
    PRICES.types.forEach(function (value, i) {
      if (value === dstValue) {
        dstObject.min = PRICES.minPrices[i];
      }
    });
  };

  typeOfHousing.addEventListener('change', function () {
    window.synchronizeFields(typeOfHousing, minPrice, window.map.getOptionValuesInSelect(typeOfHousing), syncValueWithMin);
  });

  roomNubmer.addEventListener('change', function () {
    window.form.capacityShow(ROOMS[roomNubmer.selectedIndex]);
  });

  function onLoad(response) {
    console.log(response);
  };

  window.load(onLoad, onerror);

  window.map = {
    onMouseDown: function (evt) {
      evt.preventDefault();
      startCoords = {
        x: evt.clientX,
        y: evt.clientY
      };
      document.addEventListener('mousemove', window.map.onMouseMove);
      document.addEventListener('mouseup', window.map.onMouseUp);
    },

    onMouseMove: function (moveEvt) {
      moveEvt.preventDefault();
      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      var currentCoords = {
        x: window.mapPinMain.offsetLeft - shift.x,
        y: window.mapPinMain.offsetTop - shift.y
      };

      if (currentCoords.y >= MIN_CURRENT_Y && currentCoords.y <= MAX_CURRENT_Y &&
        currentCoords.x >= MIN_CURRENT_X && currentCoords.x <= MAX_CURRENT_X) {
        window.mapPinMain.style.top = currentCoords.y + 'px';
        window.mapPinMain.style.left = currentCoords.x + 'px';
        address.value = 'x: ' + currentCoords.x + ', y: ' + currentCoords.y;
      }
    },

    onMouseUp: function () {
      document.removeEventListener('mousemove', window.map.onMouseMove);
      document.removeEventListener('mouseup', window.map.onMouseUp);
    },

    getOptionValuesInSelect: function (select) {
      var selectOptions = select.querySelectorAll('option');
      return Array.prototype.map.call(selectOptions, function (obj) {
        return obj.getAttribute('value');
      });
    },
  };
})();
