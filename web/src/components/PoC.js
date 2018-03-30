import React from 'react';

import Collapsible from './Collapsible';
import TopNav from '../containers/TopNav';

const Sidebar = () => (
  <div className="site-sidebar bg-navy">
    <div className="p2 xs-hide sm-hide">
      <ul className="list-reset">
        <li className="mb1">
          <a href="#!" className="inline-block white text-decoration-none">
            Foo
          </a>
        </li>
      </ul>
    </div>
  </div>
);

const PoC = () => (
  <div className="site-body">
    <Sidebar />
    <div className="site-content">
      <TopNav />
      <div className="p2 pb4 sm-p3">
        <Collapsible title="Activity List" open>
          <p>Boom!</p>
        </Collapsible>

        <Collapsible title="Activity List" open>
          <p>Boom!</p>
        </Collapsible>
        <Collapsible title="Activity List" open>
          <p>Boom!</p>
        </Collapsible>
        <Collapsible title="Activity List" open>
          <p>Boom!</p>
        </Collapsible>
        <Collapsible title="Activity List" open>
          <p>Boom!</p>
        </Collapsible>
      </div>
    </div>
  </div>
);

export default PoC;
