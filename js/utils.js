'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var X_MIN = 0;
  var X_MAX = 1200;
  var Y_MIN = 130;
  var Y_MAX = 630;
  var DEBOUNCE_INTERVAL = 500;

  var lastTimeout;


  function debounce(callback) {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(callback, DEBOUNCE_INTERVAL);
  }

  window.utils = {
    ESC_KEYCODE: ESC_KEYCODE,
    X_MIN: X_MIN,
    X_MAX: X_MAX,
    Y_MIN: Y_MIN,
    Y_MAX: Y_MAX,
    debounce: debounce
  };
})();
