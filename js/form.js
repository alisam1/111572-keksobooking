'use strict';

(function () {

  function toggleFormInputState(formElement) {
    for (var i = 0; i < formElement.children.length; i++) {
      formElement.children[i].disabled = !formElement.children[i].disabled;
    }
  }

  function toggleFormState(formElement) {
    var disabledClass = formElement.name + '--disabled';
    formElement.classList.toggle(disabledClass);
    toggleFormInputState(formElement);
  }

  window.form = {
    toggleState: toggleFormState,
    toggleInputState: toggleFormInputState
  };
})();
