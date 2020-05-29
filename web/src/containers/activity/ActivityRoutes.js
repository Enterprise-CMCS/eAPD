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
import StandardsAndConditions from './StandardsAndConditions';
import { Section } from '../../components/Section';

const ActivityRoutes = ({ activityIndex }) => {
  const { path } = useRouteMatch();

  return (
    <Switch>
      <Route path={`${path}/okrs`}>
        <Section>
          <Objectives activityIndex={activityIndex} />
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
          <CostAllocate activityIndex={activityIndex} />
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

ActivityRoutes.propTypes = {
  activityIndex: PropTypes.number.isRequired
};

export default ActivityRoutes;
