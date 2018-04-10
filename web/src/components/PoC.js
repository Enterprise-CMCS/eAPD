import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import Icon from '@fortawesome/react-fontawesome';

import Collapsible from './Collapsible';
import FormActivityApproach from './FormActivityApproach';
import FormActivityGoals from './FormActivityGoals';
import FormActivitySchedule from './FormActivitySchedule';
import { faHelp, faHelpSolid, faSignOut } from './Icons';
import { getParams, stateLookup } from '../util';
import { EDITOR_CONFIG } from '../util/editor';

const STANDARDS = [
  {
    id: 'modularity',
    title: 'Modularity'
  },
  {
    id: 'mita',
    title: 'Medicaid Information Technology Architecture (MITA)'
  },
  {
    id: 'industry',
    title: 'Industry Standards'
  },
  {
    id: 'leverage',
    title: 'Leverage'
  },
  {
    id: 'biz-results',
    title: 'Business Results'
  },
  {
    id: 'reporting',
    title: 'Reporting'
  },
  {
    id: 'interoperability',
    title: 'Interoperability'
  },
  {
    id: 'mitigation',
    title: 'Mitigation Strategy'
  },
  {
    id: 'key-personnel',
    title: 'Key Personnel'
  },
  {
    id: 'documentation',
    title: 'Documentation'
  },
  {
    id: 'minimize-cost',
    title:
      'Strategies to Minimize Cost and Difficulty on Alternative Hardware or Operating System'
  }
];

const activityDisplay = (a, i) => {
  let display = `Activity ${i}`;
  if (a.name) display += `: ${a.name}`;
  if (a.type.length) display += ` (${a.type.join(', ')})`;
  return display;
};

const Section = ({ children }) => (
  <div className="p2 sm-px3 border-bottom border-gray">{children}</div>
);

Section.propTypes = {
  children: PropTypes.node.isRequired
};

const SectionTitle = ({ children }) => (
  <h2 className="mt1 mb2 fw-800">{children}</h2>
);

SectionTitle.propTypes = {
  children: PropTypes.node.isRequired
};

const SidebarLink = ({ children }) => (
  <li>
    <a href="#!" className="inline-block white text-decoration-none truncate">
      {children}
    </a>
  </li>
);

SidebarLink.propTypes = {
  children: PropTypes.node.isRequired
};

