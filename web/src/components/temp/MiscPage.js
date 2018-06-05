import React from 'react';

import Container from '../Container';
import ActivityDetailCostAllocateFFP from '../../containers/ActivityDetailCostAllocateFFP';
import BudgetSummary from '../../containers/BudgetSummary';

const MiscPage = () => (
  <Container>
    <BudgetSummary />
    <ActivityDetailCostAllocateFFP aId={1} />
  </Container>
);

export default MiscPage;
