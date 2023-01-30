import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import { Section, Subsection } from '../../../components/Section';
import MedicaidOffice from './ApdStateProfileMedicaidOffice';
import KeyPersonnel from './ApdStateKeyPersonnel';
import Waypoint from '../../../components/ConnectedWaypoint';
import AlertMissingFFY from '../../../components/AlertMissingFFY';

import { selectApdType } from '../../../redux/selectors/apd.selectors';

const KeyStatePersonnel = ({ apdType }) => (
  <React.Fragment>
    <Waypoint />
    <AlertMissingFFY />
    <Section resource="apd.stateProfile">
      <Waypoint id="apd-state-profile-office" />
      <Subsection
        id="apd-state-profile-office"
        resource="apd.stateProfile.directorAndAddress"
      >
        <MedicaidOffice />
      </Subsection>
      <Waypoint id="apd-state-profile-key-personnel" />
      <Subsection
        id="apd-state-profile-key-personnel"
        resource={`apd.stateProfile.keyPersonnel${apdType}`}
      >
        <KeyPersonnel />
      </Subsection>
    </Section>
  </React.Fragment>
);

KeyStatePersonnel.propTypes = {
  apdType: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  apdType: selectApdType(state)
});

export default connect(mapStateToProps)(KeyStatePersonnel);

export { KeyStatePersonnel as plain, mapStateToProps };
