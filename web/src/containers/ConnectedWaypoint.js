import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Waypoint } from 'react-waypoint';
import { replace as actualReplace } from 'connected-react-router';

const ConnectedWaypoint = ({ children, id, location, replace }) => (
  <Fragment>
    <Waypoint
      bottomOffset="90%"
      fireOnRapidScroll={false}
      onEnter={() => replace({ ...location, hash: id })}
    />
    {children}
  </Fragment>
);

ConnectedWaypoint.propTypes = {
  children: PropTypes.node,
  id: PropTypes.string,
  location: PropTypes.object.isRequired,
  replace: PropTypes.func.isRequired
};

ConnectedWaypoint.defaultProps = {
  children: null,
  id: null
};

const mapStateToProps = ({ router }) => ({
  location: router.location
});

const mapDispatchToProps = {
  replace: actualReplace
};

export default connect(mapStateToProps, mapDispatchToProps)(ConnectedWaypoint);

export { ConnectedWaypoint as plain, mapStateToProps, mapDispatchToProps };
