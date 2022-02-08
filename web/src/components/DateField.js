import { DateField } from '@cmsgov/design-system';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { addMissingTextAlert, removeMissingTextAlert } from '../helpers/textValidation';

// import { disableBtn } from '../helpers/textValidation'

class DSDateField extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      day: '',
      month: '',
      year: '',
    };
  }

  render() {
    const error = 'missing-text-error';
    const alert = 'missing-text-alert';

    const findDateAncestor = (e) => {
      // eslint-disable-next-line no-param-reassign
      while ((e = e.parentNode) && !e.classList.contains('ds-c-datefield__container'));
      return e;
    };

    const addMissingDateAlert = (e, c) => {
      const lastDiv = c.lastDiv;
      const div = document.createElement('div');

      div.innerHTML = 'Please provide target completion date';

      e.classList.add(alert)

      if (!lastDiv.classList.contains(error)) {
        div.classList.add(error);
      }
    };

    const validateDate = (e) => {
      const el = e.target;
      const parent = el.parentNode;
      const container = findDateAncestor(el);
      const dateSegments = container.querySelectorAll('.ds-c-field');

      for(var i = 0, l = dateSegments.length; i < l; i++){
        const inputVal = dateSegments[i].value;
        return inputVal !== '' ? null : addMissingDateAlert(el, container);
      };
    };

    return (
      <DateField
        monthValue={this.state.month}
        dayValue={this.state.day}
        yearValue={this.state.year}
        onChange={(e, dateObject) => this.setState(dateObject)}
        onBlur={(e) => {
          validateDate(e)
        }}
      />
    );
  }
}

DateField.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};

export default DSDateField;
