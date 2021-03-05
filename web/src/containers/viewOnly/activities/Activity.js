import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import Dollars from '../../../components/Dollars';

import CostAllocateFFP from '../../activity/CostAllocateFFP';
import { stateDateToDisplay } from '../../../util';

const isYear = value => !!value.match(/^[0-9]{4}$/);

const Activity = ({ activity, activityIndex }) => {
  const buildOutcome = outcome => {
    return (
      <Fragment>
        <p className="ds-u-margin-top--2">
          <strong>Outcome: </strong>{' '}
          {outcome.outcome || 'Outcome not specified'}
        </p>
        <p className="ds-u-margin-top--2">
          <ul className="ds-c-list--bare">
            <strong>Metrics: </strong>
            {outcome.metrics.map(({ key, metric }, index) => (
              <li key={key} className="ds-u-margin-bottom--2">
                {index + 1}. {metric || 'Metric not specified'}
              </li>
            ))}
          </ul>
        </p>
        <hr className="subsection-rule ds-u-margin-bottom--1 ds-u-margin-top--1" />
      </Fragment>
    );
  };

  const buildMilestone = (milestone, index) => {
    return (
      <Fragment>
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
      <Fragment>
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
              <strong>FFY {year} Cost:</strong> <Dollars>{cost}</Dollars>
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
        <p className="ds-u-margin-bottom--0">
          <strong>
            {index + 1}. {contractor.name || 'Contractor name not specified'}
          </strong>
          {contractor.hourly.useHourly === true && ' (hourly resource)'}
        </p>
        <p className="ds-u-margin-top--0">{contractor.description}</p>
        <ul className="ds-c-list--bare">
          <li>
            <strong>Full Contract Term: </strong>
            {contractTerm()}
          </li>
          <li>
            <strong>Total Contract Cost: </strong>
            <Dollars>{contractor.totalCost}</Dollars>
          </li>
          {Object.entries(contractor.years).map(([year, cost]) => (
            <li key={year}>
              <strong>FFY {year} Cost:</strong> <Dollars>{cost}</Dollars>
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
        <strong>Provide a short overview of the activity:</strong>{' '}
        {activity.summary}
      </p>
      <p>
        <strong>Start date: </strong>
        {stateDateToDisplay(activity.plannedStartDate) || 'None provided'}
      </p>
      <p>
        <strong>End date: </strong>
        {stateDateToDisplay(activity.plannedEndDate) || 'None provided'}
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

      <h3 className="viewonly-activity-header">
        <small>
          Activity {activityIndex + 1} ({activity.name})
        </small>
        <br />
        Outcomes and Metrics
      </h3>
      <hr className="subsection-rule ds-u-margin-bottom--1 ds-u-margin-top--1" />
      {activity.outcomes.map(buildOutcome)}

      <h3>Milestones</h3>
      {activity.schedule.map((milestone, index) =>
        buildMilestone(milestone, index)
      )}

      <h3 className="viewonly-activity-header">
        <small>
          Activity {activityIndex + 1} ({activity.name})
        </small>
        <br />
        State staff
      </h3>
      {activity.statePersonnel.map((person, index) =>
        buildPerson(person, index)
      )}

      <h3 className="viewonly-activity-header">
        <small>
          Activity {activityIndex + 1} ({activity.name})
        </small>
        <br />
        Other state expenses
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

      <hr className="subsection-rule" />
      <h3>Other Funding</h3>
      {Object.entries(activity.costAllocationNarrative)
        .filter(([year, _]) => isYear(year)) // eslint-disable-line no-unused-vars
        .map(([year, narrative]) => (
          <Fragment>
            <h3>FFY {year}</h3>
            <h4>Other Funding Description</h4>
            <div
              dangerouslySetInnerHTML={{
                __html: narrative.otherSources
              }}
            />
            <div>
              <strong>Other Funding Amount: </strong>
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
          Activity {activityIndex + 1} ({activity.name})
        </small>
        <br />
        Budget and Federal Financial Participation (FFP)
      </h3>
      <CostAllocateFFP
        aKey={activity.key}
        activityIndex={activityIndex}
        costAllocation={activity.costAllocation}
        isViewOnly
      />
    </Fragment>
  );
};

Activity.propTypes = {
  activity: PropTypes.array.isRequired,
  activityIndex: PropTypes.number.isRequired
};

export default Activity;
