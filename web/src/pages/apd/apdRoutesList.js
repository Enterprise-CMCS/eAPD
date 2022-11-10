import React from 'react';

import Activities from './activities/activities-dashboard/ActivitiesDashboard';
import AssurancesAndCompliance from './assurances-and-compliance/AssurancesAndCompliance';
import StatePrioritiesAndScope from './state-priorities-and-scope/StatePrioritiesAndScope';
import Export from './export/ApdExport';
import ApdOverview from './apd-overview/ApdOverview';
import ExecutiveSummary from './executive-summary/ExecutiveSummary';
import PreviousActivities from './previous-activities/PreviousActivities';
import ProposedBudget from './proposed-budget/ProposedBudget';
import ScheduleSummary from './schedule-summary/ScheduleSummary';
import KeyStatePersonnel from './key-state-personnel/KeyStatePersonnel';

const apdOverview = {
  path: '/apd/:apdId/apd-overview',
  children: <ApdOverview />,
  isPublic: false,
  contentType: 'form',
  siteSection: 'APD',
  pageName: 'Overview'
};

const statePrioritiesAndScope = {
  path: '/apd/:apdId/state-priorities-and-scope',
  children: <StatePrioritiesAndScope />,
  isPublic: false,
  contentType: 'form',
  siteSection: 'APD',
  pageName: 'State Priorities and Scope of APD'
};

const keyStatePersonnel = {
  path: '/apd/:apdId/state-profile',
  children: <KeyStatePersonnel />,
  isPublic: false,
  contentType: 'form',
  siteSection: 'APD',
  pageName: 'Key State Personnel'
};

const previousActivities = {
  path: '/apd/:apdId/previous-activities',
  children: <PreviousActivities />,
  isPublic: false,
  contentType: 'report',
  siteSection: 'APD',
  pageName: 'Previous Activities'
};

const activitiesDashboard = {
  path: '/apd/:apdId/activities',
  children: <Activities />,
  isPublic: false,
  contentType: 'form',
  siteSection: 'APD',
  pageName: 'Activities Dashboard'
};

const schedule = {
  path: '/apd/:apdId/schedule-summary',
  children: <ScheduleSummary />,
  isPublic: false,
  contentType: 'report',
  siteSection: 'APD',
  pageName: 'Schedule Summary'
};

const proposedBudget = {
  path: '/apd/:apdId/proposed-budget',
  children: <ProposedBudget />,
  isPublic: false,
  contentType: 'report',
  siteSection: 'APD',
  pageName: 'Proposed Budget'
};

const assurancesAndCompliance = {
  path: '/apd/:apdId/assurances-and-compliance',
  children: <AssurancesAndCompliance />,
  isPublic: false,
  contentType: 'form',
  siteSection: 'APD',
  pageName: 'Assurances and Compliance'
};

const executiveSummary = {
  path: '/apd/:apdId/executive-summary',
  children: <ExecutiveSummary />,
  isPublic: false,
  contentType: 'report',
  siteSection: 'APD',
  pageName: 'Executive Summary'
};

const exportApd = {
  path: '/apd/:apdId/export',
  children: <Export />,
  isPublic: false,
  contentType: 'report',
  siteSection: 'APD',
  pageName: 'Export'
};

const routes = [
  apdOverview,
  statePrioritiesAndScope,
  keyStatePersonnel,
  previousActivities,
  activitiesDashboard,
  schedule,
  proposedBudget,
  assurancesAndCompliance,
  executiveSummary,
  exportApd
];

export default routes;
