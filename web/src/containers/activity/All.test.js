import { shallow } from 'enzyme';
import React from 'react';

import { addActivity } from '../../actions/editActivity';

import {
  plain as Activities,
  mapStateToProps,
  mapDispatchToProps
} from './All';

describe('the Activities component', () => {
  const props = {
    add: jest.fn(),
    activities: [
      { key: 'key1', first: 'activity' },
      { key: 'key2', second: 'activity' },
      { key: 'key3', third: 'activity' }
    ]
  };

  beforeEach(() => {
    props.add.mockClear();
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
      activities: [{ key: 'key1' }, { key: 'key2' }, { key: 'key3' }]
    });
  });

  test('maps dispatch to props', () => {
    expect(mapDispatchToProps).toEqual({
      add: addActivity
    });
  });
});
