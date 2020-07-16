import React from 'react'
import { Link as ReactRouterLink } from 'react-router-dom'

// for use with @cmsgov/design-system-core <Button/>, <VerticalNav/>, et al.
const Link = ({ children, href, ...rest }) => (
  <ReactRouterLink to={href} {...rest}>
    {children}
  </ReactRouterLink>
)

export default Link
