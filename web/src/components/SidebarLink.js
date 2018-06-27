import PropTypes from 'prop-types';
import React from 'react';

const SidebarLink = ({ anchor, children, isActive, ...rest }) => (
  <li className={`mb1 relative ${isActive ? 'sb-item-active' : ''}`}>
    <a
      href={`#${anchor || '!'}`}
      className="inline-block white text-decoration-none truncate"
      {...rest}
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
