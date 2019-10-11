import { Button, Review } from '@cmsgov/design-system-core';
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
    <div
      id={`activity-${activityKey}`}
      className={`activity--body activity--body__${
        collapsed ? 'collapsed' : 'expanded'
      } activity--body__${activityIndex === 0 ? 'first' : 'notfirst'}`}
      ref={container}
    >
      <Review heading={title} headingLevel={4} editContent={editContent} />
      <div className={collapsed ? 'visibility--print' : ''}>
        <Overview activityIndex={activityIndex} />
        <Goals activityIndex={activityIndex} />
        <Schedule activityIndex={activityIndex} />
        <Costs activityIndex={activityIndex} />
        <ContractorResources activityIndex={activityIndex} />
        <CostAllocate activityIndex={activityIndex} />
        <StandardsAndConditions aKey={activityKey} />
        <Button variation="primary" onClick={() => setCollapsed(true)}>
          Done
        </Button>
      </div>
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
