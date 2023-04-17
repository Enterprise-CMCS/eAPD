import PropType from 'prop-types';
import React, { Fragment } from 'react';
import { connect } from 'react-redux';

import ApdList from './ApdList';
import AffiliationStatus from './AffiliationStatus';
import { getUserStateOrTerritoryStatus } from '../../../redux/selectors/user.selector';
import { AFFILIATION_STATUSES } from '@cms-eapd/common';

const { REQUESTED, APPROVED } = AFFILIATION_STATUSES;

const StateDashboard = ({ approvalStatus }) => {
  const isApproved = approvalStatus === APPROVED;

  return (
    <Fragment>
      {isApproved && <ApdList />}
      {!isApproved && <AffiliationStatus />}
    </Fragment>
  );
};

StateDashboard.propTypes = {
  approvalStatus: PropType.string.isRequired
};

const mapStateToProps = state => ({
  state: state.user.data.state || { name: 'Loading', id: '' },
  role: state.user.data.role || 'Pending Role',
  approvalStatus: getUserStateOrTerritoryStatus(state) || REQUESTED
});

export default connect(mapStateToProps)(StateDashboard);

export { StateDashboard as plain, mapStateToProps };
