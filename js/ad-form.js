'use strict';

(function () {

  var syncTimeSelects = ['timein', 'timeout'];
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

  var adForm = document.querySelector('.ad-form');
  var addressInput = adForm.querySelector('#address');
  var typeElement = adForm.querySelector('#type');
  var priceElement = adForm.querySelector('#price');
  var timeFieldset = adForm.querySelector('.ad-form__element--time');
  var roomsNumber = adForm.querySelector('#room_number');
  var capacity = adForm.querySelector('#capacity');
  var resetFormCallback = null;

  window.form.toggleInputState(adForm);
  setPriceParameters();
  checkRoomsAndCapacity();

  typeElement.addEventListener('change', typeSelectChangeHandler);

  timeFieldset.addEventListener('change', function (evt) {
    var target = evt.target;
    var selects = timeFieldset.querySelectorAll('select');
    for (var i = 0; i < selects.length; i++) {
      if (syncTimeSelects.indexOf(selects[i].id) !== -1) {
        selects[i].value = target.value;
      }
    }
  });

  roomsNumber.addEventListener('change', function () {
    checkRoomsAndCapacity();
  });

  capacity.addEventListener('change', function () {
    checkRoomsAndCapacity();
  });

  function setSubmitHandler(formSubmitHandler) {
    adForm.addEventListener('submit', function (evt) {
      evt.preventDefault();
      formSubmitHandler(evt);
    });
  }

  function setResetFormCallback(callback) {
    resetFormCallback = callback;
  }

  adForm.querySelector('.ad-form__reset').addEventListener('click', function (evt) {
    evt.preventDefault();
    resetFormCallback();
  });

  function setAddress(coords) {
    addressInput.value = coords.x + ', ' + coords.y;
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
    var roomsOptionValueLastDigit = +roomsNumber.value % 100;
    var capacityOptionValue = +capacity.value;
    var errorMessage = '';

    if (roomsOptionValueLastDigit < 2 && roomsOptionValueLastDigit !== capacityOptionValue) {
      errorMessage = 'Введите допустимое количество гостей';
    } else if (roomsOptionValueLastDigit >= 2 && (roomsOptionValueLastDigit < capacityOptionValue || capacityOptionValue === 0)) {
      errorMessage = 'Введите допустимое количество гостей';
    }

    capacity.setCustomValidity(errorMessage);
  }

  function resetAdForm() {
    adForm.reset();
  }

  function toggleAdFormState() {
    window.form.toggleState(adForm);
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
