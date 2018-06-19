import React from 'react';

// Wired-up components
import StateProfile from '../containers/ApdStateProfile';
import AssurancesAndCompliance from '../containers/AssurancesAndCompliance';
import ProposedBudget from './ProposedBudget';
import Activities from '../containers/Activities';
import ApdSummary from '../containers/ApdSummary';
import ExecutiveSummary from '../containers/ExecutiveSummary';
import PreviousActivities from '../containers/PreviousActivities';
import ScheduleSummary from '../containers/ScheduleSummary';
import Sidebar from '../containers/Sidebar';
import TopNav from '../containers/TopNav';

// Static / WIP components
import CertifyAndSubmit from './CertifyAndSubmit';

const PLACE = { id: 'tx', name: 'Texas' };

const ApdApplication = () => (
  <div className="site-body">
    <Sidebar place={PLACE} />
    <div className="site-content flex flex-column">
      <TopNav place={PLACE} />
      <div className="bg-darken-1 flex-auto">
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
