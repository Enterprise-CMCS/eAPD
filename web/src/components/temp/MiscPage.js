import is from 'is_js';
import React from 'react';

import Container from '../Container';

const MiscPage = () => (
  <Container>
    <h1>Misc UI bits for testing...</h1>
    <div>{is.chrome() ? 'Chrome' : 'Not Chrome'}</div>
    <div className="p2 bg-white rounded md-col-6">
      <h2 className="mt0">Please upgrade your browser.</h2>
      <p>
        It looks like you may be using an out-of-date web browser that we don't
        support. Please download or upgrade to one of these browsers to use this
        site.
      </p>
    </div>
  </Container>
);

export default MiscPage;
