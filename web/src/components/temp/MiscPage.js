import React from 'react';
import Button from '@material-ui/core/Button';

import Container from '../Container';
import Snack from '../Snack';

const MiscPage = () => (
  <Container>
    <h1 className="h2">Misc Components (for testing purposes)</h1>
    <Button variant="contained" color="primary">
      Hello World
    </Button>
    <Snack message="Saved!" />
  </Container>
);

export default MiscPage;
