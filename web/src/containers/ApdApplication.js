import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Activities from './activity/All';
import AssurancesAndCompliance from './AssurancesAndCompliance';
import ApdSummary from './ApdSummary';
import CertifyAndSubmit from './CertifyAndSubmit';
import ExecutiveSummary from './ExecutiveSummary';
import PreviousActivities from './PreviousActivities';
import ScheduleSummary from './ScheduleSummary';
import Sidebar from './Sidebar';
import TopBtns from './TopBtns';
import { selectApdOnLoad } from '../actions/apd';
import StateProfile from '../components/ApdStateProfile';
import ProposedBudget from '../components/ProposedBudget';

const ApdApplication = ({
  apdSelected,
  place,
  selectApdOnLoad: dispatchSelectApdOnLoad
}) => {
  if (!apdSelected) {
    dispatchSelectApdOnLoad('/apd');
    return <Redirect to="/" />;
  }

  return (
    <div className="site-body">
      <Sidebar place={place} />
      <div className="site-main p2 sm-p4 md-px0">
        <TopBtns />
        <StateProfile />
        <ApdSummary />
        <PreviousActivities />
        <Activities />
        <ScheduleSummary />
        <ProposedBudget />
        <AssurancesAndCompliance />
        <ExecutiveSummary />
        <CertifyAndSubmit />
      </div>
    </div>
  );
};

ApdApplication.propTypes = {
  apdSelected: PropTypes.bool.isRequired,
  place: PropTypes.object.isRequired,
  selectApdOnLoad: PropTypes.func.isRequired
};

const mapStateToProps = ({ apd: { data }, user: { data: { state } } }) => ({
  apdSelected: !!data.id,
  place: state
});

const mapDispatchToProps = { selectApdOnLoad };

export default connect(mapStateToProps, mapDispatchToProps)(ApdApplication);

export { ApdApplication as plain, mapStateToProps, mapDispatchToProps };
