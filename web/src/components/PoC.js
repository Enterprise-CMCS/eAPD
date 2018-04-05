import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import Icon from '@fortawesome/react-fontawesome';

import Collapsible from './Collapsible';
import FormActivityApproach from './FormActivityApproach';
import FormActivityGoals from './FormActivityGoals';
import FormActivitySchedule from './FormActivitySchedule';
import { faHelp, faHelpSolid, faChevronDown, faSignOut } from './Icons';
import { getParams, stateLookup } from '../util';
import { EDITOR_CONFIG } from '../util/editor';

const sections = [
  'Activity Description',
  'Needs and Objectives',
  'Proposed Activity Schedule',
  'State Personnel',
  'Contractor Resources',
  'Expenses',
  'Cost Allocation',
  'Standards & Conditions'
];

const activityDisplay = (a, i) => {
  let display = `Activity ${i}`;
  if (a.name) display += `: ${a.name}`;
  if (a.type.length) display += ` (${a.type.join(', ')})`;
  return display;
};

const Sidebar = ({ activities, place }) => {
  const linkClass = 'inline-block white text-decoration-none truncate';

  return (
    <div className="site-sidebar bg-navy">
      <div className="p2 xs-hide sm-hide">
        <div className="mb2 center">
          <img
            src={`/static/img/${place.id}.svg`}
            alt={place.name}
            width="60"
            height="60"
          />
        </div>

        <ul className="list-reset h5">
          <li>
            <a href="#!" className={linkClass}>
              Program Summary
            </a>
          </li>
          <li>
            <a href="#!" className={linkClass}>
              Program Activities
            </a>
          </li>
          <ul className="ml2 list-reset">
            {activities.map((a, i) => (
              <Fragment key={a.id}>
                <li>
                  <a href="#!" className={linkClass}>
                    {activityDisplay(a, i + 1)}{' '}
                    <Icon icon={faChevronDown} className="teal" size="sm" />
                  </a>
                </li>
                <ul className="ml2 mb0 list-reset">
                  {sections.map((s, j) => (
                    <li key={j}>
                      <a href="#!" className={linkClass}>
                        {s}
                      </a>
                    </li>
                  ))}
                </ul>
              </Fragment>
            ))}
          </ul>
        </ul>
        <div className="mt2 pt2 border-top border-white">
          <button type="button" className="btn btn-primary bg-white navy">
            Save as PDF
          </button>
        </div>
      </div>
    </div>
  );
};

Sidebar.propTypes = {
  activities: PropTypes.array.isRequired,
  place: PropTypes.object.isRequired
};

const TopNav = ({ place }) => (
  <header className="clearfix py1 bg-white">
    <div className="sm-col">
      <a href="#!" className="btn caps">
        2018 {place.name} HITECH APD
      </a>
    </div>
    <div className="sm-col-right h5">
      <div>
        <button type="button" className="btn h5 regular">
          <span className="mr-tiny">Help</span>
          <Icon icon={faHelp} />
        </button>
        <button type="button" className="btn h5 regular">
          <span className="mr-tiny">Log out</span>
          <Icon icon={faSignOut} />
        </button>
      </div>
    </div>
  </header>
);

TopNav.propTypes = {
  place: PropTypes.object.isRequired
};

const HelpBox = ({ children }) => (
  <div className="my2 p2 h5 sm-col-7 lg-col-6 bg-teal-light border border-teal border-width-2 rounded relative">
    <div
      className="inline-block absolute line-height-1 bg-white circle"
      style={{ top: '-.5em', left: '-.5em' }}
    >
      <Icon icon={faHelpSolid} className="teal" />
    </div>
    {children}
  </div>
);

HelpBox.propTypes = {
  children: PropTypes.node.isRequired
};

const ActivityDescription = ({ activity, updateYears }) => (
  <div>
    <div className="mb1 bold">
      Summary of the activity
      <Icon icon={faHelp} className="ml-tiny teal" size="sm" />
    </div>

    <HelpBox>
      <p>Here is something to keep in mind...</p>
      <p className="mb0">You may also want to think about this...</p>
    </HelpBox>

    <div className="mb3">
      <textarea
        className="m0 textarea col-8"
        rows="5"
        spellCheck="true"
        maxLength="280"
        placeholder="A brief statement of what the activity involves..."
      />
    </div>

    <div className="mb3">
      <div className="mb1 bold">
        Please describe the activity
        <Icon icon={faHelp} className="ml-tiny teal" size="sm" />
      </div>
      <Editor toolbar={EDITOR_CONFIG} />
    </div>

    <div className="mb3">
      <div className="mb1 bold">What years does this activity cover?</div>
      {['2018', '2019', '2020'].map(year => (
        <label key={year} className="mr1">
          <input
            type="checkbox"
            name={`${activity.id}.years`}
            value={year}
            checked={activity.years.includes(year)}
            onChange={updateYears}
          />
          {year}
        </label>
      ))}
    </div>

    <FormActivityApproach form={`activity-${activity.id}-approach`} />
  </div>
);

ActivityDescription.propTypes = {
  activity: PropTypes.object.isRequired,
  updateYears: PropTypes.func.isRequired
};

