import PropTypes from 'prop-types';
import React from 'react';
import {
  Switch,
  Route,
  useRouteMatch as actualUseRouteMatch
} from 'react-router-dom';

import ContractorResources from './ContractorResources';
import CostAllocation from './CostAllocation';
import FFP from './CostAllocateFFP';
import Costs from './Costs';
import Milestones from './Milestones';
import Overview from './Overview';
import Outcomes from './Outcomes';
import StandardsAndConditions from './StandardsAndConditions';
import { Section } from '../../components/Section';

const ActivityRoutes = ({ activityIndex, useRouteMatch }) => {
  const { path } = useRouteMatch();

  return (
    <Switch>
      <Route path={`${path}/oms`}>
        <Section>
          <Outcomes activityIndex={activityIndex} />
          <Milestones activityIndex={activityIndex} />
        </Section>
      </Route>
      <Route path={`${path}/state-costs`}>
        <Section>
          <Costs activityIndex={activityIndex} />
        </Section>
      </Route>
      <Route path={`${path}/contractor-costs`}>
        <Section>
          <ContractorResources activityIndex={activityIndex} />
        </Section>
      </Route>
      <Route path={`${path}/cost-allocation`}>
        <Section>
          <CostAllocation activityIndex={activityIndex} />
        </Section>
      </Route>
      <Route path={`${path}/ffp`}>
        <Section>
          <FFP activityIndex={activityIndex} />
        </Section>
      </Route>
      <Route>
        <Section>
          <Overview activityIndex={activityIndex} />
          <StandardsAndConditions activityIndex={activityIndex} />
        </Section>
      </Route>
    </Switch>
  );
};

ActivityRoutes.defaultProps = {
  useRouteMatch: actualUseRouteMatch
};

ActivityRoutes.propTypes = {
  activityIndex: PropTypes.number.isRequired,
  useRouteMatch: PropTypes.func
};

export default ActivityRoutes;
