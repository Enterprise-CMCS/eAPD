import React from 'react';

// Wired-up components
import StateProfile from '../containers/ApdStateProfile';
import ProposedBudget from './ProposedBudget';
import Activities from '../containers/Activities';
import ApdSummary from '../containers/ApdSummary';
import ExecutiveSummary from '../containers/ExecutiveSummary';
import PreviousActivities from '../containers/PreviousActivities';
import ScheduleSummary from '../containers/ScheduleSummary';
import Sidebar from '../containers/Sidebar';
import TopNav from '../containers/TopNav';

// Static / WIP components
import AssurancesAndCompliance from './AssurancesAndCompliance';
import CertifyAndSubmit from './CertifyAndSubmit';

const PLACE = { id: 'tx', name: 'Texas' };

const ApdApplication = () => (
  <div className="site-body">
    <Sidebar place={PLACE} />
    <div className="site-content flex flex-column">
      <TopNav place={PLACE} />
      <div className="bg-grey-light flex-auto">
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
  </div>
);

export default ApdApplication;
