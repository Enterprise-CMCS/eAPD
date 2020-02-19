import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Waypoint } from 'react-waypoint';

import { scrollTo } from '../actions/app';

class ConnectedWaypoint extends Component {
  hitWaypoint = id => () => {
    const { scrollTo: action } = this.props;
    action(id);
  };

  render() {
    const { children, id } = this.props;
    return (
      <Fragment>
        <Waypoint onEnter={this.hitWaypoint(id)} bottomOffset="90%" />
        {children}
      </Fragment>
    );
  }
}

ConnectedWaypoint.propTypes = {
  children: PropTypes.node,
  id: PropTypes.string.isRequired,
  scrollTo: PropTypes.func.isRequired
};

ConnectedWaypoint.defaultProps = {
  children: null
};

const mapDispatchToProps = { scrollTo };

export default connect(
  null,
  mapDispatchToProps
)(ConnectedWaypoint);

export { mapDispatchToProps, ConnectedWaypoint as plain };
