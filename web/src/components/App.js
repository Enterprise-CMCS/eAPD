import React from 'react';
import { Link, Route } from 'react-router-dom';

import Hello from '../components/Hello';
import Home from '../containers/Home';

const App = () => (
  <div>
    <header>
      <Link to="/">Home</Link>
      <span>&nbsp;</span>
      <Link to="/hello">Hello</Link>
    </header>

    <main>
      <Route exact path="/" component={Home} />
      <Route path="/hello" component={Hello} />
    </main>
  </div>
);

export default App;
