import PropTypes from 'prop-types';
import React from 'react';

import Sidebar from './Sidebar';

const withSidebar = WrappedComponent => {
  const Wrapper = props => (
    <div className="sm-flex mxn2">
      <div className="col col-12 sm-col-3 px2 bg-yellow">
        <Sidebar />
      </div>
      <div className="col col-12 sm-col-9 px2">
        <WrappedComponent {...props} />
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
