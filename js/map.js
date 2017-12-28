'use strict';

(function () {
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
  var LOW_PRICE = 10000;
  var HIGH_PRICE = 50000;
  var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var timeIn = document.querySelector('#timein');
  var timeOut = document.querySelector('#timeout');
  var typeOfHousing = document.querySelector('#type');
  var minPrice = document.querySelector('#price');
  var roomNubmer = document.querySelector('#room_number');
  var address = document.querySelector('#address');
  var submit = document.querySelector('.form__submit');
  var form = document.querySelector('.notice__form');
  var mapFilters = document.querySelector('.map__filters');
  var checkboxFilters = mapFilters.querySelectorAll('input[type="checkbox"]');
  var selectFilters = mapFilters.querySelectorAll('select');
  var startCoords = {
    x: 0,
    y: 0
  };
  var DEBOUCE_TIMEOUT = 500;
  var prevTimer;
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

  var syncValueWithMin = function (dstObject, dstValue) {
    PRICES.types.forEach(function (value, i) {
      if (value === dstValue) {
        dstObject.min = PRICES.minPrices[i];
      }
    });
  };

  timeIn.addEventListener('change', function () {
    window.synchronizeFields(timeIn, timeOut, window.map.getOptionValuesInSelect(timeIn), syncValues);
  });

  timeOut.addEventListener('change', function () {
    window.synchronizeFields(timeOut, timeIn, window.map.getOptionValuesInSelect(timeOut), syncValues);
  });

  typeOfHousing.addEventListener('change', function () {
    window.synchronizeFields(typeOfHousing, minPrice, window.map.getOptionValuesInSelect(typeOfHousing), syncValueWithMin);
  });

  roomNubmer.addEventListener('change', function () {
    window.form.capacityShow(ROOMS[roomNubmer.selectedIndex]);
  });

  submit.addEventListener('click', function (evt) {
    evt.preventDefault();
    window.save(new FormData(form), onSend, onError);
  });

  selectFilters.forEach(function (value) {
    value.addEventListener('change', function () {
      window.clearTimeout(prevTimer);
      prevTimer = window.setTimeout(function () {
        filterPins();
      }, DEBOUCE_TIMEOUT);
    });
  });

  checkboxFilters.forEach(function (value) {
    value.addEventListener('change', function () {
      window.clearTimeout(prevTimer);
      prevTimer = window.setTimeout(function () {
        filterPins();
      }, DEBOUCE_TIMEOUT);
    });
  });

  function filterPins() {
    var filter = [];
    deleteAllPins();
    selectFilters.forEach(function (value) {
      filter.push(value.selectedOptions[0].value);
    });

    checkboxFilters.forEach(function (value, i) {
      if (value.checked) {
        filter.push(FEATURES[i]);
      }
    });

    function checkType(announcementType, filterType) {
      return filterType === 'any' || filterType === announcementType;
    }

    function getCostRange(announcementPrice) {
      if (announcementPrice < LOW_PRICE) {
        return 'low';
      } else if (announcementPrice >= HIGH_PRICE) {
        return 'high';
      } else {
        return 'middle';
      }
    }

    function checkFeatures(announcementFeatures, filterFeatures) {
      return (filterFeatures.filter(function (value) {
        return announcementFeatures.includes(value);
      }).length === filterFeatures.length);
    }

    window.filtredAnnouncements = window.ANNOUNCEMENTS.filter(function (announcement) {
      return checkType(announcement.offer.type, filter[0]) &&
        checkType(getCostRange(announcement.offer.price), filter[1]) &&
        checkType(announcement.offer.rooms.toString(), filter[2]) &&
        checkType(announcement.offer.guests.toString(), filter[3]) &&
        checkFeatures(announcement.offer.features, filter.slice(4));
    });
    window.card.removeCard();
    window.pin.showPins(window.filtredAnnouncements);
  }


  function deleteAllPins() {
    var pins = document.querySelectorAll('.map__pin:not(.map__pin--main');
    pins.forEach(function (pin) {
      pin.remove();
    });
  }

  function onError(value) {
    document.querySelector('main').style.filter = 'grayscale(1) blur(5px)';
    document.querySelector('main').style.transitionDuration = '1s';
    var error = document.querySelector('.error');
    error.style.display = 'flex';
    error.childNodes[1].innerText = 'Ошибка при отправке ' + value + '.';
  }

  function onSend() {
    submit.style = 'background-color: green;';
    submit.textContent = 'Отправлено';
    form.reset();
  }

  function onLoad(response) {
    window.ANNOUNCEMENTS = response;
    window.filtredAnnouncements = window.ANNOUNCEMENTS.slice();
  }

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
    }
  };
})();
