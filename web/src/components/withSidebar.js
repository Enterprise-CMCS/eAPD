import PropTypes from 'prop-types';
import React from 'react';

import Sidebar from './Sidebar';
import TopNav from '../containers/TopNav';

const withSidebar = WrappedComponent => {
  const Wrapper = props => (
    <div className="site-body">
      <div className="site-sidebar bg-navy">
        <Sidebar />
      </div>
      <div className="site-content">
        <TopNav />
        <div className="p2 pb4 sm-px3">
          <WrappedComponent {...props} />
        </div>
      </div>
    </div>
  );

  Wrapper.propTypes = {
    props: PropTypes.object
  };

  Wrapper.defaultProps = {
    props: {}
  };

  return Wrapper;
};

export default withSidebar;
