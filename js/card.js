'use strict';

(function () {

  var CARD_PHOTO_WIDTH = 45;
  var CARD_PHOTO_HEIGTH = 40;

  var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');

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

  function createFeature(featureName) {
    var cardFeatureElement = document.createElement('li');
    cardFeatureElement.classList.add('popup__feature');
    var cardFeaturesItemClass = 'popup__feature--' + featureName;
    cardFeatureElement.classList.add(cardFeaturesItemClass);
    return cardFeatureElement;
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
    var avatar = card.querySelector('.popup__avatar');
    var title = card.querySelector('.popup__title');
    var address = card.querySelector('.popup__text--address');
    var price = card.querySelector('.popup__text--price');
    var type = card.querySelector('.popup__type');
    var capacity = card.querySelector('.popup__text--capacity');
    var time = card.querySelector('.popup__text--time');
    var featuresList = card.querySelector('.popup__features');
    var description = card.querySelector('.popup__description');
    var photosList = card.querySelector('.popup__photos');
    var popupClose = card.querySelector('.popup__close');

    avatar.src = infoCard.author.avatar;
    title.textContent = infoCard.offer.title;
    address.textContent = infoCard.offer.address;
    price.innerHTML = infoCard.offer.price + '&#x20bd;<span>/ночь</span>';
    type.textContent = window.adForm.types[infoCard.offer.type].translation;


    if (infoCard.offer.rooms === 0 && infoCard.offer.guests === 0) {
      capacity.remove();
    } else {
      capacity.textContent = infoCard.offer.rooms + getCardCapacityRooms(infoCard.offer.rooms) + infoCard.offer.guests + (infoCard.offer.guests === 1 ? ' гостя' : ' гостей');
    }

    if (infoCard.offer.checkin === '0:00' && infoCard.offer.checkout === '0:00') {
      time.remove();
    } else {
      time.textContent = 'Заезд после ' + infoCard.offer.checkin + ', выезд до ' + infoCard.offer.checkout;
    }

    if (infoCard.offer.features.length === 0) {
      featuresList.remove();
    } else {
      featuresList.innerHTML = '';
      featuresList.appendChild(createFeaturesList(infoCard.offer.features));
    }

    if (!infoCard.offer.description) {
      description.remove();
    } else {
      description.textContent = infoCard.offer.description;
    }

    if (infoCard.offer.photos.length === 0) {
      photosList.remove();
    } else {
      photosList.innerHTML = '';
      photosList.appendChild(createPhotosList(infoCard.offer.photos));
    }

    popupClose.addEventListener('click', function () {
      if (card) {
        if (callback) {
          callback();
        }

        card.remove();
      }
    });

    return card;
  }

  window.card = {
    create: createCard
  };
})();
