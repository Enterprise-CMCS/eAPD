import React from 'react';

import Container from '../Container';
import ExecutiveSummaryBudget from '../../containers/ApdStateProfilePointsOfContact';

const MiscPage = () => (
  <Container>
    <h1 className="h2">Misc Components (for testing purposes)</h1>
    <div className="p3 bg-white overflow-auto">
      <ExecutiveSummaryBudget />
    </div>
  </Container>
);

export default MiscPage;
