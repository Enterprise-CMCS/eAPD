/* eslint-disable no-cond-assign */
const error = 'missing-text-error';
const alert = 'missing-text-alert';

export const findTextAncestor = (e) => {
  // eslint-disable-next-line no-param-reassign
  while ((e = e.parentNode) && !e.classList.contains('form-and-review-list--item__expanded'));
  return e;
}

export const findDateAncestor = (e) => {
  // eslint-disable-next-line no-param-reassign
  while ((e = e.parentNode) && !e.classList.contains('ds-c-datefield__container'));
  return e;
};

export const disableBtn = (e) => {
  const container = findTextAncestor(e);
  const doneBtn = container.querySelector('#form-and-review-list--done-btn');

  if (container
        .querySelectorAll(`.${error}`)
        .length > 0) {
          doneBtn.disabled = true;
        } else {
          doneBtn.disabled = false;
        }
};

export const addMissingTextAlert = (e, p, l, s) => {
  const lastDiv = p.lastChild;
  const div = document.createElement('div');
  const vowels = ("aeiouAEIOU");

  if (vowels.indexOf(l[0]) !== -1) {
    div.innerHTML = `Provide an ${l}${s}`;
  } else {
    div.innerHTML = `Provide a ${l}${s}`;
  }

  if (!lastDiv.classList.contains(error)) {
    div.classList.add(error);
    e.classList.add(alert);
    p.appendChild(div);
  }

  disableBtn(e);
};

export const removeMissingTextAlert = (e, p) => {
  const lastDiv = p.lastChild;

  if(lastDiv.classList.contains(error)) {
    e.classList.remove(alert);
    lastDiv.classList.remove(error);
    p.removeChild(lastDiv);
  }

  disableBtn(e);
};

export const validateText = (e, label, suffix) => {
  const el = e.currentTarget;
  const parent = el.parentNode;
  const text = el.innerHTML.trim();
  const elValue = el.value;

  return text || elValue !== '' ? removeMissingTextAlert(el, parent) : addMissingTextAlert(el, parent, label, suffix) ;
};