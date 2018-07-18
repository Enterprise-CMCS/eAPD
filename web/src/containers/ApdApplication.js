import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import AssurancesAndCompliance from './AssurancesAndCompliance';
import Activities from './Activities';
import ApdSummary from './ApdSummary';
import CertifyAndSubmit from './CertifyAndSubmit';
import ExecutiveSummary from './ExecutiveSummary';
import PreviousActivities from './PreviousActivities';
import ScheduleSummary from './ScheduleSummary';
import Sidebar from './Sidebar';
import TopBtns from './TopBtns';
import StateProfile from '../components/ApdStateProfile';
import ProposedBudget from '../components/ProposedBudget';

const PLACE = { id: 'tx', name: 'Texas' };

const ApdApplication = ({ apdSelected }) => {
  if (!apdSelected) {
    return <Redirect to="/" />;
  }

  return (
    <div className="site-body">
      <Sidebar place={PLACE} />
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
  apdSelected: PropTypes.bool.isRequired
};

const mapStateToProps = ({ apd: { data } }) => ({ apdSelected: !!data.id });

export default connect(mapStateToProps)(ApdApplication);
