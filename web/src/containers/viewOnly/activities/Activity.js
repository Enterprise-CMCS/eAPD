import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import Dollars from '../../../components/Dollars';

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

      <h4>In-House Cost Categories: Private Contractor Costs</h4>

      <hr />
    </Fragment>
  )
};

export default Activity;