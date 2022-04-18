import PropTypes from 'prop-types';
import React from 'react';
import { withRouter } from 'react-router';
import Header from '../layout/header/Header';
import Footer from '../layout/footer/Footer';
import routes from '../pages/routes';
import SessionEndingAlert from './SessionEndingAlert';

const cardRoutes = routes.filter(r => r.isCard).map(r => r.path);

const Wrapper = ({ children, location: { pathname } }) => {
  const isGray = cardRoutes.indexOf(pathname) >= 0;
  const showSiteTitle = pathname === '/';

  return (
    <div className={`site${isGray ? ' site--gray' : ''}`}>
      <Header showSiteTitle={showSiteTitle} />
      {children}
      <Footer />
      <SessionEndingAlert />
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
