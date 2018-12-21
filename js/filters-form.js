'use strict';

(function () {

  var filtersForm = document.querySelector('.map__filters');
  var typeSelectElement = filtersForm.querySelector('#housing-type');
  var priceSelectElement = filtersForm.querySelector('#housing-price');
  var roomsSelectElement = filtersForm.querySelector('#housing-rooms');
  var guestsSelectElement = filtersForm.querySelector('#housing-guests');
  var featuresFieldsetElement = filtersForm.querySelector('#housing-features');

  var priceLimits = {
    low: 10000,
    high: 50000
  };

  window.form.toggleInputState(filtersForm);

  function setfilterChangeHandler(callback) {
    var filterChangeHandler = callback;
    typeSelectElement.addEventListener('change', filterChangeHandler);
    priceSelectElement.addEventListener('change', filterChangeHandler);
    roomsSelectElement.addEventListener('change', filterChangeHandler);
    guestsSelectElement.addEventListener('change', filterChangeHandler);
    featuresFieldsetElement.addEventListener('change', filterChangeHandler);
  }

  function resetFiltersForm() {
    filtersFormElement.reset();
  }

  function toggleFiltersFormState() {
    window.form.toggleState(filtersFormElement);
  }

  function isTypeMatch(item) {
    return item.offer.type === typeSelectElement.value || typeSelectElement.value === 'any';
  }

  function isPriceMatch(item) {
    var isPriceSuited;
    switch (priceSelectElement.value) {
      case 'any':
        isPriceSuited = true;
        break;
      case 'low':
        isPriceSuited = item.offer.price < priceLimits.low;
        break;
      case 'middle':
        isPriceSuited = item.offer.price >= priceLimits.low && item.offer.price <= priceLimits.high;
        break;
      case 'high':
        isPriceSuited = item.offer.price > priceLimits.high;
        break;
    }
    return isPriceSuited;
  }

  function isRoomsMatch(item) {
    return item.offer.rooms === +roomsSelectElement.value || roomsSelectElement.value === 'any';
  }

  function isGuestsMatch(item) {
    return item.offer.guests === +guestsSelectElement.value || guestsSelectElement.value === 'any';
  }

  function isFeaturesMatch(item) {
    var checkedFeaturesCollection = featuresFieldsetElement.querySelectorAll('.map__checkbox:checked');
    var store = {};
    var checkedFeatures = [];
    for (var i = 0; i < item.offer.features.length; i++) {
      var key = item.offer.features[i];
      store[key] = true;
    }
    for (i = 0; i < checkedFeaturesCollection.length; i++) {
      checkedFeatures.push(checkedFeaturesCollection[i]);
    }
    return checkedFeatures.every(function (feature) {
      return store[feature.value];
    });
  }

  function filterArray(array) {
    var filteredArray = array.filter(function (item) {
      return isTypeMatch(item) && isPriceMatch(item) && isRoomsMatch(item) && isGuestsMatch(item) && isFeaturesMatch(item);
    });

    if (filteredArray.length > 5) {
      filteredArray.length = 5;
    }

    return filteredArray;
  }

  window.filtersForm = {
    reset: resetFiltersForm,
    toggle: toggleFiltersFormState,
    setfilterChangeHandler: setfilterChangeHandler,
    filter: filterArray
  };
})();
