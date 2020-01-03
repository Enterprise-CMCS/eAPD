import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { withRouter } from 'react-router';
import Header from './Header';
import Footer from './Footer';
import routes from '../routes';

const cardRoutes = routes.filter(r => r.isCard).map(r => r.path);

const Wrapper = ({ children, isDev, location: { pathname } }) => {
  useEffect(() => {
    if (isDev) {
      const script = document.createElement('script');
      script.src = '/_dev/tota11y.min.js';
      document.body.appendChild(script);
    }
  }, []);

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
  isDev: PropTypes.bool.isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired
  }).isRequired
};

export default withRouter(Wrapper);

export { Wrapper as plain };
