import React from 'react';

import BudgetSummary from '../BudgetSummary';
import Collapsible from '../Collapsible';
import Container from '../Container';

const BudgetPage = () => (
  <Container>
    <Collapsible title="Budget Table" open>
      <BudgetSummary />
    </Collapsible>
  </Container>
);

export default BudgetPage;
