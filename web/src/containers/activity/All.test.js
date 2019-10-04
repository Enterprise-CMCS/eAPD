import { shallow } from 'enzyme';
import React from 'react';

import { addActivity, removeActivity } from '../../actions/editActivity';

import {
  plain as Activities,
  mapStateToProps,
  mapDispatchToProps
} from './All';

describe('the Activities component', () => {
  const props = {
    add: jest.fn(),
    first: { first: 'activity' },
    keys: ['key1', 'key2', 'key3'],
    other: [{ second: 'activity' }, { third: 'activity' }],
    remove: jest.fn()
  };

  beforeEach(() => {
    props.add.mockClear();
    props.remove.mockClear();
  });

  test('renders correctly', () => {
    const component = shallow(<Activities {...props} />);
    expect(component).toMatchSnapshot();
  });

  test('maps state to props', () => {
    const state = {
      apd: {
        data: {
          activities: [{ key: 'key1' }, { key: 'key2' }, { key: 'key3' }]
        }
      }
    };

    expect(mapStateToProps(state)).toEqual({
      first: { key: 'key1' },
      keys: ['key1', 'key2', 'key3'],
      other: [{ key: 'key2' }, { key: 'key3' }]
    });
  });

  test('maps dispatch to props', () => {
    expect(mapDispatchToProps).toEqual({
      add: addActivity,
      remove: removeActivity
    });
  });
});
