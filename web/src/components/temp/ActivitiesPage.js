import React from 'react';

import Container from '../Container';
import Activities from '../../containers/Activities';
import ApdSummary from '../../containers/ApdSummary';

const ActivitiesPage = () => (
  <Container>
    <ApdSummary />
    <Activities />
  </Container>
);

export default ActivitiesPage;
