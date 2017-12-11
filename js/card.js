'use strict';

(function () {
  var ESC_KEYCODE = 27;
  window.card = {
    createCard: function (i) {
      var template = document.getElementsByTagName('template');
      var beforeElement = document.querySelector('.map__filters-container');
      var mapInfo = document.createElement('div');
      var thisAnnouncement = window.announcements[i];
      mapInfo.className = 'map__info';
      mapInfo.innerHTML = template[0].innerHTML;
      mapInfo.querySelector('h3').textContent = thisAnnouncement.offer.title;
      mapInfo.querySelector('small').textContent = thisAnnouncement.offer.address;
      mapInfo.querySelector('.popup__price').innerHTML = thisAnnouncement.offer.price + ' &#x20bd;/ночь';
      mapInfo.querySelector('h4').textContent = thisAnnouncement.offer.type;
      mapInfo.querySelector('h4 + p').textContent = thisAnnouncement.offer.rooms + ' для ' + thisAnnouncement.offer.guests + ' гостей';
      mapInfo.querySelector('h4 + p + p').textContent = 'Заезд после ' + thisAnnouncement.offer.checkin + ', выезд до ' + thisAnnouncement.offer.checkout;
      var mapFeatures = mapInfo.querySelector('.popup__features');
      var deleteElements = mapInfo.querySelectorAll('.feature');
      deleteElements.forEach(function (element, index) {
        mapFeatures.removeChild(deleteElements[index]);
      });
      thisAnnouncement.offer.features.forEach(function (feature) {
        if (feature) {
          var newLi = document.createElement('li');
          newLi.className = 'feature feature--' + feature;
          mapFeatures.appendChild(newLi);
        }
      });
      mapInfo.querySelector('.popup__features + p').textContent = thisAnnouncement.offer.description;
      mapInfo.querySelector('.popup__avatar').src = thisAnnouncement.author.avatar;
      window.map.insertBefore(mapInfo, beforeElement);
      document.addEventListener('keydown', window.card.closeCard);
      var popupClose = document.querySelector('.popup__close');
      popupClose.addEventListener('click', window.card.closeCard);
    },

    closeCard: function (evt) {
      if ((evt.keyCode === ESC_KEYCODE) || (evt.type === 'click')) {
        window.pin.deactivatePin();
        document.removeEventListener('keydown', window.card.closeCard);
        document.removeEventListener('click', window.card.closeCard);
      }
    },

    removeCard: function () {
      var mapInfo = document.querySelector('.map__info');
      if (mapInfo) {
        window.map.removeChild(mapInfo);
      }
    }
  };
})();
