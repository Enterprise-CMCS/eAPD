import React from 'react';
import PropTypes from 'prop-types';
import Dollars from '../components/Dollars';

const FFYRow = ({ year, total, medicaid, federal, rowNum }) => (
  <div key={year} className={rowNum === 0 ? 'ds-u-margin-top--2' : ''}>
    <strong>FFY {year}:</strong> <Dollars>{total}</Dollars> |{' '}
    <strong>Total Computable Medicaid Cost:</strong>{' '}
    <Dollars>{medicaid}</Dollars> (<Dollars>{federal}</Dollars> Federal share)
  </div>
);

FFYRow.propTypes = {
  year: PropTypes.string.isRequired,
  total: PropTypes.number.isRequired,
  medicaid: PropTypes.number.isRequired,
  federal: PropTypes.number.isRequired,
  rowNum: PropTypes.number
};

const FFYList = ({ ffys }) => {
  return Object.entries(ffys).map(
    ([ffy, { medicaid, federal, total }], rowNum) => (
      <FFYRow
        key={ffy}
        year={ffy}
        total={total}
        medicaid={medicaid}
        federal={federal}
        rowNum={rowNum}
      />
    )
  );
};

FFYList.propTypes = {
  ffys: PropTypes.object.isRequired
};

export default FFYList;
export { FFYRow };
