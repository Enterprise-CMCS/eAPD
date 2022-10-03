import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { useFlags } from 'launchdarkly-react-client-sdk';

import Header from '../layout/header/Header';
import Footer from '../layout/footer/Footer';
import routes from '../pages/mainRoutesList';
import SessionEndingAlert from './SessionEndingAlert';
import { pageView } from '../util/analytics';
import { updateFlags } from '../redux/actions/flags';

const cardRoutes = routes.filter(r => r.isCard).map(r => r.path);

const Wrapper = ({ children, updateFlags }) => {
  const { pathname } = useLocation();

  // when the app opens, get all of the flags
  const { validation } = useFlags();

  // use the updateFlags action if a reducer needs to use a flag
  // then it can listen for the SET_FLAGS type
  useEffect(() => {
    updateFlags({ validation });
  }, [validation]); // eslint-disable-line react-hooks/exhaustive-deps

  pageView(pathname);
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
  updateFlags: PropTypes.func.isRequired
};

const mapDispatchToProps = { updateFlags };

export default connect(null, mapDispatchToProps)(Wrapper);

export { Wrapper as plain, mapDispatchToProps };
