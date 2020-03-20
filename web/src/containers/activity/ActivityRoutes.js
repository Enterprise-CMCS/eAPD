import PropTypes from 'prop-types';
import React from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';

import ContractorResources from './ContractorResources';
import CostAllocate from './CostAllocate';
import FFP from './CostAllocateFFP';
import Costs from './Costs';
import Milestones from './Milestones';
import Overview from './Overview';
import Objectives from './Objectives';
import Schedule from './Schedule';
import StandardsAndConditions from './StandardsAndConditions';

const ActivityRoutes = ({ activityIndex }) => {
  const { path } = useRouteMatch();

  return (
    <Switch>
      <Route path={`${path}/overview`}>
        <Overview activityIndex={activityIndex} />
        <StandardsAndConditions activityIndex={activityIndex} />
      </Route>
      <Route path={`${path}/okrs`}>
        <Objectives activityIndex={activityIndex} />
        <Schedule activityIndex={activityIndex} />
        <Milestones activityIndex={activityIndex} />
      </Route>
      <Route path={`${path}/state-costs`}>
        <Costs activityIndex={activityIndex} />
      </Route>
      <Route path={`${path}/contractor-costs`}>
        <ContractorResources activityIndex={activityIndex} />
      </Route>
      <Route path={`${path}/cost-allocation`}>
        <CostAllocate activityIndex={activityIndex} />
      </Route>
      <Route path={`${path}/ffp`}>
        <FFP activityIndex={activityIndex} />
      </Route>
      <Route>
        <Overview activityIndex={activityIndex} />
        <StandardsAndConditions activityIndex={activityIndex} />
      </Route>
    </Switch>
  );
};

ActivityRoutes.propTypes = {
  activityIndex: PropTypes.number.isRequired
};

export default ActivityRoutes;
