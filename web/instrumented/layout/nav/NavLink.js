import React from 'react';
import PropTypes from 'prop-types';
import { Link as ReactRouterLink } from 'react-router-dom';

const NavLink = ({ href, children, ...rest }) => (
  <ReactRouterLink to={href} {...rest}>
    {children}
  </ReactRouterLink>
);

NavLink.defaultProps = {
  children: null
};

NavLink.propTypes = {
  href: PropTypes.string.isRequired,
  children: PropTypes.node
};

export default NavLink;
