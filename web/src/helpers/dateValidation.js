export const findTextAncestor = (e) => {
  // eslint-disable-next-line no-param-reassign
  while ((e = e.parentNode) && !e.classList.contains('form-and-review-list--item__expanded'));
  return e;
}

export const selectAllInputs = (cont) => {
  var inputs = document.getElementsByTagName('input');
  var emptyInputs = 0;
  for (var i = 0; i < inputs.length; i += 1) {
    var input = inputs[i];
    if (input.value === "") {
      emptyInputs++
      console.log(input.classList)
      input.classList.add('missing-text-alert')
      console.log(input.classList)
    } else {
      input.classList.remove('missing-text-alert')
    }
  }

  return emptyInputs - 1;
}

export const disableBtn = (e) => {
  const el = e.target;
  const container = findTextAncestor(el);

  const emptyInputs = selectAllInputs(container);

  const doneBtn = container.querySelector('#form-and-review-list--done-btn');

  if (emptyInputs > 0) {
    doneBtn.disabled = true;
  } else {
    doneBtn.disabled = false;
  }
}