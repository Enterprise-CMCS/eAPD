import PropTypes from 'prop-types';
import React, { Fragment } from 'react';

import Dollars from '../../../components/Dollars';

const MmisFfyTotalsSummary = ({ ffys }) => {
  return (
    <Fragment>
      {Object.entries(ffys).map(
        ([ffy, { medicaid, federal, total: ffyTotal }], i) => (
          <li key={ffy} className={i === 0 ? 'ds-u-margin-top--2' : ''}>
            <strong>FFY {ffy}:</strong> <Dollars>{ffyTotal}</Dollars> |{' '}
            <Dollars>{medicaid}</Dollars> Total Computable Medicaid Cost |{' '}
            <Dollars>{federal}</Dollars> Federal share
          </li>
        )
      )}
    </Fragment>
  );
};

MmisFfyTotalsSummary.propTypes = {
  ffys: PropTypes.object.isRequired
};

export default MmisFfyTotalsSummary;
