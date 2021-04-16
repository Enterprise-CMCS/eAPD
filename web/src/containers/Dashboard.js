import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { getIsAdmin, getIsFederal } from '../reducers/user.selector';
import FederalDashboard from './FederalDashboard';
import StateDashboard from './StateDashboard';

const Dashboard = ({ isAdmin, isFederal, ...rest }) =>
  isAdmin || isFederal ? <FederalDashboard {...rest} /> : <StateDashboard {...rest} />;

Dashboard.propTypes = {
  isAdmin: PropTypes.bool.isRequired,
  isFederal: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  isAdmin: getIsAdmin(state),
  isFederal: getIsFederal(state)
});

export default connect(mapStateToProps)(Dashboard);

export { Dashboard as plain, mapStateToProps };
