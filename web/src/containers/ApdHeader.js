import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import { getAPDCreation, getAPDName, getAPDYearRange } from '../reducers/apd';

const ApdHeader = ({ apdCreated, apdName, year }) => (
  <h1 className="ds-h1 apd--title">
    <span className="ds-h6 ds-u-display--block">
      <strong>Created:</strong> {apdCreated}
    </span>
    {apdName} | FFY {year}
  </h1>
);

ApdHeader.propTypes = {
  apdCreated: PropTypes.string.isRequired,
  apdName: PropTypes.string,
  year: PropTypes.string.isRequired
};

ApdHeader.defaultProps = { apdName: '' };

const mapStateToProps = (state) => ({
  apdCreated: getAPDCreation(state),
  apdName: getAPDName(state),
  year: getAPDYearRange(state)
});

export default connect(mapStateToProps)(ApdHeader);

export { ApdHeader as plain, mapStateToProps };
