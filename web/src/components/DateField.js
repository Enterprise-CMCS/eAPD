import { DateField } from '@cmsgov/design-system';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { isValid, isFuture } from 'date-fns';
// import { addMissingTextAlert, removeMissingTextAlert } from '../helpers/textValidation';

import { disableBtn } from '../helpers/textValidation'

class DSDateField extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      errorMessage: [],
      day: '',
      month: '',
      year: ''
    };
  }

  render() {
    const month = this.state.month;
    const day = this.state.day;
    const year = this.state.year;
    const errorMsg = this.state.errorMessage;
    const date = new Date(`${year}-${month}-${day}`)

    const getErrorMsg = (e) => {
      let errors = [...errorMsg]

      if (isValid(date) && isFuture(date)) {
        this.setState({errorMessage: []});
        return;
      } else {
        const msg = 'Please provide a target completion date.';
        if (errors.length < 1) {
          errors.push(msg);
          this.setState({errorMessage: errors});
        }
        disableBtn(e.target);
      };
    };

    return (
      <DateField
        monthValue={month}
        dayValue={day}
        yearValue={year}
        onChange={(e, dateObject) => this.setState(dateObject)}
        errorMessage={errorMsg}
        errorPlacement='bottom'
        onComponentBlur={getErrorMsg}
      />
    );
  }
}

DateField.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};

export default DSDateField;
