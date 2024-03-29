import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { getIsFederal } from '../../redux/selectors/user.selector';
import FederalDashboard from './fed-dashboard/FederalDashboard';
import StateDashboard from './state-dashboard/StateDashboard';

const Dashboard = ({ isFederal, ...rest }) =>
  isFederal ? <FederalDashboard {...rest} /> : <StateDashboard {...rest} />;

Dashboard.propTypes = {
  isFederal: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  isFederal: getIsFederal(state)
});

export default connect(mapStateToProps)(Dashboard);

export { Dashboard as plain, mapStateToProps };
