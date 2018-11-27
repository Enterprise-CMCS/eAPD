import { shallow } from 'enzyme';
import React from 'react';
import sinon from 'sinon';

import {
  plain as Sidebar,
  mapStateToProps,
  mapDispatchToProps
} from './StateDashboardSidebar';
import { selectApd } from '../actions/apd';

describe('State dashboard sidebar component', () => {
  const sandbox = sinon.createSandbox();

  const props = {
    apds: [
      {
        id: 1,
        years: [1, 2, 3]
      }
    ],
    place: { id: 'so', name: 'Solid' },
    selectApd: sandbox.spy()
  };

  beforeEach(() => {
    sandbox.resetHistory();
  });

  test('renders correctly', () => {
    const component = shallow(<Sidebar {...props} />);
    expect(component).toMatchSnapshot();
  });

  test('selects an apd', () => {
    const component = shallow(<Sidebar {...props} />);
    component.find('SidebarLink[hash="1"]').simulate('click');
    expect(props.selectApd.calledWith(1)).toBeTruthy();
  });

  test('maps state to props', () => {
    const state = {
      apd: {
        byId: {
          id1: 'alice',
          id2: 'bob'
        }
      },
      user: {
        data: {
          state: 'a way of being'
        }
      }
    };

    expect(mapStateToProps(state)).toEqual({
      apds: ['alice', 'bob'],
      place: 'a way of being'
    });
  });

  test('maps dispatch to props', () => {
    expect(mapDispatchToProps).toEqual({ selectApd });
  });
});
