import React from 'react';

import Container from '../Container';
import ContractorResources from '../../containers/ActivityDetailContractorResources';

const MiscPage = () => (
  <Container>
    <h1>Misc UI bits for testing...</h1>
    <ContractorResources aKey={123} />
  </Container>
);

export default MiscPage;
