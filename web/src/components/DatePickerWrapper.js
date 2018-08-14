import omit from 'lodash.omit';
import moment from 'moment';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { DateRangePicker } from 'react-dates';

const dateToStr = (date, fmt = 'YYYY-MM-DD') => date.format(fmt);
const strToDate = str => (str ? moment(str) : null);

class DatePickerWrapper extends Component {
  constructor(props) {
    super(props);

    this.state = {
      focusedInput: null,
      startDate: strToDate(props.initialStartDate),
      endDate: strToDate(props.initialEndDate)
    };
  }

  onDatesChange = ({ startDate, endDate }) => {
    if (this.props.onChange) {
      this.props.onChange({
        start: startDate && dateToStr(startDate),
        end: endDate && dateToStr(endDate)
      });
    }

    this.setState({ startDate, endDate });
  };

  onFocusChange = focusedInput => {
    this.setState({ focusedInput });
  };

  render() {
    const { focusedInput, startDate, endDate } = this.state;

    const props = omit(this.props, [
      'initialStartDate',
      'initialEndDate',
      'onChange'
    ]);

    return (
      <DateRangePicker
        {...props}
        onDatesChange={this.onDatesChange}
        onFocusChange={this.onFocusChange}
        focusedInput={focusedInput}
        startDate={startDate}
        endDate={endDate}
      />
    );
  }
}

DatePickerWrapper.propTypes = {
  startDateId: PropTypes.string.isRequired,
  endDateId: PropTypes.string.isRequired,

  initialStartDate: PropTypes.string,
  initialEndDate: PropTypes.string,
  onChange: PropTypes.func
};

DatePickerWrapper.defaultProps = {
  initialStartDate: null,
  initialEndDate: null,
  onChange: null
};

export default DatePickerWrapper;
