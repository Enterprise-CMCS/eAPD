import { shallow } from 'enzyme';
import React from 'react';
import sinon from 'sinon';

import {
  plain as Sidebar,
  mapStateToProps,
  mapDispatchToProps
} from './Sidebar';
import { jumpTo } from '../actions/navigation';

describe('Sidebar component', () => {
  const props = {
    activities: [
      { anchor: '#key1', key: 'key 1' },
      { anchor: '#key2', key: 'key 2' }
    ],
    activeSection: 'some section',
    jumpTo: sinon.spy(),
    place: { id: 'place id', name: 'place name' },
    printApd: sinon.spy(),
    saveApdToAPI: sinon.spy()
  };

  test('renders correctly', () => {
    expect(shallow(<Sidebar {...props} />)).toMatchSnapshot();
  });

  test('maps state to props', () => {
    const state = {
      activities: {
        byKey: { key1: { name: 'activity 1' }, key2: { name: 'activity 2' } },
        allKeys: ['key1', 'key2']
      },
      navigation: {
        activeSection: 'where the runners are'
      }
    };

    expect(mapStateToProps(state)).toEqual({
      activities: [
        {
          key: 'key1',
          anchor: 'activity-key1',
          name: 'activity 1'
        },
        {
          key: 'key2',
          anchor: 'activity-key2',
          name: 'activity 2'
        }
      ],
      activeSection: 'where the runners are'
    });
  });

  test('maps dispatch to props', () => {
    expect(mapDispatchToProps).toEqual({
      jumpTo
    });
  });
});
