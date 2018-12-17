'use strict';

// #13 Личный проект: пока все дома

var NUMBER_OF_OBJECTS = 8;
var NUMBERS = getMixedArray([1, 2, 3, 4, 5, 6, 7, 8]);
var TITLES = getMixedArray([
  'Большая уютная квартира',
  'Маленькая неуютная квартира',
  'Огромный прекрасный дворец',
  'Маленький ужасный дворец',
  'Красивый гостевой домик',
  'Некрасивый негостеприимный домик',
  'Уютное бунгало далеко от моря',
  'Неуютное бунгало по колено в воде'
]);
var MIN_PRICE = 1000;
var MAX_PRICE = 1000000;
var TYPES = [
  'palace',
  'flat',
  'house',
  'bungalo'
];
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
var X_MIN = 0;
var X_MAX = 1200;
var Y_MIN = 130;
var Y_MAX = 630;
var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;
var MAIN_PIN_HEIGHT = 22;
var CARD_PHOTO_WIDTH = 45;
var CARD_PHOTO_HEIGTH = 40;
var map = document.querySelector('.map');
var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
var pinsContainer = document.querySelector('.map__pins');

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

function getCardType(string) {
  var translatedString = 'Нечто';
  switch (string) {
    case 'flat':
      translatedString = 'Квартира';
      break;
    case 'bungalo':
      translatedString = 'Бунгало';
      break;
    case 'house':
      translatedString = 'Дом';
      break;
    case 'palace':
      translatedString = 'Дворец';
      break;
  }
  return translatedString;
}

function getCardCapacityRooms(rooms) {
  var cardCapacityRooms = ' комнаты для ';
  if (rooms === 1) {
    cardCapacityRooms = ' комната для ';
  }
  if (rooms >= 5) {
    cardCapacityRooms = ' комнат для ';
  }
  return cardCapacityRooms;
}

function generateObject(index) {
  var location = {
    x: getRandomInteger(X_MIN, X_MAX),
    y: getRandomInteger(Y_MIN, Y_MAX)
  };
  var object = {
    author: {
      avatar: 'img/avatars/user0' + NUMBERS[index] + '.png'
    },
    offer: {
      title: TITLES[index],
      address: location.x + ', ' + location.y,
      price: getRandomInteger(MIN_PRICE, MAX_PRICE),
      type: TYPES[getRandomInteger(0, TYPES.length - 1)],
      rooms: getRandomInteger(MIN_NUMBER_OF_ROOMS, MAX_NUMBER_OF_ROOMS),
      guests: getRandomInteger(MIN_NUMBER_OF_GUESTS, MAX_NUMBER_OF_GUESTS),
      checkin: getRandomInteger(MIN_CHECK_HOUR, MAX_CHECK_HOUR) + ':00',
      checkout: getRandomInteger(MIN_CHECK_HOUR, MAX_CHECK_HOUR) + ':00',
      description: '',
      features: getRandomLengthMixedArray(FEATURES),
      photos: getMixedArray(PHOTOS)
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

function createFeature(featureName) {
  var cardFeaturesItem = document.createElement('li');
  cardFeaturesItem.classList.add('popup__feature');
  var cardFeaturesItemClass = 'popup__feature--' + featureName;
  cardFeaturesItem.classList.add(cardFeaturesItemClass);
  return cardFeaturesItem;
}

function createFeaturesList(featuresArray) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < featuresArray.length; i++) {
    fragment.appendChild(createFeature(featuresArray[i]));
  }
  return fragment;
}

function createPhoto(photoSrc) {
  var cardPhoto = document.createElement('img');
  cardPhoto.classList.add('popup__photo');
  cardPhoto.width = CARD_PHOTO_WIDTH.toString();
  cardPhoto.height = CARD_PHOTO_HEIGTH.toString();
  cardPhoto.alt = 'Фотография жилья';
  cardPhoto.src = photoSrc;
  return cardPhoto;
}

function createPhotosList(photosSrcArray) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < photosSrcArray.length; i++) {
    fragment.appendChild(createPhoto(photosSrcArray[i]));
  }
  return fragment;
}

