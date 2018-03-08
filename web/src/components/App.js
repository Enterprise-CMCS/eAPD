import React from 'react';

import Routes from './Routes';
import Wrapper from './Wrapper';
import AuthChecker from '../containers/AuthChecker';

const App = () => (
  <Wrapper isDev={process.env.NODE_ENV !== 'production'}>
    <AuthChecker>
      <Routes />
    </AuthChecker>
  </Wrapper>
);

export default App;
