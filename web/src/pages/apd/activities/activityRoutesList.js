import React from 'react';

import AlternativesAndRisks from './alternatives-and-risks/AlternativesAndRisks';
import ContractorResources from './contractor-costs/ContractorResources';
import ConditionsForAdvancedFunding from './conditions/ConditionsForAdvancedFunding';
import CostAllocation from './cost-allocation/CostAllocation';
import FFP from './ffp/CostAllocateFFP';
import Costs from './state-costs/Costs';
import Milestones from './schedule-and-milestones/Milestones';
import Overview from './overview/Overview';
import Outcomes from './oms/Outcomes';
import StandardsAndConditions from './overview/StandardsAndConditions';
import Schedule from './schedule-and-milestones/Schedule';
import { Section } from '../../../components/Section';

const routes = activityIndex => [
  {
    path: '/apd/:apdId/activity/:activityIndex/oms',
    children: (
      <Section>
        <Outcomes activityIndex={activityIndex} />
      </Section>
    ),
    isPublic: false,
    contentType: 'form',
    siteSection: 'APD - Activity',
    pageName: 'Outcomes and Metrics'
  },
  {
    path: '/apd/:apdId/activity/:activityIndex/conditions',
    children: (
      <Section>
        <ConditionsForAdvancedFunding activityIndex={activityIndex} />
      </Section>
    ),
    isPublic: false,
    contentType: 'form',
    siteSection: 'APD - Activity',
    pageName: 'Conditions For Advanced Funding'
  },
  {
    path: '/apd/:apdId/activity/:activityIndex/state-costs',
    children: (
      <Section>
        <Costs activityIndex={activityIndex} />
      </Section>
    ),
    isPublic: false,
    contentType: 'form',
    siteSection: 'APD - Activity',
    pageName: 'State Staff and Expenses'
  },
  {
    path: '/apd/:apdId/activity/:activityIndex/contractor-costs',
    children: (
      <Section>
        <ContractorResources activityIndex={activityIndex} />
      </Section>
    ),
    isPublic: false,
    contentType: 'form',
    siteSection: 'APD - Activity',
    pageName: 'Private Contractor Costs'
  },
  {
    path: '/apd/:apdId/activity/:activityIndex/cost-allocation',
    children: (
      <Section>
        <CostAllocation activityIndex={activityIndex} />
      </Section>
    ),
    isPublic: false,
    contentType: 'form',
    siteSection: 'APD - Activity',
    pageName: 'Cost Allocation and Other Funding'
  },
  {
    path: '/apd/:apdId/activity/:activityIndex/ffp',
    children: (
      <Section>
        <FFP activityIndex={activityIndex} />
      </Section>
    ),
    isPublic: false,
    contentType: 'form',
    siteSection: 'APD - Activity',
    pageName: 'Budget and FFP'
  },
  {
    path: '/apd/:apdId/activity/:activityIndex/schedule-and-milestones',
    children: (
      <Section>
        <Schedule activityIndex={activityIndex} />
        <Milestones activityIndex={activityIndex} />
      </Section>
    ),
    isPublic: false,
    contentType: 'form',
    siteSection: 'APD - Activity',
    pageName: 'Activity Schedule and Milestones'
  },
  {
    path: '/apd/:apdId/activity/:activityIndex/alternatives-and-risks',
    children: (
      <Section>
        <AlternativesAndRisks activityIndex={activityIndex} />
      </Section>
    ),
    isPublic: false,
    contentType: 'form',
    siteSection: 'APD - Activity',
    pageName: 'Analysis of Alternatives and Risks'
  },
  {
    path: '/apd/:apdId/activity/:activityIndex/overview',
    children: (
      <Section>
        <Overview activityIndex={activityIndex} />
        <StandardsAndConditions activityIndex={activityIndex} />
      </Section>
    ),
    isPublic: false,
    contentType: 'form',
    siteSection: 'APD - Activity',
    pageName: 'Overview'
  }
];

export default routes;
