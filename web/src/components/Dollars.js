import { format } from 'd3-format';
import PropTypes from 'prop-types';
import React, { Fragment } from 'react';

const formats = {
  // $ - prefix with a dollar sign
  // , - use comma as thousands separator
  // .0f - no decimal places
  long: format('$,.0f'),

  // $ - prefix with a dollar sign
  // , - use comma as thousands separator
  // .3~s - use SI prefixes with 3 significant digits
  short: format('$,.3~s')
};

/**
 * Formats a number into a short dollar representation, converting large
 * numbers into postfixed strings.  E.g., "$1.23M"
 */
const formatShort = num =>
  // For relatively small values, we'll display them in whole
  num < 100000
    ? formats.long(num)
    : // For larger values, use the SI prefixes, but since giga-dollars isn't
      // a thing people say, replace the SI prefixes with decimal ones.
      // G = giga = billion = B
      // P = peta = quadrillion = Q
      formats
        .short(num)
        .replace(/G$/, 'B')
        .replace(/P$/, 'Q');

/**
 * Formats a number into a dollar representation, preserving all the digits
 * before the decimal point, but none after it. E.g., "$1,234,567"
 */
const formatLong = num => formats.long(num);

/**
 * Displays a number as a dollar value, formatted with a dollar sign prefix and
 * comma thousands separator, and shortened versions of very large numbers.
 * E.g., 12345678 becomes "$12.3M"  If the input is invalid, displays "--"
 * @description Puts two span elements in the DOM. One has a class of
 * "only-screen" and contains the potentially truncated dollar value. The other
 * has a class of "only-print" and contains the full dollar value.
 */
const Dollars = ({ children, long }) => {
  const num = parseFloat(children);

  if (Number.isNaN(num) || !Number.isFinite(num)) {
    return <Fragment>--</Fragment>;
  }

  if (long) {
    return <span>{formatLong(num)}</span>;
  }

  return (
    <Fragment>
      <span className="visibility--screen">{formatShort(num)}</span>
      <span className="visibility--print">{formatLong(num)}</span>
    </Fragment>
  );
};

Dollars.propTypes = {
  /** The number, either as a numeric type or a parseable string, to display as
   * dollars. */
  children: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
    .isRequired,
  long: PropTypes.bool
};

Dollars.defaultProps = {
  long: false
};

export default Dollars;
