import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import Dollars from '../../../components/Dollars';

import CostAllocateFFP from "../../activity/CostAllocateFFP";

const Activity = ({activity}) => {
  const buildGoal = (goal) => {
    return (
      <Fragment>
        <p><strong>Goal: </strong> {goal.description}</p>
        <p><strong>Benchmarks: </strong>{goal.objective}</p>
      </Fragment>
    )
  }
  
  const buildMilestone = (milestone, index) => {
    return (
      <Fragment>
        <p><strong>{index + 1}. {milestone.milestone}</strong></p>
        <p><em>Planned end date: </em> {milestone.endDate || 'None provided'}</p>
      </Fragment>
    )
  }

  const buildPerson = (person, index) => {
    return (
      <Fragment>
        <p><strong>{index + 1}. {person.title}</strong></p>
        <p>{person.description}</p>
        <ul className="ds-c-list--bare">
          {Object.entries(person.years).map(([year, { amt, perc }]) => (
            <li key={year}>
              <strong>{year} Costs:</strong> <Dollars>{amt}</Dollars> |{' '}
              <strong>FTEs:</strong> {perc}
            </li>
          ))}
        </ul>
      </Fragment>
    )
  }

  const buildExpense = (expense, index) => {
    return (
      <Fragment>
        <p><strong>{index + 1}. {expense.category}</strong></p>
        <p>{expense.description}</p>
        <ul className="ds-c-list--bare">
          {Object.entries(expense.years).map(([year, cost ]) => (
            <li key={year}>
              <strong>{year} Costs:</strong> <Dollars>{cost}</Dollars>
            </li>
          ))}
        </ul>
      </Fragment>
    )
  }

  const buildContractor = (contractor, index) => {
    const contractTerm = () => {
      if (!contractor.start && !contractor.end) {
        return "Dates not specified";
      } else {
        const start = contractor.start === "" ? 'unspecified' : contractor.start;
        const end = contractor.end === "" ? 'unspecified' : contractor.end;
        return `${start} — ${end}`;
      }
    }

    return (
      <Fragment>
        <p><strong>{index + 1}. {contractor.name}</strong>{contractor.hourly.useHourly === true && ' (hourly resource)'}</p>
        <p>{contractor.description}</p>
        <p><strong>Contract term: </strong>{contractTerm()}</p>
        <ul className="ds-c-list--bare">
          {Object.entries(contractor.years).map(([year, cost ]) => (
            <li key={year}>
              <strong>{year} Costs:</strong> <Dollars>{cost}</Dollars> 
              {contractor.hourly.useHourly === true &&
                <>
                  <p>Number of hours: {contractor.hourly.data[year].hours}</p>
                  <p>Hourly rate: <Dollars>{contractor.hourly.data[year].rate}</Dollars></p>
                </>
              }
            </li>
          ))}
        </ul>
        <p><strong>Total cost: </strong><Dollars>{contractor.totalCost}</Dollars></p>
      </Fragment>
    )
  }

  const buildStandardsAndConditions = (key, description) => {
        let title;
        switch(key) {
          case 'modularity':
            title = 'Modularity';
            break;
          case 'mita':
            title = 'Medicaid Information Technology Architecture (MITA)';
            break;
          case 'industryStandards':
            title = 'Industry Standards';
            break;
          case 'leverage':
            title = 'Leverage';
            break;
          case 'businessResults':
            title = 'Business Results';
            break;
          case 'reporting':
            title = 'Reporting';
            break;
          case 'interoperability':
            title = 'Interoperability';
            break;
          case 'mitigationStrategy':
            title = 'Mitigation Strategy';
            break;
          case 'keyPersonnel':
            title = 'Key Personnel';
            break;
          case 'documentation':
            title = 'Documentation';
            break;
          case 'minimizeCost':
            title = 'Strategies to Minimize Cost and Difficulty on Alternative Hardware or Operating System';
            break;
          default:
            console.log('no match found');
        } 
        return (
          <Fragment>
            <p><strong>{title}</strong></p>
            <p>{description === '' ? 'No description provided' : description}</p>
          </Fragment>
        )
      ;
  }

  return (
    <Fragment>
      <h3>{activity.name}</h3>
      <p><strong>Activity Summary:</strong> {activity.summary}</p>
      <h4>Activity Overview</h4>
      <div dangerouslySetInnerHTML={{__html: activity.description}} />
      <hr />

      <h4>Statement of alternative considerations and supporting justification</h4>
      <div dangerouslySetInnerHTML={{__html: activity.alternatives}} />
      <hr />

      <h4>Performance Goals and Benchmarks</h4>
      {activity.goals.map((goal) => buildGoal(goal))}
      <hr />

      <h4>Activity Schedule</h4>
      <p><strong>Planned start date: </strong>{activity.plannedStartDate || 'None provided'}</p>
      <p><strong>Planned end date: </strong>{activity.plannedEndDate || 'None provided'}</p>
      <h4>Milestones</h4>
      {activity.schedule.map((milestone, index) => buildMilestone(milestone, index))}
      <hr />

      <h4>In-House Cost Categories: State Personnel</h4>
      {activity.statePersonnel.map((person, index) => buildPerson(person, index))}

      <h4>In-House Cost Categories: Non-Personnel</h4>
      {activity.expenses.map((expense, index) => buildExpense(expense, index))}

      <h4>Private Contractor Costs</h4>
      {activity.contractorResources.map((contractor, index) => buildContractor(contractor, index))}
      <hr />

      <h4>Cost Allocation</h4>
      <h5>Description of Cost Allocation Methodology</h5>
      <div dangerouslySetInnerHTML={{__html: activity.costAllocationNarrative.methodology}} />
      <h5>Description of Other Funding</h5>
      <div dangerouslySetInnerHTML={{__html: activity.costAllocationNarrative.otherSources}} />

      <h4>Federal Financial Participation (FFP) and Cost Allocation</h4>
      <CostAllocateFFP
        aKey={activity.key}
        activityIndex={0}
        costAllocation={activity.costAllocation}
        isViewOnly
      />
  
      <h4>Standards and Conditions</h4>
      {Object.entries(activity.standardsAndConditions).map(([key, description]) => buildStandardsAndConditions(key, description))}
    </Fragment>
  )
};

export default Activity;