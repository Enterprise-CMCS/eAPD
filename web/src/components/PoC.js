import React, { Component } from 'react';

import AssurancesAndCompliance from './v2/AssurancesAndCompliance';
import CertifyAndSubmit from './v2/CertifyAndSubmit';
import ExecutiveSummary from './v2/ExecutiveSummary';
import PreviousActivities from './v2/PreviousActivities';
import Activities from './v2/Activities';
import ProgramSummary from './v2/ProgramSummary';
import ProposedBudget from './v2/ProposedBudget';
import Sidebar from './v2/Sidebar';
import TopNav from './v2/TopNav';
import { getParams, stateLookup } from '../util';

class PoC extends Component {
  constructor(props) {
    super(props);

    const fallback = 'ca';
    const { state: stateId } = getParams(window.location.hash);
    const place = stateLookup(stateId || fallback) || stateLookup(fallback);

    this.state = {
      place,
      apdYears: ['2018', '2019'],
      activities: [
        {
          id: 1,
          name: 'Test',
          type: ['HIT']
        },
        {
          id: 2,
          name: 'Test 2',
          type: ['MMIS']
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
          type: ['HIT']
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

  editYears = (val, currVals) => () => {
    const apdYears = currVals.includes(val)
      ? currVals.filter(v => v !== val)
      : [...currVals, val].sort();

    this.setState({ apdYears });
  };

  render() {
    const { activities, apdYears, place } = this.state;
    const activitiesEnriched = activities.map(a => ({ ...a, years: apdYears }));

    return (
      <div className="site-body">
        <Sidebar activities={activities} place={place} />
        <div className="site-content flex flex-column">
          <TopNav place={place} />
          <div className="bg-darken-1 flex-auto">
            <ProgramSummary
              selectedYears={apdYears}
              editYears={this.editYears}
            />
            <PreviousActivities />
            <Activities
              activities={activitiesEnriched}
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
