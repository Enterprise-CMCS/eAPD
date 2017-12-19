import React from 'react';
import { Link, Route } from 'react-router-dom';

import Hello from '../components/Hello';
import Home from '../containers/Home';

const App = () => (
  <div>
    <header className="clearfix bg-darken-1">
      <div className="sm-col">
        <Link to="/" className="btn p2 caps">
          CMS HITECH APD
        </Link>
      </div>
      <div className="sm-col-right">
        <Link to="/" className="btn p2 h5">
          Home
        </Link>
        <Link to="/hello" className="btn p2 h5">
          Hello
        </Link>
      </div>
    </header>

    <main className="container px2 py3">
      <Route exact path="/" component={Home} />
      <Route path="/hello" component={Hello} />
    </main>
  </div>
);

export default App;
