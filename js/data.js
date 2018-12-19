'use strict';

(function() {

  var NUMBER_OF_OBJECTS = 8;
  var NUMBERS = window.utils.getMixedArray([1, 2, 3, 4, 5, 6, 7, 8]);
  var TITLES = window.utils.getMixedArray([
    'Большая уютная квартира',
    'Маленькая неуютная квартира',
    'Огромный прекрасный дворец',
    'Маленький ужасный дворец',
    'Красивый гостевой домик',
    'Некрасивый негостеприимный домик',
    'Уютное бунгало далеко от моря',
    'Неуютное бунгало по колено в воде'
  ]);
  var MAIN_PIN_HEIGHT = 22;
  var MIN_PRICE = 1000;
  var MAX_PRICE = 1000000;
  var TYPES = {
    palace: {
      translation: 'Дворец',
      minprice: 10000
    },
    flat: {
      translation: 'Квартира',
      minprice: 1000
    },
    house: {
      translation: 'Дом',
      minprice: 5000
    },
    bungalo: {
      translation: 'Бунгало',
      minprice: 0
    }
  };

  var MIN_NUMBER_OF_ROOMS = 1;
  var MAX_NUMBER_OF_ROOMS = 5;
  var MIN_NUMBER_OF_GUESTS = 1;
  var MAX_NUMBER_OF_GUESTS = 3;
  var MIN_CHECK_HOUR = 12;
  var MAX_CHECK_HOUR = 14;
  var FEATURES = [
    'wifi',
    'dishwasher',
    'parking',
    'washer',
    'elevator',
    'conditioner'
  ];
  var PHOTOS = [
    'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
  ];

  function generateObject(index) {
    var location = {
      x: window.utils.getRandomInteger(window.utils.X_MIN, window.utils.X_MAX),
      y: window.utils.getRandomInteger(window.utils.Y_MIN, window.utils.Y_MAX)
    };
    var object = {
      author: {
        avatar: 'img/avatars/user0' + NUMBERS[index] + '.png'
      },
      offer: {
        title: TITLES[index],
        address: location.x + ', ' + location.y,
        price: window.utils.getRandomInteger(MIN_PRICE, MAX_PRICE),
        type: TYPES[window.utils.getRandomInteger(0, TYPES.length - 1)],
        rooms: window.utils.getRandomInteger(MIN_NUMBER_OF_ROOMS, MAX_NUMBER_OF_ROOMS),
        guests: window.utils.getRandomInteger(MIN_NUMBER_OF_GUESTS, MAX_NUMBER_OF_GUESTS),
        checkin: window.utils.getRandomInteger(MIN_CHECK_HOUR, MAX_CHECK_HOUR) + ':00',
        checkout: window.utils.getRandomInteger(MIN_CHECK_HOUR, MAX_CHECK_HOUR) + ':00',
        description: '',
        features: window.utils.getRandomLengthMixedArray(FEATURES),
        photos: window.utils.getMixedArray(PHOTOS)
      },
      location: location
    };
    return object;
  }

  function generateData() {
    var array = [];

    for (var i = 0; i < NUMBER_OF_OBJECTS; i++) {
      array[i] = generateObject(i);
    }
    return array;
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

  function removeExistingPopup() {
    var oldCard = map.querySelector('.map__card');
    if (oldCard) {
      oldCard.remove();
    }
  }

  function showCard(cardElement) {
    map.insertBefore(cardElement, map.querySelector('.map__filters-container'));
  }

  var dataShow = generateData();

  window.data = {
   dataShow: dataShow
};

})();
