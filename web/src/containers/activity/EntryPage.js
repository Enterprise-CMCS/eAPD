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
    <Tabs>
      <TabPanel
        id={`activity-overview-${activityIndex}-tab`}
        tab="Activity overview"
      >
        <Overview activityIndex={activityIndex} />
        <StandardsAndConditions activityIndex={activityIndex} />
      </TabPanel>
      <TabPanel
        id={`activity-goals-${activityIndex}-tab`}
        tab="Objectives and key results"
      >
        <Objectives activityIndex={activityIndex} />
        <Schedule activityIndex={activityIndex} />
        <Milestones activityIndex={activityIndex} />
      </TabPanel>
      <TabPanel
        id={`activity-cost-categories-${activityIndex}-tab`}
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
      <TabPanel
        id={`activity-cost-allocation-${activityIndex}-tab`}
        tab="Cost allocation"
      >
        <CostAllocate activityIndex={activityIndex} />
      </TabPanel>
    </Tabs>
  );
};

export default EntryPage;
