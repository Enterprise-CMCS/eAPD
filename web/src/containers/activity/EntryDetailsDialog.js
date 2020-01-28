import { Dialog, Tabs, TabPanel } from '@cmsgov/design-system-core';

import React from 'react';
import PropTypes from 'prop-types';

import ContractorResources from './ContractorResources';
import CostAllocate from './CostAllocate';
import Costs from './Costs';
import Milestones from './Milestones';
import Overview from './Overview';
import Objectives from './Objectives';
import Schedule from './Schedule';
import StandardsAndConditions from './StandardsAndConditions';

const ActivityDialog = props => {
  const { title, activityIndex, closeModal } = props;

  const handleOnExit = () => {
    closeModal();
  };

  return (
    <Dialog
      ariaCloseLabel={`Close modal for ${title}`}
      className="ds-c-dialog--full"
      closeButtonVariation="transparent"
      closeText="Save and close"
      onExit={() => handleOnExit()}
      title={title}
    >
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
          tab="In-house cost categories"
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
    </Dialog>
  );
};

ActivityDialog.propTypes = {
  title: PropTypes.string.isRequired,
  activityIndex: PropTypes.number.isRequired,
  closeModal: PropTypes.func.isRequired
};

export default ActivityDialog;
