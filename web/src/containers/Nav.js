import React from 'react'
import { VerticalNav } from '@cmsgov/design-system-core'
import { Link as ReactRouterLink } from 'react-router-dom'
import { connect } from 'react-redux'

const Link = ({ href, children, ...rest }) => (
  <ReactRouterLink to={href} {...rest}>
    {children}
  </ReactRouterLink>
)

const Nav = ({ links }) => (
  <VerticalNav component={Link} items={links} />
)

const mapStateToProps = (state) => ({
  links: state.nav.links
})

export default connect(mapStateToProps)(Nav)

export { Nav as plain, mapStateToProps }
