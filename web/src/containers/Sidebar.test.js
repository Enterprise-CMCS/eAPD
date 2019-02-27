import { shallow } from 'enzyme';
import React from 'react';
import sinon from 'sinon';

import {
  plain as Sidebar,
  mapStateToProps,
  mapDispatchToProps
} from './Sidebar';
import { saveApd } from '../actions/apd';

describe('Sidebar component', () => {
  const props = {
    activities: [
      { anchor: '#key1', key: 'key 1' },
      { anchor: '#key2', key: 'key 2' }
    ],
    place: { id: 'place id', name: 'place name' },
    hash: '',
    saveApdToAPI: sinon.spy(),
  };

  test('renders correctly', () => {
    expect(shallow(<Sidebar {...props} />)).toMatchSnapshot();
    });

  test('saves apd to api', () => {
    const saveApdToApiProp = sinon.spy();
    const component = shallow(
      <Sidebar {...props} saveApdToAPI={saveApdToApiProp} />
    );
    component.find('Btn[onClick]').simulate('click');

    expect(saveApdToApiProp.called).toBeTruthy();
  });

  test('maps state to props', () => {
    const state = {
      activities: {
        byKey: { key1: { name: 'activity 1' }, key2: { name: 'activity 2' } },
        allKeys: ['key1', 'key2']
      },
      router: { location: { hash: '#moop moop' } },
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
      hash: 'moop moop'
    });
  });

  test('maps dispatch to props', () => {
    expect(mapDispatchToProps).toEqual({
      saveApdToAPI: saveApd,
    });
  });
});
