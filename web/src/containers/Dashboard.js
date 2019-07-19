import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { getIsAdmin } from '../reducers/user.selector';
import AdminDashboard from './admin/AdminDashboard';
import StateDashboard from './StateDashboard';

const Dashboard = ({ isAdmin, ...rest }) =>
  isAdmin ? <AdminDashboard {...rest} /> : <StateDashboard {...rest} />;

Dashboard.propTypes = {
  isAdmin: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  isAdmin: getIsAdmin(state)
});

export default connect(mapStateToProps)(Dashboard);

export { Dashboard as plain, mapStateToProps };
