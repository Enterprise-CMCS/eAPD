import { format } from 'd3-format';
import PropTypes from 'prop-types';
import React, { Fragment } from 'react';

/**
 * Displays a number as a dollar value, formatted with a dollar sign prefix and
 * comma thousands separator, and shortened versions of very large numbers.
 * E.g., 12345678 becomes "$12.3M"  If the input is invalid, displays "--"
 * @description Puts two span elements in the DOM. One has a class of
 * "only-screen" and contains the potentially truncated dollar value. The other
 * has a class of "only-print" and contains the full dollar value.
 */
const Dollars = ({ children }) => {
  const num = parseFloat(children);

  if (Number.isNaN(num) || !Number.isFinite(num)) {
    return <Fragment>$0</Fragment>;
  }

  return <span>{format('$,.0f')(num)}</span>;
};

Dollars.propTypes = {
  /** The number, either as a numeric type or a parseable string, to display as
   * dollars. */
  children: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
};

Dollars.defaultProps = {
  children: null
};

export default Dollars;
