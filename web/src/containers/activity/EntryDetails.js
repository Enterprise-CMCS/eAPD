import { Button, Review, Dialog } from '@cmsgov/design-system-core';
import PropTypes from 'prop-types';
import React, { Fragment, useMemo, useRef, useState } from 'react';
import { connect } from 'react-redux';

import { selectActivityByIndex } from '../../reducers/activities.selectors';

import ContractorResources from './ContractorResources';
import CostAllocate from './CostAllocate';
import Costs from './Costs';
import Overview from './Overview';
import Goals from './Goals';
import Schedule from './Schedule';
import StandardsAndConditions from './StandardsAndConditions';
import { TimesCircle } from '../../components/Icons';
import { t } from '../../i18n';

const makeTitle = ({ name, fundingSource }, i) => {
  let title = `${t('activities.namePrefix')} ${i}`;
  if (name) {
    title += `: ${name}`;
  }
  if (fundingSource) {
    title += ` (${fundingSource})`;
  }
  return title;
};

const EntryDetails = ({ activityIndex, fundingSource, activityKey, name }) => {
  const container = useRef();

  const [collapsed, internalSetCollapsed] = useState(activityIndex > 0);
  const [showModal, setShowModal] = useState(false);
  const setCollapsed = newCollapsed => {
    if (newCollapsed) {
      const { top } = container.current.getBoundingClientRect();
      if (top < 0 || top > window.innerHeight) {
        container.current.scrollIntoView({ behavior: 'auto' });
        container.current.focus();
      }
    }
    internalSetCollapsed(newCollapsed);
  };

  const title = useMemo(
    () => makeTitle({ name, fundingSource }, activityIndex + 1),
    [fundingSource, name, activityIndex]
  );

  const editContent = useMemo(
    () => (
      <div className="nowrap visibility--screen">
        <Button
          size="small"
          variation="transparent"
          onClick={() => setShowModal(true)}
        >
          Edit
        </Button>
      </div>
    ),
    [collapsed]
  );

  return (
    <div
      id={`activity-${activityKey}`}
      className={`activity--body activity--body__${
        collapsed ? 'collapsed' : 'expanded'
      } activity--body__${activityIndex === 0 ? 'first' : 'notfirst'}`}
      ref={container}
    >
      <Review heading={title} headingLevel={4} editContent={editContent}>
        {[
          /* children are required, so send an empty array to suppress errors */
        ]}
      </Review>
      {showModal && (
        <Dialog
          className="ds-c-dialog--full"
          onExit={() => setShowModal(false)}
          closeButtonVariation="transparent"
          actions={[
            <Button variation="primary" onClick={() => setShowModal(false)}>
              Done
            </Button>
          ]}
        >
          <Overview activityIndex={activityIndex} />
          <Goals activityIndex={activityIndex} />
          <Schedule activityIndex={activityIndex} />
          <Costs activityIndex={activityIndex} />
          <ContractorResources activityIndex={activityIndex} />
          <CostAllocate activityIndex={activityIndex} />
          <StandardsAndConditions activityIndex={activityIndex} />
        </Dialog>
      )}
    </div>
  );
};

EntryDetails.propTypes = {
  activityIndex: PropTypes.number.isRequired,
  activityKey: PropTypes.string.isRequired,
  fundingSource: PropTypes.string.isRequired,
  name: PropTypes.string
};

EntryDetails.defaultProps = {
  name: ''
};

const mapStateToProps = (state, { activityIndex }) => {
  const { fundingSource, key, name } = selectActivityByIndex(state, {
    activityIndex
  });
  return { activityKey: key, fundingSource, name };
};

export default connect(mapStateToProps)(EntryDetails);

export { EntryDetails as plain, mapStateToProps };
