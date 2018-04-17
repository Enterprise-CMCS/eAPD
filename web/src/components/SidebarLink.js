import PropTypes from 'prop-types';
import React from 'react';

const SidebarLink = ({ children }) => (
  <li>
    <a href="#!" className="inline-block white text-decoration-none truncate">
      {children}
    </a>
  </li>
);

SidebarLink.propTypes = {
  children: PropTypes.node.isRequired
};

export default SidebarLink;
