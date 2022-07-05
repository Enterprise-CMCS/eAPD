import React from 'react';

import { Section, Subsection } from '../../../components/Section';
import MedicaidOffice from './ApdStateProfileMedicaidOffice';
import KeyPersonnel from './ApdStateKeyPersonnel';
import Waypoint from '../../../components/ConnectedWaypoint';
import AlertMissingFFY from '../../../components/AlertMissingFFY';

const KeyStatePersonnel = () => (
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
        resource="apd.stateProfile.keyPersonnel"
      >
        <KeyPersonnel />
      </Subsection>
    </Section>
  </React.Fragment>
);

export default KeyStatePersonnel;
