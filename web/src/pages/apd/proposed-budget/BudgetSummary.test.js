import { shallow } from 'enzyme';
import React from 'react';

import { APD_TYPE } from '@cms-eapd/common';

import {
  plain as BudgetSummary,
  mapStateToProps,
  DataRow,
  DataRowGroup,
  HeaderRow
} from './BudgetSummary';

const sampleBudgetMMIS = {
  ddi: {
    '90-10': {
      keyStatePersonnel: {
        2023: {
          total: 2400075,
          federal: 2124939,
          medicaid: 2361044,
          state: 236104
        },
        2024: { total: 0, federal: 0, medicaid: 0, state: 0 },
        total: {
          total: 2400075,
          federal: 2124939,
          medicaid: 2361044,
          state: 236104
        }
      },
      statePersonnel: {
        2023: {
          total: 2400075,
          federal: 2124939,
          medicaid: 2361044,
          state: 236104
        },
        2024: { total: 0, federal: 0, medicaid: 0, state: 0 },
        total: {
          total: 2400075,
          federal: 2124939,
          medicaid: 2361044,
          state: 236104
        }
      },
      contractors: {
        2023: {
          total: 1982756,
          federal: 1746939,
          medicaid: 1941043,
          state: 194104
        },
        2024: { total: 0, federal: 0, medicaid: 0, state: 0 },
        total: {
          total: 1982756,
          federal: 1746939,
          medicaid: 1941043,
          state: 194104
        }
      },
      expenses: {
        2023: {
          total: 775000,
          federal: 675670,
          medicaid: 750744,
          state: 75075
        },
        2024: { total: 0, federal: 0, medicaid: 0, state: 0 },
        total: {
          total: 775000,
          federal: 675670,
          medicaid: 750744,
          state: 75075
        }
      },
      combined: {
        2023: {
          total: 5157831,
          federal: 4547548,
          medicaid: 5052831,
          state: 505283
        },
        2024: { total: 0, federal: 0, medicaid: 0, state: 0 },
        total: {
          total: 5157831,
          federal: 4547548,
          medicaid: 5052831,
          state: 505283
        }
      }
    },
    '75-25': {
      keyStatePersonnel: {
        2023: { total: 0, federal: 0, medicaid: 0, state: 0 },
        2024: { total: 0, federal: 0, medicaid: 0, state: 0 },
        total: { total: 0, federal: 0, medicaid: 0, state: 0 }
      },
      statePersonnel: {
        2023: { total: 0, federal: 0, medicaid: 0, state: 0 },
        2024: { total: 0, federal: 0, medicaid: 0, state: 0 },
        total: { total: 0, federal: 0, medicaid: 0, state: 0 }
      },
      contractors: {
        2023: { total: 0, federal: 0, medicaid: 0, state: 0 },
        2024: { total: 0, federal: 0, medicaid: 0, state: 0 },
        total: { total: 0, federal: 0, medicaid: 0, state: 0 }
      },
      expenses: {
        2023: { total: 0, federal: 0, medicaid: 0, state: 0 },
        2024: { total: 0, federal: 0, medicaid: 0, state: 0 },
        total: { total: 0, federal: 0, medicaid: 0, state: 0 }
      },
      combined: {
        2023: { total: 0, federal: 0, medicaid: 0, state: 0 },
        2024: { total: 0, federal: 0, medicaid: 0, state: 0 },
        total: { total: 0, federal: 0, medicaid: 0, state: 0 }
      }
    },
    '50-50': {
      keyStatePersonnel: {
        2023: { total: 0, federal: 0, medicaid: 0, state: 0 },
        2024: { total: 0, federal: 0, medicaid: 0, state: 0 },
        total: { total: 0, federal: 0, medicaid: 0, state: 0 }
      },
      statePersonnel: {
        2023: { total: 0, federal: 0, medicaid: 0, state: 0 },
        2024: { total: 0, federal: 0, medicaid: 0, state: 0 },
        total: { total: 0, federal: 0, medicaid: 0, state: 0 }
      },
      contractors: {
        2023: { total: 0, federal: 0, medicaid: 0, state: 0 },
        2024: { total: 0, federal: 0, medicaid: 0, state: 0 },
        total: { total: 0, federal: 0, medicaid: 0, state: 0 }
      },
      expenses: {
        2023: { total: 0, federal: 0, medicaid: 0, state: 0 },
        2024: { total: 0, federal: 0, medicaid: 0, state: 0 },
        total: { total: 0, federal: 0, medicaid: 0, state: 0 }
      },
      combined: {
        2023: { total: 0, federal: 0, medicaid: 0, state: 0 },
        2024: { total: 0, federal: 0, medicaid: 0, state: 0 },
        total: { total: 0, federal: 0, medicaid: 0, state: 0 }
      }
    },
    combined: {
      2023: {
        total: 5157831,
        federal: 4547548,
        medicaid: 5052831,
        state: 505283
      },
      2024: { total: 0, federal: 0, medicaid: 0, state: 0 },
      total: {
        total: 5157831,
        federal: 4547548,
        medicaid: 5052831,
        state: 505283
      }
    }
  },
  mando: {
    '75-25': {
      keyStatePersonnel: {
        2023: { total: 0, federal: 0, medicaid: 0, state: 0 },
        2024: { total: 0, federal: 0, medicaid: 0, state: 0 },
        total: { total: 0, federal: 0, medicaid: 0, state: 0 }
      },
      statePersonnel: {
        2023: { total: 0, federal: 0, medicaid: 0, state: 0 },
        2024: {
          total: 1286801,
          federal: 965101,
          medicaid: 1286801,
          state: 321700
        },
        total: {
          total: 1286801,
          federal: 965101,
          medicaid: 1286801,
          state: 321700
        }
      },
      contractors: {
        2023: { total: 0, federal: 0, medicaid: 0, state: 0 },
        2024: {
          total: 542444,
          federal: 406833,
          medicaid: 542444,
          state: 135611
        },
        total: {
          total: 542444,
          federal: 406833,
          medicaid: 542444,
          state: 135611
        }
      },
      expenses: {
        2023: { total: 0, federal: 0, medicaid: 0, state: 0 },
        2024: { total: 75000, federal: 56250, medicaid: 75000, state: 18750 },
        total: { total: 75000, federal: 56250, medicaid: 75000, state: 18750 }
      },
      combined: {
        2023: { total: 0, federal: 0, medicaid: 0, state: 0 },
        2024: {
          total: 1904245,
          federal: 1428184,
          medicaid: 1904245,
          state: 476061
        },
        total: {
          total: 1904245,
          federal: 1428184,
          medicaid: 1904245,
          state: 476061
        }
      }
    },
    '50-50': {
      keyStatePersonnel: {
        2023: { total: 0, federal: 0, medicaid: 0, state: 0 },
        2024: { total: 0, federal: 0, medicaid: 0, state: 0 },
        total: { total: 0, federal: 0, medicaid: 0, state: 0 }
      },
      statePersonnel: {
        2023: { total: 0, federal: 0, medicaid: 0, state: 0 },
        2024: { total: 0, federal: 0, medicaid: 0, state: 0 },
        total: { total: 0, federal: 0, medicaid: 0, state: 0 }
      },
      contractors: {
        2023: { total: 0, federal: 0, medicaid: 0, state: 0 },
        2024: { total: 0, federal: 0, medicaid: 0, state: 0 },
        total: { total: 0, federal: 0, medicaid: 0, state: 0 }
      },
      expenses: {
        2023: { total: 0, federal: 0, medicaid: 0, state: 0 },
        2024: { total: 0, federal: 0, medicaid: 0, state: 0 },
        total: { total: 0, federal: 0, medicaid: 0, state: 0 }
      },
      combined: {
        2023: { total: 0, federal: 0, medicaid: 0, state: 0 },
        2024: { total: 0, federal: 0, medicaid: 0, state: 0 },
        total: { total: 0, federal: 0, medicaid: 0, state: 0 }
      }
    },
    combined: {
      2023: { total: 0, federal: 0, medicaid: 0, state: 0 },
      2024: {
        total: 1904245,
        federal: 1428184,
        medicaid: 1904245,
        state: 476061
      },
      total: {
        total: 1904245,
        federal: 1428184,
        medicaid: 1904245,
        state: 476061
      }
    }
  },
  combined: {
    2023: {
      total: 5257831,
      federal: 4628548,
      medicaid: 5142831,
      state: 514283
    },
    2024: {
      total: 5097245,
      federal: 3792934,
      medicaid: 5047245,
      state: 1254311
    },
    total: {
      total: 10355076,
      federal: 8421482,
      medicaid: 10190076,
      state: 1768594
    }
  }
};

describe('budget summary component', () => {
  test('renders correctly for hitech apds', () => {
    const component = shallow(
      <BudgetSummary
        apdType={APD_TYPE.HITECH}
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
        apdType={APD_TYPE.MMIS}
        activities={{
          mmis: ['mmis data']
        }}
        data={sampleBudgetMMIS}
        years={['2023', '2024']}
      />
    );
    expect(component).toMatchSnapshot();
  });

  test('renders DataRowGroup correctly for mmis apds', () => {
    const component = shallow(
      <DataRowGroup
        apdType={APD_TYPE.MMIS}
        data={sampleBudgetMMIS.ddi['90-10']}
        year={'2023'}
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
          apdType={APD_TYPE.MMIS}
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
