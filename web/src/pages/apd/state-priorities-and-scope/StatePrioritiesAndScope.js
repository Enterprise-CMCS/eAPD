import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Section, Subsection } from '../../../components/Section';

const StatePrioritiesAndScope = () => {
  return (
    <Section
      id="state-priorities-and-scope"
      resource="statePrioritiesAndScope"
    ></Section>
  );
};

StatePrioritiesAndScope.propTypes = {};

const mapStateToProps = state => ({});

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
