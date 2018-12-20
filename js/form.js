'use strict';
(function() {
var map = document.querySelector('.map');
var mainPin = map.querySelector('.map__pin--main');
var adForm = document.querySelector('.ad-form');
var filtersForm = document.querySelector('.map__filters');
var addressInput = document.querySelector('#address');
var mainPinCenterCoords = {
  x: parseInt(mainPin.style.left, 10) + mainPin.offsetWidth / 2,
  y: parseInt(mainPin.style.top, 10) + mainPin.offsetHeight / 2
};
var typeElement = adForm.querySelector("#type");
var priceElement = adForm.querySelector("#price");
var selectRoomNumber = adForm.querySelector('#room_number');
var capasitySelectGroop = adForm.querySelector('#capacity');
var capacitySelectItem = capasitySelectGroop.querySelectorAll('option');
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


function toggleMapState() {
  map.classList.toggle('map--faded');
}

mainPin.addEventListener('click', function() {
  adForm.classList.remove('ad-form--disabled');
});

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

function toggleFormState(adForm) {
  var formInputs = document.querySelectorAll('input');
  var formSelects = document.querySelectorAll('select');
  for (var i = 0; i < formInputs.length; i++) {
    formInputs[i].disabled = !formInputs[i].disabled;
  }
  for (i = 0; i < formSelects.length; i++) {
    formSelects[i].disabled = !formSelects[i].disabled;
  }
}

function toggleFormInputState(adForm) {
  var formInputs = document.querySelectorAll('input');
  var formSelects = document.querySelectorAll('select');
  for (var i = 0; i < formInputs.length; i++) {
    formInputs[i].disabled = !formInputs[i].disabled;
    if (formInputs[i].id === 'address') {
      formInputs[i].disabled = true;
    }
  }
  for (i = 0; i < formSelects.length; i++) {
    formSelects[i].disabled = !formSelects[i].disabled;
  }
}

function setPrice(){
  var type = typeElement.value;
  var minPrice = TYPES[type].minprice;
  priceElement.placeholder = minPrice;
  priceElement.min = minPrice;
}

function typeSelectChangeHandler() {
  setPrice();
}


typeElement.addEventListener('change', typeSelectChangeHandler);


var onCapacityPlacesChange = function () {
  if (selectRoomNumber.value === '1') {
    capacitySelectItem[0].setAttribute('disabled', true);
    capacitySelectItem[1].setAttribute('disabled', true);
    capacitySelectItem[2].removeAttribute('disabled');
    capacitySelectItem[3].setAttribute('disabled', true);
    capasitySelectGroop.value = '1';
  } else if (selectRoomNumber.value === '2') {
    capacitySelectItem[0].setAttribute('disabled', true);
    capacitySelectItem[1].removeAttribute('disabled');
    capacitySelectItem[2].removeAttribute('disabled');
    capacitySelectItem[3].setAttribute('disabled', true);
    capasitySelectGroop.value = '2';
  } else if (selectRoomNumber.value === '3') {
    capacitySelectItem[0].removeAttribute('disabled');
    capacitySelectItem[1].removeAttribute('disabled');
    capacitySelectItem[2].removeAttribute('disabled');
    capacitySelectItem[3].setAttribute('disabled', true);
    capasitySelectGroop.value = '3';
  } else if (selectRoomNumber.value === '100') {
    capacitySelectItem[0].setAttribute('disabled', true);
    capacitySelectItem[1].setAttribute('disabled', true);
    capacitySelectItem[2].setAttribute('disabled', true);
    capacitySelectItem[3].removeAttribute('disabled');
    capasitySelectGroop.value = '0';
  }
};

selectRoomNumber.addEventListener('change', onCapacityPlacesChange);

var timesIn = document.querySelector('#timein');
var timesOut = document.querySelector('#timeout');

timesIn.addEventListener('change', function (evt) {
  timesOut.value = evt.target.value;
});

timesOut.addEventListener('change', function (evt) {
  timesIn.value = evt.target.value;
});

adForm.addEventListener('submit', function (evt) {
  window.backend.upload(new FormData(adFormElement), successHandler, errorHandler);
  evt.preventDefault();
});

function setSuccessHandlerCallback(callback) {
  successHandlerCallback = callback;
}

function setResetFormCallback(callback) {
  resetFormCallback = callback;
}

adForm.addEventListener('reset', function () {
  resetFormCallback();
});

function successHandler() {
  successHandlerCallback();
  window.message.showSuccessMessage();
}

function errorHandler() {
  window.message.showErrorMessage();
}

function resetForms() {
  var forms = document.querySelectorAll('form');
  for (var i = 0; i < forms.length; i++) {
    forms[i].reset();
  }
}

function mainPinMouseupHandler(){
  deleteDisabled();
  typeSelectChangeHandler();
  onCapacityPlacesChange();
  renderPins(data);
  mainPin.removeEventListener('mouseup', mainPinMouseupHandler);
}

  function toggleAllForms() {
    toggleFormState(adForm);
    toggleFormState(filtersForm);
}

window.form = {
    TYPES: TYPES,
    setAddress: setAddress,
    toggleAll: toggleAllForms,
    setSuccessHandlerCallback: setSuccessHandlerCallback,
    setResetFormCallback: setResetFormCallback,
    reset: resetForms
};
})();
