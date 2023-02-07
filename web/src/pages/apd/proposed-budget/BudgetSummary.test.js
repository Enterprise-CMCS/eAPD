import { shallow } from 'enzyme';
import React from 'react';

import {
  plain as BudgetSummary,
  mapStateToProps,
  DataRow,
  DataRowGroup,
  HeaderRow
} from './BudgetSummary';

describe('budget summary component', () => {
  test('renders correctly for hitech apds', () => {
    const component = shallow(
      <BudgetSummary
        apdType="HITECH"
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
            1: { federal: 1, state: 2, medicaid: 1000, total: 3 },
            2: { federal: 10, state: 20, medicaid: 2000, total: 30 }
          }
        }}
        years={['1', '2']}
      />
    );
    expect(component).toMatchSnapshot();
  });

  test('renders correctly for mmis apds', () => {
    const component = shallow(
      <BudgetSummary
        apdType="MMIS"
        activities={{
          mmis: ['mmis data']
        }}
        data={{
          mmis: {},
          combined: {
            1: { federal: 1, state: 2, medicaid: 1000, total: 3 },
            2: { federal: 10, state: 20, medicaid: 2000, total: 30 }
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
            medicaid: 0,
            federal: 0,
            state: 0,
            total: 0
          }}
          entries={[]}
          title="title text"
          year="year"
        />
      )
    ).toMatchSnapshot();
  });

  test('data row renders with data', () => {
    const component = shallow(
      <DataRow
        category="category text"
        data={{ federal: 1, state: 2, medicaid: 1000, total: 3 }}
        entries={[]}
        title="title text"
        year="year"
      />
    );
    expect(component).toMatchSnapshot();
  });

  test('data row group renders', () => {
    expect(
      shallow(
        <DataRowGroup
          data={{
            combined: { 1448: {} },
            contractors: { 1448: {} },
            expenses: { 1448: {} },
            statePersonnel: { 1448: {} }
          }}
          entries={[10, 20, 30]}
          year="1448"
        />
      )
    ).toMatchSnapshot();
  });

  test('data row group renders with keyStatePersonnel', () => {
    expect(
      shallow(
        <DataRowGroup
          apdType="MMIS"
          data={{
            combined: { 1448: {} },
            contractors: { 1448: {} },
            expenses: { 1448: {} },
            statePersonnel: { 1448: {} },
            keyStatePersonnel: { 1448: {} }
          }}
          entries={[10, 20, 30]}
          year="1448"
        />
      )
    ).toMatchSnapshot();
  });

  test('header row renders', () => {
    expect(shallow(<HeaderRow yr="1" />)).toMatchSnapshot();
    expect(shallow(<HeaderRow yr="total" />)).toMatchSnapshot();
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
