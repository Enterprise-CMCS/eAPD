import PropTypes from 'prop-types';
import React, { Component } from 'react';
import NumberFormat from 'react-number-format';

const makeNumberInput = formatProps => {
  class NumberInput extends Component {
    static propTypes = {
      onChange: PropTypes.func
    };

    static defaultProps = {
      onChange: null
    };

    handleChange = e => {
      if (!this.props.onChange) return;

      const newEvent = {
        target: { value: e.floatValue || 0, masked: e.formattedValue }
      };

      this.props.onChange(newEvent);
    };

    render() {
      const { onChange, ...rest } = this.props;

      return (
        <NumberFormat
          className="m0 input mono"
          onValueChange={this.handleChange}
          {...formatProps}
          {...rest}
        />
      );
    }
  }

  return NumberInput;
};

export const DollarInput = makeNumberInput({
  decimalScale: 0,
  fixedDecimalScale: true,
  prefix: '$',
  thousandSeparator: ','
});
export const PercentInput = makeNumberInput({
  decimalScale: 0,
  fixedDecimalScale: true,
  suffix: '%'
});
