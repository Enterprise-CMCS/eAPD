import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { getIsFederal } from '../reducers/user.selector';
import FederalDashboard from './FederalDashboard';
import StateDashboard from './StateDashboard';

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
