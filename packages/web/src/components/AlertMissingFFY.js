import { connect } from 'react-redux';
import React from 'react';
import PropTypes from 'prop-types';
import { Alert } from '@cmsgov/design-system';
import { selectApdYears } from '../reducers/apd.selectors';

const AlertMissingFFY = ({ years, apdId }) => {
  if (years.length > 0) {
    return null;
  }
  return (
    <Alert variation="error" className="ds-u-margin-bottom--2">
      At least one FFY must be selected to continue with your APD.{' '}
      <a href={`/apd/${apdId}/apd-overview`}>Select your FFY(s).</a>
    </Alert>
  );
};

AlertMissingFFY.propTypes = {
  years: PropTypes.arrayOf(PropTypes.string).isRequired,
  apdId: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  years: selectApdYears(state),
  apdId: state.apd.data.id
});

export default connect(mapStateToProps)(AlertMissingFFY);

export { AlertMissingFFY as plain, mapStateToProps };
