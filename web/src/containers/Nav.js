import React from 'react'
import { VerticalNav } from '@cmsgov/design-system-core'
import { Link as ReactRouterLink } from 'react-router-dom'
import { connect } from 'react-redux'

const NavLink = ({ href, children, ...rest }) => (
  <ReactRouterLink to={href} {...rest}>
    {children}
  </ReactRouterLink>
)

const Nav = ({ links, selectedId }) => (
  <VerticalNav
    component={NavLink}
    items={links}
    selectedId={selectedId}
  />
)

const mapStateToProps = ({ nav }) => ({
  links: nav.links,
  selectedId: nav.selectedId
})

export default connect(mapStateToProps)(Nav)

export { Nav as plain, NavLink, mapStateToProps }
