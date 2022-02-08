import { DateField } from '@cmsgov/design-system';
// import moment from 'moment';
import PropTypes from 'prop-types';
import React, { useState, useMemo, PureComponent } from 'react';

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

// const DateField = ({ value, onChange, ...rest }) => {
//   const [errorInfo, setErrorInfo] = useState({
//     errorMessage: [],
//     dayInvalid: false,
//     monthInvalid: false,
//     yearInvalid: false
//   });

//   // Dates are stored internally as YYYY-MM-DD. The design system date field
//   // expects separate day, month, and year values. So split the incoming
//   // date up into its pieces.
//   const dateParts = useMemo(() => {
//     if (!value) {
//       return {
//         day: '',
//         month: '',
//         year: ''
//       };
//     }
//     const [year, month, day] = value.slice(0, 10).split('-');
//     return { day: +day || '', month: +month || '', year: +year || '' };
//   }, [value]);

//   const getErrorMsg = () => {
//     const date = moment(value, 'YYYY-M-D', true);
//     if (value === null || value === undefined || value.length === 0) {
//       return;
//     }

//     if (date.isValid()) {
//       setErrorInfo({
//         errorMessage: [],
//         dayInvalid: false,
//         monthInvalid: false,
//         yearInvalid: false
//       });
//       return;
//     }

//     const message = [];
//     let dayInvalid = false;
//     let monthInvalid = false;
//     let yearInvalid = false;

//     if (!dateParts.month || !dateParts.day || !dateParts.year) {
//       message.push('Please provide a target completion date.');

//       if (!dateParts.month) {
//         monthInvalid = true;
//       }

//       if (!dateParts.day) {
//         dayInvalid = true;
//       }

//       if (!dateParts.year) {
//         yearInvalid = true;
//       }
//     }
//     if (dateParts.month > 12) {
//       message.push('Month must be between 1 and 12.');
//       monthInvalid = true;
//     }

//     if (dateParts.day > 31) {
//       message.push('Day must be less than 31.');
//       dayInvalid = true;
//     }

//     if (`${dateParts.year}`.length !== 4) {
//       message.push('Year must be 4 digits.');
//       yearInvalid = true;
//     }

//     if (message.length === 0) {
//       message.push(
//         'Invalid date - is the day number too high for the provided month and year?'
//       );
//     }

//     setErrorInfo({
//       errorMessage: message.join(' '),
//       dayInvalid,
//       monthInvalid,
//       yearInvalid
//     });
//   };

//   return (
//     <DSDateField
//       {...rest}
//       {...errorInfo}
//       dayValue={dateParts.day}
//       monthValue={dateParts.month}
//       yearValue={dateParts.year}
//       onChange={onChange}
//       onComponentBlur={getErrorMsg}
//       errorPlacement='bottom'
//     />
//   );
// };

DateField.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};

export default DSDateField;
