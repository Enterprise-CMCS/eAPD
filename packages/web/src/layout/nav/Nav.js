import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { VerticalNav } from '@cmsgov/design-system';
import { connect } from 'react-redux';
import NavLink from './NavLink';
import { generateKey as actualGenerateKey } from '../../util';

const Nav = ({ generateKey, items, pathname }) => {
  // force component update when pathname changes
  const [key, setKey] = useState('');
  useEffect(() => setKey(generateKey()), [pathname, generateKey]);
  return (
    <nav aria-label="Main Navigation">
      <VerticalNav component={NavLink} items={items} key={key} />
    </nav>
  );
};

Nav.defaultProps = {
  generateKey: actualGenerateKey
};

Nav.propTypes = {
  generateKey: PropTypes.func,
  items: PropTypes.array.isRequired,
  pathname: PropTypes.string.isRequired
};

const mapStateToProps = ({ nav, router }) => ({
  items: nav.items,
  pathname: router.location.pathname
});

export default connect(mapStateToProps)(Nav);

export { Nav as plain, NavLink, mapStateToProps };
