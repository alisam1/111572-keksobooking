'use strict';
(function(){

  var X_MIN = 0;
  var X_MAX = 1200;
  var Y_MIN = 130;
  var Y_MAX = 630;
  var ESC_KEYCODE = 27;

  function getRandomInteger(min, max) {
    var rand = min - 0.5 + Math.random() * (max - min + 1);
    return Math.round(rand);
  }

  function getMixedArray(array) {
    var originalArray = array.slice(0);
    var mixedArray = [];
    for (var i = 0; i < array.length; i++) {
      var randomIndex = getRandomInteger(0, originalArray.length - 1);
      mixedArray[i] = originalArray[randomIndex];
      originalArray.splice(randomIndex, 1);
    }
    return mixedArray;
  }

  function getRandomLengthArray(array) {
    var randomLength = getRandomInteger(1, array.length);
    return array.slice(0, randomLength);
  }

  function getRandomLengthMixedArray(array) {
    return getRandomLengthArray(getMixedArray(array));
  }

  window.utils = {
   X_MIN: X_MIN,
   X_MAX: X_MAX,
   Y_MIN: Y_MIN,
   Y_MAX: Y_MAX,
   getRandomInteger: getRandomInteger,
   getMixedArray: getMixedArray,
   getRandomLengthArray: getRandomLengthArray,
   getRandomLengthMixedArray: getRandomLengthMixedArray
};

})();
