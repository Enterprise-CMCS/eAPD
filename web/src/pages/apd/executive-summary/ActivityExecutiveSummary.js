import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import { titleCase } from 'title-case';

import { t } from '../../../i18n';
import Dollars from '../../../components/Dollars';
import FFYList, { FFYRow } from '../../../components/FFYList';
import Review from '../../../components/Review';

const ActivityExecutiveSummary = ({ apdId, data, years, enableEdit }) => {
  const hasActivities = data.length > 0;
  if (!hasActivities) {
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
          {years &&
            years.map((year, rowNum) => (
              // no acitivities are present, so display 0 for all amounts
              <FFYRow
                key={year}
                year={year}
                total={0}
                medicaid={0}
                federal={0}
                rowNum={rowNum}
              />
            ))}
        </div>
      </Fragment>
    );
  }

  return (
    <Fragment>
      {data.map((activity, i) => (
        <Review
          key={activity.activityId}
          heading={titleCase(
            `Activity ${i + 1}: ${activity.name || t('activities.noNameYet')}`
          )}
          headingLevel="4"
          editHref={
            enableEdit && apdId ? `/apd/${apdId}/activity/${i}/overview` : ''
          }
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
            {activity.ffys && <FFYList ffys={activity.ffys} />}
          </div>
        </Review>
      ))}
    </Fragment>
  );
};

ActivityExecutiveSummary.propTypes = {
  apdId: PropTypes.string,
  data: PropTypes.array.isRequired,
  enableEdit: PropTypes.bool,
  years: PropTypes.array
};

ActivityExecutiveSummary.defaultProps = {
  enableEdit: false
};

export default ActivityExecutiveSummary;
