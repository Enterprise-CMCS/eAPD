import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Switch, Route, useRouteMatch } from 'react-router-dom';

import Activities from './activity/All';
import AssurancesAndCompliance from './AssurancesAndCompliance';
import Export from './ApdExport';
import ApdSummary from './ApdSummary';
import ExecutiveSummary from './ExecutiveSummary';
import PreviousActivities from './PreviousActivities';
import ProposedBudget from './ProposedBudget';
import SaveButton from './SaveButton';
import ScheduleSummary from './ScheduleSummary';
import Sidebar from './Sidebar';
import { setApdToSelectOnLoad } from '../actions/app';
import StateProfile from '../components/ApdStateProfile';
import EntryPage from './activity/EntryPage';

import {
  getAPDCreation,
  getAPDName,
  getAPDYearRange,
  getIsAnAPDSelected
} from '../reducers/apd';

import { getIsAdmin, getUserStateOrTerritory } from '../reducers/user.selector';

const ApdApplication = ({
  apdCreated,
  apdName,
  apdSelected,
  isAdmin,
  place,
  setApdToSelectOnLoad: dispatchSelectApdOnLoad,
  year
}) => {
  if (isAdmin) {
    return <Redirect to="/" />;
  }

  if (!apdSelected) {
    dispatchSelectApdOnLoad('/apd');
    return <Redirect to="/" />;
  }

  const { path } = useRouteMatch();

  return (
    <div className="site-body ds-l-container">
      <div className="ds-u-margin--0">
        <Sidebar place={place} />
        <div className="site-main ds-u-padding-top--2">
          <Switch>
            <Route exact path={path}>
              <h1 id="start-main-content" className="ds-h1 apd--title">
                <span className="ds-h6 ds-u-display--block">
                  <strong>Created:</strong> {apdCreated}
                </span>
                {apdName} | FFY {year}
              </h1>
              <StateProfile />
              <ApdSummary />
              <PreviousActivities />
              <Activities />
              <ScheduleSummary />
              <ProposedBudget />
              <AssurancesAndCompliance />
              <ExecutiveSummary />
              <Export />
            </Route>
            <Route path={`${path}/activity/:activityIndex`}>
              <EntryPage />
            </Route>
          </Switch>
        </div>
      </div>

      <SaveButton />
    </div>
  );
};

ApdApplication.propTypes = {
  apdCreated: PropTypes.string.isRequired,
  apdName: PropTypes.string,
  apdSelected: PropTypes.bool.isRequired,
  isAdmin: PropTypes.bool.isRequired,
  place: PropTypes.object.isRequired,
  setApdToSelectOnLoad: PropTypes.func.isRequired,
  year: PropTypes.string.isRequired
};

ApdApplication.defaultProps = { apdName: '' };

const mapStateToProps = state => ({
  apdCreated: getAPDCreation(state),
  apdName: getAPDName(state),
  apdSelected: getIsAnAPDSelected(state),
  isAdmin: getIsAdmin(state),
  place: getUserStateOrTerritory(state),
  year: getAPDYearRange(state)
});

const mapDispatchToProps = { setApdToSelectOnLoad };

export default connect(mapStateToProps, mapDispatchToProps)(ApdApplication);

export { ApdApplication as plain, mapStateToProps, mapDispatchToProps };
