'use strict';

(function () {

  var activeCard = null;


  window.form.setAddress(window.map.getMainPinCoordinates());

  window.map.setPinMouseUpCallback(activatePage);

  window.map.setPinMouseMoveCallback(function () {
    window.form.setAddress(window.map.getMainPinCoordinates());
  });

  window.form.setSuccessHandlerCallback(function () {
    desactivatePage();
  });

  window.form.setResetFormCallback(function () {
    desactivatePage();
  });

  function activatePage() {
    window.backend.load(loadSuccessHandler, loadErrorHandler);
  }

  function desactivatePage() {
    window.map.clear();
    window.map.toggleState();
    window.form.setAddress(window.map.getMainPinCoordinates());
    window.form.reset();
    window.form.toggleAll();
    window.map.setPinMouseUpCallback(activatePage);
  }

  function loadSuccessHandler(array) {
    window.map.toggleState();
    window.form.toggleAll();
    var pins = prepareElements(array);
    window.map.fill(pins);
    window.map.setPinMouseUpCallback(null);
  }

  function loadErrorHandler() {
    window.message.showErrorMessage();
  }

  function removeCardCallback() {
    var activePin = document.querySelector('.map__pin--active');
    if (activePin) {
      activePin.classList.remove('map__pin--active');
    }

    document.removeEventListener('keyup', documentEscPressHandler);
  }

  function prepareElements(dataArray) {
    var fragment = document.createDocumentFragment();
    dataArray.forEach(function (dataObject) {
      var newPinElement = window.pin.createPin(dataObject, function (evt) {
        var target = evt.target.closest('.map__pin');
        target.classList.add('map__pin--active');
        activeCard = window.card.create(dataObject, removeCardCallback);
        document.addEventListener('keyup', documentEscPressHandler);
        window.map.fill(activeCard);
      });
      if (newPinElement) {
        fragment.appendChild(newPinElement);
      }
    });
    return fragment;
  }


  function documentEscPressHandler(evt) {
    if (evt.keyCode === window.utils.ESC_KEYCODE) {
      activeCard.remove();
      removeCardCallback();
    }
  }

})();
