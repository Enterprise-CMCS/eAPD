import PropTypes from 'prop-types';
import React, { Fragment } from 'react';

import Dollars from '../../../components/Dollars';
import Review from '../../../components/Review';

import { ffyList } from '../../../util/apd';

const ActivityExecutiveSummary = ({ apdId, data, ffys, isApdMmis }) => {
  if (data.length === 0 && isApdMmis) {
    return (
      <Fragment>
        <div className="ds-c-list--bare ds-u-margin-bottom--3">
          <p>
            <strong>No activities were added</strong>
          </p>
          <p>No description added.</p>
          <p className="ds-u-margin-top--2">
            <strong>Start Date - End Date:</strong> Date not specified - Date
            not specified
          </p>
          <p>
            <strong>Total Cost of Activity:</strong> $0
          </p>
          <p>
            <strong>Total Computable Cost:</strong> $0 ($0 Federal share)
          </p>

          {ffyList(ffys)}
        </div>
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
          <div className="ds-c-list--bare">
            <p>
              <strong>Start Date - End Date:</strong> {activity.dateRange}
            </p>
            <p>
              <strong>Total Cost of Activity:</strong>{' '}
              <Dollars>{activity.combined}</Dollars>
            </p>
            <p>
              <strong>Total Computable Medicaid Cost:</strong>{' '}
              <Dollars>{activity.medicaid}</Dollars> (
              <Dollars>{activity.federal}</Dollars> Federal share)
            </p>
            {ffyList(activity.ffys)}
          </div>
        </Review>
      ))}
    </Fragment>
  );
};

ActivityExecutiveSummary.propTypes = {
  apdId: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
  ffys: PropTypes.object.isRequired,
  isApdMmis: PropTypes.bool
};

export default ActivityExecutiveSummary;
