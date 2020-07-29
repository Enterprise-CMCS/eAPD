import React from 'react'
import PropTypes from 'prop-types';
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

Nav.propTypes = {
  links: PropTypes.array.isRequired,
  selectedId: PropTypes.string.isRequired
}

const mapStateToProps = ({ nav }) => ({
  links: nav.links,
  selectedId: nav.selectedId
})

export default connect(mapStateToProps)(Nav)

export { Nav as plain, NavLink, mapStateToProps }
