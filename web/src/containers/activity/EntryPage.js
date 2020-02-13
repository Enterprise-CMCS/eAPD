import { Tabs, TabPanel } from '@cmsgov/design-system-core';

import React from 'react';
import { useParams } from 'react-router-dom';

import ContractorResources from './ContractorResources';
import CostAllocate from './CostAllocate';
import Costs from './Costs';
import Milestones from './Milestones';
import Overview from './Overview';
import Objectives from './Objectives';
import Schedule from './Schedule';
import StandardsAndConditions from './StandardsAndConditions';

const EntryPage = () => {
  const activityIndex = +useParams().activityIndex;

  return (
    <div id="activity-entry-page">
      <Tabs>
        <TabPanel id="activity-overview-tab" tab="Activity overview">
          <Overview activityIndex={activityIndex} />
          <StandardsAndConditions activityIndex={activityIndex} />
        </TabPanel>
        <TabPanel id={`activity-goals-tab`} tab="Objectives and key results">
          <Objectives activityIndex={activityIndex} />
          <Schedule activityIndex={activityIndex} />
          <Milestones activityIndex={activityIndex} />
        </TabPanel>
        <TabPanel
          id={`activity-cost-categories-tab`}
          tab="State cost categories"
        >
          <Costs activityIndex={activityIndex} />
        </TabPanel>
        <TabPanel
          id={`activity-contractor-costs-${activityIndex}-tab`}
          tab="Private contractor costs"
        >
          <ContractorResources activityIndex={activityIndex} />
        </TabPanel>
        <TabPanel id={`activity-cost-allocation-tab`} tab="Cost allocation">
          <CostAllocate activityIndex={activityIndex} />
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default EntryPage;
