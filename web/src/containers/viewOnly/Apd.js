import PropTypes from "prop-types";
import React, { Component } from "react";
import { connect } from "react-redux";

import { selectApd } from "../../actions/app";
import { selectApdData } from "../../reducers/apd.selectors";
import { selectBudget } from "../../reducers/budget.selectors.js";
import { getAPDYearRange } from "../../reducers/apd";
import { getUserStateOrTerritory } from "../../reducers/user.selector";
import ApdStateProfile from "./ApdStateProfile";
import ApdSummary from "./ApdSummary";
import PreviousActivities from "./PreviousActivities";
import Activities from "./activities/All.js";
import ScheduleSummary from "./ScheduleSummary";
import ProposedBudget from "./ProposedBudget";
import AssuranceAndCompliance from "./AssurancesAndCompliance";
import ExecutiveSummary from "./ExecutiveSummary";

class ApdViewOnly extends Component {
  constructor(props) {
    super(props);
    this.props.selectApd(5, "/print");
  }

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
        <h1 id="start-main-content" className="ds-h1 apd--title">
          <span className="ds-h6 ds-u-display--block">{apd.name}</span>
          {place.name} {year} APD
        </h1>
        <ApdStateProfile
          stateProfile={apd.stateProfile}
          keyPersonnel={apd.keyPersonnel}
        />
        <ApdSummary />
        <PreviousActivities />
        <Activities activities={apd.activities} />
        <ScheduleSummary />
        <ProposedBudget />
        <AssuranceAndCompliance />
        <ExecutiveSummary />
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
