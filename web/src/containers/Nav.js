import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { VerticalNav } from '@cmsgov/design-system-core';
import { connect } from 'react-redux';
import NavLink from '../components/NavLink';
import { generateKey as actualGenerateKey } from '../util'

const Nav = ({ generateKey, items, location }) => {
  // force component update when location changes
  const [key, setKey] = useState('');
  useEffect(() => setKey(generateKey()), [location]);
  return (
    <VerticalNav
      component={NavLink}
      items={items}
      key={key}
    />
  )
};

Nav.defaultProps = {
  generateKey: actualGenerateKey
}

Nav.propTypes = {
  generateKey: PropTypes.func,
  items: PropTypes.array.isRequired,
  location: PropTypes.object.isRequired
};

const mapStateToProps = ({ nav, router }) => ({
  items: nav.items,
  location: router.location
});

export default connect(mapStateToProps)(Nav);

export { Nav as plain, NavLink, mapStateToProps };
