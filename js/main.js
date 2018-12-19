'use strict';

(function () {

  var activeCard = null;

  function activatePage() {

    window.map.toggleMapState();

    window.form.toggleFormState(window.form.adForm);
    window.form.toggleFormState(window.form.filters);

    var pins = prepareElements(window.data.dataShow);

    window.map.fill(pins);

    window.map.setPinMouseUpCallback(null);
  }

  function createCardCallback() {
    document.removeEventListener('keyup', documentEscPressHandler);
  }

  function prepareElements(dataArray) {
    var fragment = document.createDocumentFragment();
    dataArray.forEach(function (dataObject) {
      var newPinElement = window.pin.createPin(dataObject, function () {
        var cardElement = window.card.createCard(dataObject, createCardCallback);
        if (activeCard) {
          activeCard.remove();
        }
        activeCard = cardElement;
        document.addEventListener('keyup', documentEscPressHandler);
        window.map.fill(cardElement);
      });
      fragment.appendChild(newPinElement);
    });
    return fragment;
  }


  function documentEscPressHandler(evt) {
    if (evt.keyCode === window.utils.ESC_KEYCODE) {
      if (activeCard) {
        activeCard.remove();
      }
      document.removeEventListener('keyup', documentEscPressHandler);
    }
  }


  window.form.setAddress(window.map.getMainPinCoordinates());

  window.map.setPinMouseUpCallback(activatePage);

  window.map.setPinMouseMoveCallback(function () {
    window.form.setAddress(window.map.getMainPinCoordinates());
  });
})();
