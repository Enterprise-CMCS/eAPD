import is from 'is_js';
import React from 'react';

import Container from '../Container';

const MiscPage = () => (
  <Container>
    <h1>Misc UI bits for testing...</h1>
    <div>{is.chrome() ? 'Chrome' : 'Not Chrome'}</div>
    <div className="p2 bg-white rounded md-col-6">
      <h2 className="mt0">Your computer is using an out-of-date browser.</h2>
      <p>Upgrade using one of the browser links below to access this site.</p>
    </div>
  </Container>
);
export default MiscPage;
