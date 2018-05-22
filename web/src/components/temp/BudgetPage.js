import React from 'react';

import QuarterlyBudget from '../QuarterlyBudget';
import Collapsible from '../Collapsible';
import Container from '../Container';

const BudgetPage = () => (
  <Container>
    <Collapsible title="Quarterly Budget Table" open>
      <QuarterlyBudget />
    </Collapsible>
  </Container>
);

export default BudgetPage;
