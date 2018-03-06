import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import { checkAuth } from '../actions/auth';

class AuthChecker extends Component {
  componentWillMount() {
    this.props.checkAuth();
  }

  render() {
    const { authInit, children } = this.props;

    if (!authInit) return null;
    return <Fragment>{children}</Fragment>;
  }
}

AuthChecker.propTypes = {
  authInit: PropTypes.bool.isRequired,
  checkAuth: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired
};

const mapStateToProps = ({ auth }) => ({ authInit: auth.initialCheck });
const mapDispatchToProps = { checkAuth };

export default connect(mapStateToProps, mapDispatchToProps)(AuthChecker);
