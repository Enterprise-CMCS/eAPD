import React from 'react';
import { connect } from 'react-redux';

import { Subsection } from '../../../../components/Section';

const ConditionsForAdvancedFunding = () => {
  return <Subsection resource="activities.conditions"></Subsection>;
};

const mapStateToProps = () => ({});

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
