import React from 'react';
import { connect } from 'react-redux';

import { Subsection } from '../../../../components/Section';

const AlternativesAndRisks = () => {
  return <Subsection resource="activities.alternativesAndRisks"></Subsection>;
};

const mapStateToProps = () => ({});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AlternativesAndRisks);

export { AlternativesAndRisks as plain, mapStateToProps, mapDispatchToProps };