const Sidebar = ({ activities, place }) => (
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
        <SidebarLink>Program Summary</SidebarLink>
        <SidebarLink>Results of Previous Activities</SidebarLink>
        <SidebarLink>Program Activities</SidebarLink>
        <ul className="mb0 ml2 list-reset">
          {activities.map((a, i) => (
            <SidebarLink key={a.id}>{activityDisplay(a, i + 1)}</SidebarLink>
          ))}
        </ul>
        <SidebarLink>Proposed Budget</SidebarLink>
        <SidebarLink>Assurances and Compliance</SidebarLink>
        <SidebarLink>Executive/Overall Summary</SidebarLink>
        <SidebarLink>Certify and Submit</SidebarLink>
      </ul>
      <div className="mt2 pt2 border-top border-white">
        <button type="button" className="btn btn-primary bg-white navy">
          Save as PDF
        </button>
      </div>
    </div>
  </div>
);

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
    <table
      className="mb2 h5 table table-condensed table-fixed"
      style={{ minWidth: 700 }}
    >
      <thead>
        <tr>
          <th className="col-1" />
          <th className="col-4" />
          <th className="col-5" />
          {activity.years.map(year => (
            <th key={year} className="col-4" colSpan="2">
              {year} Cost
            </th>
          ))}
        </tr>
        <tr>
          <th className="col-1">#</th>
          <th className="col-4">Title</th>
          <th className="col-5">Description</th>
          {activity.years.map(year => (
            <Fragment key={year}>
              <th>Amount</th>
              <th>% FTE</th>
            </Fragment>
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
              <Fragment key={year}>
                <td>
                  <input type="number" className="m0 input" />
                </td>
                <td>
                  <input type="number" className="m0 input" />
                </td>
              </Fragment>
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
    <table
      className="mb2 h5 table table-condensed table-fixed"
      style={{ minWidth: 700 }}
    >
      <thead>
        <tr>
          <th className="col-1">#</th>
          <th className="col-4">Name</th>
          <th className="col-5">Description of Services</th>
          <th className="col-4">Term (Start-End)</th>
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

const Expenses = ({ activity }) => (
  <div className="overflow-auto">
    <table
      className="mb2 h5 table table-condensed table-fixed"
      style={{ minWidth: 700 }}
    >
      <thead>
        <tr>
          <th className="col-1">#</th>
          <th className="col-6">Name</th>
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
              <select className="m0 select">
                <option>Expense A</option>
                <option>Expense B</option>
                <option>Expense C</option>
                <option>Other</option>
              </select>
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

Expenses.propTypes = {
  activity: PropTypes.object.isRequired
};

const ProgramSummary = () => (
  <Section>
    <SectionTitle>Program Summary</SectionTitle>
    <Collapsible title="HIT Narrative">
      <div>
        <label htmlFor="hit-narrative">HIT Narrative</label>
        <textarea
          className="m0 textarea col-8"
          id="hit-narrative"
          rows="5"
          spellCheck="true"
        />
      </div>
    </Collapsible>
    <Collapsible title="HIE Narrative">
      <div>
        <label htmlFor="hie-narrative">HIE Narrative</label>
        <textarea
          className="m0 textarea col-8"
          id="hie-narrative"
          rows="5"
          spellCheck="true"
        />
      </div>
    </Collapsible>
  </Section>
);

const PreviousActivities = () => (
  <Section>
    <SectionTitle>Results of Previous Activities</SectionTitle>
    <Collapsible title="Prior Activities Outline">
      <div>...</div>
    </Collapsible>
    <Collapsible title="Approved Expenses">
      <div>...</div>
    </Collapsible>
    <Collapsible title="Actual Expenses">
      <div>...</div>
    </Collapsible>
  </Section>
);

const ProgramActivities = ({
  activities,
  addActivity,
  editActivityChecks,
  editActivityText
}) => (
  <Section>
    <SectionTitle>Program Activities</SectionTitle>
    <Collapsible title="Activity List">
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
                onChange={editActivityText}
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
                    onChange={editActivityChecks}
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
        className="mt2 btn btn-primary"
        onClick={addActivity}
      >
        Add activity
      </button>
    </Collapsible>

    {activities.map((a, i) => (
      <Collapsible
        key={a.id}
        title={`Program Activities › ${activityDisplay(a, i + 1)}`}
        bgColor="darken-1"
      >
        <Collapsible title="Activity Description">
          <ActivityDescription activity={a} updateYears={editActivityChecks} />
        </Collapsible>

        <Collapsible title="Needs and Objectives">
          <FormActivityGoals form={`activity-${a.id}-goals`} />
        </Collapsible>

        <Collapsible title="Proposed Activity Schedule">
          <FormActivitySchedule form={`activity-${a.id}-schedule`} />
        </Collapsible>

        <Collapsible title="State Personnel">
          <StatePersonnel activity={a} />
        </Collapsible>

        <Collapsible title="Contractor Resources">
          <ContractorResources activity={a} />
        </Collapsible>

        <Collapsible title="Expenses">
          <Expenses activity={a} />
        </Collapsible>

        <Collapsible title="Cost Allocation and Other Funding Sources">
          <div>
            <label htmlFor={`a-${a.id}-cost-methodology`}>Methodology</label>
            <textarea
              className="m0 textarea sm-col-9"
              id={`a-${a.id}-cost-methodology`}
              rows="5"
              spellCheck="true"
            />
          </div>
          <div className="mt3 mb2 overflow-auto">
            <table className="h5 table table-fixed sm-col-9">
              <thead>
                <tr>
                  <th className="col-1">#</th>
                  <th className="col-7">Entity</th>
                  <th className="col-4">Percent of Cost</th>
                </tr>
              </thead>
              <tbody>
                {[...Array(3)].map((_, j) => (
                  <tr key={j}>
                    <td className="mono">{j + 1}.</td>
                    <td>
                      <input type="text" className="m0 input" />
                    </td>
                    <td>
                      <input type="number" className="m0 input" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Collapsible>

        <Collapsible title="Standards & Conditions">
          <p>Tell us how you’ll meet the Medicaid standards and conditions.</p>
          {STANDARDS.map(std => {
            const inputId = `a-${a.id}-standards-${std.id}`;
            return (
              <div key={std.id}>
                <h3>{std.title}</h3>
                <p>
                  Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                  accusantium doloremque laudantium, totam rem aperiam, eaque
                  ipsa quae ab illo inventore veritatis et quasi architecto...
                </p>
                <div>
                  <label htmlFor={inputId}>
                    Describe how you’ll meet this condition
                  </label>
                  <textarea
                    className="m0 textarea md-col-8"
                    id={inputId}
                    rows="3"
                    spellCheck="true"
                  />
                </div>
              </div>
            );
          })}
        </Collapsible>
      </Collapsible>
    ))}
  </Section>
);

ProgramActivities.propTypes = {
  activities: PropTypes.array.isRequired,
  addActivity: PropTypes.func.isRequired,
  editActivityChecks: PropTypes.func.isRequired,
  editActivityText: PropTypes.func.isRequired
};

const ProposedBudget = () => (
  <Section>
    <SectionTitle>Proposed Budget</SectionTitle>
    <Collapsible title="Short Activity Summary Budget">
      <div>...</div>
    </Collapsible>
    <Collapsible title="Incentive Payments by FFY Quarter">
      <div>...</div>
    </Collapsible>
  </Section>
);

const AssurancesAndCompliance = () => (
  <Section>
    <SectionTitle>Assurances and Compliance</SectionTitle>
    <Collapsible title="Procurement Standards">
      <div>...</div>
    </Collapsible>
    <Collapsible title="Access to Records">
      <div>...</div>
    </Collapsible>
    <Collapsible title="Software Rights">
      <div>...</div>
    </Collapsible>
    <Collapsible title="Security">
      <div>...</div>
    </Collapsible>
  </Section>
);

const ExecutiveSummary = () => (
  <Section>
    <SectionTitle>Executive/Overall Summary</SectionTitle>
    <Collapsible title="Executive Summary">
      <div>...</div>
    </Collapsible>
    <Collapsible title="Program Budget Table">
      <div>...</div>
    </Collapsible>
  </Section>
);

const CertifyAndSubmit = () => (
  <Section>
    <SectionTitle>Certify and Submit</SectionTitle>
    <Collapsible title="Certify and Submit">
      <div>...</div>
    </Collapsible>
  </Section>
);

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

  editActivityText = e => {
    const { name: nameRaw, value } = e.target;
    const [id, name] = nameRaw.split('.');

    this.setState(({ activities }) => ({
      activities: activities.map(
        a => (a.id === +id ? { ...a, [name]: value } : a)
      )
    }));
  };

  render() {
    const { activities, place } = this.state;

    return (
      <div className="site-body">
        <Sidebar activities={activities} place={place} />
        <div className="site-content flex flex-column">
          <TopNav place={place} />
          <div className="bg-darken-1 flex-auto">
            <ProgramSummary />
            <PreviousActivities />
            <ProgramActivities
              activities={activities}
              addActivity={this.addActivity}
              editActivityChecks={this.editActivityChecks}
              editActivityText={this.editActivityText}
            />
            <ProposedBudget />
            <AssurancesAndCompliance />
            <ExecutiveSummary />
            <CertifyAndSubmit />
          </div>
        </div>
      </div>
    );
  }
}

export default PoC;
