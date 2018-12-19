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

    if (mainPin.offsetTop + shift.y < window.utils.Y_MIN) {
      mainPin.style.top = window.utils.Y_MIN + 'px';
    } else if (mainPin.offsetTop + shift.y > window.utils.Y_MAX) {
      mainPin.style.top = window.utils.Y_MAX + 'px';
    } else {
      mainPin.style.top = (mainPin.offsetTop + shift.y) + 'px';
    }

    if (mainPin.offsetLeft + shift.x < window.utils.X_MIN) {
      mainPin.style.left = window.utils.X_MIN + 'px';
    } else if (mainPin.offsetLeft + shift.x > window.utils.X_MAX - mainPin.offsetWidth) {
      mainPin.style.left = (window.utils.X_MAX - mainPin.offsetWidth) + 'px';
    } else {
      mainPin.style.left = (mainPin.offsetLeft + shift.x) + 'px';
    }

    if (mainPinMouseMoveCallback) {
      mainPinMouseMoveCallback();
    }

  }

  function toggleMapState() {
    map.classList.toggle('map--faded');
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

  mainPin.addEventListener('mousedown', mainPinMouseDownHandler);

  window.map = {
    fill: fillMap,
    getMainPinCoordinates: getMainPinCoordinates,
    setPinMouseUpCallback: setPinMouseUpCallback,
    setPinMouseMoveCallback: setPinMouseMoveCallback,
    toggleMapState: toggleMapState
  };
})();
