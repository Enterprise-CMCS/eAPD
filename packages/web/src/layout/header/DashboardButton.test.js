import { shallow } from 'enzyme';
import React from 'react';
import {
  plain as DashboardButton,
  mapDispatchToProps
} from './DashboardButton';
import { goToDashboard } from '../../actions/app';

describe('the dashboard button', () => {
  it('renders as expected', () => {
    const dashboard = jest.fn();

    expect(
      shallow(
        <DashboardButton dashboard={dashboard}>clicky clicky</DashboardButton>
      )
    ).toMatchSnapshot();
  });

  it('dispatches the dashboard action when clicked', () => {
    const dashboard = jest.fn();
    const component = shallow(
      <DashboardButton dashboard={dashboard}>clicky</DashboardButton>
    );

    component.simulate('click');

    expect(dashboard).toHaveBeenCalled();
  });

  it('maps redux actions to props', () => {
    expect(mapDispatchToProps).toEqual({ dashboard: goToDashboard });
  });
});
