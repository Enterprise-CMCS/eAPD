import { shallow } from 'enzyme';
import React from 'react';
import {
  plain as CombinedActivityCosts,
  mapStateToProps,
  DataRow,
  DataRowGroup,
  SummaryBudgetByActivityTotals,
  SummaryBudgetByActivityBreakdown
} from './CombinedActivityCosts';

describe('renders correctly', () => {
  it('renders correctly in view-only mode', () => {
    const component = shallow(
      <CombinedActivityCosts
        apdType="HITECH"
        data={{}}
        years={['1984', '1985']}
        isViewOnly
      />
    );
    expect(component).toMatchSnapshot();
  });

  it('renders correctly in standard mode for hitech apds', () => {
    const component = shallow(
      <CombinedActivityCosts
        apdType="HITECH"
        data={{}}
        years={['1984', '1985']}
      />
    );
    expect(component).toMatchSnapshot();
  });

  it('renders correctly in standard mode for mmis apds', () => {
    const component = shallow(
      <CombinedActivityCosts
        apdType="MMIS"
        data={{}}
        years={['1984', '1985']}
      />
    );
    expect(component).toMatchSnapshot();
  });

  test('data row renders', () => {
    const component = shallow(
      <DataRow
        category="category"
        data={{ federal: 1, state: 2, medicaid: 1000, total: 3 }}
        title="title text"
        groupTitle="group title text"
      />
    );
    expect(component).toMatchSnapshot();
  });

  test('data row group renders', () => {
    expect(
      shallow(
        <DataRowGroup
          year="1448"
          data={{
            combined: { 1448: {} },
            contractors: { 1448: {} },
            expenses: { 1448: {} },
            statePersonnel: { 1448: {} }
          }}
          groupTitle="MMIS"
        />
      )
    ).toMatchSnapshot();
  });

  test('data row group renders for mmis', () => {
    expect(
      shallow(
        <DataRowGroup
          apdType="MMIS"
          year="1448"
          data={{
            combined: { 1448: {} },
            contractors: { 1448: {} },
            expenses: { 1448: {} },
            statePersonnel: { 1448: {} },
            keyStatePersonnel: { 1448: {} }
          }}
          groupTitle="MMIS"
        />
      )
    ).toMatchSnapshot();
  });

  test('Combined Activity Costs Totals renders', () => {
    expect(
      shallow(
        <SummaryBudgetByActivityTotals
          data={{
            hit: {
              1975: { federal: 1, state: 2, medicaid: 1000, total: 3 },
              1976: { federal: 10, state: 20, medicaid: 2000, total: 30 }
            },
            hie: {
              1975: { federal: 2, state: 3, medicaid: 2000, total: 5 },
              1976: { federal: 20, state: 30, medicaid: 3000, total: 50 }
            },
            mmis: {
              1975: { federal: 3, state: 4, medicaid: 3000, total: 7 },
              1976: { federal: 30, state: 40, medicaid: 4000, total: 70 }
            },
            combined: {
              1975: { federal: 4, state: 5, medicaid: 4000, total: 9 },
              1976: { federal: 40, state: 50, medicaid: 5000, total: 90 }
            }
          }}
          ffy="1975"
        />
      )
    ).toMatchSnapshot();
  });

  test('Combined Activity Costs breakdown renders', () => {
    const data = {
      activityTotals: [
        {
          data: {
            otherFunding: {
              1990: {
                statePersonnel: 100,
                expenses: 200,
                contractors: 350,
                total: 650
              },
              1991: {
                statePersonnel: 400,
                expenses: 700,
                contractors: 150,
                total: 1250
              }
            }
          }
        },
        {
          data: {
            otherFunding: {
              1990: {
                statePersonnel: 200,
                expenses: 400,
                contractors: 150,
                total: 750
              },
              1991: {
                statePersonnel: 600,
                expenses: 1000,
                contractors: 250,
                total: 1850
              }
            }
          }
        }
      ]
    };
    expect(
      shallow(<SummaryBudgetByActivityBreakdown data={data} ffy="1975" />)
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
