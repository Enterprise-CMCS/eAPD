import { shallow } from 'enzyme';
import React from 'react';
import {
  plain as SummaryBudgetByActivity,
  mapStateToProps,
  DataRow,
  DataRowGroup,
  SummaryBudgetByActivityBreakdown
} from './SummaryBudgetByActivity';

describe('renders correctly', () => {
  it('renders correctly in view-only mode', () => {
    const component = shallow(
      <SummaryBudgetByActivity data={{}} years={['1984', '1985']} isViewOnly />
    );
    expect(component).toMatchSnapshot();
  });

  it('renders correctly in standard mode', () => {
    const component = shallow(
      <SummaryBudgetByActivity data={{}} years={['1984', '1985']} />
    );
    expect(component).toMatchSnapshot();
  });

  test('data row renders with no data', () => {
    expect(
      shallow(
        <DataRow
          data={{
            medicaid: 0,
            federal: 0,
            state: 0,
            total: 0
          }}
          title="Total"
          groupTitle="HIT"
        />
      )
    ).toMatchSnapshot();
  });

  test('data row renders with data', () => {
    const component = shallow(
      <DataRow
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
          data={{
            combined: { '1448': {} },
            contractors: { '1448': {} },
            expenses: { '1448': {} },
            statePersonnel: { '1448': {} }
          }}
          title="title text"
          groupTitle="MMIS"
        />
      )
    ).toMatchSnapshot();
  });

  test('summary budget by activity breakdown renders', () => {
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
