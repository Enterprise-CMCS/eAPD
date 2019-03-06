import { format } from 'd3-format';
import PropTypes from 'prop-types';
import React, { Fragment } from 'react';

const formats = {
  long: format('$,.0f'),
  short: format('$,.3~s')
};

const formatShort = num =>
  num < 100000
    ? formats.long(num)
    : formats
        .short(num)
        .replace(/G$/, 'B')
        .replace(/P$/, 'Q');

const formatLong = num => formats.long(num);

const Dollars = ({ children }) => {
  const num = parseFloat(children);

  if (Number.isNaN(num) || !Number.isFinite(num)) {
    return <Fragment>--</Fragment>;
  }

  return (
    <Fragment>
      <span className="only-print">{formatLong(num)}</span>
      <span className="only-screen">{formatShort(num)}</span>
    </Fragment>
  );
};

Dollars.propTypes = {
  children: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired
};

export default Dollars;
