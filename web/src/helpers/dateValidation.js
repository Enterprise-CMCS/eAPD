// import isValid from 'date-fns/isValid';

// check if Number
function IsNumeric(input) {
  return (input - 0) == input && input.length > 0;
};

// add error
function addError(input) {
  if (!input.classList.contains('ds-c-field--error')) {
    input.classList.add('ds-c-field--error');
  }
};

// Month & Year

// Full Date
export const findDateForm = (subForm) => {
  const dateForms = subForm.getElementsByClassName('ds-c-datefield__container');

  if (dateForms.length === 0) {
    return;
  } else {
    for (var i = 0; i < dateForms.length; i++) {
      var form = dateForms[i],
          inputs = form.getElementsByTagName('input'),
          month = inputs[0],
          monthVal = month.value,
          day = inputs[1],
          dayVal = day.value,
          year = inputs[2],
          yearVal = year.value;

      if (!IsNumeric(monthVal) || monthVal < 1 || monthVal > 12) {
        addError(month);
      }

      if (!IsNumeric(dayVal) || dayVal < 1) {
        addError(day);
      }

      if (!IsNumeric(yearVal) || yearVal < 2020 || yearVal > 2100) {
        addError(year);
      }

      var lastDayOfMonth = new Date(yearVal, parseInt(monthVal) - 1, 0);
      if (dayVal > lastDayOfMonth.getDate()) {
        addError(month);
        addError(day);
      }
    }
  }
}