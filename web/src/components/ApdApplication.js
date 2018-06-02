import React from 'react';

// Wired-up components
import Activities from '../containers/Activities';
import ApdSummary from '../containers/ApdSummary';
import ExecutiveSummary from '../containers/ExecutiveSummary';
import PreviousActivities from '../containers/PreviousActivities';
import Sidebar from '../containers/Sidebar';
import TopNav from '../containers/TopNav';

// Static / WIP components
import AssurancesAndCompliance from './AssurancesAndCompliance';
import CertifyAndSubmit from './CertifyAndSubmit';
import ProposedBudget from './ProposedBudget';

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
