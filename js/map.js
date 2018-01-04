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
  var LOW_VALUE = 'low';
  var MIDDLE_VALUE = 'middle';
  var HIGH_VALUE = 'high';
  var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var timeIn = document.querySelector('#timein');
  var timeOut = document.querySelector('#timeout');
  var typeOfHousing = document.querySelector('#type');
  var minPrice = document.querySelector('#price');
  var roomNubmer = document.querySelector('#room_number');
  var address = document.querySelector('#address');
  var title = document.querySelector('#title');
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
  var filter = [];
  var mainPin = window.mapPinMain;
  mainPin.addEventListener('mouseup', window.form.globalActivation);
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

  var errorSwitch = function (obj, status) {
    status ? obj.classList.add('input__error') : obj.classList.remove('input__error');
  };

  submit.addEventListener('click', function (evt) {
    evt.preventDefault();
    var isTitleValid = title.checkValidity();
    var isAddressValid = (address.value.length !== 0);
    if (isTitleValid && isAddressValid) {
      window.save(new FormData(form), onSend, onError);
      errorSwitch(title, false);
      errorSwitch(address, false);
    } else {
      !isTitleValid ? errorSwitch(title, true) : errorSwitch(title, false);
      !isAddressValid ? errorSwitch(address, true) : errorSwitch(address, false);
    }
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

  createFilter();

  var checkType = function (announcementType, filterType) {
    return filterType === 'any' || filterType === announcementType;
  };

  var getCostRange = function (announcementPrice) {
    if (announcementPrice < LOW_PRICE) {
      return LOW_VALUE;
    } else if (announcementPrice >= HIGH_PRICE) {
      return HIGH_VALUE;
    } else {
      return MIDDLE_VALUE;
    }
  };

  var checkFeatures = function (announcementFeatures, filterFeatures) {
    return (filterFeatures.filter(function (value) {
      return announcementFeatures.includes(value);
    }).length === filterFeatures.length);
  };

  var deleteAllPins = function () {
    var pins = document.querySelectorAll('.map__pin:not(.map__pin--main');
    pins.forEach(function (pin) {
      pin.remove();
    });
  };

  function createFilter() {
    filter = Array.prototype.map.call(selectFilters, function (value) {
      return value.selectedOptions[0].value;
    });

    checkboxFilters.forEach(function (value, i) {
      if (value.checked) {
        filter.push(FEATURES[i]);
      }
    });
  }

  function filterPins() {
    deleteAllPins();
    createFilter();
    window.card.removeCard();
    window.pin.showPins(window.map.filtredAnnouncements());
  }

  var errorMessageClose = function () {
    document.querySelector('main').style.filter = 'none';
    var error = document.querySelector('.error');
    error.style.display = 'none';
    error.removeEventListener('click', errorMessageClose);
  };

  function onError(value) {
    document.querySelector('main').style.filter = 'grayscale(1) blur(5px)';
    document.querySelector('main').style.transitionDuration = '1s';
    var error = document.querySelector('.error');
    error.style.display = 'flex';
    error.childNodes[1].innerText = 'Ошибка при отправке ' + value + '.';
    error.addEventListener('click', errorMessageClose);
  }

  function onSend() {
    submit.style = 'background-color: green;';
    submit.textContent = 'Отправлено';
    form.reset();
  }

  function onLoad(response) {
    window.ANNOUNCEMENTS = response;
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
        x: mainPin.offsetLeft - shift.x,
        y: mainPin.offsetTop - shift.y
      };

      if (currentCoords.y >= MIN_CURRENT_Y && currentCoords.y <= MAX_CURRENT_Y &&
        currentCoords.x >= MIN_CURRENT_X && currentCoords.x <= MAX_CURRENT_X) {
        mainPin.style.top = currentCoords.y + 'px';
        mainPin.style.left = currentCoords.x + 'px';
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

    filtredAnnouncements: function () {
      return window.ANNOUNCEMENTS.filter(function (announcement) {
        return checkType(announcement.offer.type, filter[0]) &&
          checkType(getCostRange(announcement.offer.price), filter[1]) &&
          checkType(announcement.offer.rooms.toString(), filter[2]) &&
          checkType(announcement.offer.guests.toString(), filter[3]) &&
          checkFeatures(announcement.offer.features, filter.slice(4));
      });
    }
  };
  mainPin.addEventListener('mousedown', window.map.onMouseDown);
})();
