import { shallow } from 'enzyme';
import React from 'react';
import sinon from 'sinon';

import {
  plain as Sidebar,
  mapStateToProps,
  mapDispatchToProps
} from './Sidebar';
import { expandActivitySection } from '../actions/activities';
import { saveApd } from '../actions/apd';
import { toggleExpand } from '../actions/sidebar';

describe('Sidebar component', () => {
  const expanded = {
    'apd-state-profile': true,
    'apd-summary': true,
    'prev-activities': true,
    activities: true,
    'schedule-summary': true,
    budget: true,
    'assurances-compliance': true,
    'executive-summary': true,
    'certify-submit': true
  };

  const props = {
    activities: [
      { anchor: '#key1', key: 'key 1' },
      { anchor: '#key2', key: 'key 2' }
    ],
    place: { id: 'place id', name: 'place name' },
    hash: '',
    expanded,
    expandSection: sinon.spy(),
    saveApdToAPI: sinon.spy(),
    toggleExpand: sinon.spy()
  };

  test('renders correctly', () => {
    expect(shallow(<Sidebar {...props} />)).toMatchSnapshot();

    [
      'apd-state-profile',
      'apd-summary',
      'prev-activities',
      'activities',
      'schedule-summary',
      'budget',
      'assurances-compliance',
      'executive-summary',
      'certify-submit'
    ].forEach(prop => {
      const override = { ...expanded, [prop]: false };
      expect(
        shallow(<Sidebar {...props} expanded={override} />)
      ).toMatchSnapshot();
    });
  });

  test('sidebar links expand', () => {
    const toggleExpandProp = sinon.spy();
    const component = shallow(
      <Sidebar {...props} toggleExpand={toggleExpandProp} />
    );

    component
      .find('SidebarLink')
      .findWhere(n => n.prop('anchor') && !n.prop('anchor').startsWith('#'))
      .forEach(link => {
        toggleExpandProp.resetHistory();
        link.prop('toggleExpand')();
        expect(toggleExpandProp.called).toBeTruthy();
      });
  });

  test('sidebar links expand related sections', () => {
    const expandSectionProp = sinon.spy();
    const component = shallow(
      <Sidebar {...props} expandSection={expandSectionProp} />
    );

    component
      .find('SidebarLink')
      .findWhere(n => n.prop('anchor') && n.prop('anchor').startsWith('#'))
      .forEach(link => {
        expandSectionProp.resetHistory();
        link.simulate('click');
        expect(expandSectionProp.called).toBeTruthy();
      });
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
      sidebar: { expanded: 'expansion hash' }
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
      expanded: 'expansion hash',
      hash: 'moop moop'
    });
  });

  test('maps dispatch to props', () => {
    expect(mapDispatchToProps).toEqual({
      expandSection: expandActivitySection,
      saveApdToAPI: saveApd,
      toggleExpand
    });
  });
});
