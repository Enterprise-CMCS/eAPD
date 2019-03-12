import React from 'react';

import { Section, Subsection } from './Section';
import MedicaidOffice from '../containers/ApdStateProfileMedicaidOffice';
import KeyPersonnel from '../containers/ApdStateKeyPersonnel';

const ApdStateProfile = () => (
  <Section id="apd-state-profile" number="1" resource="apd.stateProfile">
    <Subsection
      id="apd-state-profile-office"
      resource="apd.stateProfile.directorAndAddress"
    >
      <MedicaidOffice />
    </Subsection>
    <Subsection
      id="apd-state-profile-key-personnel"
      resource="apd.stateProfile.keyPersonnel"
    >
      <KeyPersonnel />
    </Subsection>
  </Section>
);

export default ApdStateProfile;
