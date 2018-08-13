import moment from 'moment';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { DateRangePicker } from 'react-dates';
import { START_DATE, END_DATE } from 'react-dates/constants';
import momentPropTypes from 'react-moment-proptypes';

class DatePickerWrapper extends Component {
  constructor(props) {
    super(props);

    this.state = {
      focusedInput: null,
      startDate: props.initialStartDate,
      endDate: props.initialEndDate
    };
  }

  onDatesChange = ({ startDate, endDate }) => {
    this.setState({ startDate, endDate }, this.afterDatesChange);
  };

  afterDatesChange = () => {
    console.log(this.state);
  };

  onFocusChange = focusedInput => {
    this.setState({ focusedInput });
  };

  render() {
    const { startDateId, endDateId } = this.props;
    const { focusedInput, startDate, endDate } = this.state;

    return (
      <DateRangePicker
        onDatesChange={this.onDatesChange}
        onFocusChange={this.onFocusChange}
        focusedInput={focusedInput}
        startDate={startDate}
        endDate={endDate}
        startDateId={startDateId}
        endDateId={endDateId}
      />
    );
  }
}

DatePickerWrapper.propTypes = {
  startDateId: PropTypes.string.isRequired,
  endDateId: PropTypes.string.isRequired,

  initialStartDate: momentPropTypes.momentObj,
  initialEndDate: momentPropTypes.momentObj,
  onChange: PropTypes.func
};

DatePickerWrapper.defaultProps = {
  initialStartDate: null,
  initialEndDate: null,
  onChange: null
};

export default DatePickerWrapper;
