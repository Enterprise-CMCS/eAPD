import { Button, Review } from '@cmsgov/design-system-core';
import PropTypes from 'prop-types';
import React, { Fragment, useMemo, useState } from 'react';
import { connect } from 'react-redux';

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

const EntryDetails = ({ activity, aKey, num }) => {
  const [collapsed, setCollapsed] = useState(num > 1);

  const title = useMemo(() => makeTitle(activity, num), [
    activity.fundingSource,
    activity.name,
    num
  ]);

  const editContent = useMemo(
    () => (
      <div className="nowrap">
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
      id={`activity-${aKey}`}
      className={`activity--body activity--body__${
        collapsed ? 'collapsed' : 'expanded'
      } activity--body__${num === 1 ? 'first' : 'notfirst'}`}
    >
      <Review heading={title} headingLevel={3} editContent={editContent} />
      {collapsed ? null : (
        <Fragment>
          <Overview aKey={aKey} />
          <Goals aKey={aKey} />
          <Schedule aKey={aKey} />
          <Costs aKey={aKey} />
          <ContractorResources aKey={aKey} />
          <CostAllocate aKey={aKey} />
          <StandardsAndConditions aKey={aKey} />
          <Button variation="primary" onClick={() => setCollapsed(true)}>
            Done
          </Button>
        </Fragment>
      )}
    </div>
  );
};

EntryDetails.propTypes = {
  activity: PropTypes.object.isRequired,
  aKey: PropTypes.string.isRequired,
  num: PropTypes.number.isRequired
};

export const mapStateToProps = ({ activities: { byKey } }, { aKey }) => {
  const activity = byKey[aKey];

  return { activity };
};

export { EntryDetails as plain };
export default connect(mapStateToProps)(EntryDetails);
