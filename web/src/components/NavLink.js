import React from 'react'
import { Link as ReactRouterLink } from 'react-router-dom'

const NavLink = ({ href, children, ...rest }) => (
  <ReactRouterLink to={href} {...rest}>
    {children}
  </ReactRouterLink>
)

export default NavLink
