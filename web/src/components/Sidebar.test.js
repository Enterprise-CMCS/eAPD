import { shallow } from 'enzyme';
import React from 'react';

import Routes from './Routes';
import { SidebarPure } from './Sidebar';
import PrivateRoute from '../containers/PrivateRoute';

describe('the (pure) Sidebar component', () => {
  test('Sidebar links are subset of all PrivateRoutes', () => {
    // get url paths of private routes in Routes
    const routesComponent = shallow(<Routes />);
    const paths = routesComponent.find(PrivateRoute).map(d => d.prop('path'));

    // get url paths of links in Sidebar
    const sbComponent = shallow(<SidebarPure match={{}} />);
    const sbPaths = sbComponent.find('li').map(d => d.key());

    // check that all sidebar links exist in App
    sbPaths.forEach(path => {
      expect(paths).toContain(path);
    });
  });
});
