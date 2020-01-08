import { Button, Dialog } from '@cmsgov/design-system-core';

import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';

import ContractorResources from './ContractorResources';
import CostAllocate from './CostAllocate';
import Costs from './Costs';
import Overview from './Overview';
import Goals from './Goals';
import Schedule from './Schedule';
import StandardsAndConditions from './StandardsAndConditions';

const ActivityDialog = props => {
  const { title, activityIndex } = props;
  const [showModal, setShowModal] = useState(true);
  const titleElement = (
    <Fragment>
      <span>{title}</span>
      <nav className="dialog--nav">
        <ul className="ds-c-list ds-c-list--bare">
          <li className="active">
            <a href={`#activity-overview-${activityIndex}`}>
              Activity overview
            </a>
          </li>
          <li>
            <a href={`#activity-goals-${activityIndex}`}>Goals</a>
          </li>
          <li>
            <a href={`#activity-cost-categories-${activityIndex}`}>
              In-house cost categories
            </a>
          </li>
          <li>
            <a href={`#activity-contractor-costs-${activityIndex}`}>
              Private contractor costs
            </a>
          </li>
          <li>
            <a href={`#activity-cost-allocation-${activityIndex}`}>
              Cost allocation
            </a>
          </li>
          <li>
            <a href={`#activity-ffp-${activityIndex}`}>
              FFP and cost allocation
            </a>
          </li>
        </ul>
      </nav>
    </Fragment>
  );
  return (
    showModal && (
      <Dialog
        actions={[
          <Button variation="primary" onClick={() => setShowModal(false)}>
            Done
          </Button>
        ]}
        ariaCloseLabel={`Close modal for ${title}`}
        className="ds-c-dialog--full"
        closeButtonVariation="transparent"
        onExit={() => setShowModal(false)}
        title={titleElement}
      >
        <Overview activityIndex={activityIndex} />
        <Goals activityIndex={activityIndex} />
        <Schedule activityIndex={activityIndex} />
        <Costs activityIndex={activityIndex} />
        <ContractorResources activityIndex={activityIndex} />
        <CostAllocate activityIndex={activityIndex} />
        <StandardsAndConditions activityIndex={activityIndex} />
      </Dialog>
    )
  );
};

ActivityDialog.propTypes = {
  title: PropTypes.string.isRequired,
  activityIndex: PropTypes.number.isRequired
};

export default ActivityDialog;
