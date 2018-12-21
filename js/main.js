'use strict';

(function () {

  var activeCard = null;
  var adInfoObjects = [];


  window.adForm.setAddress(window.map.getMainPinCoordinates());

  window.map.setPinMouseUpCallback(activatePage);

  window.map.setPinMouseMoveCallback(function () {
    window.adForm.setAddress(window.map.getMainPinCoordinates());
  });

  window.adForm.setSubmitHandler(adFormSubmitHandler);

  window.adForm.setResetFormCallback(function () {
    desactivatePage();
  });


  function adFormSubmitHandler(evt) {
    window.backend.upload(new FormData(evt.currentTarget), function () {
      desactivatePage();
      window.message.showSuccessMessage();
    }, function () {
      window.message.showErrorMessage();
    });
  }

  function activatePage() {
    window.backend.load(loadSuccessHandler, loadErrorHandler);
  }

  function desactivatePage() {
    window.map.toggleState();
    window.map.clear();
    window.adForm.reset();
    window.filtersForm.reset();
    window.adForm.setAddress(window.map.getMainPinCoordinates());
    window.adForm.toggle();
    window.filtersForm.toggle();
    window.map.setPinMouseUpCallback(activatePage);
  }

  function updatePins(dataArray) {
    var filteredPins = window.filtersForm.filter(dataArray);
    var pinsFragment = prepareElements(filteredPins);
    window.map.clear();
    window.map.fill(pinsFragment);
  }

  function loadSuccessHandler(dataArray) {
    adInfoObjects = dataArray;
    window.map.toggleState();
    window.adForm.toggle();
    window.filtersForm.toggle();
    // передаём обработчик для изменения фильтров
    window.filtersForm.setfilterChangeHandler(function () {
      window.utils.debounce(function () {
        updatePins(adInfoObjects);
      });
    });
    updatePins(dataArray);
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
      var newPinElement = window.pin.create(dataObject, function (evt) {
        var target = evt.target.closest('.map__pin');
        if (activeCard) {
          activeCard.remove();
          removeCardCallback();
        }
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

  // закрытие открытой карточки по Esc
  function documentEscPressHandler(evt) {
    if (evt.keyCode === window.utils.ESC_KEYCODE) {
      activeCard.remove();
      removeCardCallback();
    }
  }

})();