const StatePersonnel = ({ activity }) => (
  <div className="overflow-auto">
    <table className="mb2 h5 table table-fixed" style={{ minWidth: 700 }}>
      <thead>
        <tr>
          <th className="col-1">#</th>
          <th className="col-4">Title</th>
          <th className="col-5">Description</th>
          {activity.years.map(year => (
            <th key={year} className="col-3">
              {year}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {[...Array(5)].map((_, i) => (
          <tr key={i}>
            <td className="mono">{i + 1}.</td>
            <td>
              <input type="text" className="m0 input" />
            </td>
            <td>
              <textarea className="m0 textarea" />
            </td>
            {activity.years.map(year => (
              <td key={year}>
                <input type="number" className="m0 input" />
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

StatePersonnel.propTypes = {
  activity: PropTypes.object.isRequired
};

const ContractorResources = ({ activity }) => (
  <div className="overflow-auto">
    <table className="mb2 h5 table table-fixed" style={{ minWidth: 700 }}>
      <thead>
        <tr>
          <th className="col-1">#</th>
          <th className="col-4">Name</th>
          <th className="col-5">Description of Services</th>
          <th className="col-4">Term</th>
          {activity.years.map(year => (
            <th key={year} className="col-3">
              {year}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {[...Array(5)].map((_, i) => (
          <tr key={i}>
            <td className="mono">{i + 1}.</td>
            <td>
              <input type="text" className="m0 input" />
            </td>
            <td>
              <textarea className="m0 textarea" />
            </td>
            <td>
              <input type="text" className="m0 input" />
            </td>
            {activity.years.map(year => (
              <td key={year}>
                <input type="number" className="m0 input" />
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

ContractorResources.propTypes = {
  activity: PropTypes.object.isRequired
};

class PoC extends Component {
  constructor(props) {
    super(props);

    const fallback = 'ca';
    const { state: stateId } = getParams(window.location.hash);
    const place = stateLookup(stateId || fallback) || stateLookup(fallback);

    this.state = {
      place,
      activities: [
        {
          id: 1,
          name: 'Test',
          type: ['HIT'],
          years: ['2018', '2019']
        },
        {
          id: 2,
          name: 'Test 2',
          type: ['MMIS'],
          years: ['2018']
        }
      ]
    };
  }

  addActivity = () => {
    this.setState(({ activities }) => ({
      activities: [
        ...activities,
        {
          id: activities.reduce((maxId, a) => Math.max(a.id, maxId), -1) + 1,
          name: '',
          type: ['HIT'],
          years: ['2018', '2019']
        }
      ]
    }));
  };

  editActivityText = e => {
    const { name: nameRaw, value } = e.target;
    const [id, name] = nameRaw.split('.');

    this.setState(({ activities }) => ({
      activities: activities.map(
        a => (a.id === +id ? { ...a, [name]: value } : a)
      )
    }));
  };

  editActivityChecks = e => {
    const { name: nameRaw, value } = e.target;
    const [id, name] = nameRaw.split('.');

    this.setState(({ activities }) => ({
      activities: activities.map(
        a =>
          a.id === +id
            ? {
                ...a,
                [name]: a[name].includes(value)
                  ? a[name].filter(t => t !== value)
                  : [...a[name], value].sort()
              }
            : a
      )
    }));
  };

  render() {
    const { activities, place } = this.state;

    return (
      <div className="site-body">
        <Sidebar activities={activities} place={place} />
        <div className="site-content">
          <TopNav place={place} />
          <div className="p2 pb4 sm-p3 bg-darken-1">
            <Collapsible title="Activity List" open>
              <div className="mb2">
                {activities.map((a, i) => (
                  <div key={a.id} className="flex items-center mb1">
                    <div className="mr1 bold mono">{i + 1}.</div>
                    <div className="mr1 col-4">
                      <input
                        type="text"
                        className="col-12 input m0"
                        name={`${a.id}.name`}
                        value={a.name}
                        onChange={this.editActivityText}
                      />
                    </div>
                    <div>
                      {['HIT', 'HIE', 'MMIS'].map(aType => (
                        <label key={aType} className="mr1">
                          <input
                            type="checkbox"
                            name={`${a.id}.type`}
                            value={aType}
                            checked={a.type.includes(aType)}
                            onChange={this.editActivityChecks}
                          />
                          {aType}
                        </label>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <button
                type="button"
                className="btn btn-primary"
                onClick={this.addActivity}
              >
                Add activity
              </button>
            </Collapsible>

            {activities.map((activity, i) => (
              <div key={activity.id} className="mb3">
                <h3>{activityDisplay(activity, i + 1)}</h3>

                <Collapsible title="Activity Description" open={i === 0}>
                  <ActivityDescription
                    activity={activity}
                    updateYears={this.editActivityChecks}
                  />
                </Collapsible>

                <Collapsible title="Needs and Objectives">
                  <FormActivityGoals form={`activity-${activity.id}-goals`} />
                </Collapsible>

                <Collapsible title="Proposed Activity Schedule">
                  <FormActivitySchedule
                    form={`activity-${activity.id}-schedule`}
                  />
                </Collapsible>

                <Collapsible title="State Personnel">
                  <StatePersonnel activity={activity} />
                </Collapsible>

                <Collapsible title="Contractor Resources">
                  <ContractorResources activity={activity} />
                </Collapsible>

                <Collapsible title="Expenses">
                  <div>Name, {activity.years.join(', ')}</div>
                </Collapsible>

                <Collapsible title="Cost Allocation">
                  <div>...</div>
                </Collapsible>

                <Collapsible title="Standards & Conditions">
                  <div>...</div>
                </Collapsible>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default PoC;
