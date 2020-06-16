import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import Dollars from '../../../components/Dollars';

import CostAllocateFFP from '../../activity/CostAllocateFFP';
import { stateDateToDisplay } from '../../../util';

const Activity = ({ activity, activityIndex }) => {
  const buildObjective = objective => {
    return (
      <Fragment>
        <p>
          <strong>Objective: </strong> {objective.objective}
        </p>
        <p>
          <strong>Key Results: </strong>
          <ul>
            {objective.keyResults.map(
              ({ baseline, key, keyResult, target }) => (
                <li key={key} className="ds-u-margin-top--2">
                  <strong>{keyResult}</strong>
                  <br />
                  <strong>Target:</strong> {target}
                  <br />
                  <strong>Baseline:</strong> {baseline}
                </li>
              )
            )}
          </ul>
        </p>
      </Fragment>
    );
  };

  const buildMilestone = (milestone, index) => {
    return (
      <Fragment>
        <p>
          <strong>
            {index + 1}. {milestone.milestone}
          </strong>
        </p>
        <p>
          <em>Planned end date: </em>{' '}
          {stateDateToDisplay(milestone.endDate) || 'None provided'}
        </p>
      </Fragment>
    );
  };

  const buildPerson = (person, index) => {
    return (
      <Fragment>
        <p>
          <strong>
            {index + 1}. {person.title}
          </strong>
        </p>
        <p>{person.description}</p>
        <ul className="ds-c-list--bare">
          {Object.entries(person.years).map(([year, { amt, perc }]) => (
            <li key={year}>
              <strong>FFY {year} Cost:</strong> <Dollars>{amt}</Dollars> |{' '}
              <strong>FTEs:</strong> {perc} | <strong>Total:</strong>{' '}
              <Dollars>{perc * amt}</Dollars>
            </li>
          ))}
        </ul>
      </Fragment>
    );
  };

  const buildExpense = (expense, index) => {
    return (
      <Fragment>
        <p>
          <strong>
            {index + 1}. {expense.category}
          </strong>
        </p>
        <p>{expense.description}</p>
        <ul className="ds-c-list--bare">
          {Object.entries(expense.years).map(([year, cost]) => (
            <li key={year}>
              <strong>FFY {year} Costs:</strong> <Dollars>{cost}</Dollars>
            </li>
          ))}
        </ul>
      </Fragment>
    );
  };

  const buildContractor = (contractor, index) => {
    const contractTerm = () => {
      if (!contractor.start && !contractor.end) {
        return 'Dates not specified';
      }
      const start = contractor.start === '' ? 'unspecified' : contractor.start;
      const end = contractor.end === '' ? 'unspecified' : contractor.end;
      return `${start} — ${end}`;
    };

    return (
      <Fragment>
        <p>
          <strong>
            {index + 1}. {contractor.name}
          </strong>
          {contractor.hourly.useHourly === true && ' (hourly resource)'}
        </p>
        <p>{contractor.description}</p>
        <p>
          <strong>Contract term: </strong>
          {contractTerm()}
        </p>
        <ul className="ds-c-list--bare">
          {Object.entries(contractor.years).map(([year, cost]) => (
            <li key={year}>
              <strong>{year} Costs:</strong> <Dollars>{cost}</Dollars>
              {contractor.hourly.useHourly === true && (
                <Fragment>
                  <p>Number of hours: {contractor.hourly.data[year].hours}</p>
                  <p>
                    Hourly rate:{' '}
                    <Dollars>{contractor.hourly.data[year].rate}</Dollars>
                  </p>
                </Fragment>
              )}
            </li>
          ))}
        </ul>
        <p>
          <strong>Total cost: </strong>
          <Dollars>{contractor.totalCost}</Dollars>
        </p>
      </Fragment>
    );
  };

  /* eslint-disable react/no-danger */
  return (
    <Fragment>
      <hr className="section-rule" />
      <h2>
        Activity {activityIndex + 1} ({activity.name})
      </h2>
      <p>
        <strong>Activity Summary:</strong> {activity.summary}
      </p>
      <p>
        <strong>Planned start date: </strong>
        {activity.plannedStartDate || 'None provided'}
      </p>
      <p>
        <strong>Planned end date: </strong>
        {activity.plannedEndDate || 'None provided'}
      </p>
      <hr className="subsection-rule" />
      <h3>Activity Overview</h3>
      <div dangerouslySetInnerHTML={{ __html: activity.description }} />

      <h3 className="viewonly-activity-header">
        <small>
          Activity {activityIndex + 1} ({activity.name})
        </small>
        <br />
        Statement of Alternative Considerations and Supporting Justification
      </h3>
      <div dangerouslySetInnerHTML={{ __html: activity.alternatives }} />

      <h3 className="viewonly-activity-header">
        <small>
          Activity {activityIndex + 1} ({activity.name})
        </small>
        <br />
        Objectives and Key Results
      </h3>
      {activity.objectives.map(buildObjective)}

      <h3>Milestones</h3>
      {activity.schedule.map((milestone, index) =>
        buildMilestone(milestone, index)
      )}

      <h3 className="viewonly-activity-header">
        <small>
          Activity {activityIndex + 1} ({activity.name})
        </small>
        <br />
        In-House Cost Categories: State Personnel
      </h3>
      {activity.statePersonnel.map((person, index) =>
        buildPerson(person, index)
      )}

      <h3 className="viewonly-activity-header">
        <small>
          Activity {activityIndex + 1} ({activity.name})
        </small>
        <br />
        In-House Cost Categories: Non-Personnel
      </h3>
      {activity.expenses.map((expense, index) => buildExpense(expense, index))}

      <h3 className="viewonly-activity-header">
        <small>
          Activity {activityIndex + 1} ({activity.name})
        </small>
        <br />
        Private Contractor Costs
      </h3>
      {activity.contractorResources.map((contractor, index) =>
        buildContractor(contractor, index)
      )}

      <h3 className="viewonly-activity-header">
        <small>
          Activity {activityIndex + 1} ({activity.name})
        </small>
        <br />
        Cost Allocation
      </h3>
      <h4>Description of Cost Allocation Methodology</h4>
      <div
        dangerouslySetInnerHTML={{
          __html: activity.costAllocationNarrative.methodology
        }}
      />
      <h4>Description of Other Funding</h4>
      <div
        dangerouslySetInnerHTML={{
          __html: activity.costAllocationNarrative.otherSources
        }}
      />

      <h3 className="viewonly-activity-header">
        <small>
          Activity {activityIndex + 1} ({activity.name})
        </small>
        <br />
        Federal Financial Participation (FFP) and Cost Allocation
      </h3>
      <CostAllocateFFP
        aKey={activity.key}
        activityIndex={0}
        costAllocation={activity.costAllocation}
        isViewOnly
      />

      <h3 className="viewonly-activity-header">
        <small>
          Activity {activityIndex + 1} ({activity.name})
        </small>
        <br /> Standards and Conditions
      </h3>

      <p>
        <strong>
          This activity supports the Medicaid standards and conditions from 42
          CFR 433.112.
        </strong>
      </p>
      {activity.standardsAndConditions.supports ? (
        <p
          dangerouslySetInnerHTML={{
            __html: activity.standardsAndConditions.supports
          }}
        />
      ) : (
        <p>
          No response was provided for how this activity will support the
          Medicaid standards and conditions.
        </p>
      )}

      <p>
        <strong>
          This activity does not support the Medicaid standards and conditions
          from 42 CFR 433.112.
        </strong>
      </p>
      {activity.standardsAndConditions.doesNotSupport ? (
        <p>{activity.standardsAndConditions.doesNotSupport}</p>
      ) : (
        <p>
          No response was provided for how this activity will support the
          Medicaid standards and conditions.
        </p>
      )}
    </Fragment>
  );
};

Activity.propTypes = {
  activity: PropTypes.array.isRequired,
  activityIndex: PropTypes.string.isRequired
};

export default Activity;
