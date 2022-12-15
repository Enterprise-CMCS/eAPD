import React from 'react';
import { connect } from 'react-redux';

import { Section } from '../../../components/Section';

const StatePrioritiesAndScope = () => {
  return (
    <Section
      id="state-priorities-and-scope"
      resource="statePrioritiesAndScope"
    ></Section>
  );
};

const mapStateToProps = () => ({});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StatePrioritiesAndScope);

export {
  StatePrioritiesAndScope as plain,
  mapStateToProps,
  mapDispatchToProps
};
