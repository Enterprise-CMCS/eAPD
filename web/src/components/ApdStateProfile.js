import React from 'react';

import { Section, Subsection } from './Section';
import MedicaidOffice from '../containers/ApdStateProfileMedicaidOffice';
import PointsOfContact from '../containers/ApdStateProfilePointsOfContact';

const ApdStateProfile = () => (
  <Section id="apd-state-profile" resource="apd.stateProfile">
    <Subsection
      id="apd-state-profile-office"
      resource="apd.stateProfile.directorAndAddress"
    >
      <MedicaidOffice />
    </Subsection>
    <Subsection
      id="apd-state-profile-contacts"
      resource="apd.stateProfile.pointsOfContact"
    >
      <PointsOfContact />
    </Subsection>
  </Section>
);

export default ApdStateProfile;
