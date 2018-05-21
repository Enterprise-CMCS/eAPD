import React from 'react';

// Wired-up components
import Activities from '../containers/Activities';
import ApdSummary from '../containers/ApdSummary';
import Sidebar from '../containers/Sidebar';

// Static / WIP components
import AssurancesAndCompliance from './AssurancesAndCompliance';
import CertifyAndSubmit from './CertifyAndSubmit';
import ExecutiveSummary from './ExecutiveSummary';
import PreviousActivities from './PreviousActivities';
import ProposedBudget from './ProposedBudget';
import TopNav from './TopNav';

const PLACE = { id: 'tx', name: 'Texas' };

const ApdApplication = () => (
  <div className="site-body">
    <Sidebar place={PLACE} />
    <div className="site-content flex flex-column">
      <TopNav place={PLACE} />
      <div className="bg-darken-1 flex-auto">
        <ApdSummary />
        <PreviousActivities />
        <Activities />
        <ProposedBudget />
        <AssurancesAndCompliance />
        <ExecutiveSummary />
        <CertifyAndSubmit />
      </div>
    </div>
  </div>
);

export default ApdApplication;
