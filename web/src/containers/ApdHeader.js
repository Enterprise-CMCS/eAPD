import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import EditableLabel from 'react-inline-editing';

import { getAPDCreation, getAPDName, getAPDYearRange } from '../reducers/apd';

const ApdHeader = ({ apdName, year }) => (
  <div>
    <EditableLabel 
      text={apdName}
      labelClassName='ds-h1 apd--title'
      inputClassName='ds-h1 apd--title'
      inputWidth='250px'
      inputHeight='46px'
      inputMaxLength='50'
    />
    <h1 className="ds-h4">
      HITECH IAPD | FFY {year}
    </h1>
  </div>
);

ApdHeader.propTypes = {
  // apdCreated: PropTypes.string.isRequired,
  apdName: PropTypes.string,
  year: PropTypes.string.isRequired
};

ApdHeader.defaultProps = { apdName: '' };

const mapStateToProps = state => ({
  apdCreated: getAPDCreation(state),
  apdName: getAPDName(state),
  year: getAPDYearRange(state)
});

export default connect(mapStateToProps)(ApdHeader);

export { ApdHeader as plain, mapStateToProps };
