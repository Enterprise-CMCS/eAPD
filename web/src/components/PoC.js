import React from 'react';

// Wired-up components
import Activities from '../containers/Activities';
import ApdSummary from '../containers/ApdSummary';

// Static / WIP components
import AssurancesAndCompliance from './AssurancesAndCompliance';
import CertifyAndSubmit from './CertifyAndSubmit';
import ExecutiveSummary from './ExecutiveSummary';
import PreviousActivities from './PreviousActivities';
import ProposedBudget from './ProposedBudget';
import Sidebar from './Sidebar';
import TopNav from './TopNav';

const PLACE = { id: 'tx', name: 'Texas' };

const PoC = () => (
  <div className="site-body">
    <Sidebar activities={[]} place={PLACE} />
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

export default PoC;
