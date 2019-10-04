import { Button, Review } from '@cmsgov/design-system-core';
import PropTypes from 'prop-types';
import React, { Fragment, useMemo, useRef, useState } from 'react';

import { Provider } from './ActivityContext';
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

const EntryDetails = ({ activity, index }) => {
  const container = useRef();

  const [collapsed, internalSetCollapsed] = useState(index > 0);
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

  const title = useMemo(() => makeTitle(activity, index + 1), [
    activity.fundingSource,
    activity.name,
    index
  ]);

  const editContent = useMemo(
    () => (
      <div className="nowrap visibility--screen">
        <Button
          size="small"
          variation="transparent"
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? (
            'Edit'
          ) : (
            <Fragment>
              <TimesCircle /> Close
            </Fragment>
          )}
        </Button>
      </div>
    ),
    [collapsed]
  );

  return (
    <Provider value={{ index }}>
      <div
        id={`activity-${activity.key}`}
        className={`activity--body activity--body__${
          collapsed ? 'collapsed' : 'expanded'
        } activity--body__${index === 0 ? 'first' : 'notfirst'}`}
        ref={container}
      >
        <Review heading={title} headingLevel={4} editContent={editContent} />
        <div className={collapsed ? 'visibility--print' : ''}>
          <Overview activityIndex={index} />
          <Goals aKey={activity.key} />
          <Schedule aKey={activity.key} />
          <Costs aKey={activity.key} />
          <ContractorResources activityIndex={index} />
          <CostAllocate activityIndex={index} aKey={activity.key} />
          <StandardsAndConditions aKey={activity.key} />
          <Button variation="primary" onClick={() => setCollapsed(true)}>
            Done
          </Button>
        </div>
      </div>
    </Provider>
  );
};

EntryDetails.propTypes = {
  activity: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired
};

export default EntryDetails;
