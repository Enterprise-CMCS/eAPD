import React from 'react';

import AlternativesAndRisks from './alternatives-and-risks/AlternativesAndRisks';
import ContractorResources from './contractor-costs/ContractorResources';
import CostAllocation from './cost-allocation/CostAllocation';
import FFP from './ffp/CostAllocateFFP';
import Costs from './state-costs/Costs';
import Milestones from './oms/Milestones';
import Overview from './overview/Overview';
import Outcomes from './oms/Outcomes';
import StandardsAndConditions from './overview/StandardsAndConditions';
import { Section } from '../../../components/Section';

const routes = activityIndex => [
  {
    path: '/apd/:apdId/activity/:activityIndex/oms',
    children: (
      <Section>
        <Outcomes activityIndex={activityIndex} />
        <Milestones activityIndex={activityIndex} />
      </Section>
    ),
    isPublic: false,
    contentType: 'form',
    siteSection: 'APD - Activity',
    pageName: 'Outcomes and Metrics'
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
