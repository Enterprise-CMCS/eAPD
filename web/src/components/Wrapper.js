import PropTypes from 'prop-types';
import React from 'react';
import { withRouter } from 'react-router';
import Header from './Header';
import Footer from './Footer';
import routes from '../routes';

const cardRoutes = routes.filter(r => r.isCard).map(r => r.path);

const Wrapper = ({ children, location: { pathname } }) => {
  const isGray = cardRoutes.indexOf(pathname) >= 0;
  const showSiteTitle = pathname === '/';

  return (
    <div className={`site${isGray ? ' site--gray' : ''}`}>
      <a href="#start-main-content" className="skip-nav">
        Skip to main content
      </a>
      <Header showSiteTitle={showSiteTitle} />
      {children}
      <Footer />
    </div>
  );
};

Wrapper.propTypes = {
  children: PropTypes.node.isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired
  }).isRequired
};

export default withRouter(Wrapper);

export { Wrapper as plain };
