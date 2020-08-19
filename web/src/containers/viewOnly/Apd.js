import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from '@cmsgov/design-system-core';

import { selectApd } from '../../actions/app';
import { selectApdData } from '../../reducers/apd.selectors';
import { selectBudget } from '../../reducers/budget.selectors';
import { getAPDYearRange } from '../../reducers/apd';
import { getUserStateOrTerritory } from '../../reducers/user.selector';
import ApdStateProfile from './ApdStateProfile';
import ApdSummary from './ApdSummary';
import PreviousActivities from './PreviousActivities';
import Activities from './activities/All';
import ScheduleSummary from './ScheduleSummary';
import ProposedBudget from './ProposedBudget';
import AssuranceAndCompliance from './AssurancesAndCompliance';
import ExecutiveSummary from './ExecutiveSummary';
import ExportInstructions from './Export';

class ApdViewOnly extends Component {
  open = id => e => {
    e.preventDefault();
    this.forceUpdate();
    const { goToApd } = this.props;
    goToApd(id, '/apd');
  };

  render() {
    const { apd, budget, place, year } = this.props;

    if (!Object.keys(apd).length || budget.years.length === 0) {
      return null;
    }

    // This check is to ensure the budget has been calculated. If it hasn't, we
    // can't display everything, so just bail. This can happen very briefly
    // between the time an APD is selected and before the budget is calculated,
    // but the resulting unhandled exceptions stop the app.
    const activityKeys = apd.activities.map(({ key }) => key);
    if (
      Object.keys(budget.activities).some(key => activityKeys.indexOf(key) < 0)
    ) {
      return null;
    }

    return (
      <div
        id="start-main-content"
        className="site-body ds-l-container ds-u-padding--3"
      >
        <Button
          className="visibility--screen"
          variation="transparent"
          onClick={this.open(apd.id)}
        >
          {'< Back to APD'}
        </Button>
        <ExportInstructions />
        <h1 id="start-main-content" className="ds-h1 ds-u-margin-top--2">
          <span className="ds-h6 ds-u-display--block">{apd.name}</span>
          {place.name} {year} APD
        </h1>
        <hr className="section-rule" />
        <ExecutiveSummary />
        <hr className="section-rule" />
        <ApdStateProfile
          stateProfile={apd.stateProfile}
          keyPersonnel={apd.keyPersonnel}
        />
        <hr className="section-rule" />
        <ApdSummary />
        <hr className="section-rule" />
        <PreviousActivities />
        <hr className="section-rule" />
        <Activities activities={apd.activities} />
        <hr className="ds-u-border--dark ds-u-margin--0 ds-u-margin-top--1 ds-u-margin-bottom--1" />
        <ScheduleSummary />
        <hr className="section-rule" />
        <ProposedBudget />
        <hr className="section-rule" />
        <AssuranceAndCompliance />
        <Button
          className="visibility--screen"
          variation="transparent"
        >
          ^ Return to the top of the page
        </Button>
      </div>
    );
  }
}
ApdViewOnly.propTypes = {
  apd: PropTypes.object.isRequired,
  budget: PropTypes.object.isRequired,
  place: PropTypes.string.isRequired,
  year: PropTypes.string.isRequired,
  goToApd: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  apd: selectApdData(state),
  budget: selectBudget(state),
  place: getUserStateOrTerritory(state),
  year: getAPDYearRange(state)
});

const mapDispatchToProps = {
  goToApd: selectApd
};

export default connect(mapStateToProps, mapDispatchToProps)(ApdViewOnly);
