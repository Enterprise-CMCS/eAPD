import React, { Component } from 'react';
import { connect } from 'react-redux';

import { selectApd } from '../../actions/app';
import { selectApdData } from '../../reducers/apd.selectors';
import { selectBudget } from '../../reducers/budget.selectors.js';
import { getAPDYearRange } from '../../reducers/apd';
import { getUserStateOrTerritory } from '../../reducers/user.selector';
import ApdStateProfile from './ApdStateProfile';
import ApdSummary from './ApdSummary';
import PreviousActivities from './PreviousActivities';
import Activities from './activities/All.js';
import ScheduleSummary from './ScheduleSummary';
import ProposedBudget from './ProposedBudget';
import AssuranceAndCompliance from './AssurancesAndCompliance';
import ExecutiveSummary from './ExecutiveSummary';
import ExportInstructions from './Export';

class ApdViewOnly extends Component {
  componentDidMount = () => window.scrollTo(0, 0);

  componentDidUpdate = () => window.scrollTo(0, 0);

  render() {
    const { apd, budget, place, year } = this.props;

    if (!Object.keys(apd).length || budget.years.length === 0) {
      return null;
    }

    const activityKeys = apd.activities.map(({ key }) => key);
    if (
      Object.keys(budget.activities).some(key => activityKeys.indexOf(key) < 0)
    ) {
      return null;
    }

    return (
      <div className="site-body ds-l-container">
        <h1 id="start-main-content" className="ds-h1 ds-u-margin-top--2">
          <span className="ds-h6 ds-u-display--block">{apd.name}</span>
          {place.name} {year} APD
        </h1>
        <ExecutiveSummary />
        <hr className="ds-u-border--dark ds-u-margin--0 ds-u-margin-top--1 ds-u-margin-bottom--1" />
        <hr className="ds-u-border--dark ds-u-margin--0" />
        <ApdStateProfile
          stateProfile={apd.stateProfile}
          keyPersonnel={apd.keyPersonnel}
        />
        <hr className="ds-u-border--dark ds-u-margin--0 ds-u-margin-top--1 ds-u-margin-bottom--1" />
        <hr className="ds-u-border--dark ds-u-margin--0" />
        <ApdSummary />
        <hr className="ds-u-border--dark ds-u-margin--0 ds-u-margin-top--1 ds-u-margin-bottom--1" />
        <hr className="ds-u-border--dark ds-u-margin--0" />
        <PreviousActivities />
        <hr className="ds-u-border--dark ds-u-margin--0 ds-u-margin-top--1 ds-u-margin-bottom--1" />
        <hr className="ds-u-border--dark ds-u-margin--0" />
        <Activities activities={apd.activities} />
        <hr className="ds-u-border--dark ds-u-margin--0 ds-u-margin-top--1 ds-u-margin-bottom--1" />
        <ScheduleSummary />
        <hr className="ds-u-border--dark ds-u-margin--0 ds-u-margin-top--1 ds-u-margin-bottom--1" />
        <hr className="ds-u-border--dark ds-u-margin--0" />
        <ProposedBudget />
        <hr className="ds-u-border--dark ds-u-margin--0 ds-u-margin-top--1 ds-u-margin-bottom--1" />
        <hr className="ds-u-border--dark ds-u-margin--0" />
        <AssuranceAndCompliance />
        <ExportInstructions />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  apd: selectApdData(state),
  budget: selectBudget(state),
  place: getUserStateOrTerritory(state),
  year: getAPDYearRange(state)
});

const mapDispatchToProps = { selectApd };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ApdViewOnly);
