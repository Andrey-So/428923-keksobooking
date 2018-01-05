'use strict';

(function () {
  var ESC_KEYCODE = 27;

  window.card = {
    close: function (evt) {
      if ((evt.keyCode === ESC_KEYCODE) || (evt.type === 'click')) {
        window.pin.deactivate();
        document.removeEventListener('keydown', window.card.close);
        document.removeEventListener('click', window.card.close);
      }
    },

    remove: function () {
      var mapCard = document.querySelector('.map__info');
      if (mapCard) {
        window.mapSelector.removeChild(mapCard);
      }
    }
  };
})();
