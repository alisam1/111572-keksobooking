'use strict';

(function () {
  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
  var pinsContainer = document.querySelector('.map__pins');

  function createPin(infoPin, callback) {
    var pin = pinTemplate.cloneNode(true);
    pin.style.left = infoPin.location.x - PIN_WIDTH / 2 + 'px';
    pin.style.top = infoPin.location.y - PIN_HEIGHT + 'px';
    var pinImage = pin.querySelector('img');
    pinImage.src = infoPin.author.avatar;
    pinImage.alt = infoPin.offer.title;
    pin.addEventListener('click', function (evt) {
      callback(evt);
    });
    return pin;
  }

  function renderPins(dataArray) {
  var fragment = document.createDocumentFragment();
  dataArray.forEach(function (dataObject) {
    var newPin = createPin(dataObject, function () {
      removeExistingPopup();
      var cardElement = createCard(dataObject);
      showCard(cardElement);
    });
    fragment.appendChild(newPin);
  });
  pinsContainer.appendChild(fragment);
}

  window.pin = {
  createPin: createPin,
  renderPins: renderPins
};
})();
