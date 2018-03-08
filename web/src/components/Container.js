import PropTypes from 'prop-types';
import React, { Fragment } from 'react';

import TopNav from '../containers/TopNav';

const Container = ({ children }) => (
  <Fragment>
    <TopNav />
    <div className="site-main">
      <div className="container p2">{children}</div>
    </div>
  </Fragment>
);

Container.propTypes = {
  children: PropTypes.node.isRequired
};

export default Container;
