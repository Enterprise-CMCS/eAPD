import { shallow } from 'enzyme';
import React from 'react';

import App from './App';
import { SidebarPure } from './Sidebar';
import PrivateRoute from '../containers/PrivateRoute';

describe('the (pure) Sidebar component', () => {
  test('Sidebar links are subset of PrivateRoutes in App', () => {
    // get url paths of private routes in App
    const appComponent = shallow(<App />);
    const appPaths = appComponent.find(PrivateRoute).map(d => d.prop('path'));

    // get url paths of links in Sidebar
    const sbComponent = shallow(<SidebarPure match={{}} />);
    const sbPaths = sbComponent.find('li').map(d => d.key());

    // check that all sidebar links exist in App
    sbPaths.forEach(path => {
      expect(appPaths).toContain(path);
    });
  });
});
