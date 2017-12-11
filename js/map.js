'use strict';

(function () {
  var DEFAULT_COUNT = 8;
  var timeIn = document.querySelector('#timein');
  var timeOut = document.querySelector('#timeout');
  var typeOfHousing = document.querySelector('#type');
  var minPrice = document.querySelector('#price');
  var roomNubmer = document.querySelector('#room_number');
  var ROOMS = {
    0: [2],
    1: [1, 2],
    2: [0, 1, 2],
    3: [3]
  };

  window.announcements = window.data.getAnnouncements(DEFAULT_COUNT);

  window.mapPinMain.addEventListener('mouseup', window.form.globalActivation);
  window.mapPins.addEventListener('click', window.pin.onPinClick);
  window.form.capacityShow(ROOMS[0]);

  timeIn.addEventListener('change', function () {
    timeOut.selectedIndex = timeIn.selectedIndex;
  }, false);

  timeOut.addEventListener('change', function () {
    timeIn.selectedIndex = timeOut.selectedIndex;
  }, false);

  typeOfHousing.addEventListener('change', function () {
    switch (typeOfHousing.selectedIndex) {
      case 0:
        minPrice.min = 1000;
        break;
      case 1:
        minPrice.min = 0;
        break;
      case 2:
        minPrice.min = 5000;
        break;
      case 3:
        minPrice.min = 10000;
        break;
      default:
        minPrice.min = 0;
    }
  });

  roomNubmer.addEventListener('change', function () {
    window.form.capacityShow(ROOMS[roomNubmer.selectedIndex]);
  });
})();
