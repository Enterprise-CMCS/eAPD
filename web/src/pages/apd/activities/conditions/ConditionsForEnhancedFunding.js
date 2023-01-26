import React from 'react';
import { connect } from 'react-redux';

import { Subsection } from '../../../../components/Section';

const ConditionsForEnhancedFunding = () => {
  return <Subsection resource="activities.conditions"></Subsection>;
};

const mapStateToProps = () => ({});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConditionsForEnhancedFunding);

export {
  ConditionsForEnhancedFunding as plain,
  mapStateToProps,
  mapDispatchToProps
};
