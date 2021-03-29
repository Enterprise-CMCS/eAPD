import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import { connect } from 'react-redux';

import { getAPDCreation, getAPDName, getAPDYearRange } from '../reducers/apd';

const ApdHeader = ({ apdCreated, year }) => (
  <Fragment>
    <h1 className="ds-h1 ds-u-margin-bottom--0 apd--title">
      <span className="ds-h6 ds-u-display--block">
        <strong>Created:</strong> {apdCreated}
      </span>
      {localStorage.getItem('apd-name')}
    </h1>
    <h2 className="ds-h4 ds-u-margin-top--1 ds-u-margin-bottom--4">
      {localStorage.getItem('apd-funding-source').toUpperCase() + ' IAPD'}| FFY{' '}
      {year}
    </h2>
  </Fragment>
);

ApdHeader.propTypes = {
  apdCreated: PropTypes.string.isRequired,
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
