'use strict';

(function () {

  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;

  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

  function createPin(infoPin, pinElementClickHandler) {
    if ('offer' in infoPin) {
      var pinElement = pinTemplate.cloneNode(true);
      pinElement.style.left = infoPin.location.x - PIN_WIDTH / 2 + 'px';
      pinElement.style.top = infoPin.location.y - PIN_HEIGHT + 'px';
      var imgElement = pinElement.querySelector('img');
      imgElement.src = infoPin.author.avatar;
      imgElement.alt = infoPin.offer.title;
      pinElement.addEventListener('click', pinElementClickHandler);
      return pinElement;
    } else {
      return null;
    }
  }

  window.pin = {
    create: createPin
  };
})();
