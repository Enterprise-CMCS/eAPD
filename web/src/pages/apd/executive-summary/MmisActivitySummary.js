import PropTypes from 'prop-types';
import React, { Fragment } from 'react';

import Dollars from '../../../components/Dollars';
import Review from '../../../components/Review';

import { ffyList } from './ExecutiveSummary';

const MmisActivitySummary = ({ apdId, data, ffys }) => {
  if (data.length === 0) {
    return (
      <Fragment>
        <ul className="ds-c-list--bare ds-u-margin-bottom--3">
          <li>
            <strong>No activities were added</strong>
          </li>
          <li>No description added.</li>
          <li className="ds-u-margin-top--2">
            <strong>Start Date - End Date:</strong> Date not specified - Date
            not specified
          </li>
          <li>
            <strong>Total Cost of Activity:</strong> $0
          </li>
          <li>
            <strong>Total Computable Cost:</strong> $0 ($0 Federal share)
          </li>

          {ffyList(ffys)}
        </ul>
      </Fragment>
    );
  }

  return (
    <Fragment>
      {data.map((activity, i) => (
        <Review
          key={activity.activityId}
          heading={
            <Fragment>
              Activity {i + 1}: {activity.name || 'Untitled'}
            </Fragment>
          }
          headingLevel="4"
          editHref={`/apd/${apdId}/activity/${i}/overview`}
          className={i === data.length - 1 ? 'ds-u-border-bottom--0' : ''}
        >
          {activity.summary && (
            /* eslint-disable react/no-danger */
            <p dangerouslySetInnerHTML={{ __html: activity.summary }} />
          )}
          <ul className="ds-c-list--bare">
            <li>
              <strong>Start Date - End Date:</strong> {activity.dateRange}
            </li>
            <li>
              <strong>Total Cost of Activity:</strong>{' '}
              <Dollars>{activity.combined}</Dollars>
            </li>
            <li>
              <strong>Total Computable Medicaid Cost:</strong>{' '}
              <Dollars>{activity.medicaid}</Dollars> (
              <Dollars>{activity.federal}</Dollars> Federal share)
            </li>
            {ffyList(activity.ffys)}
          </ul>
        </Review>
      ))}
    </Fragment>
  );
};

MmisActivitySummary.propTypes = {
  apdId: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
  ffys: PropTypes.object.isRequired
};

export default MmisActivitySummary;
