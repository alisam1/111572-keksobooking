'use strict';

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

function getCardType(type) {
  var translatedType = 'Нечто';
  switch (type) {
    case 'flat':
      translatedType = 'Квартира';
      break;
    case 'bungalo':
      translatedType = 'Бунгало';
      break;
    case 'house':
      translatedType = 'Дом';
      break;
    case 'palace':
      translatedType = 'Дворец';
      break;
  }
  return translatedType;
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

function generateObject(i) {
  var location = {
    x: getRandomInteger(X_MIN, X_MAX),
    y: getRandomInteger(Y_MIN, Y_MAX)
  };
  var object = {
    author: {
      avatar: 'img/avatars/user0' + NUMBERS[i] + '.png'
    },
    offer: {
      title: TITLES[i],
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

function createPin(example) {
  var pin = pinTemplate.cloneNode(true);
  pin.style.left = example.location.x - PIN_WIDTH / 2 + 'px';
  pin.style.top = example.location.y - PIN_HEIGHT + 'px';
  var pinImage = pin.querySelector('img');
  pinImage.src = example.author.avatar;
  pinImage.alt = example.offer.title;
  return pin;
}

function renderPins(data) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < data.length; i++) {
    var newPin = createPin(data[i]);
    fragment.appendChild(newPin);
  }
  pinsContainer.appendChild(fragment);
}

function createFeature(item) {
  var cardFeaturesItem = document.createElement('li');
  cardFeaturesItem.classList.add('popup__feature');
  var cardFeaturesItemClass = 'popup__feature--' + item;
  cardFeaturesItem.classList.add(cardFeaturesItemClass);
  return cardFeaturesItem;
}

function createFeaturesList(array) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < array.length; i++) {
    fragment.appendChild(createFeature(array[i]));
  }
  return fragment;
}

function createPhoto(item) {
  var cardPhoto = document.createElement('img');
  cardPhoto.classList.add('popup__photo');
  cardPhoto.width = CARD_PHOTO_WIDTH.toString();
  cardPhoto.height = CARD_PHOTO_HEIGTH.toString();
  cardPhoto.alt = 'Фотография жилья';
  cardPhoto.src = item;
  return cardPhoto;
}

function createPhotosList(array) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < array.length; i++) {
    fragment.appendChild(createPhoto(array[i]));
  }
  return fragment;
}

function createCard(example) {
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
  cardImage.src = example.author.avatar;
  cardTitle.textContent = example.offer.title;
  cardAddress.textContent = example.offer.address;
  cardPrice.innerHTML = example.offer.price + '&#x20bd;<span>/ночь</span>';
  cardType.textContent = getCardType(example.offer.type);
  cardCapacity.textContent = example.offer.rooms + getCardCapacityRooms(example.offer.rooms) + example.offer.guests + (example.offer.guests === 1 ? ' гостя' : ' гостей');
  cardTime.textContent = 'Заезд после ' + example.offer.checkin + ', выезд до ' + example.offer.checkout;
  cardFeatures.innerHTML = '';
  cardFeatures.appendChild(createFeaturesList(example.offer.features));
  cardDescription.textContent = example.offer.description;
  cardPhotos.innerHTML = '';
  cardPhotos.appendChild(createPhotosList(example.offer.photos));

  return card;
}

function renderCard(card) {
  map.insertBefore(card, map.querySelector('.map__filters-container'));
}

var data = generateData();
map.classList.remove('map--faded');
renderPins(data);
var card = createCard(data[0]);
renderCard(card);

var mainPin = document.querySelector(".map__pin--main");
var map = document.querySelector("map");
var adForm = document.querySelector(".ad-form");
var mapFiltres = document.querySelector(".map__filters");
var adressInput = adForm.querySelector("#adress");

var mainPinCenterCoords = {
  x: parseInt(mainPin.style.left, 10) + mainPin.offsetWidth / 2,
  y: parseInt(mainPin.style.top, 10) + mainPin.offsetHeight / 2
};

mainPin.addEventListener('click', function() {
  map.classList.remove('map--faded');
});

adForm.addEventListener('mouseup', function() {
  map.classList.remove('ad-form--disabled');
});
