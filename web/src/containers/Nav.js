import React from 'react'
import { VerticalNav } from '@cmsgov/design-system-core'
import { connect } from 'react-redux'
import NavLink from '../components/NavLink'

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