function createCard(infoCard, callback) {
  var card = cardTemplate.cloneNode(true);
  var cardImage = card.querySelector('.popup__avatar');
  var cardTitle = card.querySelector('.popup__title');
  var cardAddress = card.querySelector('.popup__text--address');
  var cardPrice = card.querySelector('.popup__text--price');
  var cardType = card.querySelector('.popup__type');
  var cardCapacity = card.querySelector('.popup__text--capacity');
  var cardTime = card.querySelector('.popup__text--time');
  var cardFeatures = card.querySelector('.popup__features');
  var cardDescription = card.querySelector('.popup__description');
  var cardPhotos = card.querySelector('.popup__photos');
  var cardPopupClose = card.querySelector('.popup__close');
  cardImage.src = infoCard.author.avatar;
  cardTitle.textContent = infoCard.offer.title;
  cardAddress.textContent = infoCard.offer.address;
  cardPrice.innerHTML = infoCard.offer.price + '&#x20bd;<span>/ночь</span>';
  cardType.textContent = getCardType(infoCard.offer.type);
  cardCapacity.textContent = infoCard.offer.rooms + getCardCapacityRooms(infoCard.offer.rooms) + infoCard.offer.guests + (infoCard.offer.guests === 1 ? ' гостя' : ' гостей');
  cardTime.textContent = 'Заезд после ' + infoCard.offer.checkin + ', выезд до ' + infoCard.offer.checkout;
  cardFeatures.innerHTML = '';
  cardFeatures.appendChild(createFeaturesList(infoCard.offer.features));
  cardDescription.textContent = infoCard.offer.description;
  cardPhotos.innerHTML = '';
  cardPhotos.appendChild(createPhotosList(infoCard.offer.photos));
  cardPopupClose.addEventListener('click', function () {
    card.remove();
    if (callback) {
      callback();
    }
  });

  return card;
}

var data = generateData();

// #16 Личный проект: подробности

var mainPin = map.querySelector('.map__pin--main');
var adForm = document.querySelector('.ad-form');
var filtersForm = document.querySelector('.map__filters');
var addressInput = adForm.querySelector('#address');
var mainPinCenterCoords = {
  x: parseInt(mainPin.style.left, 10) + mainPin.offsetWidth / 2,
  y: parseInt(mainPin.style.top, 10) + mainPin.offsetHeight / 2
};

function toggleMapState() {
  map.classList.toggle('map--faded');
}

function setAddress(coords) {
  addressInput.value = coords.x + ', ' + coords.y;
}

function changeAddressValue() {
  var mainPinCoords = {
    x: parseInt(mainPin.style.left, 10) + mainPin.offsetWidth / 2,
    y: parseInt(mainPin.style.top, 10) + mainPin.offsetHeight + MAIN_PIN_HEIGHT
  };
  setAddress(mainPinCoords);
}

function toggleFormState(form) {
  var formInputs = form.querySelectorAll('input');
  var formSelects = form.querySelectorAll('select');
  var disabledClass = form.name + '--disabled';
  form.classList.toggle(disabledClass);
  for (var i = 0; i < formInputs.length; i++) {
    formInputs[i].disabled = !formInputs[i].disabled;
  }
  for (i = 0; i < formSelects.length; i++) {
    formSelects[i].disabled = !formSelects[i].disabled;
  }
}

function mainPinMouseupHandler() {
  toggleMapState();
  toggleFormState(adForm);
  toggleFormState(filtersForm);
  changeAddressValue();
  renderPins(data);
  mainPin.removeEventListener('mouseup', mainPinMouseupHandler);
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

mainPin.addEventListener('mouseup', mainPinMouseupHandler);

setAddress(mainPinCenterCoords);
