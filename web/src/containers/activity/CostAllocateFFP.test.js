import { shallow } from 'enzyme';
import sinon from 'sinon';
import React from 'react';

import {
  CostAllocateFFPRaw as CostAllocateFFP,
  mapStateToProps,
  mapDispatchToProps
} from './CostAllocateFFP';
import { updateActivity } from '../../actions/activities';

describe('the CostAllocateFFP component', () => {
  const sandbox = sinon.createSandbox();

  const state = {
    activities: {
      byKey: {
        key: {
          costAllocation: {
            '1066': {
              other: 10,
              ffp: {
                federal: 90,
                state: 10
              }
            },
            '1067': {
              other: 0,
              ffp: {
                federal: 10,
                state: 90
              }
            }
          },
          contractorResources: [
            {
              years: {
                '1066': 100,
                '1067': 1000
              }
            }
          ],
          expenses: [
            {
              years: {
                '1066': 100,
                '1067': 1000
              }
            }
          ],
          statePersonnel: [
            {
              years: {
                '1066': { amt: 100, perc: 41 },
                '1067': { amt: 1000, perc: 63 }
              }
            }
          ],
          years: ['1066', '1067']
        }
      }
    }
  };

  const props = {
    aKey: 'activity key',
    byYearData: [
      {
        allocations: [
          { amount: 261, id: 'federal' },
          { amount: 29, id: 'state' }
        ],
        ffpSelectVal: '90-10',
        total: 300,
        totalNetOther: 290,
        year: '1066'
      },
      {
        allocations: [
          { amount: 300, id: 'federal' },
          { amount: 2700, id: 'state' }
        ],
        ffpSelectVal: '10-90',
        total: 3000,
        totalNetOther: 3000,
        year: '1067'
      }
    ],
    costAllocation: state.activities.byKey.key.costAllocation,
    updateActivity: sandbox.stub()
  };

  beforeEach(() => {
    sandbox.resetBehavior();
    sandbox.resetHistory();
  });

  test('renders correctly', () => {
    const component = shallow(<CostAllocateFFP {...props} />);
    expect(component).toMatchSnapshot();
  });

  test('handles changes to other funding', () => {
    const component = shallow(<CostAllocateFFP {...props} />);
    component
      .find('InputHolder')
      .filterWhere(n => n.props().value === 10)
      .simulate('change', { target: { value: '150' } });

    expect(
      props.updateActivity.calledWith(
        'activity key',
        { costAllocation: { '1066': { other: 150 } } },
        true
      )
    );
  });

  test('handles changes to cost allocation dropdown', () => {
    const component = shallow(<CostAllocateFFP {...props} />);
    component
      .find('Select')
      .filterWhere(n => n.props().value === '90-10')
      .simulate('change', { target: { value: '35-65' } });

    expect(
      props.updateActivity.calledWith(
        'activity key',
        { costAllocation: { '1066': { ffp: { federal: 35, state: 65 } } } },
        true
      )
    );
  });

  test('maps redux state to component props', () => {
    expect(mapStateToProps(state, { aKey: 'key' })).toEqual({
      byYearData: [
        {
          allocations: [
            { amount: 207.9, id: 'federal' },
            { amount: 23.1, id: 'state' }
          ],
          ffpSelectVal: '90-10',
          total: 241,
          totalNetOther: 231,
          year: '1066'
        },
        {
          allocations: [
            { amount: 263, id: 'federal' },
            { amount: 2367, id: 'state' }
          ],
          ffpSelectVal: '10-90',
          total: 2630,
          totalNetOther: 2630,
          year: '1067'
        }
      ],
      costAllocation: state.activities.byKey.key.costAllocation
    });
  });

  test('maps dispatch actions to props', () => {
    expect(mapDispatchToProps).toEqual({
      updateActivity
    });
  });
});
