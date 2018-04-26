import React, { Component } from 'react';

import AssurancesAndCompliance from './AssurancesAndCompliance';
import CertifyAndSubmit from './CertifyAndSubmit';
import ExecutiveSummary from './ExecutiveSummary';
import PreviousActivities from './PreviousActivities';
import ProgramSummary from './ProgramSummary';
import ProposedBudget from './ProposedBudget';
import Sidebar from './Sidebar';
import TopNav from './TopNav';
import Activities from '../containers/Activities';
import { getParams, stateLookup } from '../util';

class PoC extends Component {
  constructor(props) {
    super(props);

    const fallback = 'ca';
    const { state: stateId } = getParams(window.location.hash);
    const place = stateLookup(stateId || fallback) || stateLookup(fallback);
    const years = ['2018', '2019'];

    this.state = { place, years };
  }

  editYears = (val, currVals) => () => {
    const years = currVals.includes(val)
      ? currVals.filter(v => v !== val)
      : [...currVals, val].sort();

    this.setState({ years });
  };

  render() {
    const { place, years } = this.state;

    return (
      <div className="site-body">
        <Sidebar activities={[]} place={place} />
        <div className="site-content flex flex-column">
          <TopNav place={place} />
          <div className="bg-darken-1 flex-auto">
            <ProgramSummary selectedYears={years} editYears={this.editYears} />
            <PreviousActivities />
            <Activities />
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
