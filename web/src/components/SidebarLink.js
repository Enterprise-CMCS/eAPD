import PropTypes from 'prop-types';
import React from 'react';

const SidebarLink = ({ anchor, children, isActive }) => (
  <li className="mb-tiny">
    <a
      href={`#${anchor || '!'}`}
      className={`inline-block white text-decoration-none truncate ${
        isActive ? 'bold border-bottom border-width-3 border-blue' : ''
      }`}
    >
      {children}
    </a>
  </li>
);

SidebarLink.propTypes = {
  anchor: PropTypes.string,
  children: PropTypes.node.isRequired,
  isActive: PropTypes.bool
};

SidebarLink.defaultProps = {
  anchor: null,
  isActive: false
};

export default SidebarLink;
