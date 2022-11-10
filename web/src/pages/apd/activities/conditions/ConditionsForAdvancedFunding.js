import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const ConditionsForAdvancedFunding = () => {
  return <div>ConditionsForAdvancedFunding</div>;
};

ConditionsForAdvancedFunding.propTypes = {};

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConditionsForAdvancedFunding);

export {
  ConditionsForAdvancedFunding as plain,
  mapStateToProps,
  mapDispatchToProps
};
