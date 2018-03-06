import PropTypes from 'prop-types';
import React from 'react';

const Container = ({ children }) => (
  <div className="site-main">
    <div className="container p2">{children}</div>
  </div>
);

Container.propTypes = {
  children: PropTypes.node.isRequired
};

export default Container;
