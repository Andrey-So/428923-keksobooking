'use strict';

(function () {
  var DEFAULT_COUNT = 8;
  var previousActivePin;

  window.pin = {
    showPins: function () {
      for (var i = 0; i < DEFAULT_COUNT; i++) {
        var mapPin = window.pin.getPin(i);
        window.mapPins.appendChild(mapPin);
      }
    },

    getPin: function (i) {
      var pin = document.createElement('button');
      var data = window.announcements[i];
      pin.className = 'map__pin';
      pin.style.left = data.location.x - 20 + 'px';
      pin.style.top = data.location.y + 40 + 'px';
      pin.innerHTML = '<img src=\"' + data.author.avatar + '\" width=\"40\" height=\"40\" draggable=\"false\">';
      pin.id = i;
      return pin;
    },

    activatePin: function (evt) {
      if (evt.classList[0] === 'map__pin') {
        evt.classList.add('map__pin--active');
        if (evt.id) {
          window.card.createCard(evt.id);
        }
      }
    },

    deactivatePin: function () {
      if (previousActivePin) {
        previousActivePin.remove('map__pin--active');
        window.card.removeCard();
      }
    },

    onPinClick: function (evt) {
      var currentActivePin;
      if (evt.target.localName === 'img') {
        currentActivePin = evt.target.parentElement;
      } else {
        currentActivePin = evt.target;
      }
      window.pin.deactivatePin();
      window.pin.activatePin(currentActivePin);
      previousActivePin = currentActivePin.classList;
    }
  };
})();


