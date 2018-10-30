import { shallow } from 'enzyme';
import React from 'react';

import { raw as ScheduleSummary, mapStateToProps } from './ScheduleSummary';

describe('schedule summary component', () => {
  const tableData = {
    columns: [
      { accessor: 'accessor 1', header: 'Header 1', cell: () => {} },
      { accessor: 'accessor 2', header: 'Header 2', cell: () => {} },
      { accessor: 'accessor 3', header: 'Header 3', cell: () => {} }
    ],
    data: [
      {
        'accessor 1': 'value 1.1',
        'accessor 2': 'value 1.2',
        'accessor 3': 'value 1.3'
      },
      {
        'accessor 1': 'value 2.1',
        'accessor 2': 'value 2.2',
        'accessor 3': 'value 2.3'
      }
    ],
    defaultSorted: [{ id: 'accessor 2', desc: false }]
  };

  test('renders correctly', () => {
    expect(
      shallow(<ScheduleSummary tableData={tableData} />)
    ).toMatchSnapshot();
  });

  test('renders correctly with no data', () => {
    tableData.data.length = 0;
    expect(
      shallow(<ScheduleSummary tableData={tableData} />)
    ).toMatchSnapshot();
  });

  test('maps state to props', () => {
    const state = {
      activities: {
        byKey: {
          key1: {
            name: 'activity 1',
            plannedStartDate: 'planned start 1',
            schedule: [{ a: 1 }, { a: 2 }, { a: 3 }]
          },
          key2: {
            name: 'activity 2',
            plannedStartDate: 'planned start 2',
            schedule: [{ a: 'a' }, { a: 'b' }, { a: 'c' }]
          }
        }
      }
    };

    const props = mapStateToProps(state);

    expect(props).toMatchObject({
      tableData: {
        columns: [
          {
            accessor: 'activityName',
            Header: expect.any(String)
          },
          {
            accessor: 'milestone',
            Header: expect.any(String),
            Cell: expect.any(Function)
          },
          {
            accessor: 'startDate',
            Header: expect.any(String),
            Cell: expect.any(Function)
          },
          {
            accessor: 'endDate',
            Header: expect.any(String),
            Cell: expect.any(Function)
          }
        ],
        data: [
          { a: 1, activityName: 'activity 1', startDate: 'planned start 1' },
          { a: 2, activityName: 'activity 1', startDate: 'planned start 1' },
          { a: 3, activityName: 'activity 1', startDate: 'planned start 1' },
          { a: 'a', activityName: 'activity 2', startDate: 'planned start 2' },
          { a: 'b', activityName: 'activity 2', startDate: 'planned start 2' },
          { a: 'c', activityName: 'activity 2', startDate: 'planned start 2' }
        ],
        defaultSorted: [{ id: 'plannedStart', desc: false }]
      }
    });

    expect(props.tableData.columns[1].Cell({ value: 72 })).toEqual(72);
    expect(props.tableData.columns[1].Cell({})).toEqual('N/A');
  });
});
