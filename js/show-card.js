'use strict';

(function () {
  window.showcard = {
    showCard: function (i) {
      var template = document.querySelector('template');
      var beforeElement = document.querySelector('.map__filters-container');
      var mapCard = document.createElement('div');
      var thisAnnouncement = window.filtredAnnouncements[i];
      console.log(window.filtredAnnouncements, thisAnnouncement, i);
      var thisOffer = thisAnnouncement.offer;
      mapCard.className = 'map__info';
      mapCard.innerHTML = template.innerHTML;
      mapCard.querySelector('h3').textContent = thisOffer.title;
      mapCard.querySelector('small').textContent = thisOffer.address;
      mapCard.querySelector('.popup__price').innerHTML = thisOffer.price + ' &#x20bd;/ночь';
      mapCard.querySelector('h4').textContent = thisOffer.type;
      mapCard.querySelector('h4 + p').textContent = thisOffer.rooms + ' для ' + thisOffer.guests + ' гостей';
      mapCard.querySelector('h4 + p + p').textContent = 'Заезд после ' + thisOffer.checkin + ', выезд до ' + thisOffer.checkout;
      var mapFeatures = mapCard.querySelector('.popup__features');
      var deleteElements = mapCard.querySelectorAll('.feature');
      deleteElements.forEach(function (element, index) {
        mapFeatures.removeChild(deleteElements[index]);
      });
      thisOffer.features.forEach(function (feature) {
        if (feature) {
          var newLi = document.createElement('li');
          newLi.className = 'feature feature--' + feature;
          mapFeatures.appendChild(newLi);
        }
      });
      mapCard.querySelector('.popup__features + p').textContent = thisOffer.description;
      mapCard.querySelector('.popup__avatar').src = thisAnnouncement.author.avatar;
      window.mapSelector.insertBefore(mapCard, beforeElement);
      document.addEventListener('keydown', window.card.closeCard);
      var popupClose = document.querySelector('.popup__close');
      popupClose.addEventListener('click', window.card.closeCard);
    }
  };
})();
