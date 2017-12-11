'use strict';

(function () {
  var noticeForm = document.querySelector('.notice__form');
  var capacity = document.querySelector('#capacity');
  window.form = {
    globalActivation: function () {
      window.map.classList.remove('map--faded');
      noticeForm.classList.remove('notice__form--disabled');
      window.mapPinMain.removeEventListener('mouseup', window.form.globalActivation);
      window.pin.showPins();
    },
    capacityShow: function (array) {
      for (var i = 0; i < capacity.length; i++) {
        capacity[i].hidden = ~array.indexOf(i) >= 0;
      }
      capacity.selectedIndex = array[0];
    }
  };
})();
