import React from 'react';
import { connect } from 'react-redux';

import { Section } from '../../../components/Section';

const SecurityPlanning = () => {
  return <Section id="security-planning" resource="securityPlanning"></Section>;
};

const mapStateToProps = () => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(SecurityPlanning);

export { SecurityPlanning as plain, mapStateToProps, mapDispatchToProps };
