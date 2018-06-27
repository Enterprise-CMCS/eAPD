import React from 'react';

// Wired-up components
import StateProfile from '../containers/ApdStateProfile';
import AssurancesAndCompliance from '../containers/AssurancesAndCompliance';
import ProposedBudget from './ProposedBudget';
import Activities from '../containers/Activities';
import ApdSummary from '../containers/ApdSummary';
import CertifyAndSubmit from '../containers/CertifyAndSubmit';
import ExecutiveSummary from '../containers/ExecutiveSummary';
import PreviousActivities from '../containers/PreviousActivities';
import ScheduleSummary from '../containers/ScheduleSummary';
import Sidebar from '../containers/Sidebar';
import TopBtns from '../containers/TopBtns';

const PLACE = { id: 'tx', name: 'Texas' };

const ApdApplication = () => (
  <div className="site-body">
    <Sidebar place={PLACE} />
    <div className="p2 sm-p4 md-px0 mx-auto col-12 md-col-7">
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

export default ApdApplication;
