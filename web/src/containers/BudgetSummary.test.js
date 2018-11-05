import { shallow } from 'enzyme';
import React from 'react';

import {
  plain as BudgetSummary,
  mapStateToProps,
  DataRow,
  DataRowDetails,
  DataRowGroup,
  HeaderRow
} from './BudgetSummary';

describe('budget summary component', () => {
  test('renders correctly', () => {
    const component = shallow(
      <BudgetSummary
        activities={{
          hie: ['hie data'],
          hit: ['hit data'],
          mmis: ['mmis data']
        }}
        data={{
          hie: {},
          hit: {},
          mmis: {},
          combined: {
            '1': { federal: 1, state: 2, total: 3 },
            '2': { federal: 10, state: 20, total: 30 }
          }
        }}
        years={['1', '2']}
      />
    );
    expect(component).toMatchSnapshot();
  });

  test('data row renders with no data', () => {
    expect(
      shallow(
        <DataRow
          category="category text"
          data={{
            total: { total: 0 }
          }}
          entries={[]}
          title="title text"
        />
      )
    ).toMatchSnapshot();
  });

  test('data row renders with data', () => {
    const component = shallow(
      <DataRow
        category="category text"
        data={{
          '1': { federal: 1, state: 2, total: 3 },
          '2': { federal: 10, state: 20, total: 30 },
          total: { federal: 100, state: 200, total: 300 }
        }}
        entries={[]}
        title="title text"
      />
    );
    expect(component).toMatchSnapshot();

    // Toggle details
    component.find('button').simulate('click');
    expect(component).toMatchSnapshot();
  });

  test('data row details renders correctly', () => {
    expect(
      shallow(
        <DataRowDetails
          category="category"
          entries={[
            {
              name: 'activity 1',
              id: 1,
              data: { category: { '1': 1, '2': 2, total: 3 } }
            },
            {
              id: 2,
              data: { category: { '1': 10, '2': 20, total: 30 } }
            }
          ]}
          years={['1', '2', 'total']}
        />
      )
    ).toMatchSnapshot();
  });

  test('data row group renders', () => {
    expect(
      shallow(
        <DataRowGroup
          data={{
            combined: {},
            contractors: {},
            expenses: {},
            statePersonnel: {}
          }}
          entries={[10, 20, 30]}
        />
      )
    ).toMatchSnapshot();
  });

  test('header row renders', () => {
    expect(
      shallow(<HeaderRow title="row title" years={['1', '2']} />)
    ).toMatchSnapshot();
  });

  test('maps state to props', () => {
    const state = {
      apd: { data: { years: ['1', '2'] } },
      budget: {
        activityTotals: [
          { fundingSource: 'HIE', name: 'activity 1' },
          { fundingSource: 'HIT', name: 'activity 2' },
          { fundingSource: 'MMIS', name: 'activity 3' },
          { fundingSource: 'MMIS', name: 'activity 4' }
        ]
      }
    };

    expect(mapStateToProps(state)).toEqual({
      activities: {
        hie: [{ fundingSource: 'HIE', name: 'activity 1' }],
        hit: [{ fundingSource: 'HIT', name: 'activity 2' }],
        mmis: [
          { fundingSource: 'MMIS', name: 'activity 3' },
          { fundingSource: 'MMIS', name: 'activity 4' }
        ]
      },
      data: {
        activityTotals: [
          { fundingSource: 'HIE', name: 'activity 1' },
          { fundingSource: 'HIT', name: 'activity 2' },
          { fundingSource: 'MMIS', name: 'activity 3' },
          { fundingSource: 'MMIS', name: 'activity 4' }
        ]
      },
      years: ['1', '2']
    });
  });
});
