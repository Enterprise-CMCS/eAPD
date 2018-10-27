import omit from 'lodash.omit';
import moment from 'moment';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { SingleDatePicker } from 'react-dates';

const dateToStr = (date, fmt = 'YYYY-MM-DD') => date.format(fmt);
const strToDate = str => (str ? moment(str) : null);

class DatePickerWrapper extends Component {
  constructor(props) {
    super(props);

    this.state = {
      focused: false,
      date: strToDate(props.initialDate)
    };
  }

  onDateChange = date => {
    if (this.props.onChange) {
      this.props.onChange(date ? dateToStr(date) : '');
    }

    this.setState({ date });
  };

  onFocusChange = ({ focused }) => {
    this.setState({ focused });
  };

  render() {
    const { focused, date } = this.state;

    const props = omit(this.props, ['initialDate', 'onChange']);

    return (
      <SingleDatePicker
        {...props}
        date={date}
        onDateChange={this.onDateChange}
        focused={focused}
        onFocusChange={this.onFocusChange}
        isOutsideRange={() => false}
      />
    );
  }
}

DatePickerWrapper.propTypes = {
  id: PropTypes.string.isRequired,
  initialDate: PropTypes.string,
  onChange: PropTypes.func
};

DatePickerWrapper.defaultProps = {
  initialDate: null,
  onChange: null
};

export default DatePickerWrapper;
