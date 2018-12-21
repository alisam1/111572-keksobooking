'use strict';

(function () {

  var MAIN_PIN_HEIGHT = 22;
  var map = document.querySelector('.map');
  var mainPin = map.querySelector('.map__pin--main');
  var adForm = document.querySelector('.ad-form');
  var pinsContainer = document.querySelector('.map__pins');
  var mainPin = map.querySelector('.map__pin--main');
  var mainPinMouseUpCallback = null;
  var mainPinMouseMoveCallback = null;
  var startCoords = {};


  function fillMap(element) {
    pinsContainer.appendChild(element);
  }

  function returnMainPinToStartPosition() {
    mainPin.style.left = mainPinStartCoords.left;
    mainPin.style.top = mainPinStartCoords.top;
  }

  function removePins() {
    var pins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    for (var i = 0; i < pins.length; i++) {
      pins[i].remove();
    }
  }

  function removeCard() {
    var activeCard = document.querySelector('.map__card');
    if (activeCard) {
      activeCard.remove();
    }
  }

  function clearMap() {
    removePins();
    removeCard();
    if (map.classList.contains('map--faded')) {
      returnMainPinToStartPosition();
    }
  }

  function getMainPinCoordinates() {
    var coords = {
      x: parseInt(mainPin.style.left, 10) + mainPin.offsetWidth / 2,
      y: parseInt(mainPin.style.top, 10) + mainPin.offsetHeight + MAIN_PIN_HEIGHT
    };

    if (map.classList.contains('map--faded')) {
      coords.y = parseInt(mainPin.style.top, 10) + mainPin.offsetHeight / 2;
    }

    return coords;
  }

  function mainPinMouseMoveHandler(evt) {
    evt.preventDefault();

    var shift = {
      x: evt.clientX - startCoords.x,
      y: evt.clientY - startCoords.y
    };

    startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    if (getMainPinCoordinates().y < window.utils.Y_MIN) {
      mainPinElement.style.top = (window.utils.Y_MIN - mainPin.offsetHeight - MAIN_PIN_HEIGHT) + 'px';
    } else if (getMainPinCoordinates().y > window.utils.Y_MAX) {
      mainPinElement.style.top = (window.utils.Y_MAX - mainPin.offsetHeight - MAIN_PIN_HEIGHT) + 'px';
    } else {
      mainPinElement.style.top = (mainPin.offsetTop + shift.y) + 'px';
    }

    if (getMainPinCoordinates().x < window.utils.X_MIN) {
      mainPin.style.left = (window.utils.X_MIN - mainPin.offsetWidth / 2) + 'px';
    } else if (getMainPinCoordinates().x > window.utils.X_MAX) {
      mainPin.style.left = (window.utils.X_MAX - mainPin.offsetWidth / 2) + 'px';
    } else {
      mainPin.style.left = (mainPin.offsetLeft + shift.x) + 'px';
    }

    if (mainPinMouseMoveCallback) {
      mainPinMouseMoveCallback();
    }

  }

  function toggleMapState() {
    mapElement.classList.toggle('map--faded');
  }

  function mainPinMouseDownHandler(evt) {
    evt.preventDefault();

    startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    document.addEventListener('mousemove', mainPinMouseMoveHandler);
    document.addEventListener('mouseup', mainPinMouseUpHandler);
  }

  function mainPinMouseUpHandler(evt) {
    evt.preventDefault();

    document.removeEventListener('mousemove', mainPinMouseMoveHandler);
    document.removeEventListener('mouseup', mainPinMouseUpHandler);

    if (mainPinMouseUpCallback) {
      mainPinMouseUpCallback();
    }
  }

  function setPinMouseUpCallback(callback) {
    mainPinMouseUpCallback = callback;
  }

  function setPinMouseMoveCallback(callback) {
    mainPinMouseMoveCallback = callback;
  }

  window.map = {
    fill: fillMap,
    clear: clearMap,
    getMainPinCoordinates: getMainPinCoordinates,
    setPinMouseUpCallback: setPinMouseUpCallback,
    setPinMouseMoveCallback: setPinMouseMoveCallback,
    toggleState: toggleMapState
  };
})();
