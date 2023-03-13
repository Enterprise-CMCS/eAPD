import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Button } from '@cmsgov/design-system';
import {
  useParams as actualUseParams,
  useHistory as actualUseHistory
} from 'react-router-dom';

import { selectApd } from '../../redux/actions/app';
import {
  selectApdData,
  selectApdType
} from '../../redux/selectors/apd.selectors';
import { selectBudget } from '../../redux/selectors/budget.selectors';
import { getAPDYearRange } from '../../redux/reducers/apd';
import { getUserStateOrTerritory } from '../../redux/selectors/user.selector';

import Loading from '../../components/Loading';

import Activities from './activities/activities-dashboard/ActivitiesDashboardReadOnly';
import ApdStateProfile from './key-state-personnel/KeyStatePersonnelReadOnly';
import AssuranceAndCompliance from './assurances-and-compliance/AssurancesAndComplianceReadOnly';
import ExecutiveSummary from './executive-summary/ExecutiveSummaryReadOnly';
import ExportInstructions from './export/ExportReadOnly';
import HitechSummary from './export/ReadOnlyHitech';
import MmisSummary from './export/ReadOnlyMmis';
import PreviousActivities from './previous-activities/PreviousActivitiesReadOnly';
import ProposedBudget from './proposed-budget/ProposedBudgetReadOnly';
import ScheduleSummary from './schedule-summary/ScheduleSummaryReadOnly';
import { APD_TYPE } from '@cms-eapd/common';

const ApdViewOnly = ({
  apd,
  budget,
  place,
  year,
  apdType,
  goToApd,
  useParams,
  useHistory
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const apdId = apd.id || null;
  const { apdId: paramApdId } = useParams();
  const history = useHistory();

  useEffect(
    () => {
      if (!paramApdId && !apdId) {
        history.push('/');
      } else if (apdId && !paramApdId) {
        history.push(`/print/${apdId}`);
      } else if (paramApdId && (!apdId || apdId !== paramApdId)) {
        setIsLoading(true);
        goToApd(paramApdId, `/print/${paramApdId}`);
      } else {
        setIsLoading(false);
      }
    },
    // we want this to run on load so we don't need any thing
    // in the dependency array
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  useEffect(() => {
    if (apdId) {
      setIsLoading(false);
    }
  }, [apdId]);

  if (isLoading || !apdId) {
    return (
      <div id="start-main-content">
        <Loading>Loading your APD</Loading>
      </div>
    );
  }

  if (!Object.keys(apd).length || budget.years.length === 0) {
    return null;
  }

  // This check is to ensure the budget has been calculated. If it hasn't, we
  // can't display everything, so just bail. This can happen very briefly
  // between the time an APD is selected and before the budget is calculated,
  // but the resulting unhandled exceptions stop the app.
  const activityIds = apd.activities.map(({ activityId }) => activityId);
  if (
    Object.keys(budget.activities).some(
      activityId => activityIds.indexOf(activityId) < 0
    )
  ) {
    return null;
  }

  function renderApdTypeSpecificSummary(apdType) {
    switch (apdType) {
      case APD_TYPE.HITECH:
        return <HitechSummary />;
      case APD_TYPE.MMIS:
        return <MmisSummary />;
      default:
        return null;
    }
  }

  return (
    <main id="start-main-content" className="ds-l-container ds-u-padding--3">
      <div className="anchor" id="top-anchor">
        <Button
          className="visibility--screen"
          variation="transparent"
          onClick={() => history.push(`/apd/${paramApdId}`)}
        >
          {'< Back to APD'}
        </Button>
      </div>
      <ExportInstructions />
      <h1 className="ds-h1 ds-u-margin-top--2">
        {place.name} {year} APD
        <span className="ds-h6 ds-u-font-size--lg ds-u-display--block ds-u-margin-top--2">
          {apd.name}
        </span>
      </h1>
      <HitechSummary />
      <hr className="section-rule ds-u-margin-bottom--3" />
      <ExecutiveSummary apdId={apd.id} />
      <hr className="section-rule ds-u-margin-y--5" />
      {renderApdTypeSpecificSummary(apdType)}
      <hr className="section-rule" />
      <ApdStateProfile
        keyStatePersonnel={apd.keyStatePersonnel}
        apdType={apd.apdType}
      />
      {/* <hr className="section-rule" />
      <PreviousActivities /> */}
      {/* <hr className="section-rule" />
      <Activities
        apdId={apd.id}
        activities={apd.activities}
        years={budget.years}
        apdType={apdType}
      /> */}
      {/* <hr className="ds-u-border--dark ds-u-margin--0 ds-u-margin-top--1 ds-u-margin-bottom--1" />
      <ScheduleSummary /> */}
      {/* <hr className="section-rule" />
      <ProposedBudget /> */}
      {/* <hr className="section-rule" />
      <AssuranceAndCompliance /> */}
      <a href="#top-anchor" className="visibility--screen">
        ^ Return to the top of the page
      </a>
    </main>
  );
};

ApdViewOnly.propTypes = {
  apd: PropTypes.object.isRequired,
  budget: PropTypes.object.isRequired,
  place: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  year: PropTypes.string.isRequired,
  apdType: PropTypes.string.isRequired,
  goToApd: PropTypes.func.isRequired,
  useParams: PropTypes.func,
  useHistory: PropTypes.func
};

ApdViewOnly.defaultProps = {
  useParams: actualUseParams,
  useHistory: actualUseHistory
};

const mapStateToProps = state => ({
  apd: selectApdData(state),
  budget: selectBudget(state),
  place: getUserStateOrTerritory(state),
  year: getAPDYearRange(state),
  apdType: selectApdType(state)
});

const mapDispatchToProps = {
  goToApd: selectApd
};

export default connect(mapStateToProps, mapDispatchToProps)(ApdViewOnly);
