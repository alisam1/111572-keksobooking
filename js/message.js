'use strict';

(function () {

  function showErrorMessage() {
    var errorMessageTemplate = document.querySelector('#error').content.querySelector('.error');
    var errorMessageElement = errorMessageTemplate.cloneNode(true);
    var errorButton = errorMessageElement.querySelector('.error__button');
    document.addEventListener('keyup', errorMessageEscPressHandler);
    document.addEventListener('click', errorMessageClickHandler);
    errorButton.addEventListener('click', errorButtonClickHandler);
    document.querySelector('main').insertAdjacentElement('afterbegin', errorMessageElement);
  }

  function showSuccessMessage() {
    var successMessageTemplate = document.querySelector('#success').content.querySelector('.success');
    var successMessageElement = successMessageTemplate.cloneNode(true);
    document.addEventListener('keyup', successMessageEscPressHandler);
    document.addEventListener('click', successMessageClickHandler);
    document.querySelector('main').insertAdjacentElement('afterbegin', successMessageElement);
  }

  function closeMessage(messageClass) {
    var messageElement = document.querySelector('.' + messageClass);
    if (messageElement) {
      messageElement.remove();
      switch (messageClass) {
        case 'success':
          document.removeEventListener('keyup', successMessageEscPressHandler);
          document.removeEventListener('click', successMessageClickHandler);
          break;
        case 'error':
          document.removeEventListener('keyup', errorMessageEscPressHandler);
          document.removeEventListener('click', errorMessageClickHandler);
          break;
      }
    }
  }

  function successMessageEscPressHandler(evt) {
    if (evt.keyCode === window.utils.ESC_KEYCODE) {
      closeMessage('success');
    }
  }

  function successMessageClickHandler() {
    closeMessage('success');
  }

  function errorMessageEscPressHandler(evt) {
    if (evt.keyCode === window.utils.ESC_KEYCODE) {
      closeMessage('error');
    }
  }

  function errorMessageClickHandler() {
    closeMessage('error');
  }

  function errorButtonClickHandler() {
    closeMessage('error');
  }

  window.message = {
    showErrorMessage: showErrorMessage,
    showSuccessMessage: showSuccessMessage
  };
})();
