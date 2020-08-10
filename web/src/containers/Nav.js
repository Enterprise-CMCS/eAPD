import React from 'react';
import PropTypes from 'prop-types';
import { VerticalNav } from '@cmsgov/design-system-core';
import { connect } from 'react-redux';
import NavLink from '../components/NavLink';

const Nav = ({ items, key }) => (
  <VerticalNav
    component={NavLink}
    items={items}
    key={key} />
);

Nav.propTypes = {
  links: PropTypes.array.isRequired,
};

const mapStateToProps = ({ nav }) => ({
  items: nav.items,
  key: nav.key
});

export default connect(mapStateToProps)(Nav);

export { Nav as plain, NavLink, mapStateToProps };
