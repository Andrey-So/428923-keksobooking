'use strict';

(function () {
  var ESC_KEYCODE = 27;

  window.card = {
    closeCard: function (evt) {
      if ((evt.keyCode === ESC_KEYCODE) || (evt.type === 'click')) {
        window.pin.deactivatePin();
        document.removeEventListener('keydown', window.card.closeCard);
        document.removeEventListener('click', window.card.closeCard);
      }
    },

    removeCard: function () {
      var mapCard = document.querySelector('.map__info');
      if (mapCard) {
        window.mapSelector.removeChild(mapCard);
      }
    }
  };
})();
