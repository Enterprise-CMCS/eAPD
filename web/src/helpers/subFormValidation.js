import { findDateForm } from './dateValidation';

export const findSubForm = (e) => {
  // eslint-disable-next-line no-param-reassign
  while ((e = e.parentNode) && !e.classList.contains('form-and-review-list--item__expanded'));
  return e;
}

export const disableSave = (subForm) => {
  var inputErrors = subForm.getElementsByClassName('ds-c-field--error');
  const doneBtn = subForm.querySelector('#form-and-review-list--done-btn');

  if (inputErrors.length > 1) {
    doneBtn.disabled = true;
  } else {
    doneBtn.disabled = false;
  }
}

export const addError = (input) => {
  if (!input.classList.contains('ds-c-field--error')) {
    input.classList.add('ds-c-field--error');
  }
}

export const removeError = (input) => {
  input.classList.remove('ds-c-field--error');
}

export const validateInputFields = (subForm) => {
  var inputs = subForm.getElementsByTagName('input');

  for (var i = 0; i < inputs.length; i += 1) {
    var input = inputs[i],
        inputVal = input.value;

    if (inputVal === '') {
      addError(input);
    } else {
      removeError(input);
    }
  }

  findDateForm(subForm);

  disableSave(subForm);
}

export const validateSubForm = (e) => {
  const el = e.target;
  const subForm = findSubForm(el);

  validateInputFields(subForm);
}