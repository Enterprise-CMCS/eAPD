import React from 'react';

import ApdNew from './apd/new/ApdNew';
import NoMatch from '../components/NoMatch';
import Dashboard from './dashboard/Dashboard';
import ApdApplication from '../containers/ApdApplication';
import ApdViewOnly from './apd/ApdReadOnly';
import LoginApplication from '../containers/LoginApplication';
import ManageAccount from './admin/state-admin/ManageAccount';
import StateAdmin from './admin/state-admin/StateAdmin';
import DelegateStateAdminForm from './admin/fed-admin/DelegateStateAdminForm';
import SelectAffiliation from './login/SelectAffiliation';
import Logout from './login/Logout';

const routes = [
  {
    path: '/',
    children: <Dashboard />,
    exact: true,
    isPublic: false,
    contentType: 'apd',
    siteSection: 'State',
    pageName: 'Dashboard'
  },
  {
    path: '/apd/new',
    children: <ApdNew />,
    isPublic: false,
    contentType: 'form',
    siteSection: 'APD',
    pageName: 'New Apd'
  },
  {
    path: '/apd/:apdId',
    children: <ApdApplication />,
    exact: false,
    isPublic: false,
    contentType: 'form',
    siteSection: 'APD',
    pageName: 'Overview'
  },
  {
    path: '/print/:apdId',
    children: <ApdViewOnly />,
    exact: true,
    isPublic: false,
    contentType: 'user',
    siteSection: 'APD',
    pageName: 'Export'
  },
  {
    path: '/login',
    children: <LoginApplication />,
    isPublic: true,
    isCard: true,
    contentType: 'user',
    siteSection: 'Login',
    pageName: 'Login'
  },
  {
    path: '/logout',
    children: <Logout />,
    isPublic: true,
    contentType: 'user',
    siteSection: 'Log Out',
    pageName: 'Log Out'
  },
  {
    path: '/manage-account',
    children: <ManageAccount />,
    isPublic: false,
    contentType: 'admin',
    siteSection: 'Federal',
    pageName: 'Dashboard'
  },
  {
    path: '/select-affiliation',
    children: <SelectAffiliation />,
    isPublic: false,
    contentType: 'user',
    siteSection: 'Login',
    pageName: 'Select Affiliation'
  },
  {
    path: '/state-admin',
    children: <StateAdmin />,
    isPublic: false,
    contentType: 'admin',
    siteSection: 'State',
    pageName: 'Administration Dashboard'
  },
  {
    path: '/delegate-state-admin',
    children: <DelegateStateAdminForm />,
    isAdmin: true,
    isPublic: false,
    contentType: 'admin',
    siteSection: 'Federal',
    pageName: 'Delegate State Admin'
  },
  {
    children: <NoMatch />,
    isPublic: true,
    contentType: '404',
    siteSection: 'Error',
    pageName: '404'
  }
];

export default routes;
