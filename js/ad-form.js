'use strict';

(function () {

  var types = {
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

  var syncTimeSelects = ['timein', 'timeout'];
  var adFormElement = document.querySelector('.ad-form');
  var addressInputElement = adFormElement.querySelector('#address');
  var typeElement = adFormElement.querySelector('#type');
  var priceElement = adFormElement.querySelector('#price');
  var timeFieldsetElement = adFormElement.querySelector('.ad-form__element--time');
  var roomsNumberElement = adFormElement.querySelector('#room_number');
  var capacityElement = adFormElement.querySelector('#capacity');
  var resetFormCallback = null;

  window.form.toggleInputState(adFormElement);
  setPriceParameters();
  checkRoomsAndCapacity();

  typeElement.addEventListener('change', typeSelectChangeHandler);

  timeFieldsetElement.addEventListener('change', function (evt) {
    var target = evt.target;
    var selects = timeFieldsetElement.querySelectorAll('select');
    for (var i = 0; i < selects.length; i++) {
      if (syncTimeSelects.indexOf(selects[i].id) !== -1) {
        selects[i].value = target.value;
      }
    }
  });

  roomsNumberElement.addEventListener('change', function () {
    checkRoomsAndCapacity();
  });

  capacityElement.addEventListener('change', function () {
    checkRoomsAndCapacity();
  });

  function setSubmitHandler(formSubmitHandler) {
    adFormElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
      formSubmitHandler(evt);
    });
  }

  function setResetFormCallback(callback) {
    resetFormCallback = callback;
  }

  adFormElement.querySelector('.ad-form__reset').addEventListener('click', function (evt) {
    evt.preventDefault();
    resetFormCallback();
  });

  function setAddress(coords) {
    addressInputElement.value = coords.x + ', ' + coords.y;
  }

  function typeSelectChangeHandler() {
    setPriceParameters();
  }

  function setPriceParameters() {
    var type = typeElement.value;
    var minPrice = types[type].minprice;
    priceElement.placeholder = minPrice;
    priceElement.min = minPrice;
  }

  function checkRoomsAndCapacity() {
    var roomsOptionValueLastDigit = +roomsNumberElement.value % 100;
    var capacityOptionValue = +capacityElement.value;
    var errorMessage = '';

    if (roomsOptionValueLastDigit < 2 && roomsOptionValueLastDigit !== capacityOptionValue) {
      errorMessage = 'Введите допустимое количество гостей';
    } else if (roomsOptionValueLastDigit >= 2 && (roomsOptionValueLastDigit < capacityOptionValue || capacityOptionValue === 0)) {
      errorMessage = 'Введите допустимое количество гостей';
    }

    capacityElement.setCustomValidity(errorMessage);
  }

  function resetAdForm() {
    adFormElement.reset();
  }

  function toggleAdFormState() {
    window.form.toggleState(adFormElement);
  }

  window.adForm = {
    types: types,
    setAddress: setAddress,
    setResetFormCallback: setResetFormCallback,
    reset: resetAdForm,
    toggle: toggleAdFormState,
    setSubmitHandler: setSubmitHandler
  };
})();
