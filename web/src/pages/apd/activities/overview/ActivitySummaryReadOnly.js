import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import { APD_TYPE, FUNDING_CATEGORY_LABEL_MAPPING } from '@cms-eapd/common';
import { stateDateToDisplay } from '../../../../util';

const HitechActivitySummaryReadOnly = ({ activity, activityIndex }) => (
  <Fragment>
    <hr className="section-rule" />
    <h2>
      Activity {activityIndex + 1}: {activity.name || 'Untitled'}
    </h2>
    <strong>Provide a short overview of the activity: </strong>
    <div
      dangerouslySetInnerHTML={{
        __html:
          activity?.activityOverview?.summary || 'No response was provided.'
      }}
    />
    <p>
      <strong>Start date: </strong>
      {stateDateToDisplay(activity?.activitySchedule?.plannedStartDate) ||
        'None provided'}
    </p>
    <p>
      <strong>End date: </strong>
      {stateDateToDisplay(activity?.activitySchedule?.plannedEndDate) ||
        'None provided'}
    </p>
    <hr className="subsection-rule" />
    <h3>Activity Overview</h3>
    <div
      dangerouslySetInnerHTML={{
        __html:
          activity?.activityOverview?.description || 'No response was provided.'
      }}
    />

    <h3 className="viewonly-activity-header">
      <small>
        Activity {activityIndex + 1}: {activity.name || 'Untitled'}
      </small>
      <br />
      Statement of Alternative Considerations and Supporting Justification
    </h3>
    <div
      dangerouslySetInnerHTML={{
        __html:
          activity?.activityOverview?.alternatives ||
          'No response was provided.'
      }}
    />

    <h3 className="viewonly-activity-header">
      <small>
        Activity {activityIndex + 1}: {activity.name || 'Untitled'}
      </small>
      <br /> Standards and Conditions
    </h3>

    <p>
      <strong>
        This activity supports the Medicaid standards and conditions from 42 CFR
        433.112.
      </strong>
    </p>
    <div
      dangerouslySetInnerHTML={{
        __html:
          activity?.activityOverview?.standardsAndConditions?.supports ||
          'No response was provided for how this activity will support the Medicaid standards and conditions.'
      }}
    />

    <div className="subform__container">
      <p>
        <strong>
          This activity does not support the Medicaid standards and conditions
          from 42 CFR 433.112.
        </strong>
      </p>
      <p>
        {activity?.activityOverview?.standardsAndConditions?.doesNotSupport ||
          'No response was provided for how this activity will support the Medicaid standards and conditions.'}
      </p>
    </div>
  </Fragment>
);
HitechActivitySummaryReadOnly.propTypes = {
  activityIndex: PropTypes.number.isRequired,
  activity: PropTypes.object.isRequired
};

const mmisFedStateSplit = ({ costAllocation }) => {
  const noneSet = Object.keys(costAllocation).every(
    year =>
      costAllocation[year].ffp.state === 0 &&
      costAllocation[year].ffp.federal === 0 &&
      costAllocation[year].ffp.fundingCategory === null
  );

  if (noneSet) {
    return 'No Federal-State Split was specified.';
  }

  return Object.keys(costAllocation).map(year => {
    const { state, federal, fundingCategory } = costAllocation[year].ffp;
    if (state === 0 && federal === 0 && fundingCategory === null) {
      return (
        <span key={year}>
          <strong>FFY {year}:</strong> No Federal-State Split was specified.
          <br />
        </span>
      );
    }
    return (
      <span key={year}>
        <strong>FFY {year}:</strong> {federal}/{state}{' '}
        {FUNDING_CATEGORY_LABEL_MAPPING[fundingCategory]}
        <br />
      </span>
    );
  });
};

const MmisActivitySummaryReadOnly = ({ activity, activityIndex, years }) => (
  <Fragment>
    <hr className="section-rule" />
    <h2>
      Activity {activityIndex + 1}: {activity.name || 'Untitled'}
    </h2>
    <p>
      <strong>Start date: </strong>
      {stateDateToDisplay(activity.activitySchedule.plannedStartDate) ||
        'None provided'}
    </p>
    <p>
      <strong>End date: </strong>
      {stateDateToDisplay(activity.activitySchedule.plannedEndDate) ||
        'None provided'}
    </p>
    <p>
      <strong>Federal Fiscal Years requested: </strong>
      {years ? `FFY ${years.join(', ')}` : 'None provided'}
    </p>

    <strong>Federal-State Split: </strong>
    <div
      className="ds-l-col--11"
      style={{
        marginLeft: '12px',
        borderLeft: '3px solid #0071BC',
        whiteSpace: 'pre-wrap'
      }}
    >
      {mmisFedStateSplit({ costAllocation: activity?.costAllocation })}
    </div>
    <br />

    <strong>Activity snapshot</strong>
    <div
      dangerouslySetInnerHTML={{
        __html:
          activity?.activityOverview?.activitySnapshot ||
          'No response was provided.'
      }}
    />

    <h3>Comprehensive Activity Overview</h3>
    <strong>Problem statement</strong>
    <div
      dangerouslySetInnerHTML={{
        __html:
          activity?.activityOverview?.problemStatement ||
          'No response was provided.'
      }}
    />
    <br />
    <strong>Proposed solution</strong>
    <div
      dangerouslySetInnerHTML={{
        __html:
          activity?.activityOverview?.proposedSolution ||
          'No response was provided.'
      }}
    />
    <br />
  </Fragment>
);
MmisActivitySummaryReadOnly.propTypes = {
  activityIndex: PropTypes.number.isRequired,
  activity: PropTypes.object.isRequired,
  years: PropTypes.array.isRequired
};

const ActivitySummaryReadOnly = ({
  activity,
  activityIndex,
  apdType,
  years
}) => {
  switch (apdType) {
    case APD_TYPE.HITECH:
      return (
        <HitechActivitySummaryReadOnly
          activity={activity}
          activityIndex={activityIndex}
        />
      );
    case APD_TYPE.MMIS:
      return (
        <MmisActivitySummaryReadOnly
          activity={activity}
          activityIndex={activityIndex}
          years={years}
        />
      );
    default:
      return <div>Invalid APD type</div>;
  }
};

ActivitySummaryReadOnly.propTypes = {
  activity: PropTypes.object.isRequired,
  activityIndex: PropTypes.number.isRequired,
  apdType: PropTypes.string.isRequired,
  years: PropTypes.array.isRequired
};

export default ActivitySummaryReadOnly;
