import { shallow } from 'enzyme';
import React from 'react';
import sinon from 'sinon';

import {
  plain as ExecutiveSummary,
  mapStateToProps,
  mapDispatchToProps
} from './ExecutiveSummary';
import { expandActivitySection } from '../actions/activities';

describe('private route component', () => {
  const props = {
    data: [
      {
        key: 'a1',
        name: 'activity 1',
        descShort: 'first activity',
        totals: { '1': 250, '2': 700 },
        combined: 950
      },
      {
        key: 'a2',
        name: 'activity 2',
        descShort: 'second activity',
        totals: { '1': 300, '2': 10 },
        combined: 310
      },
      {
        key: 'all',
        name: 'Total Cost',
        descShort: null,
        totals: { '1': 550, '2': 710 },
        combined: 1260
      }
    ],
    years: ['1', '2']
  };

  test('renders correctly', () => {
    const component = shallow(
      <ExecutiveSummary {...props} expandSection={() => {}} />
    );
    expect(component).toMatchSnapshot();
  });

  test('dispatches an action to expand', () => {
    const expandSectionProp = sinon.spy();
    const component = shallow(
      <ExecutiveSummary {...props} expandSection={expandSectionProp} />
    );

    // clicking the first link should expand the first activity
    component
      .find('a')
      .at(0)
      .simulate('click');

    expect(expandSectionProp.calledWith('a1'));
  });

  test('maps state to props', () => {
    const state = {
      activities: {
        byKey: {
          key1: {
            key: 'a1',
            name: 'activity 1',
            descShort: 'first activity',
            contractorResources: [
              {
                years: {
                  '1': 200,
                  '2': 500
                }
              }
            ],
            expenses: [],
            statePersonnel: [
              {
                years: {
                  '1': { amt: 100, perc: 50 },
                  '2': { amt: 1000, perc: 20 }
                }
              }
            ],
            years: ['1', '2']
          },
          key2: {
            key: 'a2',
            name: 'activity 2',
            descShort: 'second activity',
            contractorResources: [],
            expenses: [
              {
                years: {
                  '1': 300,
                  '2': 10
                }
              }
            ],
            statePersonnel: [],
            years: ['1', '2']
          }
        }
      },
      apd: { data: { years: ['1', '2'] } }
    };

    expect(mapStateToProps(state)).toEqual({
      data: [
        {
          key: 'a1',
          name: 'activity 1',
          descShort: 'first activity',
          totals: { '1': 250, '2': 700 },
          combined: 950
        },
        {
          key: 'a2',
          name: 'activity 2',
          descShort: 'second activity',
          totals: { '1': 300, '2': 10 },
          combined: 310
        },
        {
          key: 'all',
          name: 'Total Cost',
          descShort: null,
          totals: { '1': 550, '2': 710 },
          combined: 1260
        }
      ],
      years: ['1', '2']
    });
  });

  test('maps dispatch to props', () => {
    expect(mapDispatchToProps).toEqual({
      expandSection: expandActivitySection
    });
  });
});
