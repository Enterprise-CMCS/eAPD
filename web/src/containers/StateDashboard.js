import PropType from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import TagManager from 'react-gtm-module';

import ApdList from '../components/ApdList';
import StateAffiliationStatus from '../components/StateAffiliationStatus';
import { getUserStateOrTerritoryStatus } from '../reducers/user.selector';
import { STATE_AFFILIATION_STATUSES } from '../constants';

const StateDashboard = ({ state, role, stateStatus }) => {
  TagManager.dataLayer({
    dataLayer: {
      stateId: state ? state.id : null,
      userRole: role
    }
  });

  const isApproved = stateStatus === STATE_AFFILIATION_STATUSES.APPROVED;

  return (
    <React.Fragment>
      {isApproved && <ApdList />}
      {!isApproved && <StateAffiliationStatus />}
    </React.Fragment>
  );
};

StateDashboard.propTypes = {
  state: PropType.object.isRequired,
  role: PropType.string.isRequired,
  stateStatus: PropType.string.isRequired
};

const mapStateToProps = state => ({
  state: state.user.data.state || null,
  role: state.user.data.role || 'Pending Role',
  stateStatus:
    getUserStateOrTerritoryStatus(state) || STATE_AFFILIATION_STATUSES.REQUESTED
});

export default connect(mapStateToProps)(StateDashboard);

export { StateDashboard as plain, mapStateToProps };
