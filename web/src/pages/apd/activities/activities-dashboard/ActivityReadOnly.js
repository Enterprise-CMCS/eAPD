/* eslint-disable react/no-danger */
import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { APD_TYPE } from '@cms-eapd/common';
import Dollars from '../../../../components/Dollars';

import { stateDateToDisplay, stateDateRangeToDisplay } from '../../../../util';
import ActivitySummaryReadOnly from '../overview/ActivitySummaryReadOnly';
import ConditionsForEnhancedFundingReadOnly from '../enhanced-funding/ConditionsForEnhancedFundingReadOnly';
import AlternativesAndRisksReadOnly from '../alternatives-and-risks/AlternativesAndRisksReadOnly';
import CostAllocateFFP from '../ffp/CostAllocateFFP';

const isYear = value => !!value.match(/^[0-9]{4}$/);

const Activity = ({ activity, activityIndex, years, apdType }) => {
  const buildOutcome = outcome => {
    return (
      <Fragment key={uuidv4()}>
        <p className="ds-u-margin-top--2">
          <strong>Outcome: </strong>{' '}
          {outcome.outcome || 'Outcome not specified'}
        </p>
        <div className="ds-u-margin-top--2">
          <ul className="ds-c-list--bare subform__container">
            <strong>Metrics: </strong>
            {outcome.metrics.length === 0 &&
              'No metrics were specified for this outcome.'}
            {outcome.metrics.map(({ metric }, index) => (
              <li key={uuidv4()} className="ds-u-margin-bottom--2">
                {index + 1}.{' '}
                {metric || 'No metrics were specified for this outcome.'}
              </li>
            ))}
          </ul>
        </div>
        <hr className="subsection-rule ds-u-margin-bottom--1 ds-u-margin-top--1" />
      </Fragment>
    );
  };

  const buildMilestone = (milestone, index) => {
    return (
      <Fragment key={uuidv4()}>
        <p>
          <strong>
            {index + 1}. {milestone.milestone || 'Milestone not specified'}
          </strong>
        </p>
        <p>
          <em>Target completion date: </em>{' '}
          {stateDateToDisplay(milestone.endDate) || 'None provided'}
        </p>
      </Fragment>
    );
  };

  const buildPerson = (person, index) => {
    return (
      <Fragment key={uuidv4()}>
        <p>
          <strong>
            {index + 1}. {person.title || 'Personnel title not specified'}
          </strong>
        </p>
        <p>{person.description}</p>
        <ul className="ds-c-list--bare">
          {Object.entries(person.years).map(([year, { amt, perc }]) => (
            <li key={year}>
              <strong>FFY {year} Cost:</strong> <Dollars>{amt}</Dollars> |{' '}
              <strong>FTEs:</strong> {perc === '' || perc === null ? '0' : perc}{' '}
              | <strong>Total:</strong> <Dollars>{perc * amt}</Dollars>
            </li>
          ))}
        </ul>
      </Fragment>
    );
  };

  const buildExpense = (expense, index) => {
    return (
      <Fragment key={uuidv4()}>
        <p>
          <strong>
            {index + 1}. {expense.category || 'Category Not Selected'}
          </strong>
        </p>
        <p>{expense.description}</p>
        <ul className="ds-c-list--bare">
          {Object.entries(expense.years).map(([year, cost]) => (
            <li key={year}>
              <strong>FFY {year} Cost:</strong> <Dollars>{cost}</Dollars>
            </li>
          ))}
        </ul>
      </Fragment>
    );
  };

  const buildContractor = (contractor, index) => {
    return (
      <Fragment key={uuidv4()}>
        <p className="ds-u-margin-bottom--0">
          <strong>
            {index + 1}.{' '}
            {contractor.name ||
              'Private Contractor or Vendor Name not specified'}
          </strong>
          {(contractor.useHourly === true || contractor.useHourly === 'yes') &&
            ' (hourly resource)'}
        </p>
        <strong>Procurement Methodology and Description of Services</strong>
        <p
          className="ds-u-margin-top--0"
          dangerouslySetInnerHTML={{
            __html:
              contractor.description ||
              'Procurement Methodology and Description of Services not specified'
          }}
        />
        <ul className="ds-c-list--bare">
          <li>
            <strong>Full Contract Term: </strong>
            {stateDateRangeToDisplay(contractor.start, contractor.end)}
          </li>
          <li>
            <strong>Total Contract Cost: </strong>
            <Dollars>{contractor.totalCost}</Dollars>
          </li>
          {Object.entries(contractor.years).map(([year, cost]) => (
            <li className="ds-u-margin-top--1" key={year}>
              <strong>FFY {year} Cost:</strong> <Dollars>{cost}</Dollars>
              {(contractor.useHourly === true ||
                contractor.useHourly === 'yes') && (
                <Fragment key={uuidv4()}>
                  <div className="subform__container">
                    <p>Number of hours: {contractor.hourly[year].hours}</p>
                    <p>
                      Hourly rate:{' '}
                      <Dollars>{contractor.hourly[year].rate}</Dollars>
                    </p>
                  </div>
                </Fragment>
              )}
            </li>
          ))}
        </ul>
      </Fragment>
    );
  };

  return (
    <div key={uuidv4()}>
      <ActivitySummaryReadOnly
        activity={activity}
        activityIndex={activityIndex}
        years={years}
        apdType={apdType}
      />
      {apdType === APD_TYPE.MMIS && (
        <AlternativesAndRisksReadOnly
          activity={activity}
          activityIndex={activityIndex}
        />
      )}

      <h3>Milestones</h3>
      {activity.milestones.length === 0 && 'No milestones were provided.'}
      {activity.milestones.map((milestone, index) =>
        buildMilestone(milestone, index)
      )}

      {apdType === APD_TYPE.MMIS && (
        <ConditionsForEnhancedFundingReadOnly
          activity={activity}
          activityIndex={activityIndex}
        />
      )}

      <h3 className="viewonly-activity-header">
        <small>
          Activity {activityIndex + 1}: {activity.name || 'Untitled'}
        </small>
        <br />
        Outcomes and Metrics
      </h3>
      {activity.outcomes.length === 0 &&
        'No outcome(s) and/or corresponding metric(s) were provided.'}
      <hr className="subsection-rule ds-u-margin-bottom--1 ds-u-margin-top--1" />
      {activity.outcomes.map(buildOutcome)}

      <h3 className="viewonly-activity-header">
        <small>
          Activity {activityIndex + 1}: {activity.name || 'Untitled'}
        </small>
        <br />
        State staff
      </h3>
      {activity.statePersonnel.length === 0 && 'State staff not specified.'}
      {activity.statePersonnel.map((person, index) =>
        buildPerson(person, index)
      )}

      <h3 className="viewonly-activity-header">
        <small>
          Activity {activityIndex + 1}: {activity.name || 'Untitled'}
        </small>
        <br />
        Other state expenses
      </h3>
      {activity.expenses.length === 0 && 'Other state expenses not specified.'}
      {activity.expenses.map((expense, index) => buildExpense(expense, index))}

      <h3 className="viewonly-activity-header">
        <small>
          Activity {activityIndex + 1}: {activity.name || 'Untitled'}
        </small>
        <br />
        Private Contractor Costs
      </h3>
      {activity.contractorResources.length === 0 &&
        'Private contractor(s) not specified.'}
      {activity.contractorResources.map((contractor, index) =>
        buildContractor(contractor, index)
      )}

      <h3 className="viewonly-activity-header">
        <small>
          Activity {activityIndex + 1}: {activity.name || 'Untitled'}
        </small>
        <br />
        Cost Allocation
      </h3>
      <h4>Description of Cost Allocation Methodology</h4>
      <div
        className="subform__container"
        dangerouslySetInnerHTML={{
          __html:
            activity?.costAllocationNarrative?.methodology ||
            'No cost allocation methodology was provided.'
        }}
      />

      <hr className="subsection-rule" />
      <h3>Other Funding</h3>
      {Object.entries(activity?.costAllocationNarrative?.years)
        .filter(([year, _]) => isYear(year)) // eslint-disable-line no-unused-vars
        .map(([year, narrative]) => (
          <Fragment key={uuidv4()}>
            <h3>FFY {year}</h3>
            <div className="subform__container">
              <h4>Other Funding Description</h4>
              <div
                dangerouslySetInnerHTML={{
                  __html: narrative.otherSources || 'No response was provided.'
                }}
              />
              <h4>Other Funding Amount: </h4>
              <Dollars>
                {
                  (activity.costAllocation[year.toString()] || { other: 0 })
                    .other
                }
              </Dollars>
            </div>
            <hr className="subsection-rule" />
          </Fragment>
        ))}

      <h3 className="viewonly-activity-header">
        <small>
          Activity {activityIndex + 1}: {activity.name || 'Untitled'}
        </small>
        <br />
        Budget and FFP
      </h3>
      <CostAllocateFFP
        activityId={activity.activityId}
        activityIndex={activityIndex}
        costAllocation={activity.costAllocation}
        isViewOnly
      />
    </div>
  );
};

Activity.propTypes = {
  activity: PropTypes.object.isRequired,
  activityIndex: PropTypes.number.isRequired,
  years: PropTypes.array.isRequired,
  apdType: PropTypes.string.isRequired
};

export default Activity;
