import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import { useParams } from 'react-router-dom';

import Dollars from '../../../components/Dollars';
import Review from '../../../components/Review';

const HitechActivitySummary = ({ data }) => {
  const { apdId } = useParams();
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
            {Object.entries(activity.ffys).map(
              ([ffy, { medicaid, federal, total: ffyTotal }], j) => (
                <li key={ffy} className={j === 0 ? 'ds-u-margin-top--2' : ''}>
                  <strong>FFY {ffy}:</strong> <Dollars>{ffyTotal}</Dollars> |{' '}
                  <strong>Total Computable Medicaid Cost:</strong>{' '}
                  <Dollars>{medicaid}</Dollars> (<Dollars>{federal}</Dollars>{' '}
                  Federal share)
                </li>
              )
            )}
          </ul>
        </Review>
      ))}
    </Fragment>
  );
};

HitechActivitySummary.propTypes = {
  apdType: PropTypes.string,
  budget: PropTypes.object.isRequired,
  data: PropTypes.array.isRequired,
  total: PropTypes.object.isRequired,
  years: PropTypes.array.isRequired
};

export default HitechActivitySummary;
