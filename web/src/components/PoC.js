import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';

import Collapsible from './Collapsible';
import TopNav from '../containers/TopNav';

const sections = [
  'Short Summary of Activity',
  'Activity Description',
  'Goals and Objectives'
];

const Sidebar = ({ activities }) => {
  const linkClass = 'inline-block white text-decoration-none truncate';

  return (
    <div className="site-sidebar bg-navy">
      <div className="p2 xs-hide sm-hide">
        <ul className="list-reset">
          <li className="mb1">
            <a href="#!" className={linkClass}>
              Program Summary
            </a>
          </li>
          <li className="mb1">
            <a href="#!" className={linkClass}>
              Program Activities
            </a>
          </li>
          <ul className="ml3 list-reset">
            {activities.map((a, i) => (
              <Fragment key={a.id}>
                <li className="mb1">
                  <a href="#!" className={linkClass}>
                    {i + 1}. {a.name || 'N/A'} ({a.type})
                  </a>
                </li>
                <ul className="ml3 list-reset">
                  {sections.map((s, j) => (
                    <li key={j} className="mb1">
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
      </div>
    </div>
  );
};

Sidebar.propTypes = {
  activities: PropTypes.array.isRequired
};

class PoC extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activities: [
        {
          id: 1,
          name: 'Test',
          type: 'HIT'
        },
        {
          id: 2,
          name: 'Test 2',
          type: 'MMIS'
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
          type: 'HIT'
        }
      ]
    }));
  };

  editActivity = e => {
    const { name: nameRaw, value } = e.target;
    const [id, name] = nameRaw.split('.');

    this.setState(({ activities }) => ({
      activities: activities.map(
        a => (a.id === +id ? { ...a, [name]: value } : a)
      )
    }));
  };

  render() {
    const { activities } = this.state;

    return (
      <div className="site-body">
        <Sidebar activities={activities} />
        <div className="site-content">
          <TopNav />
          <div className="p2 pb4 sm-p3">
            <Collapsible title="Activity List" open>
              <div className="mb2">
                {activities.map((a, i) => (
                  <div key={a.id} className="flex mb1">
                    <div className="mr1 bold mono">{i + 1}.</div>
                    <div className="mr1 col-4">
                      <input
                        type="text"
                        className="col-12"
                        name={`${a.id}.name`}
                        value={a.name}
                        onChange={this.editActivity}
                      />
                    </div>
                    <div>
                      <label>
                        <input
                          type="radio"
                          name={`${a.id}.type`}
                          value="HIT"
                          checked={a.type === 'HIT'}
                          onChange={this.editActivity}
                        />{' '}
                        HIT
                      </label>
                      <label>
                        <input
                          type="radio"
                          name={`${a.id}.type`}
                          value="HIE"
                          checked={a.type === 'HIE'}
                          onChange={this.editActivity}
                        />{' '}
                        HIE
                      </label>
                      <label>
                        <input
                          type="radio"
                          name={`${a.id}.type`}
                          value="MMIS"
                          checked={a.type === 'MMIS'}
                          onChange={this.editActivity}
                        />{' '}
                        MMIS
                      </label>
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

            {activities.map((a, i) => (
              <div key={a.id} className="mb3">
                <h3>
                  Activity {i + 1}: {a.name || 'N/A'} ({a.type})
                </h3>
                <Collapsible title="Short Summary of Activity" open>
                  <div className="mb1 bold">Summary of the activity</div>
                  <textarea
                    className="textarea col-10"
                    rows="5"
                    spellCheck="true"
                    placeholder="A brief statement of what the activity involves..."
                  />
                </Collapsible>
                <Collapsible title="Activity Description">
                  <div className="py2 h1 center">...</div>
                </Collapsible>
                <Collapsible title="Goals and Objectives">
                  <div className="py2 h1 center">...</div>
                </Collapsible>
                <Collapsible title="Alternative Analysis">
                  <div className="py2 h1 center">...</div>
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
