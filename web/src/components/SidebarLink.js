import PropTypes from 'prop-types';
import React from 'react';

const SidebarLink = ({ anchor, children }) => (
  <li>
    <a
      href={`#${anchor || '!'}`}
      className="inline-block white text-decoration-none truncate"
    >
      {children}
    </a>
  </li>
);

SidebarLink.propTypes = {
  anchor: PropTypes.string,
  children: PropTypes.node.isRequired
};

SidebarLink.defaultProps = {
  anchor: null
};

export default SidebarLink;
