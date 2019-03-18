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
      },
      {
        id: 2,
        years: [4, 5, 6]
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

  test('selects apds', () => {
    const component = shallow(<Sidebar {...props} />);
    const topItems = component.find('VerticalNav').prop('items');

    expect(Array.isArray(topItems));

    const { items } = topItems[0];
    items.forEach(item => {
      item.onClick();
      // item IDs are stringified versions of APD IDs
      expect(props.selectApd.calledWith(+item.id)).toEqual(true);
    });
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
