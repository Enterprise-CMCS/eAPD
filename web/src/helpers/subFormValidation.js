export const findSubForm = (e) => {
  // eslint-disable-next-line no-param-reassign
  while ((e = e.parentNode) && !e.classList.contains('form-and-review-list--item__expanded'));
  return e;
}

export const addError = (input) => {
  if (!input.classList.contains('ds-c-field--error')) {
    input.classList.add('ds-c-field--error');
  }
}

export const removeError = (input) => {
  input.classList.remove('ds-c-field--error');
}

export const disableSave = (container) => {
  var inputs = container.querySelectorAll('input[type=text]')
  var emptyInputs = 0;

  for (var i = 0; i < inputs.length; i += 1) {
    var input = inputs[i];
    if (input.value === "") {
      emptyInputs++
      addError(input);
    } else if (input.value !== "") {
      removeError(input)
    }
  }
}

export const validateSubForm = (e) => {
  const el = e.target;
  const subForm = findSubForm(el);
  disableSave(subForm);
}