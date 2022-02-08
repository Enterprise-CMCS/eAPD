import { DateField } from '@cmsgov/design-system';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';

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
    return (
      <DateField
        monthValue={this.state.month}
        dayValue={this.state.day}
        yearValue={this.state.year}
        onChange={(e, dateObject) => this.setState(dateObject)}
      />
    );
  }
}

DateField.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};

export default DSDateField;
