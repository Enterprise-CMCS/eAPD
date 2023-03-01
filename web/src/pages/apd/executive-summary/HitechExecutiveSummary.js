import PropTypes from 'prop-types';
import React, { Fragment } from 'react';

import Dollars from '../../../components/Dollars';
import Review from '../../../components/Review';
import { Subsection } from '../../../components/Section';

const HitechExecutiveSummary = ({ apdId, data, total, years }) => {
  return (
    <Subsection
      id="executive-summary-summary"
      resource="executiveSummary.summary"
    >
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

      <hr className="ds-u-border--dark ds-u-margin--0" />
      <Review heading="Total Cost" headingLevel="4" className="ds-u-border--0">
        <p>
          Verify that this information is correct. Edit activities above to make
          changes.
        </p>
        <ul className="ds-c-list--bare">
          <li>
            <strong>Federal Fiscal Years Requested:</strong> FFY{' '}
            {years.join(', ')}
          </li>
          <li>
            <strong>Total Computable Medicaid Cost:</strong>{' '}
            <Dollars>{total.medicaid}</Dollars> (
            <Dollars>{total.federal}</Dollars> Federal share)
          </li>
          <li>
            <strong>Total Funding Request:</strong>{' '}
            <Dollars>{total.combined}</Dollars>
          </li>
          {Object.entries(total.ffys).map(
            ([ffy, { medicaid, federal, total: ffyTotal }], i) => (
              <li key={ffy} className={i === 0 ? 'ds-u-margin-top--2' : ''}>
                <strong>FFY {ffy}:</strong> <Dollars>{ffyTotal}</Dollars> |{' '}
                <Dollars>{medicaid}</Dollars> Total Computable Medicaid Cost |{' '}
                <Dollars>{federal}</Dollars> Federal share
              </li>
            )
          )}
        </ul>
      </Review>
    </Subsection>
  );
};

HitechExecutiveSummary.propTypes = {
  apdId: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
  total: PropTypes.object.isRequired,
  years: PropTypes.array.isRequired
};

export default HitechExecutiveSummary;
